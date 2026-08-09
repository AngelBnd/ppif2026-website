import Button from '@/Components/global/Button';

import BackButton from '@/assets/icons/BackButtonSVG.svg';
import VictoryMusic from '@/Components/global/VictoryMusic';
import { getRevealedName } from '@/services/gameApi';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import backgroundFinal from '../../../assets/games/finalPage/finalPage.webp';

import Sparkle from '@/Components/game/Sparkle';
// Per-team logos live in public/webp/logotim/<teamId>.webp (served from root).
import fallbackLogo from '../../../assets/games/finalPage/logoStella.webp';

type Props = {
    onJoined?: () => void;
};

export default function ErrorGimmick({}: Props) {
    const [targetWord, setTargetWord] = useState('');

    // Resolve the team logo from the joined team's id (same key GameHub sets).
    const [logo, setLogo] = useState(fallbackLogo);
    useEffect(() => {
        const teamId = sessionStorage.getItem('teamId');
        if (teamId) {
            setLogo(`/webp/logotim/${teamId}.webp`);
        }
    }, []);

    useEffect(() => {
        async function loadTargetWord() {
            try {
                const name = await getRevealedName();
                setTargetWord(name.toUpperCase());
            } catch {
                setTargetWord('');
            }
        }

        loadTargetWord();
    }, []);

    return (
        <main
            className="relative flex min-h-screen items-end justify-end bg-black text-white"
            style={{
                backgroundImage: `url(${backgroundFinal})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <VictoryMusic />
            <Button
                onClick={() => {
                    router.visit('/');
                }}
                Icon={BackButton}
                back
                className="absolute bottom-4 left-6 z-30 w-[12rem]"
                iconClassName="w-full"
            />

            <Sparkle size={120} left="12%" top="18%" startDelay={0.4} />
            <Sparkle size={300} left="32%" top="32%" startDelay={0.4} />
            <Sparkle size={120} left="40%" top="22%" startDelay={0.4} />
            <Sparkle size={120} left="30%" top="82%" startDelay={0.4} />

            <Sparkle size={320} left="80%" top="25%" startDelay={2.8} />

            <Sparkle size={45} left="45%" top="65%" startDelay={5.1} />

            <section className="relative flex h-screen w-screen items-center justify-center">
                <div className="logo-fade-in absolute bottom-[55%] right-[-20%] w-[50%] -translate-x-1/2 -rotate-12">
                    <img
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        className="glitch-layer glitch-r block h-auto w-full object-contain"
                    />
                    <img
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        className="glitch-layer glitch-b block h-auto w-full object-contain"
                    />
                    <img
                        src={logo}
                        alt="logo"
                        className="glitch-layer glitch-base block h-auto w-full object-contain"
                    />
                </div>
            </section>
            <style>{`
                .logo-fade-in {
                    opacity: 0;
                    animation: fadeIn 1.2s ease-out forwards;
                }
                .glitch-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .glitch-base {
                    filter: blur(1px) contrast(1.1);
                    animation: glitchFlicker 2.5s infinite;
                    animation-delay: 1.2s;
                }
                .glitch-r {
                    filter: sepia(1) saturate(6) hue-rotate(-50deg);
                    mix-blend-mode: screen;
                    opacity: 0.75;
                    animation: glitchR 1.8s infinite;
                    animation-delay: 1.2s;
                }
                .glitch-b {
                    filter: sepia(1) saturate(6) hue-rotate(150deg);
                    mix-blend-mode: screen;
                    opacity: 0.75;
                    animation: glitchB 1.8s infinite;
                    animation-delay: 1.2s;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes glitchFlicker {
                    0%, 100% { opacity: 1; }
                    45% { opacity: 1; }
                    46% { opacity: 0.3; }
                    47% { opacity: 1; }
                    48% { opacity: 0.5; }
                    49% { opacity: 1; }
                }
                @keyframes glitchR {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(-6px, 1px); }
                    40% { transform: translate(4px, -2px); }
                    60% { transform: translate(-3px, 2px); }
                    80% { transform: translate(5px, 0); }
                }
                @keyframes glitchB {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(6px, -1px); }
                    40% { transform: translate(-4px, 2px); }
                    60% { transform: translate(3px, -2px); }
                    80% { transform: translate(-5px, 0); }
                }
            `}</style>
        </main>
    );
}
