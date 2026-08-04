import Button from '@/Components/global/Button';

import { getRevealedName } from '@/services/gameApi';
import { useEffect, useState } from 'react';
import backgroundFinal from '../../../assets/games/finalPage/finalPage.webp';
import BackButton from '@/assets/icons/BackButtonSVG.svg';
import { router } from '@inertiajs/react';

import logo from '../../../assets/games/finalPage/logoStella.webp';
// import logo from '../../../assets/games/finalPage/logoNexus.webp';
// import logo from '../../../assets/games/finalPage/logoCosmo.webp';

type Props = {
    onJoined: () => void;
};

export default function ErrorGimmick({ onJoined }: Props) {
    const [targetWord, setTargetWord] = useState('');
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

            <Button
                onClick={() => {
                    router.visit('/');
                }}
                Icon={BackButton}
                className="absolute bottom-4 left-6 z-30 w-[12rem]"
                iconClassName="w-full"
            />

            <section className="right-[3%] bottom-[32%] flex items-center justify-center gap-6">
                <div className="logo-fade-in absolute top-[40%] left-[39%] h-[670px] w-[1067.5008px] -rotate-9 overflow-hidden">
                    <img
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        className="glitch-layer glitch-r h-full w-full object-contain"
                    />
                    <img
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        className="glitch-layer glitch-b h-full w-full object-contain"
                    />
                    <img
                        src={logo}
                        alt="logo"
                        className="glitch-layer glitch-base h-full w-full object-contain"
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