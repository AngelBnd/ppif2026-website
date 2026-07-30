import { games, type GameSlug } from '@/data/games';
import { completeGame, startGame } from '@/services/gameApi';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import CircleWipe, { CircleWipeHandle } from '@/Components/global/CircleWipe';
import CoreLogicTestPage from './CoreLogicTest/CoreLogicTestPage';
import DataTracePage from './DataTrace/DataTracePage';
import ReconstructIdentityPage from './ReconstructIdentity/ReconstructIdentityPage';
import FinalPage from './Shared/FInalPage';
import FragmentRevealPage from './Shared/FragmentRevealPage';
import SignalDecoderPage from './SignalDecoder/SignalDecoderPage';

type Props = {
    gameSlug: GameSlug;
};

type GameStep = 'puzzle' | 'result' | 'fragment' | 'final';

export type GamePageChildProps = {
    gameSlug: GameSlug;
    finishGame: () => void;
};

export default function GamePage({ gameSlug }: Props) {
    const [step, setStep] = useState<GameStep>('puzzle');
    const [letters, setLetters] = useState<string[]>([]);
    const game = games.find((item) => item.slug === gameSlug);
    const wipeRef = useRef<CircleWipeHandle>(null);

    function transitionToStep(nextStep: typeof step) {
        wipeRef.current?.leave(() => {
            setStep(nextStep);
            requestAnimationFrame(() => {
                wipeRef.current?.enter();
            });
        });
    }

    if (!game) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black text-white">
                <h1 className="text-4xl font-bold">Game not found</h1>
            </main>
        );
    }

    useEffect(() => {
        wipeRef.current?.enter();
    }, []);

    // Start the server-side timer for this game the moment its screen opens.
    // Time spent choosing games on the hub is never inside a start/complete
    // window, so it is excluded from the total completion time.
    useEffect(() => {
        startGame(gameSlug);
    }, [gameSlug]);

    const retrieveFragments = async () => {
        const teamId = Number(sessionStorage.getItem('teamId'));

        if (!teamId) {
            alert('Team not found. Please enter your unique code again.');
            router.visit('/games');
            return;
        }

        const answers =
            gameSlug === 'core-logic-test'
                ? (JSON.parse(
                      sessionStorage.getItem('core_logic_answers') || '[]',
                  ) as number[])
                : undefined;

        const result = await completeGame(
            gameSlug,
            answers !== undefined ? { answers } : undefined,
        );

        setLetters(result.letters);
    };

    const finishGame = () => {
        if (isFinalGame) {
            transitionToStep('final');
            return;
        }

        retrieveFragments();
        transitionToStep('fragment');
    };

    const gamePages: Record<
        GameSlug,
        React.ComponentType<GamePageChildProps>
    > = {
        'signal-decoder': SignalDecoderPage,
        'data-trace': DataTracePage,
        'core-logic-test': CoreLogicTestPage,
        'reconstruct-identity': ReconstructIdentityPage,
    };

    const SelectedGamePage = gamePages[gameSlug];

    const isFinalGame = gameSlug === 'reconstruct-identity';

    return (
        <>
            <CircleWipe ref={wipeRef} duration={1.5} />

            {step === 'puzzle' && (
                <SelectedGamePage gameSlug={gameSlug} finishGame={finishGame} />
            )}

            {step === 'fragment' && (
                <FragmentRevealPage game={game.title} letters={letters} />
            )}

            {step === 'final' && <FinalPage />}
        </>
    );
}
