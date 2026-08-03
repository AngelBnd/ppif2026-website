import { router } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import {
    AmbientLight,
    AnimationMixer,
    Box3,
    DirectionalLight,
    Fog,
    HemisphereLight,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    Raycaster,
    Scene,
    SRGBColorSpace,
    Vector2,
    Vector3,
    VideoTexture,
    WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { cameraPresets, type CameraPreset } from './cameraPresets';
import { createGlitchComposer, GLITCH_LAYER } from './glitchComposer';
import { loadAnimatedModel } from './loadModels';
import { createTrains, initTrain, updateTrain } from './trainAnimation';

type ModelBackgroundProps = {
    preset?: CameraPreset;
};

export default function ModelBackground({
    preset = 'home',
}: ModelBackgroundProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    const lookAtRef = useRef(new Vector3(0, 0, 0));
    const presetRef = useRef(preset);
    const basePositionRef = useRef(new Vector3());
    const pointerRef = useRef({ x: 0, y: 0 });
    const mixersRef = useRef<AnimationMixer[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const scene = new Scene();
        scene.fog = new Fog(0x000000, 12, 80);

        const camera = new PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            100,
        );

        cameraRef.current = camera;

        const initialPreset = cameraPresets[preset];
        basePositionRef.current.set(...initialPreset.position);
        camera.position.copy(basePositionRef.current);
        lookAtRef.current.set(...initialPreset.lookAt);
        camera.lookAt(lookAtRef.current);

        const renderer = new WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 1);

        container.appendChild(renderer.domElement);

        // Selective glitch + outline composer, scoped to codie2 (layer 1).
        const {
            composer: glitchComposer,
            subtleGlitch,
            outlinePass,
        } = createGlitchComposer(renderer, scene, camera);

        const ambientLight = new AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const directionalLight = new DirectionalLight(0xfffcf5, 2);
        directionalLight.position.set(8, 6, -3);
        scene.add(directionalLight);

        const hemisphereLight = new HemisphereLight(0x8899aa, 0x111111, 1);
        scene.add(hemisphereLight);

        // Lights must also touch the glitch layer so codie2 stays lit there.
        [ambientLight, directionalLight, hemisphereLight].forEach((light) =>
            light.layers.enable(GLITCH_LAYER),
        );

        const loader = new GLTFLoader();

        // Set once codie2.glb loads; the click handler raycasts against it.
        let codie2Object: Object3D | null = null;

        const { trainLeft, trainRight } = createTrains();

        const video = document.createElement('video');
        video.src = '/videos/trailerppif.webm';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.style.display = 'none';
        document.body.appendChild(video);
        video.play().catch((err) => {
            console.warn('[tv] video autoplay blocked:', err);
        });
        video.addEventListener('error', () =>
            console.error('[tv] video failed to load:', video.error),
        );

        const videoTexture = new VideoTexture(video);
        videoTexture.colorSpace = SRGBColorSpace;
        videoTexture.center.set(0.5, 0.5);
        videoTexture.rotation = Math.PI / 2;
        videoTexture.repeat.set(5, 5);
        videoTexture.offset.set(0.6, 0);

        // Background characters (looping animations, no special handling).
        loadAnimatedModel(
            loader,
            '/models/codie3.glb',
            scene,
            mixersRef.current,
        );
        loadAnimatedModel(
            loader,
            '/models/codie4.glb',
            scene,
            mixersRef.current,
        );
        loadAnimatedModel(
            loader,
            '/models/codie5.glb',
            scene,
            mixersRef.current,
        );
        loadAnimatedModel(
            loader,
            '/models/codie.glb',
            scene,
            mixersRef.current,
        );

        // Trains: bind each loaded model to its fly-by controller.
        loadAnimatedModel(
            loader,
            '/models/trainleft.glb',
            scene,
            mixersRef.current,
            (root) => initTrain(trainLeft, root),
        );
        loadAnimatedModel(
            loader,
            '/models/trainright.glb',
            scene,
            mixersRef.current,
            (root) => initTrain(trainRight, root),
        );

        // codie2: the glitch/outline target — put it on the glitch layer and
        // remember it for hover/click raycasting.
        loadAnimatedModel(
            loader,
            '/models/codie2.glb',
            scene,
            mixersRef.current,
            (root) => {
                codie2Object = root;
                root.traverse((o) => o.layers.set(GLITCH_LAYER));
            },
        );

        loader.load(
            '/models/tv.glb',
            (gltf) => {
                const tv = gltf.scene;
                videoTexture.flipY = false;

                let applied = false;
                tv.traverse((child) => {
                    if (
                        child instanceof Mesh &&
                        !Array.isArray(child.material)
                    ) {
                        if (child.material.name === 'Screen') {
                            child.material = new MeshBasicMaterial({
                                map: videoTexture,
                                toneMapped: false,
                            });
                            applied = true;
                        }
                    }
                });

                if (!applied) {
                    console.warn('[tv] no material named "Screen" found');
                }

                const START = -6.50313;
                const END = -65.3231;
                const COUNT = 2;
                const AXIS: 'x' | 'y' | 'z' = 'x';

                scene.add(tv);
                const step = (END - START) / (COUNT - 1);
                for (let i = 1; i < COUNT; i++) {
                    const clone = tv.clone();
                    clone.position[AXIS] += i * step;
                    scene.add(clone);
                }

                const box = new Box3().setFromObject(tv);
                console.log('[tv] loaded ✓', {
                    screenApplied: applied,
                    center: box.getCenter(new Vector3()),
                    size: box.getSize(new Vector3()),
                });
            },
            undefined,
            (err) => console.error('[tv] failed to load /models/tv.glb', err),
        );

        loader.load('/models/bg.glb', (gltf) => {
            const model = gltf.scene;

            model.position.set(0, 0, 0);
            model.rotation.set(0, 0, 0);
            model.scale.set(1, 1, 1);

            model.traverse((child) => {
                if (child instanceof Mesh) {
                    const materials = Array.isArray(child.material)
                        ? child.material
                        : [child.material];

                    materials.forEach((material) => {
                        material.transparent = false;
                        material.opacity = 1;
                        material.depthWrite = true;
                        material.needsUpdate = true;
                    });
                }
            });

            scene.add(model);
        });

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            glitchComposer.setSize(window.innerWidth, window.innerHeight);
            outlinePass.uniforms.uResolution.value.set(
                window.innerWidth,
                window.innerHeight,
            );
        };

        window.addEventListener('resize', handleResize);

        // Shared raycaster for codie2 hover + click. codie2 sits on the glitch
        // layer, so the raycaster must test that layer too.
        const raycaster = new Raycaster();
        raycaster.layers.enable(GLITCH_LAYER);
        const pointerNDC = new Vector2();
        const isOverCodie = (clientX: number, clientY: number) => {
            if (!codie2Object) return false;
            pointerNDC.x = (clientX / window.innerWidth) * 2 - 1;
            pointerNDC.y = -(clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(pointerNDC, camera);
            return raycaster.intersectObject(codie2Object, true).length > 0;
        };

        // codie2 is only interactive on the /home page.
        const onHomePage = () => window.location.pathname === '/home';

        const handlePointerMove = (e: PointerEvent) => {
            pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;

            // Pointer cursor while hovering codie2 (only on /home).
            document.body.style.cursor =
                onHomePage() && isOverCodie(e.clientX, e.clientY)
                    ? 'pointer'
                    : '';
        };
        window.addEventListener('pointermove', handlePointerMove);

        // Zoom the camera in close to codie2, then navigate to /games.
        let isZooming = false;
        const handleClick = (e: PointerEvent) => {
            if (isZooming) return;
            if (
                onHomePage() &&
                codie2Object &&
                isOverCodie(e.clientX, e.clientY)
            ) {
                isZooming = true;

                const box = new Box3().setFromObject(codie2Object);
                const center = box.getCenter(new Vector3());
                const size = box.getSize(new Vector3());

                // Sit the camera a short distance in front of codie2, facing it.
                const dist = Math.max(size.x, size.y, size.z, 0.5) * 1.4;
                const dir = new Vector3()
                    .subVectors(basePositionRef.current, center)
                    .normalize();
                const target = center.clone().add(dir.multiplyScalar(dist));

                gsap.killTweensOf(basePositionRef.current);
                gsap.killTweensOf(lookAtRef.current);

                gsap.to(basePositionRef.current, {
                    x: target.x,
                    y: target.y,
                    z: target.z,
                    duration: 0.85,
                    ease: 'power2.in',
                });
                gsap.to(lookAtRef.current, {
                    x: center.x,
                    y: center.y,
                    z: center.z,
                    duration: 0.85,
                    ease: 'power2.in',
                    onComplete: () => router.visit('/games'),
                });
            }
        };
        window.addEventListener('click', handleClick);

        // Returning to /home resets the camera to the home preset — the zoom
        // bypasses the preset system, and the preset prop stays 'home', so the
        // preset effect never fires to undo it.
        const handleNavigate = () => {
            if (window.location.pathname !== '/home') return;

            const home = cameraPresets.home;
            gsap.killTweensOf(basePositionRef.current);
            gsap.killTweensOf(lookAtRef.current);
            gsap.to(basePositionRef.current, {
                x: home.position[0],
                y: home.position[1],
                z: home.position[2],
                duration: 1.2,
                ease: 'power3.inOut',
            });
            gsap.to(lookAtRef.current, {
                x: home.lookAt[0],
                y: home.lookAt[1],
                z: home.lookAt[2],
                duration: 1.2,
                ease: 'power3.inOut',
            });
        };
        const unsubscribeNavigate = router.on('navigate', handleNavigate);

        // Cursor-tilt config: max offset (limit) and easing (0..1, lower = softer).
        const TILT_X = 0.8;
        const TILT_Y = 0.3;
        const TILT_EASE = 0.06;
        let tiltX = 0;
        let tiltY = 0;

        let animationFrameId = 0;

        let lastTime = performance.now();
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const now = performance.now();
            const delta = (now - lastTime) / 1000;
            lastTime = now;

            mixersRef.current.forEach((m) => m.update(delta));

            updateTrain(trainLeft, camera, now, delta);
            updateTrain(trainRight, camera, now, delta);

            const onHome = presetRef.current === 'home' && !isZooming;
            const targetX = onHome ? pointerRef.current.x * TILT_X : 0;
            const targetY = onHome ? -pointerRef.current.y * TILT_Y : 0;
            tiltX += (targetX - tiltX) * TILT_EASE;
            tiltY += (targetY - tiltY) * TILT_EASE;

            camera.position.copy(basePositionRef.current);

            const forward = new Vector3()
                .subVectors(lookAtRef.current, camera.position)
                .normalize();
            const right = new Vector3()
                .crossVectors(forward, camera.up)
                .normalize();
            const up = new Vector3().crossVectors(right, forward).normalize();

            const tiltedLookAt = lookAtRef.current
                .clone()
                .add(right.multiplyScalar(tiltX))
                .add(up.multiplyScalar(tiltY));

            camera.lookAt(tiltedLookAt);

            // Base scene — everything except codie2 (layer 0).
            renderer.autoClear = true;
            camera.layers.set(0);
            renderer.setRenderTarget(null);
            renderer.render(scene, camera);

            // Glitched codie2 (layer 1) composited on top.
            renderer.autoClear = false;
            camera.layers.set(GLITCH_LAYER);

            // Faint constant shimmer with occasional brief spikes.
            subtleGlitch.uniforms.uTime.value = now / 1000;
            subtleGlitch.uniforms.uAmount.value =
                0.0015 + (Math.random() < 0.02 ? Math.random() * 0.01 : 0);

            glitchComposer.render();

            camera.layers.set(0);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('click', handleClick);
            unsubscribeNavigate();
            document.body.style.cursor = '';

            renderer.dispose();
            glitchComposer.dispose();

            video.pause();
            video.remove();

            trainLeft.audio.pause();
            trainRight.audio.pause();

            if (renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    useEffect(() => {
        presetRef.current = preset;

        const camera = cameraRef.current;
        if (!camera) return;

        const nextPreset = cameraPresets[preset];

        gsap.to(basePositionRef.current, {
            x: nextPreset.position[0],
            y: nextPreset.position[1],
            z: nextPreset.position[2],
            duration: 1.2,
            ease: 'power3.inOut',
        });

        gsap.to(lookAtRef.current, {
            x: nextPreset.lookAt[0],
            y: nextPreset.lookAt[1],
            z: nextPreset.lookAt[2],
            duration: 1.2,
            ease: 'power3.inOut',
        });
    }, [preset]);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 z-0 opacity-70"
        />
    );
}
