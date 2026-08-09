import cloud1 from '@/assets/timeline/cloud1.svg';
import cloud2 from '@/assets/timeline/cloud2.svg';
import cloud3 from '@/assets/timeline/cloud3.svg';
import cloud4 from '@/assets/timeline/cloud4.svg';
import cloud5 from '@/assets/timeline/cloud5.svg';
import timelineBg from '@/assets/timeline/timeline-bg.webp';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

/**
 * Flat, hand-drawn comic-style backdrop for the Timeline page. Swapped in
 * place of the shared 3D <ModelBackground> via AppLayout's
 * `showBackground={false}`, since this view's reference design uses a 2D
 * illustration rather than the rendered train-car model.
 */

export default function TimelineBackground() {
    const cloudRefs = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const startX = gsap.utils.random(-50, 50);
            cloudRefs.current.forEach((cloud) => {
                if (!cloud) return;
                const baseX = gsap.getProperty(cloud, 'x') as number;

                gsap.fromTo(
                    cloud,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 8,
                        ease: 'power2.out',
                    },
                );

                const animate = () => {
                    const restartAt =
                        window.innerWidth * gsap.utils.random(0.6, 0.85);

                    gsap.to(cloud, {
                        x: restartAt,
                        duration: gsap.utils.random(120, 300),
                        ease: 'none',
                        onComplete: animate,
                    });
                };

                gsap.delayedCall(gsap.utils.random(0, 8), animate);
            });
        });

        return () => ctx.revert();
    }, []);

    const clouds = [
        {
            src: cloud1,
            top: '38%',
            left: '5%',
            scale: 0.9,
        },
        {
            src: cloud2,
            top: '20%',
            left: '2%',
            scale: 1.1,
        },
        {
            src: cloud3,
            top: '40%',
            left: '30%',
            scale: 0.85,
        },
        {
            src: cloud4,
            left: '40%',
            top: '50%',
            scale: 1,
        },
        {
            src: cloud5,
            left: '55%',
            top: '20%',
            scale: 1.2,
        },
    ];

    return (
        <div className="h-screen w-screen">
            <img
                src={timelineBg}
                alt=""
                className="absolute -bottom-10 -left-[1%] z-0 h-[100%] object-contain object-bottom"
            />

            {clouds.map((cloud, i) => (
                <img
                    key={i}
                    ref={(el) => {
                        cloudRefs.current[i] = el;
                    }}
                    src={cloud.src}
                    alt=""
                    className="pointer-events-none absolute z-10 w-[13rem]"
                    style={{
                        top: cloud.top,
                        left: cloud.left,
                        transform: `scale(${cloud.scale})`,
                    }}
                />
            ))}
        </div>
    );
}
