import * as React from 'react';
// @ts-ignore
import { Head, Link } from '@inertiajs/react';

// assets
import ArchiveShape from '@/assets/archive/ArchiveShape.svg?react';
import DDayButton from '@/assets/archive/DDayButton.svg?react';
import BriefingDayButton from '@/assets/archive/BriefingDayButton.svg?react';
import ArchiveBackground from './ArchiveBackground';

export default function ArchivePage() {
    const dummyPhotos = [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400",
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=400",
        "https://images.unsplash.com/photo-1505232458627-a72317fac728?q=80&w=400",
    ];

    const doublePhotos = [...dummyPhotos, ...dummyPhotos];

    return (
        <>
            <Head title="Archive" />
            
            <style>{`
                @font-face {
                    font-family: 'Arsenal';
                    src: url('/fonts/Arsenal-Bold.ttf') format('truetype');
                    font-weight: bold;
                    font-style: normal;
                }
                @font-face {
                    font-family: 'NotoSans';
                    src: url('/fonts/NotoSans-Bold.ttf') format('truetype');
                    font-weight: bold;
                    font-style: normal;
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
            
            <div className="relative min-h-screen bg-transparent text-white overflow-hidden flex select-none" style={{ fontFamily: "'Arsenal', sans-serif" }}>
                <ArchiveBackground />
                
                {/* AUTOMATED CAROUSEL FOTO (Slide In dari Kanan Atas) */}
                <div className="w-1/2 h-screen absolute top-[-20px] right-[0px] flex items-center justify-center perspective-wrapper z-0 px-0 py-0 overflow-hidden ml-auto opacity-0 animate-entrance-right">
                    <div className="relative w-[340px] h-full max-h-[100vh] -bottom-[0%] skew-container flex flex-col overflow-hidden marquee-container">
                        <div className="marquee-vertical py-2">
                            {doublePhotos.map((src, index) => (
                                <div 
                                    key={index} 
                                    className="w-full min-h-[170px] max-h-[170px] bg-neutral-900 border-2 border-white rounded-none overflow-hidden p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] gpu-card transform rotate-2 flex-shrink-0"
                                >
                                    <img 
                                        src={src} 
                                        alt={`Arsip Loop ${index}`} 
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* SHAPE BACKGROUND (Slide In dari Kiri Bawah barengan dengan Menu) */}
                <div className="absolute -left-[20%] -bottom-[10%] w-[130vw] h-[140vh] pointer-events-none z-5 text-[#BF1E2E] flex items-end opacity-0 animate-entrance-left">
                    <ArchiveShape className="w-full h-full object-contain" />
                </div>

                {/* STRUKTUR MENU UTAMA (Ikut Slide In dari Kiri Bawah) */}
                <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col justify-between p-12 z-15 bg-transparent pointer-events-none opacity-0 animate-entrance-left [animation-delay:100ms]">
                                        
                    {/* Navigasi & Headline */}
                    <div className="absolute left-[30%] top-[30%] pointer-events-auto w-fit transform -rotate-[-22deg] items-start origin-left">
                                        
                        <div className="flex flex-col gap-3 items-start">
                                            
                            {/* Sub-route: D-Day */}
                            <div className="group w-fit relative">
                                <Link 
                                    href="/archive/dday"
                                    className="text-left bg-transparent text-white border-none cursor-pointer outline-none p-0 w-[320px] h-[150px] flex items-center justify-center relative overflow-visible"
                                >
                                    {/* HOVER EFFECT */}
                                    <div 
                                        className="absolute inset-0 bg-[#189FD9] opacity-0 group-hover:opacity-100 transition-all duration-200 z-12 pointer-events-none scale-105"
                                        style={{
                                            clipPath: 'polygon(4% 0%, 100% 8%, 94% 92%, 0% 100%)',
                                            mixBlendMode: 'screen'
                                        }}
                                    />
                                
                                    {/* BUTTON ASSET */}
                                    <div className="w-full h-full transition-all duration-300 relative z-11 transform group-hover:scale-105 origin-center flex items-center justify-center">
                                        <DDayButton className="w-full h-full object-contain" />
                                    </div>
                                </Link>
                            </div>
                                                
                            {/* Sub-route: BriefingDay */}
                            <div className="group w-fit relative">
                                <Link 
                                    href="/archive/briefingday"
                                    className="text-left bg-transparent text-white border-none cursor-pointer outline-none p-0 w-[520px] h-[180px] flex items-center justify-center relative overflow-visible"
                                >
                                    {/* HOVER EFFECT */}
                                    <div 
                                        className="absolute inset-0 bg-[#189FD9] opacity-0 group-hover:opacity-100 transition-all duration-200 z-12 pointer-events-none scale-105"
                                        style={{
                                            clipPath: 'polygon(4% 0%, 100% 8%, 94% 92%, 0% 100%)',
                                            mixBlendMode: 'screen'
                                        }}
                                    />
                                
                                    {/* BUTTON ASSET */}
                                    <div className="w-full h-full transition-all duration-300 relative z-11 transform group-hover:scale-105 origin-center flex items-center justify-center">
                                        <BriefingDayButton className="w-full h-full object-contain" />
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