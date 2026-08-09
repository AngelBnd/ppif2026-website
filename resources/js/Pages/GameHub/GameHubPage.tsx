import BackButton from '@/assets/icons/BackButtonSVG.svg';
import Button from '@/Components/global/Button';
import { useMusic } from '@/Components/global/MusicProvider';
import { Head, router } from '@inertiajs/react';
import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MusicButton from '../../assets/icons/MusicButton.svg?react';
import MusicButton2 from '../../assets/icons/MusicButton2.svg?react';
import ErrorGimmick from './ErrorGimmick';
import GameList from './GameList';
import InputUniqueCode from './UniqueCodeForm';
type GameHubScreen = 'join' | 'games' | 'errorGimmick';

export default function GameHubPage() {
    const { toggle: toggleMusic, isPlaying } = useMusic();
    const musicIconRef = useRef<HTMLSpanElement>(null);
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

    // Continue the wipe handed off from the storyline: arriving from the
    // "I'm Ready"/skip flow, the screen is conceptually still covered — so start
    // covered and sweep out to reveal the hub. useLayoutEffect applies the cover
    // before paint so there's no flash of the uncovered page.
    useLayoutEffect(() => {
        if (sessionStorage.getItem('gamesWipeIn') !== '1') return;
        sessionStorage.removeItem('gamesWipeIn');

        const wipeEl = wipeRef.current;
        if (!wipeEl) return;

        gsap.set(wipeEl, { display: 'block', xPercent: 0 });
        gsap.to(wipeEl, {
            xPercent: -120,
            duration: 0.55,
            ease: 'power4.inOut',
            onComplete: () => gsap.set(wipeEl, { display: 'none' }),
        });
    }, []);

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
        <main className="z-50 h-screen w-screen overflow-hidden">
            <Head title="Games" />
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

            <Button
                onClick={handleBack}
                Icon={BackButton}
                back
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
