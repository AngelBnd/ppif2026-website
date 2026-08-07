import SLBox1 from '@/assets/games/storyline/lineboxesthingies/SLBox1.webp';
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
import SLBox2 from '@/assets/games/storyline/lineboxesthingies/SLBox2.webp';
import SLBox20 from '@/assets/games/storyline/lineboxesthingies/SLBox20.webp';
import SLBox21 from '@/assets/games/storyline/lineboxesthingies/SLBox21.webp';
import SLBox22 from '@/assets/games/storyline/lineboxesthingies/SLBox22.webp';
import SLBox23 from '@/assets/games/storyline/lineboxesthingies/SLBox23.webp';
import SLBox24 from '@/assets/games/storyline/lineboxesthingies/SLBox24.webp';
import SLBox25 from '@/assets/games/storyline/lineboxesthingies/SLBox25.webp';
import SLBox3 from '@/assets/games/storyline/lineboxesthingies/SLBox3.webp';
import SLBox4 from '@/assets/games/storyline/lineboxesthingies/SLBox4.webp';
import SLBox5 from '@/assets/games/storyline/lineboxesthingies/SLBox5.webp';
import SLBox6 from '@/assets/games/storyline/lineboxesthingies/SLBox6.webp';
import SLBox7 from '@/assets/games/storyline/lineboxesthingies/SLBox7.webp';
import SLBox8 from '@/assets/games/storyline/lineboxesthingies/SLBox8.webp';
import SLBox9 from '@/assets/games/storyline/lineboxesthingies/SLBox9.webp';
import Panel1 from '@/assets/games/storyline/panels/Panel1.webp';
import Panel10 from '@/assets/games/storyline/panels/Panel10.webp';
import Panel11 from '@/assets/games/storyline/panels/Panel11.webp';
import Panel12 from '@/assets/games/storyline/panels/Panel12.webp';
import Panel13 from '@/assets/games/storyline/panels/Panel13.webp';
import Panel14 from '@/assets/games/storyline/panels/Panel14.webp';
import Panel15 from '@/assets/games/storyline/panels/Panel15.webp';
import Panel16 from '@/assets/games/storyline/panels/Panel16.webp';
import Panel2 from '@/assets/games/storyline/panels/Panel2.webp';
import Panel3 from '@/assets/games/storyline/panels/Panel3.webp';
import Panel4 from '@/assets/games/storyline/panels/Panel4.webp';
import Panel5 from '@/assets/games/storyline/panels/Panel5.webp';
import Panel6 from '@/assets/games/storyline/panels/Panel6.webp';
import Panel7 from '@/assets/games/storyline/panels/Panel7.webp';
import Panel8 from '@/assets/games/storyline/panels/Panel8.webp';
import Panel9 from '@/assets/games/storyline/panels/Panel9.webp';
import ImReady from '@/assets/svgs/ImReady.svg';
import NextPage from '@/assets/svgs/NextPage.svg';
import { CAMERA_PATHS } from '@/Components/about/cameraPath';
import {
    CameraConfig,
    useDivisionCamera,
    type DivisionTrigger,
} from '@/Components/about/useDivisionCamera';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Props = {
    onReady: () => void;
};

function buildLiftPath(
    panels: { left: string; top: string }[],
    widthPx: number,
): string {
    const pts = panels
        .map((p) => ({ x: parseFloat(p.left), y: -parseFloat(p.top) }))
        .sort((a, b) => a.x - b.x);

    const first = pts[0] ?? { x: 0, y: -50 };
    const last = pts[pts.length - 1] ?? { x: widthPx, y: -50 };

    const nodes = [
        { x: 0, y: first.y },
        ...pts,
        { x: widthPx, y: last.y },
    ].filter((n, i, a) => i === 0 || n.x > a[i - 1].x);

    let d = `M${nodes[0].x},${nodes[0].y}`;
    for (let i = 1; i < nodes.length; i++) {
        const p0 = nodes[i - 1];
        const p1 = nodes[i];
        const mx = (p0.x + p1.x) / 2;
        d += ` C${mx},${p0.y} ${mx},${p1.y} ${p1.x},${p1.y}`;
    }
    return d;
}

export default function GameHubStoryline({ onReady }: Props) {
    const [page, setPage] = useState<1 | 2>(1);

    const PAGE_WIDTH = page === 1 ? '7400px' : '5200px';

    // Responsive scaling — same approach as DivisionsSection: the camera and
    // wrapper scale with viewport height, reaching full design size around a
    // ~737px-tall viewport (and holding above it), shrinking to half on very
    // short screens. clamp form is clamp(D/2, (D / 7.3684)vh, D) per dimension.
    // NOTE: the camera math (buildLiftPath / path sampling) keeps using the
    // design width via parseFloat(PAGE_WIDTH) — it's independent of render size.
    const PAGE_WIDTH_CLAMP =
        page === 1
            ? 'clamp(3700px, 1004.29vh, 7400px)'
            : 'clamp(2600px, 705.72vh, 5200px)';
    const PANEL_HEIGHT_CLAMP = 'clamp(428px, 116.17vh, 856px)';
    const CAMERA_HEIGHT_CLAMP = 'clamp(345px, 93.64vh, 690px)';

    const scrollRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
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
        { src: Panel2, left: '650px', top: '34%', width: '460px', beat: 1 },
        { src: Panel3, left: '1350px', top: '20%', width: '480px', beat: 2 },
        { src: Panel4, left: '2050px', top: '40%', width: '340px', beat: 3 },
        { src: Panel5, left: '3150px', top: '60%', width: '450px', beat: 4 },
        { src: Panel6, left: '3380px', top: '22%', width: '450px', beat: 5 },
        { src: Panel7, left: '4650px', top: '32%', width: '480px', beat: 6 },
        {
            src: Panel8,
            left: '5850px',
            top: '25%',
            width: '520px',
            beat: 7,
            evil: true,
        },
    ];

    const BOXES_PAGE_1 = [
        // Beat 0 (Panel 1)
        { src: SLBox1, left: '60px', top: '10%', width: '300px', beat: 0 },
        { src: SLBox2, left: '480px', top: '32%', width: '310px', beat: 0 },
        // Beat 1 (Panel 2)
        { src: SLBox3, left: '920px', top: '38%', width: '160px', beat: 1 },
        // Beat 2 (Panel 3)
        { src: SLBox4, left: '1240px', top: '50%', width: '440px', beat: 2 },
        // Beat 3 (Panel 4)
        { src: SLBox5, left: '2120px', top: '35%', width: '380px', beat: 3 },
        { src: SLBox6, left: '2520px', top: '48%', width: '370px', beat: 4 },
        // Beat 4 (Panel 5)
        { src: SLBox7, left: '3100px', top: '44%', width: '150px', beat: 5 },
        { src: SLBox9, left: '3530px', top: '65%', width: '270px', beat: 7 },
        { src: SLBox8, left: '3340px', top: '52%', width: '120px', beat: 6 },
        // Beat 5 (Panel 6)
        { src: SLBox10, left: '4020px', top: '48%', width: '380px', beat: 8 },
        // Beat 6 (Panel 7)
        { src: SLBox11, left: '4480px', top: '20%', width: '360px', beat: 9 },
        { src: SLBox12, left: '4900px', top: '68%', width: '350px', beat: 10 },
        { src: SLBox13, left: '5350px', top: '43%', width: '400px', beat: 11 },
        // Beat 7 (Panel 8 - INFECTED EVIL GLITCH)
        {
            src: SLBox14,
            left: '5820px',
            top: '32%',
            width: '380px',
            beat: 12,
            evil: true,
        },
        {
            src: SLBox15,
            left: '6500px',
            top: '44%',
            width: '450px',
            beat: 13,
            evil: true,
        },
    ];

    // STORYLINE PAGE 2 (PANEL 9 - 12 + SLBOX 16 - 19)
    const PANELS_PAGE_2 = [
        { src: Panel9, left: '320px', top: '25%', width: '350px', beat: 0 },
        { src: Panel10, left: '780px', top: '24%', width: '235px', beat: 1 },
        { src: Panel11, left: '1035px', top: '24%', width: '240px', beat: 2 },
        { src: Panel12, left: '1295px', top: '24%', width: '235px', beat: 3 },
        { src: Panel13, left: '2000px', top: '15%', width: '450px', beat: 4 },
        { src: Panel14, left: '2480px', top: '24%', width: '440px', beat: 5 },
        { src: Panel15, left: '3180px', top: '35%', width: '450px', beat: 6 },
        { src: Panel16, left: '3800px', top: '43%', width: '450px', beat: 7 },
    ];

    const BOXES_PAGE_2 = [
        { src: SLBox16, left: '120px', top: '10%', width: '430px', beat: 0 },
        { src: SLBox17, left: '740px', top: '27%', width: '180px', beat: 1 },
        { src: SLBox18, left: '1065px', top: '62%', width: '180px', beat: 2 },
        { src: SLBox19, left: '1340px', top: '75%', width: '300px', beat: 3 },
        { src: SLBox20, left: '1660px', top: '50%', width: '300px', beat: 4 },
        { src: SLBox21, left: '1900px', top: '8%', width: '420px', beat: 5 },
        { src: SLBox22, left: '2600px', top: '47%', width: '400px', beat: 6 },
        { src: SLBox23, left: '3050px', top: '26%', width: '370px', beat: 7 },
        { src: SLBox24, left: '3540px', top: '49%', width: '370px', beat: 8 },
        { src: SLBox25, left: '4340px', top: '50%', width: '380px', beat: 9 },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(bgRef.current, {
                opacity: 0,
            });
            gsap.to(bgRef.current, {
                opacity: 0.6,
                ease: 'power3.out',
                duration: 1.2,
            });
        }, []);

        return () => {
            ctx.revert();
        };
    }, []);

    // Lift path traced from THIS page's panel heights — differs per page
    // because each page has different panels.
    const LIFT_D =
        page === 1
            ? buildLiftPath(PANELS_PAGE_1, parseFloat(PAGE_WIDTH))
            : buildLiftPath(PANELS_PAGE_2, parseFloat(PAGE_WIDTH));

    const CAMERA_CONFIG: Partial<CameraConfig> = {
        perspective: 900,
        markers: true,
        paths: {
            lift: {
                d: LIFT_D,
                zero: 'mean',

                gain: 0.4,
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
                        scrollRef.current.scrollTo({
                            left: 0,
                            behavior: 'instant',
                        });
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
            const storyElements = gsap.utils.toArray<HTMLElement>(
                '[data-beat]',
                world,
            );

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
                        },
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
                            },
                        );

                        const tl = gsap.timeline({
                            repeat: -1,
                            repeatDelay: 2.3,
                        });
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
                            },
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
                            },
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
                        },
                    );
                }
            });
        }, worldRef);

        return () => ctx.revert();
    }, [page]);

    return (
        <div className="absolute inset-0 overflow-hidden text-white">
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 h-screen w-screen bg-[#0A0C0F]"
            />

            {/* ini diganti ajah jujur gatau mau gimana transisi pindah pagenya wkwkwk */}
            <div
                ref={wipeRef}
                className="pointer-events-none fixed inset-0 z-[100] hidden overflow-hidden"
            >
                <div className="absolute -inset-[25%] -skew-x-[25deg] bg-[#E60012] shadow-[0_0_80px_#0A0C0F]" />
                <div className="absolute -inset-[25%] translate-x-8 -skew-x-[25deg] bg-neutral-950" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="-rotate-6 text-5xl font-black italic tracking-widest text-white drop-shadow-[5px_5px_0px_#E60012]"></span>
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
                        width: PAGE_WIDTH_CLAMP,
                        height: PANEL_HEIGHT_CLAMP,
                        minWidth: PAGE_WIDTH_CLAMP,
                        minHeight: PANEL_HEIGHT_CLAMP,
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
                        className="relative"
                        style={{
                            width: PAGE_WIDTH_CLAMP,
                            height: CAMERA_HEIGHT_CLAMP,
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
                                        className="pointer-events-none absolute left-[2350px] top-[20%] z-10 h-[540px] w-[1500px] select-none drop-shadow-[0px_14px_0px_#0A0C0F]"
                                        viewBox="0 0 1800 540"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M284.5 343.5L16.5 225.5L0 310.5L302 409.5L495.5 212.5L1049 427.5L940 75.5L1272 149V0L854 25L1013 387.5L460.5 115.5L284.5 343.5Z"
                                            fill="#BF1E2E"
                                        />
                                    </svg>

                                    <svg
                                        className="pointer-events-none absolute left-[3550px] top-[38%] z-10 h-[540px] w-[1400px] select-none drop-shadow-[0px_14px_0px_#0A0C0F]"
                                        viewBox="0 0 1800 540"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            xmlns="http://www.w3.org/2000/svg"
                                            d="M258 338L337 0L574 126.5L654.5 51L776.5 70L574 189.5L360 43.5V457L19 395L0 315L258 338Z"
                                            fill="#BF1E2E"
                                        />
                                    </svg>

                                    <svg
                                        className="pointer-events-none absolute left-[5440px] top-[25%] z-10 h-[520px] w-[850px] select-none drop-shadow-[0px_14px_0px_#0A0C0F]"
                                        viewBox="0 0 1150 520"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            xmlns="http://www.w3.org/2000/svg"
                                            d="M0 0L391.5 121.5H211.5L49.5 35.5L309.5 329.5L558.5 238.5L574 361L284 437.5L0 0Z"
                                            fill="#BF1E2E"
                                        />
                                    </svg>

                                    <svg
                                        className="pointer-events-none absolute left-[6200px] top-[55%] z-10 h-[520px] w-[1150px] select-none drop-shadow-[0px_14px_0px_#0A0C0F]"
                                        viewBox="0 0 1150 520"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            xmlns="http://www.w3.org/2000/svg"
                                            d="M218.731 178.748L0.000681141 116L0.00180718 9.50712e-07L213.608 136.644L344.095 36.7375L386.501 36.7375L218.731 178.748Z"
                                            fill="#BF1E2E"
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
                                            data-evil={
                                                p.evil ? 'true' : 'false'
                                            }
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
                                            data-evil={
                                                b.evil ? 'true' : 'false'
                                            }
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
                                            right: '48px',
                                            bottom: '35%',
                                            width: '190px',
                                        }}
                                        className="group pointer-events-auto absolute z-50 cursor-pointer select-none transition-transform duration-300 hover:scale-110 active:scale-95"
                                    >
                                        <img
                                            src={NextPage}
                                            alt="Next Page"
                                            draggable={false}
                                            className="h-auto w-full"
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
                                            right: '48px',
                                            bottom: '35%',
                                            width: '190px',
                                        }}
                                        className="group pointer-events-auto absolute z-50 cursor-pointer select-none transition-transform duration-300 hover:scale-110 active:scale-95"
                                    >
                                        <img
                                            src={ImReady}
                                            alt="I'm Ready"
                                            draggable={false}
                                            className="h-auto w-full drop-shadow-[5px_5px_0px_#E60012]"
                                        />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* <button
                            onClick={onReady}
                            className="absolute bottom-6 right-4 z-30 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 active:scale-95"
                        >
                            I'm Ready
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
