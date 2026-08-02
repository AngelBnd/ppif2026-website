import { router } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

// Layers
const TRANSITION_LAYERS = [
    { id: 'white', bg: 'bg-[#FFFFFF]', zIndex: 'z-0' },
    { id: 'white-smoke', bg: 'bg-[#F3F4F6]', zIndex: 'z-[5]' },
    { id: 'light-gray', bg: 'bg-[#E5E7EB]', zIndex: 'z-[10]' },
    { id: 'silver', bg: 'bg-[#9CA3AF]', zIndex: 'z-[15]' },
    { id: 'gray', bg: 'bg-[#4B5563]', zIndex: 'z-[20]' },
    { id: 'dark-gray', bg: 'bg-[#1F2937]', zIndex: 'z-[25]' },
    { id: 'black', bg: 'bg-[#111827]', zIndex: 'z-[30]' },
    { id: 'deep-black', bg: 'bg-[#050505]', zIndex: 'z-[35]' },
    { id: 'dark-burgundy', bg: 'bg-[#2A0007]', zIndex: 'z-[40]' },
    { id: 'deep-maroon', bg: 'bg-[#4A0404]', zIndex: 'z-[45]' },
    { id: 'maroon', bg: 'bg-[#7A0010]', zIndex: 'z-[50]' },
    { id: 'crimson', bg: 'bg-[#A80A18]', zIndex: 'z-[55]' },
    { id: 'dark-red', bg: 'bg-[#C9182B]', zIndex: 'z-[60]' },
    { id: 'red', bg: 'bg-[#E63946]', zIndex: 'z-[65]' }
];

export default function PageTransition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<(HTMLDivElement | null)[]>([]);
    const isTransitioningRef = useRef(false);
    const pendingVisitRef = useRef<string | null>(null);

    useEffect(() => {
        gsap.set(layersRef.current, {
            x: '-160%',
            rotation: 8,
            scale: 1.9,
        });
        gsap.set(containerRef.current, { display: 'none' });

        const handleBefore = (event: any) => {
            const url = event.detail.visit.url;

            let pathname = '';
            try {
                pathname = new URL(url, window.location.origin).pathname;
            } catch (e) {
                pathname = url;
            }

            if (
                pathname.startsWith('/games') ||
                pathname.startsWith('/api') ||
                pathname === window.location.pathname
            ) {
                return;
            }

            if (isTransitioningRef.current) return;

            event.preventDefault();
            isTransitioningRef.current = true;
            pendingVisitRef.current = url;

            gsap.set(containerRef.current, { display: 'block' });

            const tl = gsap.timeline({
                onComplete: () => {
                    if (pendingVisitRef.current) {
                        const targetUrl = pendingVisitRef.current;
                        pendingVisitRef.current = null;
                        router.visit(targetUrl);
                    }
                },
            });

            layersRef.current.forEach((layer, index) => {
                tl.to(
                    layer,
                    {
                        x: '0%',
                        duration: 0.32,
                        ease: 'power4.inOut',
                    },
                    index === 0 ? 0 : '-=0.3'
                );
            });
        };

        const handleNavigate = () => {
            if (!isTransitioningRef.current) return;

            const subLayers = layersRef.current.slice(0, -1);
            const topRedLayer = layersRef.current[layersRef.current.length - 1];

            gsap.set(subLayers, { x: '160%' });

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(containerRef.current, { display: 'none' });
                    gsap.set(layersRef.current, { x: '-160%' });
                    isTransitioningRef.current = false;
                },
            });

            tl.to(topRedLayer, {
                x: '160%',
                duration: 0.38,
                ease: 'power3.out',
            });
        };

        const unregisterBefore = router.on('before', handleBefore);
        const unregisterNavigate = router.on('navigate', handleNavigate);

        return () => {
            unregisterBefore();
            unregisterNavigate();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden"
            style={{ display: 'none' }}
        >
            {TRANSITION_LAYERS.map((layer, index) => (
                <div
                    key={layer.id}
                    ref={(el) => (layersRef.current[index] = el)}
                    className={`absolute inset-0 ${layer.bg} ${layer.zIndex}`}
                />
            ))}
        </div>
    );
}