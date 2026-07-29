import SLBox1 from '@/assets/games/storyline/lineboxesthingies/SLBox1.webp';
import SLBox2 from '@/assets/games/storyline/lineboxesthingies/SLBox2.webp';
import SLBox3 from '@/assets/games/storyline/lineboxesthingies/SLBox3.webp';
import SLBox4 from '@/assets/games/storyline/lineboxesthingies/SLBox4.webp';
import SLBox5 from '@/assets/games/storyline/lineboxesthingies/SLBox5.webp';
import SLBox6 from '@/assets/games/storyline/lineboxesthingies/SLBox6.webp';
import SLBox7 from '@/assets/games/storyline/lineboxesthingies/SLBox7.webp';
import SLBox8 from '@/assets/games/storyline/lineboxesthingies/SLBox8.webp';
import SLBox9 from '@/assets/games/storyline/lineboxesthingies/SLBox9.webp';
import SLBox10 from '@/assets/games/storyline/lineboxesthingies/SLBox10.webp';
import SLBox11 from '@/assets/games/storyline/lineboxesthingies/SLBox11.webp';
import SLBox12 from '@/assets/games/storyline/lineboxesthingies/SLBox12.webp';
import SLBox13 from '@/assets/games/storyline/lineboxesthingies/SLBox13.webp';
import SLBox14 from '@/assets/games/storyline/lineboxesthingies/SLBox14.webp';
import SLBox15 from '@/assets/games/storyline/lineboxesthingies/SLBox15.webp';
import SLBox16 from '@/assets/games/storyline/lineboxesthingies/SLBox16.webp';
import SLBox17 from '@/assets/games/storyline/lineboxesthingies/SLBox17.webp';
import SLBox18 from '@/assets/games/storyline/lineboxesthingies/SLBox18.webp';
import SLBox19 from '@/assets/games/storyline/lineboxesthingies/SLBox19.webp';
import Panel1 from '@/assets/games/storyline/panels/Panel1.webp';
import Panel2 from '@/assets/games/storyline/panels/Panel2.webp';
import Panel3 from '@/assets/games/storyline/panels/Panel3.webp';
import Panel4 from '@/assets/games/storyline/panels/Panel4.webp';
import Panel5 from '@/assets/games/storyline/panels/Panel5.webp';
import Panel6 from '@/assets/games/storyline/panels/Panel6.webp';
import Panel7 from '@/assets/games/storyline/panels/Panel7.webp';
import Panel8 from '@/assets/games/storyline/panels/Panel8.webp';
import Panel9 from '@/assets/games/storyline/panels/Panel9.webp';
import Panel10 from '@/assets/games/storyline/panels/Panel10.webp';
import Panel11 from '@/assets/games/storyline/panels/Panel11.webp';
import Panel12 from '@/assets/games/storyline/panels/Panel12.webp';
import NextPage from '@/assets/svgs/NextPage.svg';
import ImReady from '@/assets/svgs/ImReady.svg';
import { CAMERA_PATHS } from '@/Components/about/cameraPath';
import {
    CameraConfig,
    useDivisionCamera,
    type DivisionTrigger,
} from '@/Components/about/useDivisionCamera';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Props = {
    onReady: () => void;
};

export default function GameHubStoryline({ onReady }: Props) {
    const [page, setPage] = useState<1 | 2>(1);

    const scrollRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const worldRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<HTMLDivElement>(null);
    const clipRef = useRef<HTMLDivElement>(null);
    const markRefs = useRef<(HTMLDivElement | null)[]>([]);
    const wipeRef = useRef<HTMLDivElement>(null);

    const refs = useRef({
        scroller: scrollRef,
        panel: panelRef,
        camera: cameraRef,
        world: worldRef,
        clip: clipRef,
        marks: markRefs,
    }).current;

    const TRIGGERS: DivisionTrigger[] = [
        { left: 29, top: 20, inset: 64 },
        { left: 45, top: 20, inset: 43 },
        { left: 63, top: 20, inset: 32 },
        { left: 77, top: 20, inset: 0 },
    ];

    // Placeholder layout — tweak left/top/width per object. `beat` tags each one
    // for the fade-in/out buildBeat pattern (data-beat).
    const PANELS_PAGE_1 = [
        { src: Panel1, left: '160px', top: '22%', width: '460px', beat: 0 },
        { src: Panel2, left: '920px', top: '34%', width: '460px', beat: 1 },
        { src: Panel3, left: '1600px', top: '28%', width: '480px', beat: 2 },
        { src: Panel4, left: '2350px', top: '40%', width: '400px', beat: 3 },
        { src: Panel5, left: '3150px', top: '48%', width: '460px', beat: 4 },
        { src: Panel6, left: '3680px', top: '18%', width: '520px', beat: 5 },
        { src: Panel7, left: '4650px', top: '32%', width: '480px', beat: 6 },
        { src: Panel8, left: '5750px', top: '36%', width: '520px', beat: 7, evil: true },
    ];

    const BOXES_PAGE_1 = [
        // Beat 0 (Panel 1)
        { src: SLBox1, left: '60px', top: '10%', width: '280px', beat: 0 },
        { src: SLBox2, left: '480px', top: '32%', width: '300px', beat: 0 },
        // Beat 1 (Panel 2)
        { src: SLBox3, left: '1220px', top: '50%', width: '250px', beat: 1 },
        // Beat 2 (Panel 3)
        { src: SLBox4, left: '1640px', top: '66%', width: '330px', beat: 2 },
        // Beat 3 (Panel 4)
        { src: SLBox5, left: '2320px', top: '24%', width: '280px', beat: 3 },
        { src: SLBox6, left: '2620px', top: '48%', width: '300px', beat: 3 },
        // Beat 4 (Panel 5)
        { src: SLBox7, left: '3100px', top: '36%', width: '150px', beat: 4 },
        { src: SLBox9, left: '3540px', top: '46%', width: '130px', beat: 4 },
        { src: SLBox8, left: '3420px', top: '74%', width: '240px', beat: 4 },
        // Beat 5 (Panel 6)
        { src: SLBox10, left: '4220px', top: '48%', width: '260px', beat: 5 },
        // Beat 6 (Panel 7)
        { src: SLBox11, left: '4680px', top: '14%', width: '290px', beat: 6 },
        { src: SLBox12, left: '4980px', top: '68%', width: '270px', beat: 6 },
        { src: SLBox13, left: '5350px', top: '52%', width: '260px', beat: 6 },
        // Beat 7 (Panel 8 - INFECTED EVIL GLITCH)
        { src: SLBox14, left: '5820px', top: '24%', width: '260px', beat: 7, evil: true },
        { src: SLBox15, left: '6300px', top: '52%', width: '310px', beat: 7, evil: true },
    ];

    // STORYLINE PAGE 2 (PANEL 9 - 12 + SLBOX 16 - 19)
    const PANELS_PAGE_2 = [
        { src: Panel9, left: '160px', top: '28%', width: '420px', beat: 0 },
        { src: Panel10, left: '680px', top: '24%', width: '320px', beat: 1 },
        { src: Panel11, left: '1080px', top: '24%', width: '320px', beat: 2 },
        { src: Panel12, left: '1480px', top: '24%', width: '320px', beat: 3 },
    ];

    const BOXES_PAGE_2 = [
        { src: SLBox16, left: '100px', top: '10%', width: '380px', beat: 0 },
        { src: SLBox17, left: '640px', top: '16%', width: '180px', beat: 1 },
        { src: SLBox18, left: '1120px', top: '46%', width: '180px', beat: 2 },
        { src: SLBox19, left: '1540px', top: '72%', width: '260px', beat: 3 },
    ];

    const CAMERA_CONFIG: Partial<CameraConfig> = {
        perspective: 900,
        markers: true,
        paths: {
            lift: {
                d: 'M0,183.62 C0,183.62 451.83,183.62 808.52,183.62 C1165.2,183.62 1374.43,2.09 1735.62,7.59 C2096.82,13.09 2409.76,173.59 2729.48,138.59 C3049.18,103.59 3400,274.09 3400,274.09',
                zero: 'mean',
                gain: 0.23,
            },
            scale: { d: CAMERA_PATHS.scale, gain: 0.03 },
            sway: { d: CAMERA_PATHS.sway, zero: 'mean', gain: 0 },
        },
        bankGain: 0.0009,
        bankSlopeGain: 0.008,
        dollyGain: 0,
        dollyMax: 0,
    };

    useDivisionCamera({
        enabled: true,
        triggers: TRIGGERS,
        refs,
        config: CAMERA_CONFIG,
    });

    // TRANSITION PAGE 1 -> PAGE 2
    const handleNextPage = () => {
        const wipeEl = wipeRef.current;
        if (!wipeEl) {
            setPage(2);
            return;
        }

        const tl = gsap.timeline();
        tl.set(wipeEl, { display: 'block', xPercent: 120 })
            .to(wipeEl, {
                xPercent: 0,
                duration: 0.5,
                ease: 'power4.inOut',
                onComplete: () => {
                    setPage(2);
                    if (scrollRef.current) {
                        scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
                    }
                },
            })
            .to(wipeEl, {
                xPercent: -120,
                duration: 0.55,
                delay: 0.15,
                ease: 'power4.inOut',
                onComplete: () => {
                    gsap.set(wipeEl, { display: 'none' });
                },
            });
    };

    useEffect(() => {
        const scroller = scrollRef.current;
        const world = worldRef.current;
        if (!scroller || !world) return;

        const ctx = gsap.context(() => {
            const storyElements = gsap.utils.toArray<HTMLElement>('[data-beat]', world);

            storyElements.forEach((el) => {
                const beatNum = Number(el.getAttribute('data-beat')) || 0;
                const isPanel = el.getAttribute('data-type') === 'panel';
                const isEvil = el.getAttribute('data-evil') === 'true';
                const isBtn = el.getAttribute('data-type') === 'btn';

                if (isBtn) {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            scroller: scroller,
                            horizontal: true,
                            start: 'left 95%',
                            toggleActions: 'play none none reverse',
                        },
                    });

                    tl.fromTo(
                        el,
                        {
                            opacity: 0,
                            scale: 1.4,
                            skewX: 25,
                            x: -20,
                            filter: 'hue-rotate(90deg) drop-shadow(4px 0px 0px #00FFFF)',
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            skewX: -15,
                            x: 10,
                            filter: 'hue-rotate(-90deg) drop-shadow(-4px 0px 0px #E60012)',
                            duration: 0.08,
                            delay: page === 1 ? beatNum * 0.22 : beatNum * 0.38,
                            ease: 'none',
                        }
                    )
                        .to(el, {
                            skewX: 10,
                            x: -5,
                            filter: 'hue-rotate(45deg)',
                            duration: 0.06,
                            ease: 'none',
                        })
                        .to(el, {
                            skewX: 0,
                            x: 0,
                            filter: 'hue-rotate(0deg) drop-shadow(0px 0px 15px #E60012)',
                            duration: 0.06,
                            ease: 'power2.out',
                        });
                } else if (page === 1) {
                    if (isEvil) {
                        gsap.fromTo(
                            el,
                            {
                                opacity: 0,
                                scale: 1.8,
                                x: 90,
                                y: -60,
                                rotation: 8,
                                filter: 'drop-shadow(0px 0px 30px #E60012) hue-rotate(-45deg)',
                            },
                            {
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0,
                                rotation: 0,
                                filter: 'drop-shadow(0px 0px 15px #E60012) hue-rotate(0deg)',
                                duration: 0.7,
                                delay: beatNum * 0.22,
                                ease: 'back.out(2.5)',
                                scrollTrigger: {
                                    trigger: el,
                                    scroller: scroller,
                                    horizontal: true,
                                    start: 'left 92%',
                                    toggleActions: 'play none none reverse',
                                },
                            }
                        );

                        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.3 });
                        tl.to(el, {
                            skewX: 12,
                            x: 6,
                            filter: 'hue-rotate(90deg) drop-shadow(4px 0px 0px #00FFFF)',
                            duration: 0.05,
                            ease: 'none',
                        })
                            .to(el, {
                                skewX: -12,
                                x: -6,
                                filter: 'hue-rotate(-90deg) drop-shadow(-4px 0px 0px #E60012)',
                                duration: 0.05,
                                ease: 'none',
                            })
                            .to(el, {
                                skewX: 0,
                                x: 0,
                                filter: 'hue-rotate(0deg) drop-shadow(0px 0px 15px #E60012)',
                                duration: 0.05,
                                ease: 'none',
                            });
                    } else if (isPanel) {
                        gsap.fromTo(
                            el,
                            {
                                opacity: 0,
                                scale: 1.35,
                                x: -120,
                                y: 60,
                                rotation: -8,
                                skewX: -16,
                            },
                            {
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0,
                                rotation: 0,
                                skewX: 0,
                                duration: 0.65,
                                delay: beatNum * 0.22,
                                ease: 'back.out(2.2)',
                                scrollTrigger: {
                                    trigger: el,
                                    scroller: scroller,
                                    horizontal: true,
                                    start: 'left 92%',
                                    toggleActions: 'play none none reverse',
                                },
                            }
                        );
                    } else {
                        gsap.fromTo(
                            el,
                            {
                                opacity: 0,
                                scale: 0.25,
                                x: 50,
                                y: 30,
                                rotation: 8,
                            },
                            {
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0,
                                rotation: 0,
                                duration: 0.5,
                                delay: beatNum * 0.22,
                                ease: 'back.out(2.8)',
                                scrollTrigger: {
                                    trigger: el,
                                    scroller: scroller,
                                    horizontal: true,
                                    start: 'left 92%',
                                    toggleActions: 'play none none reverse',
                                },
                            }
                        );
                    }
                } else {
                    gsap.fromTo(
                        el,
                        {
                            opacity: 0,
                            scale: 1.15,
                            x: -350,
                            skewX: -18,
                            rotation: -6,
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            skewX: 0,
                            rotation: 0,
                            duration: 0.75,
                            delay: beatNum * 0.38,
                            ease: 'back.out(2.4)',
                            scrollTrigger: {
                                trigger: el,
                                scroller: scroller,
                                horizontal: true,
                                start: 'left 95%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                }
            });
        }, worldRef);

        return () => ctx.revert();
    }, [page]);

    return (
        <div className="absolute inset-0 overflow-hidden text-white">

            {/* ini diganti ajah jujur gatau mau gimana transisi pindah pagenya wkwkwk */}
            <div
                ref={wipeRef}
                className="pointer-events-none fixed inset-0 z-[100] hidden overflow-hidden"
            >
                <div className="absolute -inset-[25%] -skew-x-[25deg] bg-[#E60012] shadow-[0_0_80px_#0A0C0F]" />
                <div className="absolute -inset-[25%] translate-x-8 -skew-x-[25deg] bg-neutral-950" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black italic tracking-widest text-white drop-shadow-[5px_5px_0px_#E60012] -rotate-6">
                        STORYLINE // NEXT CHAPTER
                    </span>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="absolute inset-0 z-20 h-screen overflow-x-auto overflow-y-hidden overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                <div
                    ref={panelRef}
                    className="relative"
                    style={{
                        width: page === 1 ? '7200px' : '2600px',
                        height: '856px',
                        minWidth: page === 1 ? '7200px' : '2600px',
                        minHeight: '856px',
                    }}
                >
                    {TRIGGERS.map((trg, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                markRefs.current[i] = el;
                            }}
                            style={{
                                left: `${trg.left}%`,
                                top: `${trg.top}%`,
                            }}
                            className="absolute z-50 h-5 w-5 bg-green-500"
                        />
                    ))}

                    <div
                        ref={cameraRef}
                        className="relative h-[690px]"
                        style={{
                            width: page === 1 ? '7200px' : '2600px',
                            perspective: '900px',
                        }}
                    >
                        <div
                            ref={worldRef}
                            className="absolute inset-0 h-full w-full"
                            style={{
                                transformStyle: 'preserve-3d',
                                willChange: 'transform',
                            }}
                        >
                            {/* <div
                                ref={clipRef}
                                className="h-full [clip-path:inset(0_80%_0_0)]"
                            >
                                <DivisionStreak className="relative z-20 h-full w-auto max-w-none drop-shadow-[0px_8px_0px_#0A0C0F]" />
                            </div> */}

                            {/* STORYLINE PAGE 1 : PANEL 1 - 8) */}
                            {page === 1 && (
                                <>
                                    <svg
                                        className="pointer-events-none absolute left-[2600px] top-[14%] z-10 h-[540px] w-[1800px] select-none drop-shadow-[0px_14px_0px_#0A0C0F]"
                                        viewBox="0 0 1800 540"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 180 L280 260 L620 120 L920 480 L1250 80 L1580 340 L1800 240 L1800 320 L1580 440 L1250 180 L920 520 L620 220 L280 360 L0 260 Z"
                                            fill="#E60012"
                                        />
                                    </svg>

                                    <svg
                                        className="pointer-events-none absolute left-[5450px] top-[18%] z-10 h-[520px] w-[1150px] select-none drop-shadow-[0px_14px_0px_#0A0C0F]"
                                        viewBox="0 0 1150 520"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 160 L240 340 L520 280 L820 60 L1150 240 L1150 320 L820 160 L520 380 L240 440 L0 260 Z"
                                            fill="#E60012"
                                        />
                                    </svg>

                                    {PANELS_PAGE_1.map((p, i) => (
                                        <img
                                            key={`panel-1-${i}`}
                                            src={p.src}
                                            alt=""
                                            draggable={false}
                                            data-beat={p.beat}
                                            data-type="panel"
                                            data-evil={p.evil ? 'true' : 'false'}
                                            style={{
                                                left: p.left,
                                                top: p.top,
                                                width: p.width,
                                            }}
                                            className="pointer-events-none absolute z-30 h-auto select-none"
                                        />
                                    ))}

                                    {BOXES_PAGE_1.map((b, i) => (
                                        <img
                                            key={`box-1-${i}`}
                                            src={b.src}
                                            alt=""
                                            draggable={false}
                                            data-beat={b.beat}
                                            data-type="box"
                                            data-evil={b.evil ? 'true' : 'false'}
                                            style={{
                                                left: b.left,
                                                top: b.top,
                                                width: b.width,
                                            }}
                                            className="pointer-events-none absolute z-40 h-auto select-none drop-shadow-[4px_4px_0px_rgba(0,0,0,0.85)]"
                                        />
                                    ))}

                                    <button
                                        onClick={handleNextPage}
                                        data-beat={7}
                                        data-type="btn"
                                        style={{
                                            left: '6750px',
                                            top: '78%',
                                            width: '180px',
                                        }}
                                        className="group pointer-events-auto absolute z-50 cursor-pointer select-none transition-transform duration-300 hover:scale-110 active:scale-95"
                                    >
                                        <img
                                            src={NextPage}
                                            alt="Next Page"
                                            draggable={false}
                                            className="w-full h-auto drop-shadow-[5px_5px_0px_#E60012]"
                                        />
                                    </button>
                                </>
                            )}

                            {/* STORYLINE PAGE 2 : PANEL 9 - 12 */}
                            {page === 2 && (
                                <>
                                    {PANELS_PAGE_2.map((p, i) => (
                                        <img
                                            key={`panel-2-${i}`}
                                            src={p.src}
                                            alt=""
                                            draggable={false}
                                            data-beat={p.beat}
                                            data-type="panel"
                                            style={{
                                                left: p.left,
                                                top: p.top,
                                                width: p.width,
                                            }}
                                            className="pointer-events-none absolute z-30 h-auto select-none"
                                        />
                                    ))}

                                    {BOXES_PAGE_2.map((b, i) => (
                                        <img
                                            key={`box-2-${i}`}
                                            src={b.src}
                                            alt=""
                                            draggable={false}
                                            data-beat={b.beat}
                                            data-type="box"
                                            style={{
                                                left: b.left,
                                                top: b.top,
                                                width: b.width,
                                            }}
                                            className="pointer-events-none absolute z-40 h-auto select-none drop-shadow-[4px_4px_0px_rgba(0,0,0,0.85)]"
                                        />
                                    ))}

                                    <button
                                        onClick={onReady}
                                        data-beat={3}
                                        data-type="btn"
                                        style={{
                                            left: '1950px',
                                            top: '72%',
                                            width: '190px',
                                        }}
                                        className="group pointer-events-auto absolute z-50 cursor-pointer select-none transition-transform duration-300 hover:scale-110 active:scale-95"
                                    >
                                        <img
                                            src={ImReady}
                                            alt="I'm Ready"
                                            draggable={false}
                                            className="w-full h-auto drop-shadow-[5px_5px_0px_#E60012]"
                                        />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* <button
                onClick={onReady}
                className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 active:scale-95"
            >
                I'm Ready
            </button> */}
        </div>
    );
}