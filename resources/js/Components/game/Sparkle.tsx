import sparkle from '@/assets/games/finalPage/sparkle.webp';
import gsap from 'gsap';
import { CSSProperties, useEffect, useRef } from 'react';

interface SparkleProps {
    size?: number;
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;

    /** Delay before animation starts (seconds) */
    startDelay?: number;

    /** Rotation speed (seconds per revolution) */
    rotationDuration?: number;

    /** Scale animation speed */
    pulseDuration?: number;

    /** Minimum scale */
    minScale?: number;

    /** Maximum scale */
    maxScale?: number;

    className?: string;
}

export default function Sparkle({
    size = 40,
    top,
    left,
    right,
    bottom,

    startDelay = 0,

    rotationDuration = 12,
    pulseDuration = 1.8,

    minScale = 0.85,
    maxScale = 1.15,

    className = '',
}: SparkleProps) {
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.set(ref.current, {
                opacity: 0,
                scale: minScale,
                rotation: gsap.utils.random(0, 360),
            });

            // Continuous rotation
            gsap.to(ref.current, {
                rotation: '+=360',
                duration: rotationDuration,
                ease: 'none',
                repeat: -1,
                delay: startDelay,
            });

            // Smooth scale breathing
            gsap.to(ref.current, {
                scale: maxScale,
                duration: pulseDuration,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: startDelay,
            });

            // Smooth twinkling
            gsap.fromTo(
                ref.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: pulseDuration * 0.5,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: gsap.utils.random(0.5, 2),
                    delay: startDelay,
                },
            );
        }, ref);

        return () => ctx.revert();
    }, [startDelay, rotationDuration, pulseDuration, minScale, maxScale]);

    const style: CSSProperties = {
        width: size,
        top,
        left,
        right,
        bottom,
    };

    return (
        <img
            ref={ref}
            src={sparkle}
            alt=""
            draggable={false}
            className={`pointer-events-none absolute select-none ${className}`}
            style={style}
        />
    );
}
