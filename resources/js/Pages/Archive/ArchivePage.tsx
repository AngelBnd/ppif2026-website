// @ts-ignore
import { Head, Link } from '@inertiajs/react';
import gsap from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';

// assets
import ArchiveTitle from '@/assets/archive/ArchiveTitle.svg';
import BGStreakArchive1 from '@/assets/archive/BGStreakArchive1.svg';
import BGStreakArchive2 from '@/assets/archive/BGStreakArchive2.svg';
import BriefingDayButton from '@/assets/archive/BriefingDayButton.svg?react';
import DDayButton from '@/assets/archive/DDayButton.svg?react';
import GalleryScroll from '@/Components/about/GalleryScroll';
import GlitchShape from '@/Components/global/GlitchShape';

export default function ArchivePage() {
    const [showOverlay, setShowOverlay] = useState(true);
    const shapeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLImageElement>(null);
    const streak1Ref = useRef<HTMLImageElement>(null);
    const streak2Ref = useRef<HTMLImageElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const shape = shapeRef.current;
        const title = titleRef.current;
        const streak1 = streak1Ref.current;
        const streak2 = streak2Ref.current;
        if (!shape || !title || !streak1 || !streak2) return;

        const LR = 'inset(0% 100% 0% 0%)';
        const RL = 'inset(0% 0% 0% 100%)';
        const open = () => ({
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.5,
            ease: 'power3.out',
        });

        gsap.set(shape, { clipPath: LR });
        gsap.set(title, { clipPath: LR });
        gsap.set(streak1, { clipPath: RL });
        gsap.set(streak2, { clipPath: LR });

        const tl = gsap.timeline({ delay: 0.4 });
        tl.to(shape, open())
            .addLabel('afterShape')
            .to(title, open(), '<+=0.4')
            .to(streak1, open(), 'afterShape')
            .to(streak2, open());

        const buttons = buttonsRef.current;
        if (buttons) {
            tl.from(
                buttons.children,
                {
                    xPercent: -20,
                    rotation: -14,
                    autoAlpha: 0,
                    duration: 0.4,
                    ease: 'back.out(1.6)',
                    stagger: 0.14,
                },
                'afterShape',
            );
        }

        return () => {
            tl.kill();
        };
    }, []);

    const dummyPhotos = ['/pngs/archive/archivePlaceHolder.svg'];

    return (
        <>
            <Head title="Archive" />

            <style>{`
                @font-face {
                    font-family: 'Arsenal';
                    src: url('/fonts/Arsenal-Bold.woff2') format('woff2');
                    font-weight: bold;
                    font-style: normal;
    font-display: swap;
                }
                @font-face {
                    font-family: 'NotoSans';
                    src: url('/fonts/NotoSans-Bold.woff2') format('woff2');
                    font-weight: bold;
                    font-style: normal;
    font-display: swap;
                }

                /* ANIMASI ENTRANCE (Masing-masing disetel dengan Kurva P5 yang Snappy) */
                @keyframes p5SlideLeft {
                    0% { transform: translate(-60px, 60px) scale(0.95); opacity: 0; }
                    100% { transform: translate(0, 0) scale(1); opacity: 1; }
                }
                @keyframes p5SlideRight {
                    0% { transform: translate(100px, -100px); opacity: 0; }
                    100% { transform: translate(0, 0); opacity: 1; }
                }

                .animate-entrance-left {
                    animation: p5SlideLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-entrance-right {
                    animation: p5SlideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .perspective-wrapper {
                    perspective: 1200px;
                    overflow: hidden;
                }
                .skew-container {
                    transform: rotateX(10deg) rotateY(-25deg) rotateZ(5deg);
                    transform-style: preserve-3d;
                }
                .gpu-card {
                    backface-visibility: hidden;
                    transform: translateZ(0);
                    transition: transform 0.4s ease, border-color 0.4s;
                }
                .gpu-card:hover {
                    transform: translateZ(30px) scale(1.02);
                    border-color: #3b82f6;
                }
                
                /* ANIMASI AUTO SCROLL VERTICAL */
                .marquee-vertical {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    animation: scrollUp 16s linear infinite;
                }

                .marquee-container:hover .marquee-vertical {
                    animation-play-state: paused;
                }

                @keyframes scrollUp {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
            `}</style>

            {/* Render Overlay Info */}
            {/* {showOverlay && (
                <ArchiveWaitInfo onClose={() => setShowOverlay(false)} />
            )} */}

            <div
                className="relative flex min-h-screen select-none overflow-hidden bg-transparent text-white"
                style={{ fontFamily: "'Arsenal', sans-serif" }}
            >
                {/* <ArchiveBackground /> */}

                {/* AUTOMATED CAROUSEL FOTO (Slide In dari Kanan Atas) */}
                {/* <div className="perspective-wrapper animate-entrance-right absolute right-[0px] top-[-20px] z-0 ml-auto flex h-screen w-1/2 items-center justify-center overflow-hidden px-0 py-0 opacity-0">
                    <div className="skew-container marquee-container relative -bottom-[0%] flex h-full max-h-[100vh] w-[340px] flex-col overflow-hidden">
                        <div className="marquee-vertical py-2">
                            {doublePhotos.map((src, index) => (
                                <div
                                    key={index}
                                    className="gpu-card max-h-[170px] min-h-[170px] w-full flex-shrink-0 rotate-2 transform overflow-hidden rounded-none border-2 border-white bg-neutral-900 p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <img
                                        src={src}
                                        alt={`Arsip Loop ${index}`}
                                        className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}
                <img
                    ref={streak1Ref}
                    className="absolute -right-[14%] top-[29.5%] z-0 h-auto w-[60%]"
                    src={BGStreakArchive1}
                />
                <img
                    ref={streak2Ref}
                    className="absolute right-[15%] top-[1%] z-0 h-auto w-[31%]"
                    src={BGStreakArchive2}
                />
                <div className="absolute right-12">
                    <GalleryScroll
                        images={dummyPhotos}
                        clickable={false}
                        faceDirection="left"
                        pictureSize="large"
                    />
                </div>

                {/* SHAPE BACKGROUND (Slide In dari Kiri Bawah barengan dengan Menu) */}
                <div
                    ref={shapeRef}
                    className="z-5 pointer-events-none absolute -bottom-[53%] flex h-auto w-screen items-end text-[#BF1E2E]"
                >
                    <svg
                        viewBox="0 0 1891.5 1503.5"
                        className="h-full w-full object-contain"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            xmlns="http://www.w3.org/2000/svg"
                            d="M1445.51 1033.81L1891.5 729V916.5L1671.5 1199H1670.62L1488.5 1390.5L0 832.5V0L1445.51 1033.81Z"
                            fill="#BF1E2E"
                        />
                    </svg>
                </div>

                <img
                    ref={titleRef}
                    className="absolute left-[9%] top-[17%] z-40 h-auto w-[45%] mix-blend-difference"
                    src={ArchiveTitle}
                />
                {/* STRUKTUR MENU UTAMA (Ikut Slide In dari Kiri Bawah) */}
                <div className="z-15 pointer-events-none absolute left-0 top-0 flex h-full w-1/2 flex-col justify-between bg-transparent p-12">
                    {/* Navigasi & Headline */}
                    <div
                        className="pointer-events-auto absolute left-[32%] shrink-0 origin-left -rotate-[-24deg] transform items-start"
                        style={{ top: 'clamp(12%, 35vh, 33%)' }}
                    >
                        <div className="[perspective:960px]">
                            <div
                                ref={buttonsRef}
                                className="items-starts flex shrink-0 origin-center flex-col -space-y-4 [transform:rotateY(50deg)_scaleX(1.38)_scaleY(1.08)]"
                            >
                                {/* Sub-route: D-Day */}
                                <div className="group relative w-fit shrink-0">
                                    <Link
                                        href="/archive/dday"
                                        data-click-sound
                                        className="relative flex h-[auto] cursor-pointer items-center justify-center overflow-visible border-none bg-transparent p-0 text-left text-white outline-none"
                                        style={{
                                            width: 'clamp(162px, 45vh, 360px)',
                                        }}
                                    >
                                        <GlitchShape className="absolute inset-0 z-20 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-70" />
                                        {/* HOVER EFFECT */}

                                        {/* BUTTON ASSET */}
                                        <div className="z-11 relative flex h-full w-full origin-center transform items-center justify-center transition-all duration-300 group-hover:rotate-3 group-hover:scale-105">
                                            <DDayButton className="h-full w-full object-contain" />
                                        </div>
                                    </Link>
                                </div>

                                {/* Sub-route: BriefingDay */}
                                <div className="group relative w-fit shrink-0">
                                    <Link
                                        href="/archive/briefingday"
                                        data-click-sound
                                        className="relative flex h-auto cursor-pointer items-center justify-center overflow-visible border-none bg-transparent p-0 text-left text-white outline-none"
                                        style={{
                                            width: 'clamp(292.5px, 95.5vh, 700px)',
                                        }}
                                    >
                                        {/* HOVER EFFECT */}
                                        <GlitchShape className="absolute inset-0 z-20 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-70" />

                                        {/* BUTTON ASSET */}
                                        <div className="z-11 relative flex h-full w-full origin-center transform items-center justify-center transition-all duration-300 group-hover:rotate-3 group-hover:scale-105">
                                            <BriefingDayButton className="h-full w-full object-contain" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
