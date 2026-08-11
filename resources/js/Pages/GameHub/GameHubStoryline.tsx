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
import skipbutton from '@/assets/icons/SkipButton.svg';
import ImReady from '@/assets/svgs/ImReady.svg';
import NextPage from '@/assets/svgs/NextPage.svg';
import { CAMERA_PATHS } from '@/Components/about/cameraPath';
import {
    CameraConfig,
    useDivisionCamera,
    type DivisionTrigger,
} from '@/Components/about/useDivisionCamera';
import { useMusic } from '@/Components/global/MusicProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MusicButton from '../../assets/icons/MusicButton.svg?react';
import MusicButton2 from '../../assets/icons/MusicButton2.svg?react';
type GameHubScreen = 'join' | 'games' | 'errorGimmick';

gsap.registerPlugin(ScrollTrigger);

type Props = {
    onReady: () => void;
};

export default function GameHubStoryline({ onReady }: Props) {
    const [page, setPage] = useState<1 | 2>(1);

    const PAGE_WIDTH = page === 1 ? '7400px' : '5200px';

    // Responsive scaling — same approach as DivisionsSection: the wrapper
    // scales with viewport height, reaching full design size around a
    // ~737px-tall viewport (and holding above it), shrinking to half on very
    // short screens. clamp form is clamp(D/2, (D / 7.3684)vh, D) per dimension.
    // Width is NOT part of that scaling: every panel/box/button below is
    // placed with a literal px `left`/`right` inside the PAGE_WIDTH design
    // space, and nothing scales those positions down. Shrinking the
    // container's width independently of its content (e.g. on short/landscape
    // phone viewports) just desyncs the container edge from where the content
    // actually is — buttons anchored to "the edge" end up mid-content, and the
    // camera's focusX/panelW normalisation (useDivisionCamera) breaks too. So
    // width always matches PAGE_WIDTH, only height is allowed to shrink.
    const PAGE_WIDTH_CLAMP = PAGE_WIDTH;
    const PANEL_HEIGHT_CLAMP = 'clamp(428px, 116.17vh, 856px)';
    const CAMERA_HEIGHT_CLAMP = 'clamp(345px, 93.64vh, 690px)';
    const musicIconRef = useRef<HTMLSpanElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const worldRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<HTMLDivElement>(null);
    const clipRef = useRef<HTMLDivElement>(null);
    const markRefs = useRef<(HTMLDivElement | null)[]>([]);
    const wipeRef = useRef<HTMLDivElement>(null);
    const accentSvgRefs = useRef<(SVGSVGElement | null)[]>([]);
    const { toggle: toggleMusic, isPlaying } = useMusic();

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
        { src: Panel3, left: '1350px', top: '20%', width: '480px', beat: 1 },
        { src: Panel4, left: '2050px', top: '40%', width: '340px', beat: 1 },
        { src: Panel5, left: '3150px', top: '60%', width: '450px', beat: 1 },
        { src: Panel6, left: '3380px', top: '22%', width: '450px', beat: 1 },
        { src: Panel7, left: '4650px', top: '22%', width: '480px', beat: 1 },
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
        { src: SLBox1, left: '80px', top: '10%', width: '300px', beat: 0 },
        { src: SLBox2, left: '480px', top: '32%', width: '310px', beat: 0 },
        // Beat 1 (Panel 2)
        { src: SLBox3, left: '920px', top: '38%', width: '160px', beat: 1 },
        // Beat 2 (Panel 3)
        { src: SLBox4, left: '1240px', top: '50%', width: '440px', beat: 1 },
        // Beat 3 (Panel 4)
        { src: SLBox5, left: '2120px', top: '35%', width: '380px', beat: 1 },
        { src: SLBox6, left: '2520px', top: '48%', width: '370px', beat: 1 },
        // Beat 4 (Panel 5)
        { src: SLBox7, left: '3100px', top: '44%', width: '150px', beat: 1 },
        { src: SLBox9, left: '3530px', top: '65%', width: '270px', beat: 1 },
        { src: SLBox8, left: '3340px', top: '52%', width: '120px', beat: 1 },
        // Beat 5 (Panel 6)
        { src: SLBox10, left: '4020px', top: '48%', width: '380px', beat: 1 },
        // Beat 6 (Panel 7)
        { src: SLBox11, left: '4480px', top: '20%', width: '360px', beat: 1 },
        { src: SLBox12, left: '4900px', top: '68%', width: '350px', beat: 1 },
        { src: SLBox13, left: '5350px', top: '43%', width: '400px', beat: 1 },
        // Beat 7 (Panel 8 - INFECTED EVIL GLITCH)
        {
            src: SLBox14,
            left: '5820px',
            top: '32%',
            width: '380px',
            beat: 1,
            evil: true,
        },
        {
            src: SLBox15,
            left: '6500px',
            top: '44%',
            width: '450px',
            beat: 1,
            evil: true,
        },
    ];

    // STORYLINE PAGE 2 (PANEL 9 - 12 + SLBOX 16 - 19)
    const PANELS_PAGE_2 = [
        { src: Panel9, left: '320px', top: '25%', width: '350px', beat: 0 },
        { src: Panel10, left: '780px', top: '24%', width: '235px', beat: 1 },
        { src: Panel11, left: '1035px', top: '24%', width: '240px', beat: 1 },
        { src: Panel12, left: '1295px', top: '24%', width: '235px', beat: 1 },
        { src: Panel13, left: '2000px', top: '30%', width: '450px', beat: 1 },
        { src: Panel14, left: '2480px', top: '24%', width: '440px', beat: 1 },
        { src: Panel15, left: '3180px', top: '35%', width: '450px', beat: 1 },
        { src: Panel16, left: '3800px', top: '43%', width: '450px', beat: 1 },
    ];

    const BOXES_PAGE_2 = [
        { src: SLBox16, left: '120px', top: '10%', width: '430px', beat: 0 },
        { src: SLBox17, left: '740px', top: '27%', width: '180px', beat: 1 },
        { src: SLBox18, left: '1065px', top: '62%', width: '180px', beat: 1 },
        { src: SLBox19, left: '1340px', top: '75%', width: '300px', beat: 1 },
        { src: SLBox20, left: '1660px', top: '50%', width: '300px', beat: 1 },
        { src: SLBox21, left: '1900px', top: '20%', width: '420px', beat: 1 },
        { src: SLBox22, left: '2600px', top: '47%', width: '400px', beat: 1 },
        { src: SLBox23, left: '3050px', top: '26%', width: '370px', beat: 1 },
        { src: SLBox24, left: '3540px', top: '49%', width: '370px', beat: 1 },
        { src: SLBox25, left: '4340px', top: '50%', width: '380px', beat: 1 },
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
        });

        return () => {
            ctx.revert();
        };
    }, []);

    // Lift path traced from THIS page's panel heights — differs per page
    // because each page has different panels.
    const LIFT_D =
        page === 1
            ? 'M4.58,31.0584 C4.58,31.0584 686.46,330.56 1101.74,190.558 C1517.03,50.5564 2161.31,-78.942 2706.48,87.0566 C3251.64,253.055 3797.37,31.0584 4127.78,31.0584 C4458.18,31.0584 4881.44,184.559 5416.35,190.559 C5951.26,196.559 6035.00,-78.441 7400.00,138.059'
            : 'M3.07,63.4378 C712.46,-190.063 953.79,542.431 1479.78,215.934 C2005.77,-110.563 2321.67,23.9336 3065.32,368.934 C3760.08,536.934 4045.24,106.939 5200.00,63.4386';

    // Same hand-authored-curve treatment as LIFT_D: width-matched to page 1's
    // design span (7400px) so its shape lines up with the panel positions.
    const SCALE_D =
        page === 1
            ? 'M4.97,328.316 C642.39,34.3173 1294.38,-4.20732 1914.90,34.3173 C2487.65,69.876 2686.92,314.816 3228.20,300.816 C3769.49,286.816 3650.04,170.818 4541.50,34.3173 C5432.97,-102.184 6064.56,370.257 7400.00,102.816'
            : 'M3.25,136.57 C819.69,-154.868 1261.67,510.068 2213.14,234.568 C3164.62,-40.9318 3911.46,-90.4307 5200.00,234.569';

    const CAMERA_CONFIG: Partial<CameraConfig> = {
        perspective: 900,

        paths: {
            lift: {
                d: LIFT_D,
                zero: 'mean',

                gain: 0.2,
            },
            scale: { d: SCALE_D, gain: 0.1 },
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

    const handleLeaveToGames = () => {
        const wipeEl = wipeRef.current;
        if (!wipeEl) {
            onReady();
            return;
        }

        gsap.timeline()
            .set(wipeEl, { display: 'block', xPercent: 120 })
            .to(wipeEl, {
                xPercent: 0,
                duration: 0.5,
                ease: 'power4.inOut',
                onComplete: () => {
                    // Hand the covered wipe off to GameHubPage, which continues
                    // the sweep-out on mount (this component unmounts on nav).
                    sessionStorage.setItem('gamesWipeIn', '1');
                    onReady();
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
                    // No entrance animation — always visible, no scroll gating.
                    gsap.set(el, { opacity: 1 });
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
                                delay: beatNum * 0.12,
                                ease: 'back.out(2.5)',
                                scrollTrigger: {
                                    trigger: el,
                                    scroller: scroller,
                                    horizontal: true,
                                    start: 'left 95%',
                                    toggleActions: 'play none none none',
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
                                delay: beatNum * 0.11,
                                ease: 'back.out(2.2)',
                                scrollTrigger: {
                                    trigger: el,
                                    scroller: scroller,
                                    horizontal: true,
                                    start: 'left 92%',
                                    toggleActions: 'play none none none',
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
                                delay: beatNum * 0.12,
                                ease: 'back.out(1.3)',
                                scrollTrigger: {
                                    trigger: el,
                                    scroller: scroller,
                                    horizontal: true,
                                    start: 'left 92%',
                                    toggleActions: 'play none none none',
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
                            delay: beatNum * 0.08,
                            ease: 'back.out(2.4)',
                            scrollTrigger: {
                                trigger: el,
                                scroller: scroller,
                                horizontal: true,
                                start: 'left 95%',
                                toggleActions: 'play none none none',
                            },
                        },
                    );
                }
            });
        }, worldRef);

        return () => ctx.revert();
    }, [page]);

    // Page 1's decorative accent shapes wipe in left-to-right as the scroll
    // reaches them, same trigger point as the panels/boxes.
    useEffect(() => {
        if (page !== 1) return;

        const scroller = scrollRef.current;
        const svgs = accentSvgRefs.current.filter(
            (el): el is SVGSVGElement => el !== null,
        );
        if (!scroller || svgs.length === 0) return;

        const ctx = gsap.context(() => {
            svgs.forEach((svg, i) => {
                gsap.set(svg, { clipPath: 'inset(0% 100% 0% 0%)' });
                gsap.to(svg, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 8,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: svg,
                        scroller,
                        horizontal: true,
                        start: 'left 95%',
                        toggleActions: 'play none none none',
                    },
                });

                // Last two shapes sit right around the infected panel — give
                // them the same glitch shake it has, same timing/values.
                if (i === 2 || i === 3) {
                    const glitchTl = gsap.timeline({
                        repeat: -1,
                        repeatDelay: 2.3,
                    });
                    glitchTl
                        .to(svg, {
                            skewX: 12,
                            x: 6,
                            filter: 'hue-rotate(90deg) drop-shadow(4px 0px 0px #00FFFF)',
                            duration: 0.05,
                            ease: 'none',
                        })
                        .to(svg, {
                            skewX: -12,
                            x: -6,
                            filter: 'hue-rotate(-90deg) drop-shadow(-4px 0px 0px #E60012)',
                            duration: 0.05,
                            ease: 'none',
                        })
                        .to(svg, {
                            skewX: 0,
                            x: 0,
                            filter: 'hue-rotate(0deg) drop-shadow(0px 0px 15px #E60012)',
                            duration: 0.05,
                            ease: 'none',
                        });
                }
            });
        });

        return () => ctx.revert();
    }, [page]);

    useEffect(() => {
        const el = musicIconRef.current;
        if (!el) return;

        gsap.killTweensOf(el);
        gsap.set(el, { rotation: 0, scale: 1 });

        let anim: gsap.core.Timeline | gsap.core.Tween;

        if (isPlaying) {
            anim = gsap.to(el, {
                scale: 1.05,
                duration: 1,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });
        } else {
            anim = gsap
                .timeline({ repeat: -1, repeatDelay: 1.5 })
                .to(el, { rotation: -8, duration: 0.09, ease: 'power1.inOut' })
                .to(el, { rotation: 8, duration: 0.09, ease: 'power1.inOut' })
                .to(el, { rotation: -6, duration: 0.09, ease: 'power1.inOut' })
                .to(el, { rotation: 6, duration: 0.09, ease: 'power1.inOut' })
                .to(el, { rotation: 0, duration: 0.09, ease: 'power1.inOut' });
        }

        return () => {
            anim.kill();
            gsap.set(el, { rotation: 0, scale: 1 });
        };
    }, [isPlaying]);

    return (
        <div className="absolute inset-0 overflow-hidden text-white">
            <button
                data-no-click-sound
                onClick={toggleMusic}
                className={[
                    'absolute right-6 top-6 z-[40] origin-bottom transition-transform duration-200 ease-out will-change-transform',
                    'hover:rotate-3 hover:scale-110 active:scale-95',
                    ,
                ].join(' ')}
            >
                <span
                    ref={musicIconRef}
                    className="inline-block origin-bottom will-change-transform"
                >
                    {isPlaying ? (
                        <MusicButton className="w-[clamp(2.5rem,7vh,4rem)]" />
                    ) : (
                        <MusicButton2 className="w-[clamp(2.5rem,7vh,4rem)]" />
                    )}
                </span>
            </button>

            <button
                onClick={handleLeaveToGames}
                data-type="btn"
                className="group pointer-events-auto absolute z-30 cursor-pointer select-none transition-transform duration-300 hover:scale-110 active:scale-95"
                style={{
                    bottom: 'clamp(0.75rem, 3vh, 1.5rem)',
                    right: 'clamp(0.75rem, 3vh, 1.5rem)',
                    width: 'clamp(5.4rem, 26.4vh, 12rem)',
                }}
            >
                <img
                    src={skipbutton}
                    alt="Next Page"
                    draggable={false}
                    className="h-auto w-full"
                />
            </button>

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
                            className="absolute z-50 h-5 w-5"
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
                                        ref={(el) => {
                                            accentSvgRefs.current[0] = el;
                                        }}
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
                                        ref={(el) => {
                                            accentSvgRefs.current[1] = el;
                                        }}
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
                                        ref={(el) => {
                                            accentSvgRefs.current[2] = el;
                                        }}
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
                                        ref={(el) => {
                                            accentSvgRefs.current[3] = el;
                                        }}
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
                                        data-beat={1}
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
                                        onClick={handleLeaveToGames}
                                        data-beat={3}
                                        data-type="btn"
                                        style={{
                                            right: '56px',
                                            bottom: '35%',
                                            width: '230px',
                                        }}
                                        className="group pointer-events-auto absolute z-50 cursor-pointer select-none transition-transform duration-300 hover:scale-110 active:scale-95"
                                    >
                                        <img
                                            src={ImReady}
                                            alt="I'm Ready"
                                            draggable={false}
                                            className="h-auto w-full"
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
