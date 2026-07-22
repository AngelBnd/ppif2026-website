import { games, type GameSlug } from '@/data/games';
import { mockGetCompletedGames } from '@/services/mockGameApi';
import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import CodieLoading from '@/assets/games/hub/codieLoading.svg';
import CoreLogic from '@/assets/games/hub/CoreLogic.svg';
import CoreLogicL from '@/assets/games/hub/CoreLogicLocked.svg';
import DataTrace from '@/assets/games/hub/DataTrace.svg';
import DataTraceL from '@/assets/games/hub/DataTraceLocked.svg';
import Finger from '@/assets/games/hub/Finger.svg';
import Fingers from '@/assets/games/hub/Fingers.svg';
import Phone from '@/assets/games/hub/GamesPhone.svg';
import PhoneScreen from '@/assets/games/hub/PhoneScreen.svg';
import ReconstructIdentity from '@/assets/games/hub/ReconstructIdentity.svg';
import ReconstructIdentityL from '@/assets/games/hub/ReconstructIdentityLocked.svg';
import SignalDecoder from '@/assets/games/hub/SignalDecoder.svg';
import SignalDecoderL from '@/assets/games/hub/SignalDecoderLocked.svg';
import Thumb from '@/assets/games/hub/thumb.svg';
import Button from '@/Components/global/Button';
import CircleWipe, { CircleWipeHandle } from '@/Components/global/CircleWipe';
import { router } from '@inertiajs/react';

export default function GameList() {
    const [completedGames, setCompletedGames] = useState<GameSlug[]>([]);
    const [dots, setDots] = useState('.');
    const handPhoneWrapperRef = useRef<HTMLDivElement | null>(null);
    const phoneRef = useRef<HTMLDivElement | null>(null);
    const handGroupRef = useRef<HTMLDivElement | null>(null);
    const gameButtonsRef = useRef<HTMLDivElement | null>(null);
    const wipeRef = useRef<CircleWipeHandle>(null);
    const [loadingGameTitle, setLoadingGameTitle] = useState<string | null>(
        null,
    );

    const gameButtonConfig: Record<
        GameSlug,
        {
            Icon: string;
            LockedIcon: string;
            size: string;
        }
    > = {
        'signal-decoder': {
            Icon: SignalDecoder,
            LockedIcon: SignalDecoderL,
            size: 'w-[12rem]',
        },
        'data-trace': {
            Icon: DataTrace,
            LockedIcon: DataTraceL,
            size: 'w-[12rem]',
        },
        'core-logic-test': {
            Icon: CoreLogic,
            LockedIcon: CoreLogicL,
            size: 'w-[14rem]',
        },
        'reconstruct-identity': {
            Icon: ReconstructIdentity,
            LockedIcon: ReconstructIdentityL,
            size: 'w-[16rem]',
        },
    };

    useEffect(() => {
        async function loadProgress() {
            const teamId = Number(sessionStorage.getItem('teamId'));

            if (!teamId) return;

            const completed = await mockGetCompletedGames(teamId);
            setCompletedGames(completed);
        }

        loadProgress();
    }, []);

    const isUnlocked = (unlocksAfter?: GameSlug) => {
        if (!unlocksAfter) return true;
        return completedGames.includes(unlocksAfter);
    };

    const handleOpenGame = (game: (typeof games)[number]) => {
        const unlocked = isUnlocked(game.unlocksAfter);
        if (!unlocked) return;
        setLoadingGameTitle(game.title);

        wipeRef.current?.leave(() => {
            router.visit(game.path);
        });
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const phone = phoneRef.current;
            const hand = handGroupRef.current;
            const buttons =
                gameButtonsRef.current?.querySelectorAll<HTMLElement>(
                    '[data-game-button]',
                );

            if (!phone || !hand || !buttons) return;

            const startY = window.innerHeight + 120;

            const masterTl = gsap.timeline();

            masterTl.set(phone, {
                y: startY,
                rotation: 35,
                transformOrigin: 'bottom center',
            });

            masterTl.set(hand, {
                y: startY,
                rotation: 35,
                transformOrigin: 'bottom center',
            });

            masterTl.to(
                phone,
                {
                    y: 0,
                    rotation: 0,
                    duration: 1,
                    ease: 'power3.out',
                },
                0,
            );

            masterTl.to(
                hand,
                {
                    y: 0,
                    rotation: 0,
                    duration: 1,
                    ease: 'power3.out',
                },
                0.03,
            );
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!loadingGameTitle) return;

        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'));
        }, 400);

        return () => clearInterval(interval);
    }, [loadingGameTitle]);

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden overflow-y-hidden text-white">
            <CircleWipe ref={wipeRef} duration={1.5} initialScale={20} />
            <div className="relative z-20 flex min-h-screen w-screen items-center justify-center overflow-hidden">
                <div
                    ref={handPhoneWrapperRef}
                    className="relative h-[45rem] w-[70rem]"
                >
                    {/* Phone */}
                    <div
                        ref={phoneRef}
                        className="absolute -top-8 right-10 z-20 w-[70rem]"
                    >
                        {loadingGameTitle ? (
                            <></>
                        ) : (
                            <img src={PhoneScreen} alt="" draggable={false} className="absolute block h-auto w-full select-none" />
                        )}

                        <img src={Phone} alt="" draggable={false} className="block h-auto w-full select-none" />

                        {/* Game buttons on top of phone */}
                        {loadingGameTitle ? (
                            <div className="absolute left-[20%] top-[20%] z-30 flex h-[28rem] w-[42rem] rotate-[8deg] flex-col items-center justify-center">
                                <img src={CodieLoading} alt="" draggable={false} className="select-none" />

                                <p className="mt-2 text-center font-arsenal text-4xl font-bold tracking-widest text-white">
                                    Loading {loadingGameTitle} {dots}
                                </p>
                            </div>
                        ) : (
                            <div className="absolute left-[15%] top-[25%] z-30 flex rotate-[8deg] flex-col items-center">
                                <div
                                    ref={gameButtonsRef}
                                    className="grid grid-cols-3 place-items-center gap-x-4"
                                >
                                    {games.slice(0, 4).map((game, index) => {
                                        const locked = !isUnlocked(
                                            game.unlocksAfter,
                                        );

                                        const config =
                                            gameButtonConfig[game.slug];
                                        const GameIcon = locked
                                            ? config.LockedIcon
                                            : config.Icon;

                                        return (
                                            <div
                                                key={game.id}
                                                data-game-button
                                                className={`${index === 3 ? 'col-start-2 -mt-12' : ''}`}
                                            >
                                                <Button
                                                    onClick={() => {
                                                        if (!locked)
                                                            handleOpenGame(
                                                                game,
                                                            );
                                                    }}
                                                    Icon={GameIcon}
                                                    iconClassName="block h-auto w-full"
                                                    className={`transition ${config.size} ${
                                                        locked
                                                            ? 'pointer-events-none scale-90 cursor-not-allowed'
                                                            : 'hover:scale-105 active:scale-95'
                                                    }`}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Hand pieces */}
                    <div
                        ref={handGroupRef}
                        className="pointer-events-none absolute inset-0 z-40"
                    >
                        <div className="absolute -bottom-[7.2rem] right-[2.5rem] z-30 w-[53rem]">
                            <img src={Thumb} alt="" draggable={false} className="block h-auto w-full select-none" />
                        </div>

                        <div className="absolute right-[12rem] top-[-0.5rem] z-40 w-[24.5rem]">
                            <img src={Fingers} alt="" draggable={false} className="block h-auto w-full select-none" />
                        </div>

                        <div className="absolute -top-[2rem] left-[18rem] z-10 w-[9rem]">
                            <img src={Finger} alt="" draggable={false} className="block h-auto w-full select-none" />
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </main>
    );
}
