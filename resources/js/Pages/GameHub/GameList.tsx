import { games, type GameSlug } from '@/data/games';
import { mockGetCompletedGames } from '@/services/mockGameApi';
import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import CoreLogicPage from '../Games/CoreLogicTest/CoreLogicTestPage';
import DataTracePage from '../Games/DataTrace/DataTracePage';
import ReconstructIdentityPage from '../Games/ReconstructIdentity/ReconstructIdentityPage';
import SignalDecoderPage from '../Games/SignalDecoder/SignalDecoderPage';

import CodieLoading from '@/assets/games/hub/codieLoading.svg?react';
import CoreLogic from '@/assets/games/hub/CoreLogic.svg?react';
import CoreLogicL from '@/assets/games/hub/CoreLogicLocked.svg?react';
import DataTrace from '@/assets/games/hub/DataTrace.svg?react';
import DataTraceL from '@/assets/games/hub/DataTraceLocked.svg?react';
import Finger from '@/assets/games/hub/Finger.svg?react';
import Fingers from '@/assets/games/hub/Fingers.svg?react';
import Phone from '@/assets/games/hub/GamesPhone.svg?react';
import PhoneScreen from '@/assets/games/hub/PhoneScreen.svg?react';
import ReconstructIdentity from '@/assets/games/hub/ReconstructIdentity.svg?react';
import ReconstructIdentityL from '@/assets/games/hub/ReconstructIdentityLocked.svg?react';
import SignalDecoder from '@/assets/games/hub/SignalDecoder.svg?react';
import SignalDecoderL from '@/assets/games/hub/SignalDecoderLocked.svg?react';
import Thumb from '@/assets/games/hub/thumb.svg?react';
import Button from '@/Components/global/Button';
import { router } from '@inertiajs/react';

export default function GameList() {
    const [completedGames, setCompletedGames] = useState<GameSlug[]>([]);
    const [selectedGame, setSelectedGame] = useState<GameSlug | null>(null);
    const handPhoneWrapperRef = useRef<HTMLDivElement | null>(null);
    const phoneRef = useRef<HTMLDivElement | null>(null);
    const handGroupRef = useRef<HTMLDivElement | null>(null);
    const gameButtonsRef = useRef<HTMLDivElement | null>(null);
    const [loadingGameTitle, setLoadingGameTitle] = useState<string | null>(
        null,
    );

    const gamePreviewPages: Record<GameSlug, React.ComponentType<any>> = {
        'signal-decoder': SignalDecoderPage,
        'data-trace': DataTracePage,
        'core-logic-test': CoreLogicPage,
        'reconstruct-identity': ReconstructIdentityPage,
    };

    const gameButtonConfig: Record<
        GameSlug,
        {
            Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
            LockedIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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

    const SelectedPreview = selectedGame
        ? gamePreviewPages[selectedGame]
        : null;

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
        setSelectedGame(game.slug);
        if (!unlocked) return;
        setLoadingGameTitle(game.title);
        const wrapper = handPhoneWrapperRef.current;

        if (!wrapper) {
            router.visit(game.path);
            return;
        }
        const tl = gsap.timeline();

        tl.to(wrapper, {
            scale: 1.8,
            x: '3vw',
            y: '2vh',
            rotation: -10,
            duration: 1.95,
            ease: 'power3.inOut',
            transformOrigin: 'center center',
            onComplete: () => {
                router.visit(game.path);
            },
        });
        tl.to(
            wrapper,
            {
                opacity: 0,
                duration: 1,
            },
            '-=1.05',
        );
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

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden overflow-y-hidden text-white">
            {SelectedPreview && (
                // <div className="absolute inset-0 !z-0">
                //     <SelectedPreview
                //         gameSlug={selectedGame}
                //         finishGame={() => {}}
                //         isPreview
                //     />
                // </div>
                <div className="animate-in fade-in absolute !z-0 h-screen w-screen bg-[#BE202F] duration-500" />
            )}
            {/* {RenderHandPhoneWrapper && ( */}
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
                            <PhoneScreen className="absolute block h-auto w-full" />
                        )}

                        <Phone className="block h-auto w-full" />

                        {/* Game buttons on top of phone */}
                        {loadingGameTitle ? (
                            <div className="absolute left-[20%] top-[20%] z-30 flex h-[28rem] w-[42rem] rotate-[8deg] flex-col items-center justify-center">
                                <CodieLoading />

                                <p className="mt-2 text-center font-arsenal text-4xl font-bold tracking-widest text-white">
                                    Loading {loadingGameTitle}
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
                            <Thumb className="block h-auto w-full" />
                        </div>

                        <div className="absolute right-[12rem] top-[-0.5rem] z-40 w-[24.5rem]">
                            <Fingers className="block h-auto w-full" />
                        </div>

                        <div className="absolute -top-[2rem] left-[18rem] z-10 w-[9rem]">
                            <Finger className="block h-auto w-full" />
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </main>
    );
}
