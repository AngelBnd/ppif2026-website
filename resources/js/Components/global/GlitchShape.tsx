import gsap from 'gsap';
import { useEffect, useRef } from 'react';

type GlitchShapeProps = {
    /** Positioning / sizing classes for the <svg> (e.g. "absolute left-8 z-20 w-64"). */
    className?: string;
};

/**
 * The self-morphing red polygon used as a decorative glitch accent. Owns its
 * own animation — just drop it in and position it with `className`.
 */
export default function GlitchShape({ className = '' }: GlitchShapeProps) {
    const polygonRef = useRef<SVGPolygonElement>(null);

    const points = useRef([
        { x: 30, y: 15 }, // top-left
        { x: 220, y: 25 }, // top-right
        { x: 210, y: 55 }, // bottom-right
        { x: 40, y: 85 }, // bottom-left
    ]).current;

    useEffect(() => {
        const update = () => {
            if (!polygonRef.current) return;
            polygonRef.current.setAttribute(
                'points',
                points.map((p) => `${p.x},${p.y}`).join(' '),
            );
        };

        const tweens = [
            gsap.to(points[0], {
                x: 40,
                y: 30,
                duration: 0.9,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                onUpdate: update,
            }),
            gsap.to(points[1], {
                x: 240,
                y: 48,
                duration: 1,
                ease: 'power1.inOut',
                yoyo: true,
                delay: 0.3,
                repeat: -1,
                onUpdate: update,
            }),
            gsap.to(points[2], {
                x: 180,
                y: 80,
                duration: 0.6,
                ease: 'power1.inOut',
                yoyo: true,
                delay: 0.6,
                repeat: -1,
                onUpdate: update,
            }),
            gsap.to(points[3], {
                x: 70,
                y: 80,
                duration: 1.2,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1,
                delay: 0.1,
                onUpdate: update,
            }),
        ];

        return () => tweens.forEach((t) => t.kill());
    }, [points]);

    return (
        <svg
            viewBox="0 0 240 100"
            className={`pointer-events-none mix-blend-difference ${className}`}
            preserveAspectRatio="none"
        >
            <polygon
                ref={polygonRef}
                points="0,0 240,0 240,100 0,100"
                fill="rgba(191,30,46,0.9)"
            />
        </svg>
    );
}
