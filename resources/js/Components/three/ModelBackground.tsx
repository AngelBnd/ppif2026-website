import gsap from 'gsap';
import { useEffect, useRef } from 'react';
// Named imports (not `import * as THREE`) so Rolldown can tree-shake the
// modules this component never touches.
import {
    AmbientLight,
    DirectionalLight,
    Mesh,
    PerspectiveCamera,
    Scene,
    Vector3,
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
        position: [12, 0.3, 1],
        lookAt: [1, 3, 4],
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

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const scene = new Scene();

        const camera = new PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.2,
            100,
        );

        cameraRef.current = camera;

        const initialPreset = cameraPresets[preset];
        camera.position.set(...initialPreset.position);
        lookAtRef.current.set(...initialPreset.lookAt);
        camera.lookAt(lookAtRef.current);

        const renderer = new WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        container.appendChild(renderer.domElement);

        const ambientLight = new AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const directionalLight = new DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(3, 5, 4);
        scene.add(directionalLight);

        const loader = new GLTFLoader();

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

        let animationFrameId = 0;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            camera.lookAt(lookAtRef.current);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);

            renderer.dispose();

            if (renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    useEffect(() => {
        const camera = cameraRef.current;
        if (!camera) return;

        const nextPreset = cameraPresets[preset];

        gsap.to(camera.position, {
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
