import { games, type GameSlug } from '@/data/games';
import { mockGetCompletedGames } from '@/services/mockGameApi';
import { router } from '@inertiajs/react';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import CoreLogicPage from '../Games/CoreLogicTest/CoreLogicTestPage';
import DataTracePage from '../Games/DataTrace/DataTracePage';
import ReconstructIdentityPage from '../Games/ReconstructIdentity/ReconstructIdentityPage';
import SignalDecoderPage from '../Games/SignalDecoder/SignalDecoderPage';

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

export default function GameList() {
    const [completedGames, setCompletedGames] = useState<GameSlug[]>([]);
    const [isLeaving, setIsLeaving] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameSlug | null>(null);
    const handPhoneWrapperRef = useRef<HTMLDivElement | null>(null);
    const phoneRef = useRef<HTMLDivElement | null>(null);
    const thumbRef = useRef<HTMLDivElement | null>(null);
    const fingersRef = useRef<HTMLDivElement | null>(null);
    const fingerRef = useRef<HTMLDivElement | null>(null);

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

        const wrapper = handPhoneWrapperRef.current;

        setIsLeaving(true);

        if (wrapper) {
            gsap.to(wrapper, {
                scale: 2.4,
                rotate: -8,
                x: '-18vw',
                y: '-8vh',
                opacity: 0,
                duration: 0.7,
                ease: 'power3.inOut',
                transformOrigin: 'center center',
                onComplete: () => {
                    router.visit(game.path);
                },
            });

            return;
        }

        router.visit(game.path);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const phone = phoneRef.current;
            const thumb = thumbRef.current;
            const fingers = fingersRef.current;
            const finger = fingerRef.current;

            if (!phone || !thumb || !fingers || !finger) return;

            gsap.set([phone, thumb, fingers, finger], {
                transformOrigin: 'bottom center',
            });

            gsap.set(phone, {
                y: 260,
                rotate: 18,
                opacity: 0,
            });

            gsap.set([thumb, fingers, finger], {
                y: 300,
                rotate: 24,
                opacity: 0,
            });

            const tl = gsap.timeline();

            tl.to(phone, {
                y: 0,
                rotate: 0,
                opacity: 1,
                duration: 1.1,
                ease: 'back.out(1.35)',
            });

            tl.to(
                [thumb, fingers, finger],
                {
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                    duration: 1.15,
                    stagger: 0.04,
                    ease: 'back.out(1.9)',
                },
                '-=0.9',
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden overflow-y-hidden text-white">
            {SelectedPreview && (
                <div className="absolute inset-0 !z-0">
                    <SelectedPreview
                        gameSlug={selectedGame}
                        finishGame={() => {}}
                        isPreview
                    />
                </div>
            )}
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
                        <PhoneScreen className="absolute block h-auto w-full" />
                        <Phone className="block h-auto w-full" />

                        {/* Game buttons on top of phone */}
                        <div className="absolute left-[15%] top-[25%] z-30 flex rotate-[8deg] flex-col items-center">
                            <div className="grid grid-cols-3 place-items-center gap-x-4">
                                {games.slice(0, 4).map((game, index) => {
                                    const locked = !isUnlocked(
                                        game.unlocksAfter,
                                    );

                                    const config = gameButtonConfig[game.slug];
                                    const GameIcon = locked
                                        ? config.LockedIcon
                                        : config.Icon;

                                    return (
                                        <Button
                                            key={game.id}
                                            onClick={() => {
                                                if (!locked)
                                                    handleOpenGame(game);
                                            }}
                                            Icon={GameIcon}
                                            iconClassName="block h-auto w-full"
                                            className={`transition ${config.size} ${
                                                index === 3
                                                    ? 'col-start-2 -mt-12'
                                                    : ''
                                            } ${
                                                locked
                                                    ? 'pointer-events-none cursor-not-allowed'
                                                    : 'hover:scale-105 active:scale-95'
                                            }`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Hand pieces */}
                    <div
                        ref={thumbRef}
                        className="pointer-events-none absolute -bottom-[7rem] right-[2.5rem] z-30 w-[53rem]"
                    >
                        <Thumb className="block h-auto w-full" />
                    </div>

                    <div
                        ref={fingersRef}
                        className="pointer-events-none absolute right-[12rem] top-[-0.5rem] z-40 w-[24.8rem]"
                    >
                        <Fingers className="block h-auto w-full" />
                    </div>

                    <div
                        ref={fingerRef}
                        className="pointer-events-none absolute -top-[1rem] left-[18rem] z-10 w-[9rem]"
                    >
                        <Finger className="block h-auto w-full" />
                    </div>
                </div>
            </div>
        </main>
    );
}
