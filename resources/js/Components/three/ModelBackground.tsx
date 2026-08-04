import { router } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import {
    AmbientLight,
    AnimationMixer,
    BasicShadowMap,
    Box3,
    CanvasTexture,
    DirectionalLight,
    Fog,
    HemisphereLight,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    Object3D,
    PerspectiveCamera,
    Raycaster,
    Scene,
    SRGBColorSpace,
    Vector2,
    Vector3,
    WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { cameraPresets, type CameraPreset } from './cameraPresets';
import createVideoTexture from './createVideoTexture';
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

    const canvas2 = document.createElement('canvas');
    canvas2.width = 300;
    canvas2.height = 1000;

    const PADDING_X = 0;
    const PADDING_Y = 100;
    const ctx2 = canvas2.getContext('2d')!;

    const BORDER_COLOR = '#000000';

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const scene = new Scene();
        scene.fog = new Fog(0x0a0c0f, 12, 80);

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

        // Hard shadows (unfiltered = crisp, aliased edges).
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = BasicShadowMap;

        container.appendChild(renderer.domElement);

        // Selective glitch + outline composer, scoped to codie2 (layer 1).
        const {
            composer: glitchComposer,
            subtleGlitch,
            outlinePass,
        } = createGlitchComposer(renderer, scene, camera);

        // Fill lights at 0 so shadowed surfaces receive no light → pure black
        // shadows. (Raise these slightly to lift the darkness if it's too much.)
        const ambientLight = new AmbientLight(0xffffff, 0);
        scene.add(ambientLight);

        const directionalLight = new DirectionalLight(0xfffcf5, 3);
        directionalLight.position.set(8, 4, -2);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.set(2048, 2048);
        // normalBias fixes self-shadow "acne" stripes (offsets the lookup along
        // the surface normal); tighter frustum = more depth precision too.
        directionalLight.shadow.bias = -0.0002;
        directionalLight.shadow.normalBias = 0.08;
        {
            const cam = directionalLight.shadow.camera;
            cam.near = 0.5;
            cam.far = 120;
            cam.left = -25;
            cam.right = 25;
            cam.top = 25;
            cam.bottom = -25;
            cam.updateProjectionMatrix();
        }
        scene.add(directionalLight);

        const hemisphereLight = new HemisphereLight(0x8899aa, 0x111111, 0);
        scene.add(hemisphereLight);

        // Lights must also touch the glitch layer so codie2 stays lit there.
        [ambientLight, directionalLight, hemisphereLight].forEach((light) =>
            light.layers.enable(GLITCH_LAYER),
        );

        const loader = new GLTFLoader();

        // Set once codie2.glb loads; the click handler raycasts against it.
        let codie2Object: Object3D | null = null;

        const { trainLeft, trainRight } = createTrains();

        const { video: video1, texture: videoTexture } = createVideoTexture(
            '/videos/trailerppif.webm',
        );
        const { video: video2, texture: videoTexture2 } = createVideoTexture(
            '/videos/welcome.webm',
        );

        function drawScreen1Frame() {
            ctx2.save();

            ctx2.translate(canvas2.width / 2, canvas2.height / 2);
            ctx2.rotate(Math.PI / 2);
            ctx2.translate(-canvas2.height / 2, -canvas2.width / 2);

            ctx2.translate(canvas2.height, 0);
            ctx2.scale(-1, 1);

            ctx2.fillStyle = BORDER_COLOR;
            ctx2.fillRect(0, 0, canvas2.height, canvas2.width);

            const vw = video2.videoWidth;
            const vh = video2.videoHeight;
            if (!vw || !vh) {
                ctx2.restore();
                return;
            }

            const maxW = canvas2.height - PADDING_X * 2;
            const maxH = canvas2.width - PADDING_Y * 2;
            if (maxW <= 0 || maxH <= 0) {
                ctx2.restore();
                return;
            }

            const scale = Math.min(maxW / vw, maxH / vh);
            const drawW = vw * scale;
            const drawH = vh * scale;
            const dx = PADDING_X;
            const dy = (canvas2.width - drawH) / 2;
            ctx2.drawImage(video2, dx, dy, drawW, drawH);

            ctx2.restore();
        }

        const canvasTexture2 = new CanvasTexture(canvas2);
        canvasTexture2.colorSpace = SRGBColorSpace;
        canvasTexture2.flipY = false; // match your other textures' setting, adjust if it looks upside down
        canvasTexture2.center.set(0.5, 0.5);
        // canvasTexture2.rotation = Math.PI / 2;
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

        loader.load(
            '/models/twoscreens.glb',
            (gltf) => {
                const ts = gltf.scene;

                videoTexture2.repeat.set(15, 15);
                videoTexture2.offset.set(0, 0);
                videoTexture2.center.set(0.5, 0.5);
                videoTexture2.repeat.x = -1;
                videoTexture2.repeat.y = -1;
                videoTexture2.rotation = Math.PI / 2;

                let applied = false;
                ts.traverse((child) => {
                    if (child instanceof Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;

                        if (
                            !Array.isArray(child.material) &&
                            child.material.name === 'screen1'
                        ) {
                            child.material = new MeshBasicMaterial({
                                map: canvasTexture2,
                                toneMapped: false,
                            });
                            applied = true;
                        } else if (
                            !Array.isArray(child.material) &&
                            child.material.name === 'screen2'
                        ) {
                            child.material = new MeshBasicMaterial({
                                color: 0x000000,
                                toneMapped: false,
                            });
                            applied = true;
                        }
                    }
                });

                if (!applied) {
                    console.warn('[tv] no material named "Screen" found');
                }

                scene.add(ts);
            },
            undefined,
            (err) => console.error('[tv] failed to load /models/tv.glb', err),
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
                    if (child instanceof Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;

                        if (
                            !Array.isArray(child.material) &&
                            child.material.name === 'Screen'
                        ) {
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

                scene.add(tv);
            },
            undefined,
            (err) => console.error('[tv] failed to load /models/tv.glb', err),
        );

        loader.load('/models/bg.glb', (gltf) => {
            const model = gltf.scene;

            model.position.set(0, 0, 0);
            model.rotation.set(0, 0, 0);
            model.scale.set(1, 1, 1);

            // Names the ceiling might use — it must NOT cast, or it would block
            // the overhead light and shadow the whole interior.
            const CEILING_MATCH = /ceiling|roof|langit|atap|plafon|wall|/i;
            // The dark back wall — set this to its real name from the console
            // table. It gets self-lit (emissive) so it isn't pure black.
            const WALL_MATCH = /wall|dinding|tembok|tracks/i;
            const WALL_EMISSIVE = 0.5; // 0..1 self-light strength
            const bgMeshes: {
                name: string;
                material: string;
                casts: boolean;
            }[] = [];

            model.traverse((child) => {
                if (child instanceof Mesh) {
                    const materials = Array.isArray(child.material)
                        ? child.material
                        : [child.material];
                    const matName = materials.map((m) => m.name).join(',');

                    const isCeiling =
                        CEILING_MATCH.test(child.name) ||
                        CEILING_MATCH.test(matName);
                    const isWall =
                        WALL_MATCH.test(child.name) || WALL_MATCH.test(matName);

                    child.castShadow = !isCeiling;
                    child.receiveShadow = true;

                    bgMeshes.push({
                        name: child.name,
                        material: matName,
                        casts: child.castShadow,
                    });

                    materials.forEach((material) => {
                        material.transparent = false;
                        material.opacity = 1;
                        material.depthWrite = true;

                        // Self-light the dark wall so it isn't pure black, while
                        // keeping its texture (route the map through emissiveMap).
                        if (
                            isWall &&
                            material instanceof MeshStandardMaterial
                        ) {
                            if (material.map) {
                                material.emissiveMap = material.map;
                                material.emissive.setScalar(1); // white → true colors
                            } else {
                                material.emissive.copy(material.color);
                            }
                            material.emissiveIntensity = WALL_EMISSIVE;
                        }

                        material.needsUpdate = true;
                    });
                }
            });

            // Look for ceiling rows here and check `casts` — it must be false.
            console.table(bgMeshes);

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

            // Re-arm codie2's click now that we're back on /home.
            isZooming = false;

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

        // When the tab is hidden, rAF pauses but <audio> keeps playing — so the
        // distance fade never runs and the horn gets stuck loud. Pause it while
        // hidden, and reset the clock on return so nothing teleports.
        const handleVisibility = () => {
            if (document.hidden) {
                trainLeft.audio.pause();
                trainRight.audio.pause();
            } else {
                lastTime = performance.now();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            drawScreen1Frame();
            canvasTexture2.needsUpdate = true;

            const now = performance.now();
            // Clamp so a long-hidden tab doesn't jump everything on resume.
            const delta = Math.min((now - lastTime) / 1000, 0.1);
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
            document.removeEventListener('visibilitychange', handleVisibility);
            unsubscribeNavigate();
            canvasTexture2.dispose();
            document.body.style.cursor = '';

            renderer.dispose();
            glitchComposer.dispose();

            video1.pause();
            video1.remove();

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
