import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import {
    AmbientLight,
    AnimationMixer,
    Box3,
    DirectionalLight,
    Fog,
    HemisphereLight,
    LoopRepeat,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    SRGBColorSpace,
    Vector3,
    VideoTexture,
    WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type CameraPreset = 'home' | 'about' | 'timeline' | 'contact';

type ModelBackgroundProps = {
    preset?: CameraPreset;
};

const cameraPresets: Record<
    CameraPreset,
    { position: [number, number, number]; lookAt: [number, number, number] }
> = {
    home: {
        position: [12, 4, 1],
        lookAt: [1, 0.6, 1],
    },
    about: {
        position: [3, 1.2, 5],
        lookAt: [0, 0.2, 0],
    },
    timeline: {
        position: [-3, 2, 5],
        lookAt: [0, 0, 0],
    },
    contact: {
        position: [0, 3, 4],
        lookAt: [0, 0, 0],
    },
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

    let mixer: AnimationMixer | undefined;

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const scene = new Scene();
        scene.fog = new Fog(0x000000, 12, 80);

        const camera = new PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            3,
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

        const ambientLight = new AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const directionalLight = new DirectionalLight(0xfffcf5, 2);
        directionalLight.position.set(8, 6, -3);
        scene.add(directionalLight);

        const hemisphereLight = new HemisphereLight(0x8899aa, 0x111111, 1);
        scene.add(hemisphereLight);

        const loader = new GLTFLoader();

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

        loader.load(
            '/models/codie.glb',
            (gltf) => {
                const character = gltf.scene;

                scene.add(character);

                // set up animation playback
                if (gltf.animations.length > 0) {
                    mixer = new AnimationMixer(character);

                    const clip = gltf.animations[0]; // or find by name: gltf.animations.find(c => c.name === 'Walk')
                    const action = mixer.clipAction(clip);

                    action.setLoop(LoopRepeat, Infinity);
                    action.play();
                } else {
                    console.warn(
                        '[codie] model loaded but no animations found',
                    );
                }
            },
            undefined,
            (err) =>
                console.error('[codie] failed to load /models/codie.glb', err),
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
        };

        window.addEventListener('resize', handleResize);

        const handlePointerMove = (e: PointerEvent) => {
            pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('pointermove', handlePointerMove);

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

            if (mixer) mixer.update(delta);

            const onHome = presetRef.current === 'home';
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
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', handlePointerMove);

            renderer.dispose();

            video.pause();
            video.remove();

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
