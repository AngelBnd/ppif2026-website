import * as React from 'react';
// @ts-ignore
import { Head } from '@inertiajs/react';
import Shape1 from '@/Components/archive/Shape1';

export default function Archive() {
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
                {/* z-0 membuat carousel berada di lapisan dasar belakang layar */}
                <div className="w-1/2 h-screen absolute top-[-20px] right-[40px] flex items-center justify-center perspective-wrapper z-0 px-0 py-0 overflow-hidden border-2 border-dashed border-lime-400 ml-auto">

                    {/* INFO UKURAN BOX:
                      - Perlebar/perkecil lebar menyamping: Ubah nilai `w-[340px]` (misal: `w-[400px]` atau `w-[280px]`)
                      - Perpanjang/perpendek tinggi vertikal: Ubah nilai `max-h-[80vh]` (misal: `max-h-[90vh]` atau `max-h-[60vh]`)
                    
                      *Catatan: `border-2 border-dashed border-lime-400` ditambahkan di bawah untuk melihat area aktif.
                    */}
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
                {/* Dinaikkan ke z-10 agar menutupi sebagian kartu foto di bawahnya */}
                <div className="absolute -left-[20%] -bottom-[10%] w-[130vw] h-[140vh] pointer-events-none z-5 text-[#BF1E2E] flex items-end">
                    <Shape1 className="w-full h-full object-fill transform scale-110" />
                </div>

                {/* ================= LAYER 3 (TERATAS): STRUKTUR MENU UTAMA ================= */}
                {/* Menggunakan z-20 dan posisi absolut/fixed penempatan kontainer kiri agar tetap statis menimpa seluruh background */}
                <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col justify-between p-12 z-20 bg-transparent pointer-events-none">
                    {/* Kiri Atas */}
                    <div className="text-sm font-mono tracking-widest text-gray-400 uppercase italic pointer-events-auto">
                        // ARCHIVE_DOCUMENTATION_
                    </div>

                    {/* Tengah Kiri: Menu Utama */}
                    <div className="flex flex-col gap-6 my-auto pl-6 pointer-events-auto">
                        <button 
                            className="gigantic-menu text-left text-7xl md:text-8xl font-black tracking-tighter uppercase pb-2 w-fit bg-transparent text-white border-none cursor-pointer outline-none hover:text-[#0d0d0d] hover:bg-white px-4 py-2 transition-all duration-200 transform -skew-x-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
                            onClick={() => alert('Menu EVENT TERPILIH')}
                        >
                            EVENTS
                        </button>
                        <button 
                            className="gigantic-menu text-left text-7xl md:text-8xl font-black tracking-tighter uppercase pb-2 w-fit bg-transparent text-white border-none cursor-pointer outline-none hover:text-[#0d0d0d] hover:bg-white px-4 py-2 transition-all duration-200 transform -skew-x-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
                            onClick={() => alert('Menu GALLERY TERPILIH')}
                        >
                            GALLERY
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}