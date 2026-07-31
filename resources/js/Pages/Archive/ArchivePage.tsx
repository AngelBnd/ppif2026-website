// @ts-ignore
import { Head, Link } from '@inertiajs/react';

// assets
import ArchiveShape from '@/assets/archive/ArchiveShape.svg?react';
import BriefingDayButton from '@/assets/archive/BriefingDayButton.svg?react';
import DDayButton from '@/assets/archive/DDayButton.svg?react';
import GalleryScroll from '@/Components/about/GalleryScroll';
import ArchiveBackground from './ArchiveBackground';

export default function ArchivePage() {
    const dummyPhotos = [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=400',
        'https://images.unsplash.com/photo-1505232458627-a72317fac728?q=80&w=400',
    ];

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

            <div
                className="relative flex min-h-screen select-none overflow-hidden bg-transparent text-white"
                style={{ fontFamily: "'Arsenal', sans-serif" }}
            >
                <ArchiveBackground />

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
                <div className="absolute right-12">
                    <GalleryScroll
                        images={dummyPhotos}
                        clickable={false}
                        faceDirection="left"
                        pictureSize="large"
                    />
                </div>

                {/* SHAPE BACKGROUND (Slide In dari Kiri Bawah barengan dengan Menu) */}
                <div className="z-5 animate-entrance-left pointer-events-none absolute -bottom-[18%] -left-[25%] flex h-[158vh] w-[135vw] items-end text-[#BF1E2E] opacity-0">
                    <ArchiveShape className="h-full w-full object-contain" />
                </div>

                {/* STRUKTUR MENU UTAMA (Ikut Slide In dari Kiri Bawah) */}
                <div className="z-15 animate-entrance-left pointer-events-none absolute left-0 top-0 flex h-full w-1/2 flex-col justify-between bg-transparent p-12 opacity-0 [animation-delay:100ms]">
                    {/* Navigasi & Headline */}
                    <div className="pointer-events-auto absolute left-[10%] top-[22%] shrink-0 origin-left -rotate-[-20deg] transform items-start">
                        <div className="items-starts flex shrink-0 flex-col">
                            {/* Sub-route: D-Day */}
                            <div className="group relative w-fit shrink-0">
                                <Link
                                    href="/archive/dday"
                                    className="relative flex h-[auto] w-[400px] cursor-pointer items-center justify-center overflow-visible border-none bg-transparent p-0 text-left text-white outline-none"
                                >
                                    {/* HOVER EFFECT */}
                                    <div
                                        className="z-12 pointer-events-none absolute inset-0 scale-105 bg-[#189FD9] opacity-0 transition-all duration-200 group-hover:opacity-100"
                                        style={{
                                            clipPath:
                                                'polygon(4% 0%, 100% 8%, 94% 92%, 0% 100%)',
                                            mixBlendMode: 'screen',
                                        }}
                                    />

                                    {/* BUTTON ASSET */}
                                    <div className="z-11 relative flex h-full w-full origin-center transform items-center justify-center transition-all duration-300 group-hover:scale-105">
                                        <DDayButton className="h-full w-full object-contain" />
                                    </div>
                                </Link>
                            </div>

                            {/* Sub-route: BriefingDay */}
                            <div className="group relative w-fit shrink-0">
                                <Link
                                    href="/archive/briefingday"
                                    className="relative flex h-auto w-[700px] cursor-pointer items-center justify-center overflow-visible border-none bg-transparent p-0 text-left text-white outline-none"
                                >
                                    {/* HOVER EFFECT */}
                                    <div
                                        className="z-12 pointer-events-none absolute inset-0 scale-105 bg-[#189FD9] opacity-0 transition-all duration-200 group-hover:opacity-100"
                                        style={{
                                            clipPath:
                                                'polygon(4% 0%, 100% 8%, 94% 92%, 0% 100%)',
                                            mixBlendMode: 'screen',
                                        }}
                                    />

                                    {/* BUTTON ASSET */}
                                    <div className="z-11 relative flex h-full w-full origin-center transform items-center justify-center transition-all duration-300 group-hover:scale-105">
                                        <BriefingDayButton className="h-full w-full object-contain" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
