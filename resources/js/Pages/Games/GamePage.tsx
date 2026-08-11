import { games, type GameSlug } from '@/data/games';
import {
    completeGame,
    getGameQuestions,
    startGame,
    type CoreLogicQuestionData,
    type DataTraceQuestionData,
    type SignalDecoderQuestions,
} from '@/services/gameApi';
import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import CircleWipe, { CircleWipeHandle } from '@/Components/global/CircleWipe';
import { useMusic } from '@/Components/global/MusicProvider';
import gsap from 'gsap';
import MusicButton from '../../assets/icons/MusicButton.svg?react';
import MusicButton2 from '../../assets/icons/MusicButton2.svg?react';
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
    finishGame: (payload?: Record<string, unknown>) => void;
};

type PuzzleQuestions =
    | SignalDecoderQuestions
    | DataTraceQuestionData[]
    | CoreLogicQuestionData[];

export default function GamePage({ gameSlug }: Props) {
    const [step, setStep] = useState<GameStep>('puzzle');
    const [letters, setLetters] = useState<string[]>([]);
    const [questions, setQuestions] = useState<PuzzleQuestions | null>(null);
    const game = games.find((item) => item.slug === gameSlug);
    const wipeRef = useRef<CircleWipeHandle>(null);
    const { toggle: toggleMusic, isPlaying } = useMusic();
    const musicIconRef = useRef<HTMLSpanElement>(null);

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

    // Fetch this game's question content from the server. Reconstruct Identity
    // has none — it fetches its own target word data separately.
    useEffect(() => {
        setQuestions(null);

        if (gameSlug === 'reconstruct-identity') return;

        let cancelled = false;

        getGameQuestions<PuzzleQuestions>(gameSlug)
            .then((data) => {
                if (!cancelled) setQuestions(data);
            })
            .catch(() => {
                // best-effort — the puzzle page below stays covered by the wipe
                // until this resolves, so a slow/failed fetch just delays entry.
            });

        return () => {
            cancelled = true;
        };
    }, [gameSlug]);

    const retrieveFragments = async (payload?: Record<string, unknown>) => {
        const teamId = Number(sessionStorage.getItem('teamId'));

        if (!teamId) {
            alert('Team not found. Please enter your unique code again.');
            router.visit('/games');
            return;
        }

        const result = await completeGame(gameSlug, payload);

        setLetters(result.letters);
    };

    const finishGame = (payload?: Record<string, unknown>) => {
        if (isFinalGame) {
            transitionToStep('final');
            return;
        }

        retrieveFragments(payload);
        transitionToStep('fragment');
    };

    const isFinalGame = gameSlug === 'reconstruct-identity';

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
        <>
            <Head title={game.title} />
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
            </button>{' '}
            <CircleWipe ref={wipeRef} duration={1.5} />
            {step === 'puzzle' && gameSlug === 'signal-decoder' && questions && (
                <SignalDecoderPage
                    gameSlug={gameSlug}
                    finishGame={finishGame}
                    clues={questions as SignalDecoderQuestions}
                />
            )}
            {step === 'puzzle' && gameSlug === 'data-trace' && questions && (
                <DataTracePage
                    gameSlug={gameSlug}
                    finishGame={finishGame}
                    questions={questions as DataTraceQuestionData[]}
                />
            )}
            {step === 'puzzle' && gameSlug === 'core-logic-test' && questions && (
                <CoreLogicTestPage
                    gameSlug={gameSlug}
                    finishGame={finishGame}
                    questions={questions as CoreLogicQuestionData[]}
                />
            )}
            {step === 'puzzle' && gameSlug === 'reconstruct-identity' && (
                <ReconstructIdentityPage
                    gameSlug={gameSlug}
                    finishGame={finishGame}
                />
            )}
            {step === 'fragment' && (
                <FragmentRevealPage game={game.title} letters={letters} />
            )}
            {step === 'final' && <FinalPage />}
        </>
    );
}
