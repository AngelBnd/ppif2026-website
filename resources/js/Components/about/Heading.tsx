import About_AboutInformatics from '@/assets/about/About_AboutInformaticsSVG.svg?react';
import About_AboutPPIF from '@/assets/about/About_AboutPPIFSVG.svg?react';
import Informatics_AboutInformatics from '@/assets/about/Informatics_AboutInformaticsSVg.svg?react';
import PPIF_AboutPPIF from '@/assets/about/PPIF_AboutPPIFSVG.svg?react';
import Star from '@/assets/about/Star4Points.svg?react';
import { currentInfo } from '@/Pages/About';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

type Props = {
    className: string;
    currentInfo: currentInfo;
};

export default function Heading({ className, currentInfo }: Props) {
    const aboutAboutIFRef = useRef<HTMLDivElement | null>(null);
    const ifAboutIFRef = useRef<HTMLDivElement | null>(null);
    const aboutAboutPPIFRef = useRef<HTMLDivElement | null>(null);
    const ifaboutPPIFRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const starRefIF = useRef<HTMLDivElement | null>(null);
    const starRefPPIF = useRef<HTMLDivElement | null>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
        timelineRef.current?.kill();
        const tl = gsap.timeline();

        if (currentInfo === 'informatics') {
            tl.to(aboutAboutPPIFRef.current, {
                x: 80,
                duration: 0.1,
                opacity: 0,
                ease: 'bounce.out',
                pointerEvents: 'none',
            })
                .to(ifaboutPPIFRef.current, {
                    x: 80,
                    duration: 0.1,
                    opacity: 0,
                    ease: 'bounce.out',
                    pointerEvents: 'none',
                })
                .to(
                    starRefPPIF.current,
                    {
                        opacity: 0,
                        rotation: 90,
                        duration: 0.1,
                        ease: 'power2.in',
                        pointerEvents: 'none',
                    },
                    '-=0.05',
                );

            tl.set(ifAboutIFRef.current, {
                x: '-100',
                y: 0,
                rotation: 0,
                opacity: 0,
            });

            tl.fromTo(
                aboutAboutIFRef.current,
                {
                    x: -80,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: 'bounce.out',
                },
            )
                .fromTo(
                    ifAboutIFRef.current,
                    {
                        x: -80,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'bounce.out',
                    },
                    '<0.2',
                )
                .fromTo(
                    starRefIF.current,
                    {
                        x: 0,
                        y: 0,
                        rotation: -95,
                        scale: 0.85,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        scale: 1,
                        opacity: 1,
                        duration: 0.35,
                        ease: 'back.out(3.0)',
                        transformOrigin: '50% 50%',
                    },
                    '<0.1',
                );
        } else {
            tl.set(aboutAboutPPIFRef.current, {
                x: '-80',
                y: 0,
                rotation: 0,
                opacity: 0,
            });
            tl.set(ifaboutPPIFRef.current, {
                x: '-80',
                y: 0,
                rotation: 0,
                opacity: 0,
            });

            tl.to(aboutAboutIFRef.current, {
                x: 40,
                opacity: 0,
                duration: 0.1,
                ease: 'power2.in',
                pointerEvents: 'none',
            })
                .to(ifAboutIFRef.current, {
                    x: 40,
                    opacity: 0,
                    duration: 0.1,
                    ease: 'power2.in',
                    pointerEvents: 'none',
                })
                .to(
                    starRefIF.current,
                    {
                        opacity: 0,
                        rotation: 90,
                        duration: 0.1,
                        ease: 'power2.in',
                        pointerEvents: 'none',
                    },
                    '-=0.05',
                );

            tl.fromTo(
                aboutAboutPPIFRef.current,
                {
                    x: -80,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: 'bounce.out',
                },
            )
                .fromTo(
                    ifaboutPPIFRef.current,
                    {
                        x: -80,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'bounce.out',
                    },
                    '<0.2',
                )
                .fromTo(
                    starRefPPIF.current,
                    {
                        x: 0,
                        y: 0,
                        rotation: -95,
                        scale: 0.85,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        scale: 1,
                        opacity: 1,
                        duration: 0.35,
                        ease: 'back.out(3.0)',
                        transformOrigin: '50% 50%',
                    },
                    '<0.1',
                );
        }
        timelineRef.current = tl;

        return () => {
            tl.kill();
        };
    }, [currentInfo]);
    return (
        <div
            className={`${className} absolute`}
            style={{ width: 'clamp(18rem, 90vh, 39rem)' }}
        >
            <div
                // bg-green-400
                className={`absolute z-40 flex h-auto w-full origin-top-left -rotate-[20deg] flex-col items-start -space-y-12`}
            >
                <div ref={aboutAboutIFRef}>
                    <About_AboutInformatics className="block h-auto" />
                </div>
                <div ref={ifAboutIFRef}>
                    <Informatics_AboutInformatics className="block h-auto w-full" />
                </div>

                <div className="absolute left-[18%] top-[20%] z-50 w-full">
                    <div ref={starRefIF} className="h-auto w-fit">
                        <Star
                            className="block h-auto"
                            style={{ width: 'clamp(4.5rem, 30vh, 10rem)' }}
                        />
                    </div>
                </div>
            </div>

            <div
                className={`absolute flex h-auto origin-top-left -rotate-[14deg] items-end ${isFirstRender.current ? 'hidden' : ''}`}
                style={{ top: 'clamp(-20rem, calc(3rem - 9vh), 12rem)' }}
            >
                <div ref={aboutAboutPPIFRef}>
                    <About_AboutPPIF
                        className="mb-2 block h-auto"
                        style={{
                            width: 'clamp(4rem, 40vh, 14rem)',
                            marginBottom: 'clamp(0rem, 2vh, 1rem)',
                        }}
                    />
                </div>
                <div ref={ifaboutPPIFRef}>
                    <PPIF_AboutPPIF
                        className="block h-auto"
                        style={{
                            width: 'clamp(4rem, 50vh, 25rem)',
                        }}
                    />
                </div>

                <div
                    className="absolute z-50"
                    style={{
                        top: 'clamp(-45%, -2vh, -20%)',
                        right: 'clamp(-30%, -6vh, -14%)',
                    }}
                >
                    <div ref={starRefPPIF} className="h-auto w-fit">
                        <Star
                            className="block h-auto"
                            style={{ width: 'clamp(4.5rem, 30vh, 10rem)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
