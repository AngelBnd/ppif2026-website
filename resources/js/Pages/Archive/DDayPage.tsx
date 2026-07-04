import * as React from 'react';
import { useState, useRef } from 'react';
// @ts-ignore
import { Head, Link } from '@inertiajs/react';
import Shape2 from '@/Components/archive/Shape2';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

//asset
import Button from '@/Components/global/Button';
import SeeDetailsButton from '@/assets/svgs/SeeDetailsButtonTest.svg?react';
import BackButtonSvg from '@/assets/icons/BackButtonSVG.svg?react';

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

const SLOTS: Record<number, {
    x: number; y: number; scale: number; rotate: number;
    opacity: number; grayscale: number; zIndex: number;
}> = {
    [-2]: { x: 100, y: -300, scale: 0.45, rotate: -6, opacity: 1, grayscale: 1, zIndex: 10 },
    [-1]: { x: 30, y: -200, scale: 0.55, rotate: -4, opacity: 1, grayscale: 1, zIndex: 12 },
    [0]: { x: 0, y: 0, scale: 1, rotate: -3, opacity: 1, grayscale: 0, zIndex: 15 },
    [1]: { x: -160, y: 200, scale: 0.5, rotate: 6, opacity: 1, grayscale: 1, zIndex: 20 },
    [2]: { x: -260, y: 300, scale: 0.5, rotate: 6, opacity: 1, grayscale: 1, zIndex: 25 },
};
const MIN_OFFSET = -2;
const MAX_OFFSET = 2;

function getOffset(index: number, currentIndex: number, total: number) {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
}

export default function DDayPage() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [isViewOpen, setIsViewOpen] = useState<boolean>(false); // State baru untuk fitur view
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

            // CASE 1: KARTU KELUAR DARI JANGKAUAN
            if (wasInRange && !willBeInRange) {
                gsap.to(card, {
                    x: 200, y: -350, scale: 0.3, rotate: -10, opacity: 0, duration: 0.5, ease: 'power2.in',
                });
                return;
            }

            // CASE 2: KARTU BARU MASUK JANGKAUAN
            if (!wasInRange && willBeInRange) {
                const target = SLOTS[nextOffset];
                gsap.set(card, {
                    x: -400, y: 400, scale: 0.3, rotate: 15, zIndex: target.zIndex, opacity: 0,
                });
                gsap.to(card, {
                    x: target.x, y: target.y, scale: target.scale, rotate: target.rotate, opacity: target.opacity, duration: 0.5, ease: 'power3.out',
                });
                if (img) {
                    gsap.set(img, { filter: `grayscale(${target.grayscale}) contrast(1.1) brightness(${target.grayscale ? 0.8 : 1})` });
                }
                return;
            }

            if (!wasInRange && !willBeInRange) return;

            // CASE 4: Kartu bergeser normal antar internal slot
            const target = SLOTS[nextOffset];
            gsap.to(card, {
                x: target.x, y: target.y, scale: target.scale, rotate: target.rotate, opacity: target.opacity, zIndex: target.zIndex, duration: 0.5, ease: 'power3.inOut',
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

    const handleNext = () => { if (!isAnimating) animateToIndex((currentIndex + 1) % total); };
    const handlePrev = () => { if (!isAnimating) animateToIndex((currentIndex - 1 + total) % total); };

    return (
        <>
            <Head title="Archive/DDay" />

            {/* ─── VECTOR MASK DICTIONARY (Satu Wadah Terpusat) ─── */}
            <svg width="0" height="0" className="absolute pointer-events-none">
                <defs>
                    {/* Masking untuk kondisi NON-AKTIF (Diambil dari rasio path dalam SVG 296x199) */}
                    <clipPath id="cropNonAktif" clipPathUnits="objectBoundingBox">
                        <path d="M0.049,0.214 L0.92,0.163 L0.92,0.921 L0.049,0.906 Z" />
                    </clipPath>
                    {/* Masking untuk kondisi AKTIF (Diambil dari rasio path dalam SVG 822x584) */}
                    <clipPath id="cropAktif" clipPathUnits="objectBoundingBox">
                        <path d="M0.027,0.233 L0.937,0.062 L0.923,0.861 L0.081,0.904 Z" />
                    </clipPath>
                </defs>
            </svg>

            <div ref={containerRef} className="relative min-h-screen bg-[#000000] text-white font-sans overflow-hidden flex select-none items-center justify-center">

                <div className="absolute -left-[-2%] -bottom-[0%] w-[100vw] h-[120vh] pointer-events-none z-5 text-[#BF1E2E] flex items-end">
                    <Shape2 className="w-full h-full object-fill transform scale-110" />
                </div>

                <div className="relative z-10 w-full max-w-5xl h-[550px] flex items-center justify-between px-12">
                    <div className="relative w-[580px] h-[420px] transform translate-x-[-220px] -translate-y-[20px]">
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
                                        transform: target ? `translate(${target.x}px, ${target.y}px) rotate(${target.rotate}deg) scale(${target.scale})` : `scale(0.3)`,
                                        opacity: target ? target.opacity : 0,
                                        zIndex: target ? target.zIndex : 0,
                                    }}
                                    className="card-item absolute top-0 left-0 w-full h-full origin-center pointer-events-none flex items-center justify-center"
                                >
                                    {/* ─── KONTEN UTAMA KARTU (DEPENDEN TERHADAP FRAME) ─── */}
                                    <div className="absolute w-[100%] h-[100%] flex items-center justify-center">

                                        {/* ELEMEN FOTO: Memotong secara otomatis & adaptif berdasarkan state aktif / non-aktif */}
                                        <div
                                            className="w-full h-full bg-zinc-800 transition-all duration-300 ease-in-out"
                                            style={{
                                                clipPath: isActive ? 'url(#cropAktif)' : 'url(#cropNonAktif)'
                                            }}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{
                                                    filter: isActive ? 'grayscale(0) contrast(1.1) brightness(1)' : 'grayscale(1) contrast(1.1) brightness(0.8)'
                                                }}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* BINGKAI SVG NON-AKTIF */}
                                        {!isActive && (
                                            <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
                                                <svg width="100%" height="100%" viewBox="0 0 296 199" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                                    <path d="M285.769 193.052L4.37753 190.109L4.53448 27.9327L286.945 18.076L285.769 193.052ZM14.5841 180.407L272.425 183.327L275.5 28.5L14.7174 42.7446L14.5841 180.407Z" fill="#F0F2F5" />
                                                    <path d="M280.429 191.104L8.75092 186.168L8.89961 32.5372L280.339 23.0634L280.429 191.104ZM14.5835 180.407L272.424 183.327L272.195 32.5401L14.7167 42.7449L14.5835 180.407Z" fill="black" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* BINGKAI SVG AKTIF */}
                                        {isActive && (
                                            <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
                                                <svg width="100%" height="100%" viewBox="0 0 822 584" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                                    <path d="M796.5 563.999L2.5004 583.499L23.0002 80.9993L820.5 22.4993L796.5 563.999ZM54.9998 528.5L770.22 503L758 39.0001L36.9998 133.5L54.9998 528.5Z" fill="#189FD9" style={{ mixBlendMode: 'plus-lighter' }} />
                                                    <path d="M797 542L28.4998 574L-4.46965e-05 103L797 0.999945L797 542ZM60.7224 519.85L757.675 497.243L748.307 48.1365L44.8004 147.913L60.7224 519.85Z" fill="#BF1E2E" />
                                                    <path d="M794.877 521.937L34.295 547.267L15.958 118.917L773.535 23.3975L794.877 521.937ZM60.7226 519.849L757.675 497.243L748.307 48.1358L44.8006 147.912L60.7226 519.849Z" fill="#F0F2F5" />
                                                    <path d="M780.22 517.307L45.6455 536.104L28.2983 130.875L762.86 35.0268L780.22 517.307ZM60.7219 519.849L757.674 497.243L748.306 48.1362L44.7999 147.913L60.7219 519.849Z" fill="black" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="w-[420px] flex flex-col gap-6 relative z-20">

                        {/* ─── KOTAK DETAIL (JUDUL & DESKRIPSI) ─── */}
                        <div className="relative w-full min-h-[140px] flex items-center p-6 text-white group">
                            {/* MASUKKAN SVG BACKGROUND KOTAK TEKS FIGMA DI SINI */}
                            <div className="absolute -left-[80%] -bottom-[140%] pointer-events-none z-0 transform scale-[0.7] origin-bottom-left">
                                <svg width="1087" height="454" viewBox="0 0 1087 454" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M33 320.5L0 241.5L641.5 0L710.5 115L814.5 83L972.5 365L87 453.5L60 309L33 320.5Z" fill="#0A0C0F" />
                                    <path d="M624.5 27.5L33 246C35.1667 262.333 39.5 295.8 39.5 299C39.5 302.2 480.833 192 701.5 136.5L624.5 27.5Z" fill="#F0F2F5" />
                                    <path d="M1087 402L732 426L709.508 321.086L1020.5 261L1087 402ZM728 333L747 408L1059 384.5L1011.5 282L728 333Z" fill="#0A0C0F" />
                                    <path d="M747 408L728 333L1011.5 282L1059 384.5L747 408Z" fill="#F0F2F5" />
                                </svg>
                            </div>

                            {/* Konten teks yang duduk di atas SVG background */}
                            <div className="absolute -left-[70%] -bottom-[22%] z-10 w-full transform -rotate-[17deg] pl-4">
                                <h2 className="text-2xl font-black italic tracking-wider text-black uppercase mb-2">
                                    {DUMMY_DATA[currentIndex].title}
                                </h2>
                            </div>
                            <div className="absolute -left-[65%] -bottom-[70%] z-10 w-full transform -rotate-[13deg] pl-4">
                                <p className="text-sm font-mono tracking-tight text-white leading-relaxed max-w-[90%]">
                                    {DUMMY_DATA[currentIndex].desc}
                                </p>
                            </div>

                            {/* BUTTON VIEW PHOTO (Ukuran terintegrasi satu tempat) */}
                            <button
                                onClick={() => setIsViewOpen(true)}
                                className="absolute bottom-[-168px] left-[230px] w-[160px] h-[85px] -rotate-[3deg] flex items-center justify-center active:scale-95 transition-transform group overflow-visible"
                            >
                                {/* Container wrapper background */}
                                <div className="absolute inset-0 w-full h-full pointer-events-none group-hover:scale-105 transition-transform duration-200">

                                    {/* 2. UKURAN SVG SEKARANG OTOMATIS MENGIKUTI PARENT (w-full h-full) */}
<rect x="4.65503" y="15.9277" width="51.2047" height="51.2047" rx="25.6023" fill="black"/>
                                    <svg className="w-full h-full" width="224" height="85" viewBox="0 0 224 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_129_676)">
                                    <rect x="4.65503" y="15.9277" width="51.2047" height="51.2047" rx="25.6023" fill="black"/>
                                    <path d="M17.4561 28.7285L43.0584 54.3309" stroke="#189FD9" stroke-width="4.26706" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M17.4563 54.332L43.0586 28.7297" stroke="#189FD9" stroke-width="4.26706" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    <rect x="2.32754" y="13.6002" width="55.8596" height="55.8596" rx="27.9298" stroke="white" stroke-width="4.65497"/>
                                    <path d="M107.115 20.722L94.3829 68.8536L83.5173 69.6093L64.3109 23.6989L74.3864 22.9981L85.1571 50.3718C85.3663 50.8425 85.6703 51.7257 86.0692 53.0214C86.509 54.2701 86.9548 55.6066 87.4068 57.0309C87.8557 58.4114 88.1796 59.5799 88.3785 60.5366C88.443 59.5616 88.5801 58.361 88.7897 56.9348C89.0402 55.4616 89.2967 54.0762 89.5594 52.7786C89.819 51.4372 89.9979 50.5204 90.096 50.0283L97.0397 21.4227L107.115 20.722ZM122.859 30.7438L125.359 66.6993L115.547 67.3817L113.047 31.4262L122.859 30.7438ZM117.006 16.9902C118.454 16.8895 119.73 17.1537 120.832 17.7828C121.932 18.3681 122.546 19.5826 122.674 21.4265C122.799 23.2265 122.359 24.5143 121.355 25.29C120.35 26.0657 119.123 26.504 117.674 26.6047C116.182 26.7085 114.884 26.4459 113.782 25.8167C112.723 25.1845 112.131 23.9684 112.006 22.1684C111.878 20.3246 112.295 19.0383 113.259 18.3095C114.264 17.5338 115.513 17.0941 117.006 16.9902ZM147.882 28.3418C151.219 28.1097 154.117 28.5478 156.576 29.6561C159.079 30.7613 161.073 32.4755 162.558 34.7985C164.043 37.1214 164.908 40.039 165.152 43.5512L165.482 48.2925L142.302 49.9046C142.582 52.6643 143.545 54.781 145.191 56.2546C146.882 57.7251 149.11 58.3642 151.876 58.1719C154.203 58.0101 156.295 57.644 158.152 57.0737C160.006 56.4595 161.909 55.5992 163.862 54.4929L164.388 62.066C162.693 63.0662 160.872 63.8325 158.924 64.365C157.022 64.9384 154.689 65.3212 151.923 65.5136C148.323 65.7639 145.095 65.3268 142.237 64.2021C139.377 63.0335 137.062 61.1432 135.292 58.5312C133.522 55.9192 132.494 52.5498 132.207 48.4231C131.914 44.2085 132.373 40.6695 133.586 37.8059C134.839 34.8955 136.69 32.6493 139.139 31.0673C141.587 29.4854 144.502 28.5769 147.882 28.3418ZM148.434 35.3176C146.546 35.4489 145.008 36.1734 143.82 37.4912C142.677 38.8059 142.085 40.766 142.046 43.3715L155.809 42.4143C155.708 40.9656 155.355 39.6888 154.748 38.584C154.186 37.4761 153.377 36.628 152.322 36.0397C151.266 35.4514 149.97 35.2107 148.434 35.3176ZM199.16 48.928C198.932 48.1939 198.593 47.1147 198.141 45.6904C197.73 44.2191 197.268 42.663 196.757 41.0222C196.243 39.3376 195.762 37.805 195.313 36.4246C194.861 35.0002 194.546 33.9634 194.368 33.314L194.105 33.3323C194.019 34 193.851 35.0705 193.6 36.5436C193.391 37.9699 193.148 39.5528 192.872 41.2925C192.593 42.9882 192.33 44.5946 192.082 46.1117C191.835 47.6288 191.651 48.7885 191.53 49.591L189.498 62.2386L178.962 62.9714L166.254 27.7258L176 27.048L181.257 42.6958C181.641 43.7719 181.996 45.0707 182.322 46.592C182.693 48.1102 183.038 49.5861 183.358 51.0196C183.675 52.4091 183.907 53.5179 184.053 54.346L184.316 54.3277C184.317 53.71 184.349 52.8917 184.41 51.8728C184.468 50.81 184.547 49.7237 184.647 48.614C184.79 47.5011 184.897 46.5011 184.967 45.614C185.079 44.6798 185.168 44.056 185.234 43.7426L188.446 26.1824L199.246 25.4313L204.661 42.3916C204.879 42.994 205.145 43.968 205.459 45.3137C205.818 46.6563 206.133 48.024 206.407 49.4166C206.724 50.8062 206.911 51.9181 206.969 52.7522L207.233 52.7339C207.269 51.9814 207.348 50.8952 207.469 49.475C207.588 48.011 207.724 46.4796 207.878 44.8808C208.075 43.279 208.289 41.9186 208.52 40.7997L211.692 24.5657L221.307 23.897L213.469 60.5716L202.8 61.3135L199.16 48.928Z" fill="black"/>
                                    <defs>
                                    <clipPath id="clip0_129_676">
                                    <rect x="4.65503" y="15.9277" width="51.2047" height="51.2047" rx="25.6023" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    
                                </div>
                            </button>





                        </div>

                        {/* ─── AREA NAVIGATION BUTTONS (PREV & NEXT) ─── */}
                        <div className="flex gap-6 items-center pl-4 relative">

                            {/* BUTTON PREV CUSTOM */}
                            <button
                                onClick={handlePrev}
                                className="absolute bottom-[200px] left-[-450px] w-[180px] h-[150px] flex items-center justify-center active:scale-95 transition-transform group overflow-visible"
                            >
                                {/* MASUKKAN SVG BUTTON PREV (Kertas miring putih + panah petir) */}
                                <div className="absolute inset-0 w-full h-full pointer-events-none group-hover:scale-105 transition-transform duration-200">
                                    <svg width="283" height="152" viewBox="0 0 283 152" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                        <path d="M239.622 105.02L225.467 107.303L212.682 94.9742L198.984 104.563L200.354 113.695C180.263 126.48 139.716 151.959 138.255 151.594C136.794 151.228 129.731 148.398 126.383 147.028L120.904 136.069L151.04 107.303L126.383 78.0796L188.938 27.8526L169.761 17.8072L176.153 5.02208L274.324 -0.000625268L283 25.1129L243.732 88.5816L239.622 105.02Z" fill="#0A0C0F"/>
                                        <path d="M262.909 14.6102L235.056 88.1244L227.294 88.1244L227.294 53.4221L176.153 89.9508L190.308 98.6264L190.308 104.106L135.515 142.461L133.689 133.329L166.565 104.106L144.647 79.4488L209.943 26.0255L183.916 16.8933L183.916 12.7838L259.713 10.5008L262.909 14.6102Z" fill="#F0F2F5"/>
                                        <path d="M6.33079 100.379L1.77028e-08 42.9149L5.11333 36.0971L38.7152 37.3145L47.9679 31.2272L77.6739 36.0971L120.772 27.8184L131.486 31.2272L147.069 39.7495L151.695 30.4968L177.992 29.5228L157.052 95.7526L139.034 95.7526L132.216 94.2916L86.6831 100.379L81.8132 97.7005L33.3584 94.2916L31.4104 97.7005L6.33079 100.379Z" fill="#0A0C0F"/>
                                        <path d="M89.1039 92.5666L85.1283 39.9701L119.997 33.7737L125.495 89.2847L89.1039 92.5666Z" fill="#F0F2F5"/>
                                        <path d="M121.238 85.2933L95.0748 88.9373L88.7444 43.4863L114.907 39.8424L116.007 47.7358L99.456 50.041L100.848 60.0351L116.253 57.8895L117.352 65.783L101.947 67.9285L103.579 79.6414L120.129 77.3362L121.238 85.2933Z" fill="#0A0C0F"/>
                                        <path d="M168.452 37.5589L152.545 88.4961L140.874 88.792L122.477 38.7246L133.299 38.4502L143.539 68.2702C143.74 68.7842 144.024 69.7442 144.39 71.1505C144.802 72.5083 145.216 73.9605 145.633 75.507C146.049 77.0064 146.34 78.273 146.508 79.3067C146.623 78.2658 146.827 76.9867 147.118 75.4694C147.456 73.9037 147.796 72.4324 148.139 71.0554C148.48 69.6312 148.715 68.658 148.843 68.1357L157.63 37.8333L168.452 37.5589Z" fill="#F0F2F5"/>
                                        <path d="M62.6325 39.3742C67.2004 39.6363 70.9352 40.4176 73.8371 41.718C76.7417 42.9713 78.8591 44.77 80.1893 47.1142C81.5221 49.4112 82.0912 52.255 81.8967 55.6456C81.7643 57.953 81.2008 59.9523 80.2061 61.6433C79.2611 63.29 78.0237 64.6836 76.4936 65.8242C75.0133 66.9205 73.4274 67.798 71.736 68.4569L85.3093 91.276L73.4423 90.5952L62.5446 70.5517L56.823 70.2234L55.7125 89.5779L45.0463 88.9659L47.9401 38.5313L62.6325 39.3742ZM61.353 48.0886L58.1037 47.9022L57.3215 61.5351L60.7827 61.7337C63.1372 61.8688 65.0593 61.7192 66.5488 61.285C68.0384 60.8507 69.1425 60.1345 69.8612 59.1363C70.5827 58.091 70.9866 56.815 71.0731 55.308C71.1649 53.7069 70.8611 52.4139 70.1617 51.4288C69.5121 50.3994 68.446 49.6295 66.9634 49.1192C65.5306 48.5645 63.6604 48.221 61.353 48.0886Z" fill="#F0F2F5"/>
                                        <path d="M24.1917 42.2469C30.6812 41.7405 35.5174 42.7825 38.7002 45.3729C41.9263 47.9125 43.7302 51.6277 44.1119 56.5184C44.2843 58.7286 44.1203 60.8704 43.6197 62.9439C43.1155 64.9703 42.1498 66.8435 40.7228 68.5635C39.339 70.2328 37.4358 71.6114 35.0132 72.6994C32.5906 73.7874 29.5453 74.4745 25.8772 74.7607L21.2922 75.1185L22.6904 93.0353L12.0391 93.8665L8.10889 43.502L24.1917 42.2469ZM24.3099 51.0378L19.4428 51.4176L20.6097 66.3717L24.1366 66.0965C26.1587 65.9387 27.8785 65.5443 29.2959 64.9133C30.7134 64.2822 31.7778 63.3712 32.4891 62.1802C33.2005 60.9892 33.4864 59.5002 33.347 57.7132C33.1525 55.2209 32.3275 53.4401 30.872 52.3709C29.4129 51.2546 27.2255 50.8102 24.3099 51.0378Z" fill="#F0F2F5"/>
                                    </svg>
                                </div>
                            </button>

                            {/* BUTTON NEXT CUSTOM */}
                            <button
                                onClick={handleNext}
                                className="absolute bottom-[-130px] left-[-650px] w-[180px] h-[150px] flex items-center justify-center active:scale-95 transition-transform group overflow-visible"
                            >
                                {/* CONTAINER SVG BACKGROUND */}
                                <div className="absolute inset-0 w-full h-full pointer-events-none group-hover:scale-105 transition-transform duration-200">
                                    <svg 
                                        width="100%" 
                                        height="100%" 
                                        viewBox="0 0 293 150" 
                                        fill="none" 
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-full h-full"
                                    >
                                        <path d="M42.6896 45.839L56.6199 43.5921L69.2021 55.725L82.683 46.2883L81.3349 37.301C101.107 24.7189 141.01 -0.355667 142.448 0.00382453C143.886 0.363316 150.837 3.14937 154.132 4.49747L159.524 15.2822L129.866 43.5921L154.132 72.3515L92.569 121.782L111.442 131.668L105.151 144.25L8.53792 149.193L1.45968e-07 124.478L38.6453 62.0161L42.6896 45.839Z" fill="#0A0C0F"/>
                                        <path d="M19.7728 134.814L47.184 62.4665L54.8232 62.4665L54.8232 96.6182L105.152 60.6691L91.2217 52.1312L91.2217 46.7388L145.145 8.99219L146.943 17.9795L114.589 46.7388L136.158 71.0044L71.899 123.58L97.5128 132.567L97.5128 136.612L22.9183 138.858L19.7728 134.814Z" fill="#F0F2F5"/>
                                        <path d="M123.068 126.006L109.348 68.7259L149.421 56.7396L158.883 58.0721L159.277 51.3913L200.876 45.5975L205.681 51.5541L218.886 52.8069L226.546 47.5437L240.412 45.6124L278.988 37.1476L285.483 55.237L275.475 59.502L285.311 95.2366L263.171 101.191L254.779 94.8511L252.338 102.7L235.656 105.024L225.645 101.338L218.756 107.378L209.657 108.645L209.081 114.026L164.34 116.282L163.766 112.165L153.326 116.491L144.917 114.791L145.491 118.907L123.068 126.006Z" fill="#0A0C0F"/>
                                        <path d="M272.672 91.6129L263.319 93.7672L254.93 57.3455L242.913 60.1132L241.116 52.3086L274.502 44.6189L276.3 52.4235L264.283 55.1912L272.672 91.6129Z" fill="#F0F2F5"/>
                                        <path d="M247.339 96.9925L236.945 98.4401L224.712 83.6072L216.998 101.218L207.265 102.574L218.425 78.4807L202.191 59.5503L112.225 58.1528L223.628 72.305L230.55 55.6005L240.343 54.2365L229.847 77.3798L247.339 96.9925Z" fill="#F0F2F5"/>
                                        <path d="M168.846 110.575L164.914 58.5575L199.398 52.4294L204.836 107.329L168.846 110.575Z" fill="#F0F2F5"/>
                                        <path d="M200.625 103.382L174.75 106.985L168.489 62.0352L194.364 58.4313L195.451 66.2378L179.083 68.5176L180.46 78.4017L195.695 76.2797L196.782 84.0862L181.547 86.2082L183.16 97.792L199.529 95.5122L200.625 103.382Z" fill="#0A0C0F"/>
                                        <path d="M167.284 106.814L155.434 109.732L128.032 81.1305L127.785 81.1913C128.079 82.2098 128.379 83.2489 128.684 84.3086C128.978 85.3271 129.278 86.3662 129.582 87.4258C129.918 88.4342 130.238 89.4683 130.543 90.5279C130.837 91.5465 131.137 92.5856 131.441 93.6452L136.548 114.383L128.216 116.435L117.364 72.3672L129.152 69.4641L156.417 97.7723L156.602 97.7267C156.307 96.7082 156.018 95.7102 155.734 94.7328C155.439 93.7143 155.15 92.7164 154.865 91.739C154.612 90.7103 154.343 89.7073 154.059 88.7299C153.764 87.7114 153.47 86.6929 153.176 85.6744L148.038 64.8132L156.432 62.7461L167.284 106.814Z" fill="#F0F2F5"/>
                                    </svg>
                                </div>
                            </button>

                        </div>

                    </div>

                </div>

<div className="absolute bottom-8 right-12 z-20">
    <Link 
        href="/archive" 
        className="w-[180px] h-[80px] flex items-center justify-center active:scale-95 transition-transform group overflow-visible"
        aria-label="Back to Archive"
    >
        <div className="absolute inset-0 w-full h-full pointer-events-none group-hover:scale-105 transition-transform duration-200">
            <BackButtonSvg className="w-full h-full object-contain" />
        </div>
    </Link>
</div>

                {/* ─── FITUR VIEW (LIGHTBOX OVERLAY MODAL) ─── */}
                {isViewOpen && (
                    <div 
                        className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-all animate-fade-in"
                        onClick={() => setIsViewOpen(false)} // Navigasi klik sembarang tempat di luar tetap jalan
                    >
                        {/* WAPPER KONTROL TOMBOL BACK (Atur posisi absolut dan ukuran master di sini) */}
                        <div className="absolute top-[600px] left-[1100px] w-[245px] h-[138px] active:scale-95 transition-transform group overflow-visible z-10">
                            <Button
                                Icon={SeeDetailsButton} // Menggunakan aset tombol BACK/SeeDetails kamu
                                onClick={() => setIsViewOpen(false)} // Menutup modal saat diklik
                                iconClassName="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-200"
                                ariaLabel="Back to Gallery"
                            />
                        </div>
                
                        {/* Kontainer Foto Utama */}
                        <div 
                            className="relative bottom-8 w-full max-w-4xl h-auto max-h-[90vh] border-[6px] border-white bg-zinc-950 p-2 flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <img 
                                src={DUMMY_DATA[currentIndex].image} 
                                alt={DUMMY_DATA[currentIndex].title}
                                className="w-full h-auto max-h-[85vh] object-contain select-none"
                            />
                        </div>

                    </div>
                )}

            </div>
        </>
    );
}