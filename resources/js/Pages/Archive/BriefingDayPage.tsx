import { useRef, useState } from 'react';
// @ts-ignore
import { useGSAP } from '@gsap/react';
import { Head, Link } from '@inertiajs/react';
import gsap from 'gsap';
import ArchiveBackground from './ArchiveBackground';

// assets
import Button from '@/Components/global/Button';
import FrameSelected from '@/assets/archive/FrameSelected.svg?react';
import FrameUnselected from '@/assets/archive/FrameUnselected.svg?react';
import NextButton from '@/assets/archive/NextButton.svg?react';
import PhotoInfoBanner from '@/assets/archive/PhotoInfoBanner.svg?react';
import PrevButton from '@/assets/archive/PrevButton.svg?react';
import Shape1 from '@/assets/archive/Shape1.svg?react';
import ViewBackButton from '@/assets/archive/ViewBackButton.svg';
import ViewButton from '@/assets/archive/ViewButton.svg?react';
import ActiveBitBlue from '@/assets/archive/blueBitActive.svg?react';
import ActiveBitRed from '@/assets/archive/redBitActive.svg?react';
import BackButtonSvg from '@/assets/icons/BackButtonSVG.svg';

interface CarouselItem {
    id: number;
    title: string;
    desc: string;
    image: string;
}

const DUMMY_DATA: CarouselItem[] = [
    {
        id: 1,
        title: 'Misi Pertama',
        desc: 'Lorem ipsum dolor sit amet, saya mau makan dimsum HAHAHAHA',
        image: 'https://picsum.photos/id/1025/600/400',
    },
    {
        id: 2,
        title: 'Target Terkunci',
        desc: 'Phantom thieves akan mengambil kembali hati yang terdistorsi.',
        image: 'https://picsum.photos/id/1062/600/400',
    },
    {
        id: 3,
        title: 'Istana Rahasia',
        desc: 'Jangan biarkan musuh mendeteksi kehadiranmu di dalam map.',
        image: 'https://picsum.photos/id/1084/600/400',
    },
    {
        id: 4,
        title: 'Rencana Matang',
        desc: 'Kombinasi taktik dan estetika tingkat tinggi adalah kunci utama.',
        image: 'https://picsum.photos/id/1024/600/400',
    },
    {
        id: 5,
        title: 'Eksekusi Akhir',
        desc: 'Saatnya menutup misi dengan gaya yang tak terlupakan.',
        image: 'https://picsum.photos/id/1080/600/400',
    },
    {
        id: 6,
        title: 'Jejak Tersembunyi',
        desc: 'Setiap langkah meninggalkan jejak yang harus kita waspadai.',
        image: 'https://picsum.photos/id/1041/600/400',
    },
    {
        id: 7,
        title: 'Sinyal Bahaya',
        desc: 'Radar mendeteksi pergerakan mencurigakan di sekitar lokasi.',
        image: 'https://picsum.photos/id/1043/600/400',
    },
    {
        id: 8,
        title: 'Pintu Terakhir',
        desc: 'Hanya satu kesempatan untuk membuka gerbang menuju inti istana.',
        image: 'https://picsum.photos/id/1050/600/400',
    },
    {
        id: 9,
        title: 'Bayangan Musuh',
        desc: 'Mereka mengawasi dari kegelapan, menunggu saat yang tepat.',
        image: 'https://picsum.photos/id/1059/600/400',
    },
    {
        id: 10,
        title: 'Penutup Kisah',
        desc: 'Babak ini berakhir, namun kisah baru akan segera dimulai.',
        image: 'https://picsum.photos/id/1069/600/400',
    },
];

const SLOTS: Record<
    number,
    {
        x: number;
        y: number;
        scale: number;
        rotate: number;
        opacity: number;
        grayscale: number;
        zIndex: number;
    }
> = {
    [-2]: {
        x: 100,
        y: -300,
        scale: 0.45,
        rotate: -6,
        opacity: 1,
        grayscale: 1,
        zIndex: 10,
    },
    [-1]: {
        x: 30,
        y: -200,
        scale: 0.55,
        rotate: -4,
        opacity: 1,
        grayscale: 1,
        zIndex: 12,
    },
    [0]: {
        x: 0,
        y: 0,
        scale: 1,
        rotate: -3,
        opacity: 1,
        grayscale: 0,
        zIndex: 15,
    },
    [1]: {
        x: -160,
        y: 200,
        scale: 0.5,
        rotate: 6,
        opacity: 1,
        grayscale: 1,
        zIndex: 20,
    },
    [2]: {
        x: -260,
        y: 300,
        scale: 0.5,
        rotate: 6,
        opacity: 1,
        grayscale: 1,
        zIndex: 25,
    },
};
const MIN_OFFSET = -2;
const MAX_OFFSET = 2;

function getOffset(index: number, currentIndex: number, total: number) {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
}

export default function BriefingDayPage() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
    const [shouldRenderView, setShouldRenderView] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const viewModalRef = useRef<HTMLDivElement>(null);
    const viewContentRef = useRef<HTMLDivElement>(null);

    const leftElementsRef = useRef<HTMLDivElement[]>([]);
    const rightElementsRef = useRef<HTMLDivElement[]>([]);

    const activeRedBitRef = useRef<HTMLDivElement | null>(null);
    const activeBlueBitRef = useRef<HTMLDivElement | null>(null);

    const total = DUMMY_DATA.length;

    const { contextSafe } = useGSAP({ scope: containerRef });

    // GSAP PAGE ENTRANCE
    useGSAP(
        () => {
            const tl = gsap.timeline();

            tl.fromTo(
                leftElementsRef.current,
                { x: -100, y: 100, opacity: 0 },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                    ease: 'back.out(1.5)',
                    stagger: 0.03,
                },
                0,
            );

            tl.fromTo(
                rightElementsRef.current,
                { x: 140, y: -140, opacity: 0 },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                    ease: 'back.out(1.5)',
                    stagger: 0.03,
                },
                0,
            );
        },
        { scope: containerRef },
    );

    // GSAP View Button
    useGSAP(
        () => {
            if (isViewOpen && shouldRenderView) {
                gsap.fromTo(
                    viewModalRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.25, ease: 'power2.out' },
                );

                gsap.fromTo(
                    viewContentRef.current,
                    {
                        scale: 0.25,
                        rotate: -12,
                        x: -520,
                        y: 50,
                        opacity: 0.5,
                    },
                    {
                        scale: 1,
                        rotate: 0,
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'back.out(1.1)',
                    },
                );
            }
        },
        { dependencies: [isViewOpen, shouldRenderView] },
    );

    const handleCloseView = contextSafe(() => {
        if (isAnimating) return;

        gsap.to(viewContentRef.current, {
            scale: 0.3,
            rotate: -4,
            x: -420,
            y: 50,
            opacity: 0,
            duration: 0.3,
            ease: 'power3.in',
        });

        gsap.to(viewModalRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => {
                setIsViewOpen(false);
                setShouldRenderView(false);
            },
        });
    });

    const animateToIndex = contextSafe((nextIndex: number) => {
        if (isAnimating) return;
        setIsAnimating(true);

        DUMMY_DATA.forEach((item) => {
            const prevOffset = getOffset(item.id - 1, currentIndex, total);
            const nextOffset = getOffset(item.id - 1, nextIndex, total);

            const card = containerRef.current?.querySelector(
                `.card-item[data-id="${item.id}"]`,
            ) as HTMLElement | null;
            if (!card) return;

            const img = card.querySelector('img');

            const wasInRange =
                prevOffset >= MIN_OFFSET && prevOffset <= MAX_OFFSET;
            const willBeInRange =
                nextOffset >= MIN_OFFSET && nextOffset <= MAX_OFFSET;

            // CASE 1: CARD UNSELECTED
            if (wasInRange && !willBeInRange) {
                gsap.to(card, {
                    x: 200,
                    y: -350,
                    scale: 0.3,
                    rotate: -10,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                });
                return;
            }

            // CASE 2: CARD SELECTED
            if (!wasInRange && willBeInRange) {
                const target = SLOTS[nextOffset];
                gsap.set(card, {
                    x: -400,
                    y: 400,
                    scale: 0.3,
                    rotate: 15,
                    zIndex: target.zIndex,
                    opacity: 0,
                });
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

            if (!wasInRange && !willBeInRange) return;

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
        if (!isAnimating) animateToIndex((currentIndex + 1) % total);
    };
    const handlePrev = () => {
        if (!isAnimating) animateToIndex((currentIndex - 1 + total) % total);
    };

    // animasi kotak birtu & merah
    useGSAP(
        () => {
            const redBit = activeRedBitRef.current;
            const blueBit = activeBlueBitRef.current;

            if (!redBit || !blueBit) return;

            gsap.killTweensOf([redBit, blueBit]);

            const timeline = gsap.timeline({
                delay: 0.3,
            });

            timeline.fromTo(
                redBit,
                {
                    rotate: 15,
                    autoAlpha: 0,
                    transformOrigin: 'center center',
                },
                {
                    rotate: 0,
                    autoAlpha: 1,
                    duration: 0.35,
                    ease: 'power3.out',
                },
                0,
            );

            timeline.fromTo(
                blueBit,
                {
                    rotate: -15,
                    autoAlpha: 0,
                    transformOrigin: 'center center',
                },
                {
                    rotate: 0,
                    autoAlpha: 1,
                    duration: 0.35,
                    ease: 'power3.out',
                },
                0,
            );
        },
        {
            scope: containerRef,
            dependencies: [currentIndex],
        },
    );

    return (
        <>
            <Head title="Archive/BriefingDay" />

            {/* FRAME MASK */}
            <svg width="0" height="0" className="pointer-events-none absolute">
                <defs>
                    {/* MASKING KONDISI NON-AKTIF */}
                    <clipPath
                        id="cropNonAktif"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M0.049,0.214 L0.92,0.163 L0.92,0.9 L0.049,0.895 Z" />
                    </clipPath>

                    {/* MASKING KONDISI AKTIF */}
                    <clipPath id="cropAktif" clipPathUnits="objectBoundingBox">
                        <path d="M0.027,0.28 L0.937,0.092 L0.923,0.861 L0.081,0.904 Z" />
                    </clipPath>
                </defs>
            </svg>

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
            `}</style>

            <div
                ref={containerRef}
                className="relative flex min-h-screen select-none items-center justify-center overflow-hidden bg-transparent text-white"
                style={{ fontFamily: "'Arsenal', sans-serif" }}
            >
                <ArchiveBackground />

                {/* BACKGROUND SHAPE RED */}
                <div
                    ref={(el) => {
                        if (el) leftElementsRef.current[0] = el;
                    }}
                    className="z-5 pointer-events-none absolute -bottom-[0%] -left-[2%] flex h-[120vh] w-[100vw] items-end text-[#BF1E2E] opacity-0"
                >
                    <Shape1 className="h-full w-full scale-110 transform object-fill" />
                </div>

                <div className="relative z-10 flex h-[550px] w-full max-w-5xl items-center justify-between px-12">
                    {/* CAROUSEL KARTU STACK */}
                    <div
                        ref={(el) => {
                            if (el) leftElementsRef.current[1] = el;
                        }}
                        className="relative h-[420px] w-[580px] opacity-0"
                        style={{
                            left: '-180px',
                            top: '-20px',
                        }}
                    >
                        {DUMMY_DATA.map((item) => {
                            const offset = getOffset(
                                item.id - 1,
                                currentIndex,
                                total,
                            );
                            const inRange =
                                offset >= MIN_OFFSET && offset <= MAX_OFFSET;
                            const target = inRange ? SLOTS[offset] : null;
                            const isActive = offset === 0;

                            return (
                                <div
                                    key={item.id}
                                    data-id={item.id}
                                    style={{
                                        transform: target
                                            ? `translate(${target.x}px, ${target.y}px) rotate(${target.rotate}deg) scale(${target.scale})`
                                            : `scale(0.3)`,
                                        opacity: target ? target.opacity : 0,
                                        zIndex: target ? target.zIndex : 0,
                                    }}
                                    className="card-item pointer-events-none absolute left-0 top-0 flex h-full w-full origin-center items-center justify-center"
                                >
                                    <div className="absolute flex h-[100%] w-[100%] items-center justify-center">
                                        <div
                                            className="z-10 h-full w-full bg-zinc-800 transition-all duration-300 ease-in-out"
                                            style={{
                                                clipPath: isActive
                                                    ? 'url(#cropAktif)'
                                                    : 'url(#cropNonAktif)',
                                            }}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{
                                                    filter: isActive
                                                        ? 'grayscale(0) contrast(1.1) brightness(1)'
                                                        : 'grayscale(1) contrast(1.1) brightness(0.8)',
                                                }}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        {!isActive && (
                                            <div className="pointer-events-none absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                                                <FrameUnselected
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </div>
                                        )}

                                        {isActive && (
                                            <>
                                                {/* Active decorative bits behind the selected frame */}
                                                <div className="pointer-events-none absolute inset-0 z-0">
                                                    {/* Red bit enters from the right */}
                                                    <div
                                                        ref={activeBlueBitRef}
                                                        className="absolute right-2 top-[2%] z-0 h-full w-[99%]"
                                                    >
                                                        <ActiveBitBlue className="h-full w-full object-contain opacity-90" />
                                                    </div>
                                                    {/* Blue bit enters from the left */}
                                                    <div
                                                        ref={activeRedBitRef}
                                                        className="absolute z-0 h-full w-[96%]"
                                                    >
                                                        <ActiveBitRed className="h-full w-full object-contain" />
                                                    </div>
                                                </div>

                                                {/* Selected frame stays above both bits */}
                                                <div className="pointer-events-none absolute inset-0 z-20 flex h-full w-full items-center justify-center">
                                                    <FrameSelected
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* BANNER INFO & NAVIGASI */}
                    <div
                        ref={(el) => {
                            if (el) rightElementsRef.current[0] = el;
                        }}
                        className="relative z-20 flex w-[420px] flex-col gap-6 opacity-0"
                    >
                        <div className="group relative flex min-h-[140px] w-full items-center p-6 text-white">
                            <div className="pointer-events-none absolute -bottom-[155%] -left-[80%] z-0 origin-bottom-left scale-[3] transform">
                                <PhotoInfoBanner
                                    width={'100%'}
                                    height={'100%'}
                                />
                            </div>

                            <div className="absolute -bottom-[22%] -left-[70%] z-30 w-full -rotate-[17deg] transform select-text pl-4">
                                <h2
                                    className="mb-2 text-2xl font-black uppercase italic tracking-wider text-black"
                                    style={{
                                        fontFamily: "'NotoSans', sans-serif",
                                    }}
                                >
                                    {DUMMY_DATA[currentIndex].title}
                                </h2>
                            </div>

                            <div className="absolute -bottom-[70%] -left-[65%] z-30 w-full -rotate-[13deg] transform select-text pl-4">
                                <p
                                    className="max-w-[90%] text-sm leading-relaxed tracking-tight text-white"
                                    style={{
                                        fontFamily: "'Arsenal', sans-serif",
                                    }}
                                >
                                    {DUMMY_DATA[currentIndex].desc}
                                </p>
                            </div>

                            {/* BUTTON VIEW PHOTO */}
                            <button
                                type="button"
                                onClick={() => {
                                    setShouldRenderView(true);
                                    setIsViewOpen(true);
                                }}
                                className="group absolute bottom-[-175px] left-[330px] flex h-[85px] w-[160px] -rotate-[3deg] items-center justify-center overflow-visible transition-transform active:scale-95"
                            >
                                <div className="pointer-events-none absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-105">
                                    <ViewButton
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </div>
                            </button>
                        </div>

                        {/* NAVIGATION BUTTONS */}
                        <div className="relative flex items-center gap-6 pl-4">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="group absolute bottom-[200px] left-[-450px] flex h-[150px] w-[180px] items-center justify-center overflow-visible transition-transform active:scale-95"
                            >
                                <div className="pointer-events-none absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-105">
                                    <PrevButton
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="group absolute bottom-[-130px] left-[-650px] flex h-[150px] w-[180px] items-center justify-center overflow-visible transition-transform active:scale-95"
                            >
                                <div className="pointer-events-none absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-105">
                                    <NextButton
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* BACK BUTTON */}
                <div
                    ref={(el) => {
                        if (el) rightElementsRef.current[1] = el;
                    }}
                    className="absolute bottom-8 right-12 z-20 opacity-0"
                >
                    <Link
                        href="/archive"
                        className="group flex h-[80px] w-[180px] items-center justify-center overflow-visible transition-transform active:scale-95"
                        aria-label="Back to Archive"
                    >
                        <div className="pointer-events-none absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-105">
                            <img
                                src={BackButtonSvg}
                                alt=""
                                draggable={false}
                                className="h-full w-full select-none object-contain"
                            />
                        </div>
                    </Link>
                </div>

                {/* VIEW CARD */}
                {shouldRenderView && (
                    <div
                        ref={viewModalRef}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all"
                        onClick={handleCloseView}
                    >
                        {/* BACK VIEW BUTTON */}
                        <div className="group absolute left-[1100px] top-[600px] z-10 h-[138px] w-[245px] overflow-visible transition-transform active:scale-95">
                            <Button
                                Icon={ViewBackButton}
                                onClick={handleCloseView}
                                iconClassName="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-200"
                                ariaLabel="Back to Gallery"
                            />
                        </div>

                        {/* PHOTO CONTAINER */}
                        <div
                            ref={viewContentRef}
                            className="relative bottom-8 flex h-auto max-h-[90vh] w-full max-w-4xl origin-center items-center justify-center border-[6px] border-white bg-zinc-950 p-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={DUMMY_DATA[currentIndex].image}
                                alt={DUMMY_DATA[currentIndex].title}
                                className="h-auto max-h-[85vh] w-full select-none object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
