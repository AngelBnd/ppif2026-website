import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

import BGGallery_Shadow from '@/assets/about/gallery/GalleryBGShadow.svg?react';
import BGGallery_Streak from '@/assets/about/gallery/GalleryBGStreak.svg?react';

type GalleryBGProps = {
    isActive: boolean;
};

export default function GalleryBG({ isActive }: GalleryBGProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const streakMaskRef = useRef<HTMLDivElement>(null);
    const shadowWrapperRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const hasPlayedEnterRef = useRef(false);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const streak = streakMaskRef.current;
        const shadow = shadowWrapperRef.current;

        if (!container || !streak || !shadow) return;

        const hiddenTopClip = 'polygon(0 0, 100% 8%, 100% 8%, 0 0)';
        const visibleClip = 'polygon(0 0, 100% 8%, 100% 100%, 0 92%)';
        const hiddenBottomClip = 'polygon(0 100%, 100% 100%, 100% 100%, 0 92%)';

        timelineRef.current?.kill();

        const tl = gsap.timeline();

        if (isActive) {
            hasPlayedEnterRef.current = true;

            gsap.set(container, {
                autoAlpha: 1,
            });

            gsap.set(streak, {
                clipPath: hiddenTopClip,
            });

            gsap.set(shadow, {
                opacity: 0,
            });

            tl.to(streak, {
                clipPath: visibleClip,
                duration: 0.6,
                ease: 'power3.out',
            }).to(
                shadow,
                {
                    opacity: 0.96,
                    duration: 0.25,
                    ease: 'power2.out',
                },
                0,
            );
        } else {
            // On first page load, hide instantly. No leaving animation yet.
            if (!hasPlayedEnterRef.current) {
                gsap.set(container, {
                    autoAlpha: 0,
                });

                gsap.set(streak, {
                    clipPath: hiddenTopClip,
                });

                gsap.set(shadow, {
                    opacity: 0,
                });

                return;
            }

            // After it has entered before, play leaving animation.
            tl.to(streak, {
                clipPath: hiddenBottomClip,
                duration: 0.45,
                ease: 'power3.in',
            })
                .to(
                    shadow,
                    {
                        opacity: 0,
                        duration: 0.25,
                        ease: 'power2.in',
                    },
                    0,
                )
                .to(container, {
                    autoAlpha: 0,
                    duration: 0.01,
                });
        }

        timelineRef.current = tl;

        return () => {
            tl.kill();
        };
    }, [isActive]);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed -left-[20vw] -top-[23vh] z-10 h-full w-full"
        >
            <div
                ref={shadowWrapperRef}
                className="absolute left-0 top-0 h-auto w-[80%]"
            >
                <BGGallery_Shadow className="h-auto w-full" />
            </div>

            <div
                ref={streakMaskRef}
                className="absolute left-[17vw] top-0 h-auto w-[80%]"
            >
                <BGGallery_Streak className="h-auto w-full" />
            </div>
        </div>
    );
}
