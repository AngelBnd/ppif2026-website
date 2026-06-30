import * as React from 'react';
// @ts-ignore
import { Head, Link } from '@inertiajs/react';
import Shape1 from '@/Components/archive/Shape1';
import DDayIcon from '@/Components/archive/DDayIcon';

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
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-50%);
                    }
                }
            `}</style>
            
            <div className="relative min-h-screen bg-[#0d0d0d] text-white font-sans overflow-hidden flex select-none">
                
                {/* ================= LAYER 1 (TERBAWAH): AUTOMATED CAROUSEL FOTO ================= */}
                <div className="w-1/2 h-screen absolute top-[-20px] right-[0px] flex items-center justify-center perspective-wrapper z-0 px-0 py-0 overflow-hidden border-2 border-dashed border-lime-400 ml-auto">
                    <div className="relative w-[340px] h-full max-h-[100vh] -bottom-[0%] skew-container flex flex-col overflow-hidden border-2 border-dashed border-lime-400 marquee-container">
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

                {/* ================= LAYER 2 (TENGAH): SHAPE 1 MERAH ABSOLUT ================= */}
                <div className="absolute -left-[20%] -bottom-[10%] w-[130vw] h-[140vh] pointer-events-none z-5 text-[#BF1E2E] flex items-end">
                    <Shape1 className="w-full h-full object-fill transform scale-110" />
                </div>

                {/* ================= LAYER 3 (TERATAS): STRUKTUR MENU UTAMA BRUTALIST ================= */}
                <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col justify-between p-12 z-15 bg-transparent pointer-events-none border-2 border-dashed border-lime-400">
                                        
                    {/* Tengah Kiri: Navigasi & Headline */}
                    <div className="absolute left-[30%] top-[30%] pointer-events-auto border-2 border-dashed border-lime-400 w-fit transform -rotate-[-22deg] items-start origin-left">
                                        
                        {/* Container Tombol Utama */}
                        <div className="flex flex-col gap-0.5 items-start">
                                        
                            {/* Tombol Navigasi 1 (Sub-route: D-Day) */}
                            <div className="group border-2 border-dashed border-lime-400 w-fit relative">
                                {/* Diubah dari <button> ke <Link> */}
                                <Link 
                                    href="/archive/dday"
                                    className="text-left bg-transparent text-white border-none cursor-pointer outline-none p-0 w-fit h-fit flex items-center justify-center relative overflow-visible"
                                >
                                    {/* EFEK HOVER */}
                                    <div 
                                        className="absolute inset-0 bg-[#189FD9] opacity-0 group-hover:opacity-100 transition-all duration-200 z-12 pointer-events-none scale-105"
                                        style={{
                                            clipPath: 'polygon(4% 0%, 100% 8%, 94% 92%, 0% 100%)',
                                            mixBlendMode: 'screen'
                                        }}
                                    />
                                
                                    {/* Ikon DDayIcon */}
                                    <DDayIcon className="md:w-[410px] h-auto transition-all duration-300 relative z-11 transform group-hover:scale-110 origin-center" />
                                </Link>
                            </div>
                                        
                            {/* Tombol Navigasi 2 (Sub-route: BriefingDay) */}
                            <div className="group border-2 border-dashed border-lime-400 w-fit relative">
                                {/* Diubah dari <button> ke <Link> */}
                                <Link 
                                    href="/archive/briefingday"
                                    className="text-left bg-transparent text-white border-none cursor-pointer outline-none p-0 w-fit h-fit flex items-center justify-center relative overflow-visible"
                                >
                                    {/* EFEK HOVER */}
                                    <div 
                                        className="absolute inset-0 bg-[#189FD9] opacity-0 group-hover:opacity-100 transition-all duration-200 z-12 pointer-events-none scale-105"
                                        style={{
                                            clipPath: 'polygon(4% 0%, 100% 8%, 94% 92%, 0% 100%)',
                                            mixBlendMode: 'screen'
                                        }}
                                    />
                                
                                    {/* Ikon BriefingDay */}
                                    <DDayIcon className="md:w-[410px] h-auto transition-all duration-300 relative z-11 transform group-hover:scale-110 origin-center" />
                                </Link>
                            </div>
                                        
                        </div>
                                        
                    </div>
                </div>

            </div>
        </>
    );
}