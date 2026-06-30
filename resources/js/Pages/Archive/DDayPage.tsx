import * as React from 'react';
import { useState, useRef } from 'react';
// @ts-ignore
import { Head, Link } from '@inertiajs/react';
import Shape2 from '@/Components/archive/Shape2';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface CarouselItem {
    id: number;
    title: string;
    desc: string;
    image: string;
}

const DUMMY_DATA: CarouselItem[] = [
    { id: 1, title: "Misi Pertama", desc: "Lorem ipsum dolor sit amet, saya mau makan dimsum HAHAHAHA", image: "https://picsum.photos/id/1025/600/400" },
    { id: 2, title: "Target Terkunci", desc: "Phantom thieves akan mengambil kembali hati yang terdistorsi.", image: "https://picsum.photos/id/1062/600/400" },
    { id: 3, title: "Istana Rahasia", desc: "Jangan biarkan musuh mendeteksi kehadiranmu di dalam map.", image: "https://picsum.photos/id/1084/600/400" },
    { id: 4, title: "Rencana Matang", desc: "Kombinasi taktik dan estetika tingkat tinggi adalah kunci utama.", image: "https://picsum.photos/id/1024/600/400" },
    { id: 5, title: "Eksekusi Akhir", desc: "Saatnya menutup misi dengan gaya yang tak terlupakan.", image: "https://picsum.photos/id/1080/600/400" },
    { id: 6, title: "Jejak Tersembunyi", desc: "Setiap langkah meninggalkan jejak yang harus kita waspadai.", image: "https://picsum.photos/id/1041/600/400" },
    { id: 7, title: "Sinyal Bahaya", desc: "Radar mendeteksi pergerakan mencurigakan di sekitar lokasi.", image: "https://picsum.photos/id/1043/600/400" },
    { id: 8, title: "Pintu Terakhir", desc: "Hanya satu kesempatan untuk membuka gerbang menuju inti istana.", image: "https://picsum.photos/id/1050/600/400" },
    { id: 9, title: "Bayangan Musuh", desc: "Mereka mengawasi dari kegelapan, menunggu saat yang tepat.", image: "https://picsum.photos/id/1059/600/400" },
    { id: 10, title: "Penutup Kisah", desc: "Babak ini berakhir, namun kisah baru akan segera dimulai.", image: "https://picsum.photos/id/1069/600/400" },
];

// =========================================================================
// SLOT CONFIG
// Setiap "slot" adalah posisi TETAP di layar (tidak pernah pindah-pindah).
// Yang berubah saat next/prev hanyalah KARTU MANA yang menempati slot itu,
// lalu kartu tsb di-tween (scale, opacity, grayscale, zIndex) menuju
// nilai target slotnya. Tidak ada translate "lempar kartu".
// =========================================================================
const SLOTS: Record<number, {
    x: number; y: number; scale: number; rotate: number;
    opacity: number; grayscale: number; zIndex: number;
}> = {
    [-2]: { x: 100, y: -250, scale: 0.45, rotate: -6, opacity: 1, grayscale: 1, zIndex: 10 },
    [-1]: { x: 30,  y: -140,  scale: 0.55, rotate: -4, opacity: 1,   grayscale: 1, zIndex: 12 },
    [0]:  { x: 0,   y: 0,    scale: 1,    rotate: -3, opacity: 1,   grayscale: 0, zIndex: 15 },
    [1]:  { x: -160, y: 140,  scale: 0.5,  rotate: 6,  opacity: 1,   grayscale: 1, zIndex: 20 },
    [2]:  { x: -260, y: 240,  scale: 0.5,  rotate: 6,  opacity: 1,   grayscale: 1, zIndex: 25 },
};
const MIN_OFFSET = -2;
const MAX_OFFSET = 2;

// Hitung offset terpendek (looping) antara index kartu & currentIndex
function getOffset(index: number, currentIndex: number, total: number) {
    let diff = index - currentIndex;
    // normalisasi ke range (-total/2, total/2]
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
}

export default function DDayPage() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const total = DUMMY_DATA.length;

    const { contextSafe } = useGSAP({ scope: containerRef });

const animateToIndex = contextSafe((nextIndex: number) => {
        if (isAnimating) return;
        setIsAnimating(true);

        DUMMY_DATA.forEach((item) => {
            const prevOffset = getOffset(item.id - 1, currentIndex, total);
            const nextOffset = getOffset(item.id - 1, nextIndex, total);

            const card = containerRef.current?.querySelector(
                `.card-item[data-id="${item.id}"]`
            ) as HTMLElement | null;
            if (!card) return;

            const img = card.querySelector('img');

            const wasInRange = prevOffset >= MIN_OFFSET && prevOffset <= MAX_OFFSET;
            const willBeInRange = nextOffset >= MIN_OFFSET && nextOffset <= MAX_OFFSET;

            // CASE 1: KARTU KELUAR DARI JANGKAUAN (Arah: Keluar ke Serong Kanan Atas)
            if (wasInRange && !willBeInRange) {
                gsap.to(card, {
                    x: 200,          // Geser ke kanan luar
                    y: -350,         // Geser ke atas luar
                    scale: 0.3,
                    rotate: -10,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                });
                return;
            }

            // CASE 2: KARTU BARU MASUK JANGKAUAN (Arah: Masuk dari Serong Kiri Bawah)
            if (!wasInRange && willBeInRange) {
                const target = SLOTS[nextOffset];
                
                // Set posisi awal (Spawn) jauh di serong kiri bawah sebelum animasi berjalan
                gsap.set(card, {
                    x: -400,         // Datang dari kiri luar
                    y: 400,          // Datang dari bawah luar
                    scale: 0.3,
                    rotate: 15,
                    zIndex: target.zIndex,
                    opacity: 0,
                });

                // Jalankan animasi transisi menuju slot targetnya
                gsap.to(card, {
                    x: target.x,
                    y: target.y,
                    scale: target.scale,
                    rotate: target.rotate,
                    opacity: target.opacity,
                    duration: 0.5,
                    ease: 'power3.out',
                });

                if (img) {
                    gsap.set(img, {
                        filter: `grayscale(${target.grayscale}) contrast(1.1) brightness(${target.grayscale ? 0.8 : 1})`,
                    });
                }
                return;
            }

            // CASE 3: Tetap di luar jangkauan -> abaikan
            if (!wasInRange && !willBeInRange) {
                return;
            }

            // CASE 4: Kartu bergeser normal antar internal slot (Tweening fly biasa)
            const target = SLOTS[nextOffset];
            gsap.to(card, {
                x: target.x,
                y: target.y,
                scale: target.scale,
                rotate: target.rotate,
                opacity: target.opacity,
                zIndex: target.zIndex,
                duration: 0.5,
                ease: 'power3.inOut',
            });

            if (img) {
                gsap.to(img, {
                    filter: `grayscale(${target.grayscale}) contrast(1.1) brightness(${target.grayscale ? 0.8 : 1})`,
                    duration: 0.5,
                    ease: 'power3.inOut',
                });
            }
        });

        gsap.delayedCall(0.5, () => setIsAnimating(false));
        setCurrentIndex(nextIndex);
    });

    const handleNext = () => {
        if (isAnimating) return;
        animateToIndex((currentIndex + 1) % total);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        animateToIndex((currentIndex - 1 + total) % total);
    };

    return (
        <>
            <Head title="Archive/DDay" />

            <div ref={containerRef} className="relative min-h-screen bg-[#0d0d0d] text-white font-sans overflow-hidden flex select-none items-center justify-center">

                {/* LAYER 1: SHAPE 2 MERAH ABSOLUT */}
                <div className="absolute -left-[-2%] -bottom-[0%] w-[100vw] h-[120vh] pointer-events-none z-5 text-[#BF1E2E] flex items-end">
                    <Shape2 className="w-full h-full object-fill transform scale-110" />
                </div>

                {/* LAYER 2: KARTU - SETIAP KARTU DI SLOT TETAP (relative wrapper) */}
                <div className="relative z-10 w-full max-w-5xl h-[550px] flex items-center justify-between px-12">

                    <div className="relative w-[480px] h-[320px]">
                        {DUMMY_DATA.map((item) => {
                            const offset = getOffset(item.id - 1, currentIndex, total);
                            const inRange = offset >= MIN_OFFSET && offset <= MAX_OFFSET;
                            const target = inRange ? SLOTS[offset] : null;
                            const isActive = offset === 0;

                            return (
                                <div
                                    key={item.id}
                                    data-id={item.id}
                                    style={{
                                        // posisi awal (sebelum animasi pertama jalan) langsung pakai slot,
                                        // supaya tidak ada "lompatan" saat render pertama
                                        transform: target
                                            ? `translate(${target.x}px, ${target.y}px) rotate(${target.rotate}deg) scale(${target.scale})`
                                            : `scale(0.3)`,
                                        opacity: target ? target.opacity : 0,
                                        zIndex: target ? target.zIndex : 0,
                                    }}
                                    className="card-item absolute top-0 left-0 w-full h-full origin-center pointer-events-none"
                                >
                                    <div className="absolute inset-0 border-4 border-white bg-black rounded-sm shadow-2xl p-2 flex flex-col justify-between">
                                        <div
                                            className="w-full h-full bg-zinc-800 overflow-hidden relative"
                                            style={{
                                                clipPath: "polygon(0% 2%, 98% 0%, 100% 95%, 2% 100%)"
                                            }}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{
                                                    filter: isActive
                                                        ? 'grayscale(0) contrast(1.1) brightness(1)'
                                                        : 'grayscale(1) contrast(1.1) brightness(0.8)'
                                                }}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Sisi Kanan: Info & Navigasi */}
                    <div className="w-[420px] flex flex-col gap-6 relative z-20">
                        <div
                            className="bg-black text-white p-6 border-l-8 border-red-600 shadow-xl transform -rotate-2"
                            style={{ clipPath: "polygon(0 0, 100% 5%, 95% 100%, 2% 95%)" }}
                        >
                            <h2 className="text-2xl font-black italic tracking-wider text-yellow-400 uppercase mb-2">
                                {DUMMY_DATA[currentIndex].title}
                            </h2>
                            <p className="text-sm font-mono tracking-tight text-zinc-300 leading-relaxed">
                                {DUMMY_DATA[currentIndex].desc}
                            </p>
                        </div>

                        <div className="flex gap-4 items-center pl-4">
                            <button
                                onClick={handlePrev}
                                className="bg-white text-black px-6 py-2 font-black italic transform -rotate-6 hover:bg-red-600 hover:text-white transition-colors duration-150 active:scale-95"
                            >
                                ◀ PREV
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-red-600 text-white px-8 py-3 font-black italic text-lg transform rotate-3 shadow-lg hover:bg-white hover:text-black transition-colors duration-150 active:scale-95"
                            >
                                NEXT ▶
                            </button>
                        </div>
                    </div>

                </div>

                <div className="absolute bottom-8 right-12 z-20">
                    <button className="flex items-center gap-2 bg-black border-2 border-white text-white px-5 py-2 rounded-full font-bold hover:bg-white hover:text-black transition-all transform hover:scale-105">
                        <span className="w-4 h-4 rounded-full bg-red-600 block border border-white"></span>
                        BACK
                    </button>
                </div>

            </div>
        </>
    );
}