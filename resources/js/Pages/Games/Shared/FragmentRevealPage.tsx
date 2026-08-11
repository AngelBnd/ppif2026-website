import CLT from '@/assets/games/fragmentReveal/CLT.svg';
import DT from '@/assets/games/fragmentReveal/DT.svg';
import RIbbonBG from '@/assets/games/fragmentReveal/RibbonBG.svg';
import SD from '@/assets/games/fragmentReveal/SD.svg';
import YouveFinished from '@/assets/games/fragmentReveal/uvefinished.svg';
import VictoryMusic from '@/Components/global/VictoryMusic';
import { router } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ClickANYHWHERE from '../../../assets/games/fragmentReveal/ClickAnywhere.svg';
import Flag from '../../../assets/games/fragmentReveal/flag.svg';
import secondFR from '../../../assets/games/fragmentReveal/secondFR.webp';
import silkFR from '../../../assets/games/fragmentReveal/silkFR.webp';
import splashFR from '../../../assets/games/fragmentReveal/splashFR.webp';
import stoneFR from '../../../assets/games/fragmentReveal/stoneFR.webp';
import titleFR from '../../../assets/games/fragmentReveal/titleFR.webp';

type Props = {
    letters: string[];
    countdownSeconds?: number;
    game: string;
};

function Sparkle({
    className = '',
    delay = '0s',
    duration = '1.8s',
}: {
    className?: string;
    delay?: string;
    duration?: string;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="white"
            className={`pointer-events-none absolute select-none ${className}`}
            style={{
                animation: `sparkle-twinkle ${duration} ease-in-out infinite`,
                animationDelay: delay,
            }}
        >
            <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
        </svg>
    );
}

export default function FragmentRevealPage({
    letters,
    countdownSeconds = 3,
    game,
}: Props) {
    const [secondsLeft, setSecondsLeft] = useState(countdownSeconds);
    const [clicked, setClicked] = useState(false);
    const [timerStart, setTimerStart] = useState(false);

    const clickAnywhereRef = useRef<HTMLDivElement | null>(null);
    const mainRef = useRef<HTMLElement>(null);
    const ribbonRef = useRef<HTMLDivElement | null>(null);
    const ribbonTLRef = useRef<gsap.core.Timeline | null>(null);
    const titleRef = useRef<HTMLImageElement | null>(null);
    const timerRef = useRef<HTMLDivElement | null>(null);
    const fragmentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (timerStart) {
            if (secondsLeft <= 0) {
                router.visit('/games');
                return;
            }
            const timer = window.setTimeout(
                () => setSecondsLeft((s) => s - 1),
                1000,
            );
            return () => window.clearTimeout(timer);
        }
    }, [secondsLeft, timerStart]);

    useEffect(() => {
        function handleClick() {
            setClicked(true);
        }

        window.addEventListener('click', handleClick);

        const blinkingTL = gsap.timeline({
            repeat: -1,
            yoyo: true,
        });
        blinkingTL.fromTo(
            clickAnywhereRef.current,
            { opacity: 1 },
            { opacity: 0, ease: 'linear', duration: 0.8 },
        );

        return () => {
            window.removeEventListener('click', handleClick);
            blinkingTL.kill();
        };
    }, []);

    useEffect(() => {
        if (clicked) {
            const ribbonTL = ribbonTLRef.current;

            const tl = gsap.timeline();
            tl.call(() => setTimerStart(true), [], 1);

            tl.to(
                mainRef.current,
                {
                    yPercent: -50,
                    duration: 1.05,
                    ease: 'power3.out',
                },
                0,
            );

            tl.fromTo(
                titleRef.current,
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
                0,
            );
            tl.fromTo(
                fragmentRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
                0.5,
            );

            tl.fromTo(
                timerRef.current,
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
                1,
            );

            if (ribbonTL) {
                tl.fromTo(
                    ribbonRef.current,
                    { clipPath: 'inset(0% 0% 48% 0%)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        ease: 'power3.out',
                        duration: 2,
                    },
                    0,
                );
            }

            return () => {
                tl.kill();
            };
        }
    }, [clicked]);

    useLayoutEffect(() => {
        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
            ribbonRef.current,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
                clipPath: 'inset(0% 0% 48% 0%)',
                ease: 'power3.out',
                duration: 1,
            },
        );

        ribbonTLRef.current = tl;

        tl.tweenTo(0.5, { duration: 1.85, ease: 'power3.out', delay: 0.7 });

        return () => {
            tl.kill();
        };
    }, []);

    const gameTitles: Record<string, string> = {
        'Signal Decoder': SD,
        'Core Logic Test': CLT,
        'Data Trace': DT,
    };

    const SelectedGame = gameTitles[game];
    const correctScore = Number(
        sessionStorage.getItem('core_logic_score') || 0,
    );
    const totalQuestions = 10;
    const percentage = Math.round((correctScore / totalQuestions) * 100);

    return (
        <main
            ref={mainRef}
            className="relative flex h-[200vh] w-screen flex-col items-center justify-center overflow-hidden p-4 text-white"
        >
            <VictoryMusic />
            <div className="absolute z-0 h-full w-full bg-[#0A0C0F] opacity-80" />

            <style>{`
                    @keyframes sparkle-twinkle {
                        0%, 100% { opacity: 0.15; transform: scale(0.55) rotate(0deg); }
                        50% { opacity: 1; transform: scale(1.15) rotate(20deg); }
                    }
                `}</style>

            {/* <div className="scale-[0.5]"> */}
            <div
                ref={ribbonRef}
                className="absolute left-1/2 top-0 h-auto w-[78rem] -translate-x-1/2"
                style={{
                    clipPath: 'inset(0% 0% 100% 0%)',
                }}
            >
                <img src={RIbbonBG} alt="" className="h-auto w-full" />
            </div>
            <div className="relative flex h-screen w-screen max-w-[2000px] flex-col items-center justify-center gap-28 overflow-hidden">
                <div className="relative flex flex-col items-center justify-center gap-2">
                    <img
                        src={YouveFinished}
                        alt="You've finished"
                        className="z-20 block h-auto w-[40rem]"
                    />

                    {SelectedGame ? (
                        <img
                            src={SelectedGame}
                            alt={game}
                            className="z-20 block h-auto w-[50rem]"
                        />
                    ) : (
                        <></>
                    )}

                    {SelectedGame === CLT ? (
                        <div className="z-20 scale-y-125 font-noto text-4xl">
                            With an accuracy of {percentage}%!
                        </div>
                    ) : (
                        <></>
                    )}

                    <img
                        src={Flag}
                        alt=""
                        className="absolute -bottom-36 right-3 z-0 h-auto w-[90%]"
                    />
                    <Sparkle
                        className="right-[1%] top-[90%] z-30 h-6 w-8"
                        delay="0.9s"
                        duration="2s"
                    />
                    <Sparkle
                        className="right-[8%] top-[6%] z-30 h-6 w-6"
                        delay="0.9s"
                        duration="2s"
                    />
                    <Sparkle
                        className="left-[12%] top-[92%] z-30 h-6 w-6"
                        delay="0.9s"
                        duration="2s"
                    />
                    <Sparkle
                        className="left-[2%] top-[42%] z-30 h-4 w-4"
                        delay="1.3s"
                        duration="1.7s"
                    />
                </div>

                <div className="w-[40rem]" ref={clickAnywhereRef}>
                    <img
                        src={ClickANYHWHERE}
                        alt="Click anywhere"
                        className="block h-auto w-full"
                    />
                </div>
            </div>

            <div className="relative h-screen w-screen max-w-[20000px] overflow-hidden">
                <img
                    ref={titleRef}
                    src={titleFR}
                    alt="Fragment Recovered"
                    className="pointer-events-none absolute left-[7%] top-[12%] w-[600px] -rotate-[4deg] select-none"
                />

                <Sparkle
                    className="left-[29%] top-[13%] h-9 w-9"
                    duration="2.2s"
                />
                <Sparkle
                    className="left-[11%] top-[37%] h-5 w-5"
                    delay="0.5s"
                    duration="1.9s"
                />

                <p className="absolute right-[3%] top-[16%] z-10 w-[30%] text-right text-3xl font-semibold">
                    Save this fragment carefully.
                    <br />
                    Hurufnya tidak disimpan di sistem.
                </p>

                <div
                    ref={timerRef}
                    className="absolute left-[10%] top-[52%] w-[26%]"
                >
                    <div className="relative">
                        <img
                            src={splashFR}
                            alt="splash"
                            className="pointer-events-none w-[450.8358388215658px] select-none"
                        />
                        <span className="absolute inset-0 right-[12%] flex rotate-[15deg] items-center justify-center font-['Arsenal'] text-8xl font-black text-yellow-300">
                            {secondsLeft}
                        </span>
                    </div>
                    <img
                        src={secondFR}
                        alt="Second"
                        className="pointer-events-none relative bottom-[175px] left-[165px] w-[208px] select-none"
                    />
                </div>

                <div
                    ref={fragmentRef}
                    className="absolute bottom-[20%] right-[2%] z-0"
                >
                    <img
                        src={silkFR}
                        alt="silk"
                        className="pointer-events-none relative left-[10px] top-[110px] z-10 w-[730.67px] select-none"
                    />

                    <img
                        src={stoneFR}
                        alt="stone"
                        className="pointer-events-none absolute -bottom-[30px] left-[15%] z-0 h-auto w-[500px] select-none"
                    />

                    <Sparkle
                        className="right-[8%] top-[6%] z-20 h-6 w-6"
                        delay="0.9s"
                        duration="2s"
                    />
                    <Sparkle
                        className="right-[2%] top-[42%] z-20 h-4 w-4"
                        delay="1.3s"
                        duration="1.7s"
                    />

                    <div className="absolute bottom-[20%] left-[25%] top-[5%] z-20 flex justify-center gap-4">
                        {letters.map((letter, index) => (
                            <div
                                key={`${letter}-${index}`}
                                className="text-bold z-20 w-[210px] font-['Arsenal'] text-[20rem] text-[#F8FB70] [-webkit-text-stroke:12px_#000]"
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* </div> */}
        </main>
    );
}
