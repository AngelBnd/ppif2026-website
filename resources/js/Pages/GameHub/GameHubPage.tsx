import BackButton from '@/assets/icons/BackButtonSVG.svg';
import Button from '@/Components/global/Button';
import { router } from '@inertiajs/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import ErrorGimmick from './ErrorGimmick';
import GameList from './GameList';
import InputUniqueCode from './UniqueCodeForm';

type GameHubScreen = 'join' | 'games' | 'errorGimmick';

export default function GameHubPage() {
    // Story now lives at /games/story, so the hub starts at the join step
    // (or straight to the game list when the team is already known).
    const [screen, setScreen] = useState<GameHubScreen>(() => {
        const teamId = sessionStorage.getItem('teamId');
        return teamId ? 'games' : 'join';
    });

    const wipeRef = useRef<HTMLDivElement>(null);

    // Red/black skewed wipe: sweeps in to cover, swaps the screen while covered,
    // then sweeps out to reveal the new screen. Lives here (not in a screen)
    // so the panel survives the swap that unmounts the old screen.
    const transitionToScreen = (next: GameHubScreen) => {
        const wipeEl = wipeRef.current;
        if (!wipeEl) {
            setScreen(next);
            return;
        }

        const tl = gsap.timeline();
        tl.set(wipeEl, { display: 'block', xPercent: 120 })
            .to(wipeEl, {
                xPercent: 0,
                duration: 0.5,
                ease: 'power4.inOut',
                onComplete: () => setScreen(next),
            })
            .to(wipeEl, {
                xPercent: -120,
                duration: 0.55,
                delay: 0.15,
                ease: 'power4.inOut',
                onComplete: () => gsap.set(wipeEl, { display: 'none' }),
            });
    };

    const handleBack = () => {
        if (screen === 'join') {
            router.visit('/games/story');
            return;
        }

        router.visit('/');
    };

    return (
        <main className="z-50 h-screen w-screen overflow-hidden">
            <Button
                onClick={handleBack}
                Icon={BackButton}
                className="bg absolute bottom-6 left-6 z-30"
                iconStyle={{ width: 'clamp(5.4rem, 26.4vh, 12rem)' }}
                iconClassName="w-full"
            />
            {screen === 'join' && (
                <InputUniqueCode onJoined={() => setScreen('errorGimmick')} />
            )}
            {screen === 'errorGimmick' && (
                <ErrorGimmick onJoined={() => transitionToScreen('games')} />
            )}

            {screen === 'games' && <GameList />}

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
        </main>
    );
}
