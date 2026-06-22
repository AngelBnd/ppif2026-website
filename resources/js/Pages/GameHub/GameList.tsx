import { games, type GameSlug } from '@/data/games';
import { mockGetCompletedGames } from '@/services/mockGameApi';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import CoreLogicPage from '../Games/CoreLogicTest/CoreLogicTestPage';
import DataTracePage from '../Games/DataTrace/DataTracePage';
import ReconstructIdentityPage from '../Games/ReconstructIdentity/ReconstructIdentityPage';
import SignalDecoderPage from '../Games/SignalDecoder/SignalDecoderPage';

export default function GameList() {
    const [completedGames, setCompletedGames] = useState<GameSlug[]>([]);
    const [isLeaving, setIsLeaving] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameSlug | null>(null);

    const gamePreviewPages: Record<GameSlug, React.ComponentType<any>> = {
        'signal-decoder': SignalDecoderPage,
        'data-trace': DataTracePage,
        'core-logic-test': CoreLogicPage,
        'reconstruct-identity': ReconstructIdentityPage,
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
        setIsLeaving(true);

        setTimeout(() => {
            router.visit(game.path);
        }, 700);
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center px-6 text-white">
            {SelectedPreview && (
                <div className="absolute inset-0 !z-0">
                    <SelectedPreview
                        gameSlug={selectedGame}
                        finishGame={() => {}}
                        isPreview
                    />
                </div>
            )}
            <div className="relative z-20 flex min-h-screen rotate-6 items-center justify-center px-6">
                <section
                    className={`relative w-full max-w-5xl rounded-3xl border-8 border-white bg-[#c9182b] px-10 py-14 text-center shadow-2xl transition-all duration-1000 ease-in-out ${
                        isLeaving
                            ? 'scale-125 opacity-0'
                            : 'scale-100 opacity-100'
                    }`}
                >
                    <h1 className="mb-12 text-5xl font-bold tracking-widest">
                        GAMES PLACEHOLDER
                    </h1>

                    <div className="mx-auto grid max-w-3xl grid-cols-3 items-start gap-8">
                        {games.slice(0, 3).map((game) => {
                            const locked = !isUnlocked(game.unlocksAfter);

                            return (
                                <button
                                    key={game.id}
                                    disabled={locked}
                                    onClick={() => handleOpenGame(game)}
                                    className={`group flex flex-col items-center transition ${
                                        locked
                                            ? 'cursor-not-allowed opacity-40'
                                            : 'hover:scale-105 active:scale-95'
                                    }`}
                                >
                                    <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-black/20">
                                        <span className="text-3xl">
                                            {locked ? '🔒' : '?'}
                                        </span>
                                    </div>
                                    <div className="-rotate-3 border-4 border-white bg-[#111827] px-4 py-2 shadow-lg">
                                        <p className="text-lg font-black uppercase leading-none">
                                            {game.title}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-12 flex justify-center">
                        {games[3] &&
                            (() => {
                                const game = games[3];
                                const locked = !isUnlocked(game.unlocksAfter);

                                return (
                                    <button
                                        disabled={locked}
                                        onClick={() => handleOpenGame(game)}
                                        className={`group flex flex-col items-center transition ${
                                            locked
                                                ? 'cursor-not-allowed opacity-40'
                                                : 'hover:scale-105 active:scale-95'
                                        }`}
                                    >
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-black/20">
                                            <span className="text-3xl">
                                                {locked ? '🔒' : '?'}
                                            </span>
                                        </div>

                                        <div className="rotate-2 border-4 border-white bg-[#111827] px-5 py-2 shadow-lg">
                                            <p className="text-xl font-black lowercase tracking-wide">
                                                {game.title}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })()}
                    </div>
                </section>
            </div>
        </main>
    );
}
