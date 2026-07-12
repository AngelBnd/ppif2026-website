import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import lightningFR from '../../../assets/games/fragmentReveal/lightningFR.webp';
import silkFR from '../../../assets/games/fragmentReveal/silkFR.webp';
import secondFR from '../../../assets/games/fragmentReveal/secondFR.webp';
import splashFR from '../../../assets/games/fragmentReveal/splashFR.webp';
import stoneFR from '../../../assets/games/fragmentReveal/stoneFR.webp';
import titleFR from '../../../assets/games/fragmentReveal/titleFR.webp';

type Props = {
    letters: string[];
    countdownSeconds?: number;
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

export default function FragmentRevealPage({ letters, countdownSeconds = 3 }: Props) {
    const [secondsLeft, setSecondsLeft] = useState(countdownSeconds);
    const [lightningLanded, setLightningLanded] = useState(false);

    useEffect(() => {
        if (secondsLeft <= 0) {
            router.visit('/games');
            return;
        }
        const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
        return () => window.clearTimeout(timer);
    }, [secondsLeft]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
            <style>{`
                @keyframes sparkle-twinkle {
                    0%, 100% { opacity: 0.15; transform: scale(0.55) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1.15) rotate(20deg); }
                }
                @keyframes lightning-fade-down {
                    0% { transform: translateY(-40px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
            `}</style>

            <div className="relative aspect-[1762/1006] w-full max-w-[20000px] overflow-hidden rounded-2xl bg-[#0A0C0F]">
                <img
                    src={lightningFR}
                    alt=""
                    onAnimationEnd={() => setLightningLanded(true)}
                    className="pointer-events-none absolute -bottom-[90px] h-[1145px] w-[1742.5px] select-none [animation:lightning-fade-down_0.6s_ease-out_forwards]"
                />

                <img
                    src={titleFR}
                    alt="Fragment Recovered"
                    className={`pointer-events-none absolute left-[7%] top-[12%] w-[800px] -rotate-[4deg] select-none transition-opacity duration-700 ease-out ${
                        lightningLanded ? 'opacity-100' : 'opacity-0'
                    }`}
                />

                <Sparkle className="left-[29%] top-[13%] h-9 w-9" duration="2.2s" />
                <Sparkle className="left-[11%] top-[37%] h-5 w-5" delay="0.5s" duration="1.9s" />

                <p className="absolute right-[3%] top-[16%] z-10 w-[30%] text-right text-3xl font-semibold">
                    Save this fragment carefully.
                    <br />
                    Hurufnya tidak disimpan di sistem.
                </p>

                <div
                    className={`absolute left-[10%] top-[52%] w-[26%] transition-opacity duration-700 ease-out ${
                        lightningLanded ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="relative">
                        <img src={splashFR} alt="splash" className="pointer-events-none w-[450.8358388215658px] select-none" />
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
                    className={`absolute bottom-[20%] right-[2%] z-0 transition-opacity duration-700 ease-out ${
                        lightningLanded ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={silkFR}
                        alt="silk"
                        className="pointer-events-none relative left-[20px] top-[110px] z-10 w-[730.67px] select-none"
                    />

                    <img
                        src={stoneFR}
                        alt="stone"
                        className="pointer-events-none absolute -bottom-[60px] left-[10%] z-0 h-[615.8341674804688px] w-[625.25px] select-none"
                    />

                    <Sparkle className="right-[8%] top-[6%] h-6 w-6 z-20" delay="0.9s" duration="2s" />
                    <Sparkle className="right-[2%] top-[42%] h-4 w-4 z-20" delay="1.3s" duration="1.7s" />

                    <div className="left-[30%] top-[5%] z-20 absolute bottom-[20%] flex justify-center">
                        {letters.map((letter, index) => (
                            <div
                                key={`${letter}-${index}`}
                                className="z-20 w-[210px] font-['Arsenal'] text-bold text-[20rem] text-[#F8FB70] [-webkit-text-stroke:12px_#000]"
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}