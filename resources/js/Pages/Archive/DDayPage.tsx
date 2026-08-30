import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { useGSAP } from '@gsap/react';
import { Head, Link } from '@inertiajs/react';
import gsap from 'gsap';

// assets
import Button from '@/Components/global/Button';
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

const DATA: CarouselItem[] = [
    {
        id: 1,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC01447-152.webp',
    },
    {
        id: 2,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC01595-187.webp',
    },
    {
        id: 3,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC01602-189.webp',
    },
    {
        id: 4,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC01617-196.webp',
    },
    {
        id: 5,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC02372.webp',
    },
    {
        id: 6,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC02565.webp',
    },
    {
        id: 7,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC03344.webp',
    },
    {
        id: 8,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC03357.webp',
    },
    {
        id: 9,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC03365.webp',
    },
    {
        id: 10,
        title: 'D-Day',
        desc: 'Dokumentasi kegiatan D-Day PPIF 2026.',
        image: '/pngs/archive/dday/DSC00932-50.webp',
    },
];

interface SlotConfig {
    x: number;
    y: number;
    scale: number;
    rotate: number;
    opacity: number;
    grayscale: number;
    zIndex: number;
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function generateBaseSlots(
    totalItems: number,
    device: DeviceType,
): Record<number, SlotConfig> {
    const slots: Record<number, SlotConfig> = {};
    const maxOffset = Math.floor(totalItems / 2);
    const minOffset = -Math.floor((totalItems - 1) / 2);

    for (let offset = minOffset; offset <= maxOffset; offset++) {
        if (device === 'mobile') {
            // 1. MOBILE (< 640px)
            if (offset === 0) {
                slots[0] = {
                    x: 0,
                    y: 0,
                    scale: 0.75,
                    rotate: -3,
                    opacity: 1,
                    grayscale: 0,
                    zIndex: 20,
                };
            } else if (offset < 0) {
                const abs = Math.abs(offset);
                slots[offset] = {
                    x: 35 - (abs - 1) * 15,
                    y: -70 - (abs - 1) * 35,
                    scale: Math.max(0.45 - abs * 0.05, 0.2),
                    rotate: -4 - abs * 2,
                    opacity: abs > 2 ? 0 : 1,
                    grayscale: 1,
                    zIndex: 10 - abs,
                };
            } else {
                slots[offset] = {
                    x: -50 - (offset - 1) * 15,
                    y: 70 + (offset - 1) * 35,
                    scale: Math.max(0.4 - offset * 0.05, 0.2),
                    rotate: 6 + offset * 2,
                    opacity: offset > 2 ? 0 : 1,
                    grayscale: 1,
                    zIndex: 30 + offset,
                };
            }
        } else if (device === 'tablet') {
            // 2. TABLET (640px - 1023px)
            if (offset === 0) {
                slots[0] = {
                    x: 0,
                    y: 0,
                    scale: 0.88,
                    rotate: -3,
                    opacity: 1,
                    grayscale: 0,
                    zIndex: 20,
                };
            } else if (offset < 0) {
                const abs = Math.abs(offset);
                slots[offset] = {
                    x: 65 - (abs - 1) * 25,
                    y: -120 - (abs - 1) * 50,
                    scale: Math.max(0.52 - abs * 0.06, 0.2),
                    rotate: -4 - abs * 2,
                    opacity: abs > 2 ? 0 : 1,
                    grayscale: 1,
                    zIndex: 10 - abs,
                };
            } else {
                slots[offset] = {
                    x: -95 - (offset - 1) * 30,
                    y: 110 + (offset - 1) * 50,
                    scale: Math.max(0.48 - offset * 0.06, 0.2),
                    rotate: 6 + offset * 2,
                    opacity: offset > 2 ? 0 : 1,
                    grayscale: 1,
                    zIndex: 30 + offset,
                };
            }
        } else {
            // 3. DESKTOP (>= 1024px)
            if (offset === 0) {
                slots[0] = {
                    x: 0,
                    y: 0,
                    scale: 0.85,
                    rotate: -3,
                    opacity: 1,
                    grayscale: 0,
                    zIndex: 20,
                };
            } else if (offset < 0) {
                const abs = Math.abs(offset);
                slots[offset] = {
                    x: 100 - (abs - 1) * 40,
                    y: -180 - (abs - 1) * 70,
                    scale: Math.max(0.6 - abs * 0.08, 0.2),
                    rotate: -4 - abs * 2,
                    opacity: abs > 3 ? 0 : 1,
                    grayscale: 1,
                    zIndex: 10 - abs,
                };
            } else {
                slots[offset] = {
                    x: -140 - (offset - 1) * 50,
                    y: 290 + (offset - 1) * 70,
                    scale: Math.max(0.55 - offset * 0.08, 0.2),
                    rotate: 6 + offset * 2,
                    opacity: offset > 3 ? 0 : 1,
                    grayscale: 1,
                    zIndex: 30 + offset,
                };
            }
        }
    }

    return slots;
}

// Dynamic Responsive
export function useDynamicSlots(totalItems: number) {
    const [slots, setSlots] = useState<Record<number, SlotConfig>>({});

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            let device: DeviceType = 'desktop';
            let baseWidth = 1280;

            if (width < 640) {
                device = 'mobile';
                baseWidth = 375;
            } else if (width < 1024) {
                device = 'tablet';
                baseWidth = 768;
            }

            const currentSlots = generateBaseSlots(totalItems, device);

            const GLOBAL_ZOOM = 0.78; // Global Size Carrosel
            const scaleFactor = (width / baseWidth) * GLOBAL_ZOOM;

            const scaledSlots = Object.fromEntries(
                Object.entries(currentSlots).map(([key, slot]) => [
                    key,
                    {
                        ...slot,
                        x: slot.x * scaleFactor,
                        y: slot.y * scaleFactor,
                        scale: slot.scale * scaleFactor,
                    },
                ]),
            );

            setSlots(scaledSlots);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [totalItems]);

    return slots;
}

export function getOffset(index: number, currentIndex: number, total: number) {
    if (total === 0) return 0;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
}

export default function DDayPage() {
    const total = DATA.length;
    const SLOTS = useDynamicSlots(total);

    const minOffset = -Math.floor((total - 1) / 2);
    const maxOffset = Math.floor(total / 2);

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

    // GSAP View Button Modal
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

        DATA.forEach((item) => {
            const prevOffset = getOffset(item.id - 1, currentIndex, total);
            const nextOffset = getOffset(item.id - 1, nextIndex, total);

            const card = containerRef.current?.querySelector(
                `.card-item[data-id="${item.id}"]`,
            ) as HTMLElement | null;
            if (!card) return;

            const img = card.querySelector('img');

            const wasInRange =
                prevOffset >= minOffset && prevOffset <= maxOffset;
            const willBeInRange =
                nextOffset >= minOffset && nextOffset <= maxOffset;

            // CASE 1: UNSELECTED
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

            // CASE 2: SELECTED
            if (!wasInRange && willBeInRange) {
                const target = SLOTS[nextOffset];
                if (!target) return;

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
            if (!target) return;

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

    // Animasi Red & Blue Bits saat beralih kartu
    useGSAP(
        () => {
            const redBit = activeRedBitRef.current;
            const blueBit = activeBlueBitRef.current;

            if (!redBit || !blueBit) return;

            gsap.killTweensOf([redBit, blueBit]);

            const timeline = gsap.timeline({ delay: 0.3 });

            timeline.fromTo(
                redBit,
                { rotate: 15, autoAlpha: 0, transformOrigin: 'center center' },
                { rotate: 0, autoAlpha: 1, duration: 0.35, ease: 'power3.out' },
                0,
            );

            timeline.fromTo(
                blueBit,
                { rotate: -15, autoAlpha: 0, transformOrigin: 'center center' },
                { rotate: 0, autoAlpha: 1, duration: 0.35, ease: 'power3.out' },
                0,
            );
        },
        {
            scope: containerRef,
            dependencies: [currentIndex],
        },
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'c') {
                setIsViewOpen(false);
                setShouldRenderView(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <Head title="Archive/Dday" />

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
                {/* BACKGROUND SHAPE RED */}
                <div
                    ref={(el) => {
                        if (el) leftElementsRef.current[0] = el;
                    }}
                    className="z-5 pointer-events-none absolute -bottom-[0%] -left-[2%] flex h-[120vh] w-[100vw] items-end text-[#BF1E2E] opacity-0"
                >
                    <Shape1 className="h-full w-full scale-110 transform object-fill" />
                </div>

                {/* KONTEN UTAMA */}
                <div
                    className="max-w-8xl -2 -red-500 relative flex w-full items-center overflow-visible"
                    style={{
                        height: 'clamp(247.5px, 80.1vh, 550px)',
                    }}
                >
                    {/* 1. CONTAINER CAROUSEL & NAVIGASI */}
                    <div
                        ref={(el) => {
                            if (el) leftElementsRef.current[1] = el;
                        }}
                        className="-2 -blue-500 relative w-1/2 opacity-0"
                        style={{
                            height: 'clamp(547px, 60vh, 1000px)',
                            top: 'clamp(0px, 9vh, -100px)',
                        }}
                    >
                        {/* KARTU STACK CAROUSEL */}
                        {DATA.map((item) => {
                            const offset = getOffset(
                                item.id - 1,
                                currentIndex,
                                total,
                            );
                            const inRange =
                                offset >= minOffset && offset <= maxOffset;
                            const target = inRange ? SLOTS[offset] : null;
                            const isActive = offset === 0;

                            const currentViewBox = isActive
                                ? '0 0 821 569'
                                : '0 0 296 199';

                            const PATH_LUBANG_AKTIF =
                                'M60.2224 519.85L757.175 497.243L747.807 48.1365L44.3004 147.913L60.2224 519.85Z';
                            const PATH_LUBANG_NON_AKTIF =
                                'M14.5835 180.407L272.424 183.327L272.195 32.5401L14.7167 42.7449L14.5835 180.407Z';

                            const clipPathId = `clip-frame-${item.id}-${isActive ? 'active' : 'inactive'}`;

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
                                    <div className="relative flex h-full w-full items-center justify-center">
                                        {/* ACTIVE COLORED BITS */}
                                        {isActive && (
                                            <div className="pointer-events-none absolute inset-0 z-0">
                                                <div
                                                    ref={activeBlueBitRef}
                                                    className="absolute right-2 top-[2%] h-full w-[99%]"
                                                >
                                                    <ActiveBitBlue className="h-full w-full object-contain opacity-90" />
                                                </div>

                                                <div
                                                    ref={activeRedBitRef}
                                                    className="absolute h-full w-[96%]"
                                                >
                                                    <ActiveBitRed className="h-full w-full object-contain" />
                                                </div>
                                            </div>
                                        )}

                                        {/* SVG UTAMA FRAME & FOTO */}
                                        <svg
                                            viewBox={currentViewBox}
                                            className="relative z-10 h-full w-full overflow-visible"
                                            preserveAspectRatio="xMidYMid meet"
                                        >
                                            <defs>
                                                <clipPath id={clipPathId}>
                                                    <path
                                                        d={
                                                            isActive
                                                                ? PATH_LUBANG_AKTIF
                                                                : PATH_LUBANG_NON_AKTIF
                                                        }
                                                    />
                                                </clipPath>
                                            </defs>

                                            <image
                                                href={item.image}
                                                width="100%"
                                                height="100%"
                                                preserveAspectRatio="xMidYMid slice"
                                                clipPath={`url(#${clipPathId})`}
                                                style={{
                                                    filter: isActive
                                                        ? 'grayscale(0) contrast(1.1) brightness(1)'
                                                        : 'grayscale(1) contrast(1.1) brightness(0.8)',
                                                    transition:
                                                        'filter 0.3s ease-in-out',
                                                }}
                                            />

                                            {isActive ? (
                                                <>
                                                    <path
                                                        d="M794.377 521.938L33.7954 547.268L15.4585 118.918L773.036 23.3983L794.377 521.938ZM60.2231 519.85L757.175 497.243L747.808 48.1366L44.3011 147.913L60.2231 519.85Z"
                                                        fill="#F0F2F5"
                                                    />
                                                    <path
                                                        d="M779.72 517.308L45.146 536.104L27.7988 130.876L762.361 35.0272L779.72 517.308ZM60.2224 519.85L757.175 497.243L747.807 48.1365L44.3004 147.913L60.2224 519.85Z"
                                                        fill="black"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <path
                                                        d="M285.769 193.052L4.37753 190.109L4.53448 27.9327L286.945 18.076L285.769 193.052ZM14.5841 180.407L272.425 183.327L275.5 28.5L14.7174 42.7446L14.5841 180.407Z"
                                                        fill="#F0F2F5"
                                                    />
                                                    <path
                                                        d="M280.429 191.104L8.75092 186.168L8.89961 32.5372L280.339 23.0634L280.429 191.104ZM14.5835 180.407L272.424 183.327L272.195 32.5401L14.7167 42.7449L14.5835 180.407Z"
                                                        fill="black"
                                                    />
                                                </>
                                            )}
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}

                        {/* NAVIGASI PREV & NEXT */}
                        <div className="-2 -green-500 pointer-events-none absolute inset-0 z-50 overflow-visible">
                            {/* BUTTON PREV */}
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="-2 -blue-500 /* 📱 Mobile (< 640px) */ /* 📲 Tablet (640px - 1023px) */ /* 🖥️ Desktop (>= 1024px) */ group pointer-events-auto absolute left-[70%] top-[37%] flex h-[40px] w-[60px] items-center justify-center overflow-visible transition-transform active:scale-95 md:left-[68%] md:top-[35%] md:h-[65px] md:w-[100px] lg:left-[65%] lg:top-[12%] lg:h-[90px] lg:w-[160px]"
                            >
                                <div className="-2 -yellow-500 pointer-events-none absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-105">
                                    <PrevButton
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </div>
                            </button>

                            {/* BUTTON NEXT */}
                            <button
                                type="button"
                                onClick={handleNext}
                                className="-2 -blue-500 /* 📱 Mobile (< 640px) */ /* 📲 Tablet (640px - 1023px) */ /* 🖥️ Desktop (>= 1024px) */ group pointer-events-auto absolute left-[20%] top-[58%] flex h-[40px] w-[60px] items-center justify-center overflow-visible transition-transform active:scale-95 md:left-[8%] md:top-[60%] md:h-[65px] md:w-[100px] lg:left-[10%] lg:top-[75%] lg:h-[90px] lg:w-[160px]"
                            >
                                <div className="-2 -yellow-500 pointer-events-none absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-105">
                                    <NextButton
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* 2. CONTAINER BANNER INFO */}
                    <div
                        ref={(el) => {
                            if (el) rightElementsRef.current[0] = el;
                        }}
                        className="-2 -blue-500 absolute z-30 opacity-0"
                        style={{
                            aspectRatio: '270 / 180',
                            // Height scales with viewport height, same as the
                            // KONTEN UTAMA container it's centered in — not
                            // vw, which let this balloon taller than the
                            // container (and the viewport itself) on wide,
                            // short screens, pushing all its text/button
                            // content toward the bottom of the screen.
                            height: 'clamp(232px, 75vh, 517px)',
                            containerType: 'inline-size',
                            right: '5%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <PhotoInfoBanner
                            width={'100%'}
                            height={'100%'}
                            className="-2"
                        />

                        <div
                            className="-2 -blue-500 absolute z-30 w-fit select-text"
                            style={{
                                top: '54%',
                                left: '4%',
                                width: '43%',
                                height: '5%',
                                transformOrigin: 'left center',
                                transform:
                                    'perspective(400px) rotateZ(-17deg) rotateY(-18deg)',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            <h2
                                className="font-black uppercase italic tracking-wider text-black"
                                style={{
                                    fontFamily: "'NotoSans', sans-serif",
                                    fontSize: '2.6cqi',
                                    lineHeight: '1.2',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    whiteSpace: 'normal',
                                }}
                            >
                                {DATA[currentIndex]?.title}
                            </h2>
                        </div>

                        <div
                            className="-2 -yellow-500 absolute z-30 select-text overflow-hidden"
                            style={{
                                top: '61%',
                                left: '8%',
                                width: '49.5%',
                                height: '17%',
                                transformOrigin: 'left center',
                                transform:
                                    'perspective(400px) rotateZ(-11deg) rotateY(-18deg)',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            <p
                                className="h-full w-full text-white"
                                style={{
                                    fontFamily: "'Arsenal', sans-serif",
                                    fontSize: '2.0cqi',
                                    lineHeight: '1.2',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    whiteSpace: 'normal',
                                }}
                            >
                                {DATA[currentIndex]?.desc}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setShouldRenderView(true);
                                setIsViewOpen(true);
                            }}
                            className="-2 -yellow-500 group absolute z-30 items-center justify-center overflow-visible transition-transform active:scale-95"
                            style={{
                                top: '64%',
                                right: '8%',
                                width: '23%',
                                height: '11%',
                                transformOrigin: 'left center',
                                transform:
                                    'perspective(400px) rotateZ(-6deg) rotateY(-30deg)',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            <div className="-2 -yellow-500 pointer-events-none absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-105">
                                <ViewButton width={'100%'} height={'100%'} />
                            </div>
                        </button>
                    </div>

                    {/* 3. VIEW CARD MODAL */}
                    {shouldRenderView && (
                        <div
                            ref={viewModalRef}
                            data-click-sound
                            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all"
                            onClick={handleCloseView}
                        >
                            {/* BUTTON BACK */}
                            <div
                                className="z-35 group absolute bottom-6 right-6 overflow-visible transition-transform active:scale-95"
                                style={{
                                    width: 'clamp(110.25px, 27.2vh, 245px)',
                                }}
                            >
                                <Button
                                    Icon={ViewBackButton}
                                    onClick={handleCloseView}
                                    back
                                    iconClassName="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-200"
                                    ariaLabel="Back to Gallery"
                                />
                            </div>

                            {/* CONTAINER FRAME & FOTO */}
                            <div
                                ref={viewContentRef}
                                className="relative bottom-8 flex h-auto max-h-[85vh] w-full max-w-4xl origin-center items-center justify-center p-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg
                                    viewBox="0 0 296 199"
                                    className="relative z-10 h-auto max-h-[85vh] w-full overflow-visible drop-shadow-2xl"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <defs>
                                        <clipPath id="view-photo-clip">
                                            <path d="M14.5835 180.407L272.424 183.327L272.195 32.5401L14.7167 42.7449L14.5835 180.407Z" />
                                        </clipPath>
                                    </defs>

                                    <image
                                        href={DATA[currentIndex]?.image}
                                        width="100%"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        clipPath="url(#view-photo-clip)"
                                    />

                                    <path
                                        d="M285.769 193.052L4.37753 190.109L4.53448 27.9327L286.945 18.076L285.769 193.052ZM14.5841 180.407L272.425 183.327L275.5 28.5L14.7174 42.7446L14.5841 180.407Z"
                                        fill="#F0F2F5"
                                    />
                                    <path
                                        d="M280.429 191.104L8.75092 186.168L8.89961 32.5372L280.339 23.0634L280.429 191.104ZM14.5835 180.407L272.424 183.327L272.195 32.5401L14.7167 42.7449L14.5835 180.407Z"
                                        fill="black"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>

                {/* BACK BUTTON */}
                <div
                    ref={(el) => {
                        if (el) rightElementsRef.current[1] = el;
                    }}
                    className="absolute bottom-6 right-6 z-40 opacity-0"
                >
                    <Link
                        href="/archive"
                        data-click-sound
                        data-back-sound
                        className="group flex h-[80px] items-center justify-center overflow-visible transition-transform active:scale-95"
                        style={{ width: 'clamp(81px, 30vh, 260px)' }}
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
            </div>
        </>
    );
}
