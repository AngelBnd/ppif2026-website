import InputBorderBottom from '@/assets/games/hub/InputBorderBottomSVG.svg?react';
import { getMyTeam, guessReconstruct } from '@/services/gameApi';
import gsap from 'gsap';
import {
    useEffect,
    useRef,
    useState,
    type ClipboardEvent,
    type KeyboardEvent,
} from 'react';
import stripID from '../../../assets/games/reconstructIdentity/stripID.webp';
import titleID from '../../../assets/games/reconstructIdentity/titleID.webp';
import type { GamePageChildProps } from '../GamePage';

const INPUT_CLASSES =
    "relative z-10 h-full w-full appearance-none border-0 bg-transparent pt-3 text-center text-9xl text-white caret-white font-noto " +
    'font-bold outline-none ring-0 shadow-none focus:outline-none focus:ring-0 ' +
    'focus:border-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none [-webkit-tap-highlight-color:transparent]';

type GuessStatus = 'playing' | 'wrong' | 'correct';

export default function ReconstructIdentityPage({
    finishGame,
}: GamePageChildProps) {
    const [letters, setLetters] = useState<string[]>([]);
    const [nameLength, setNameLength] = useState(0);
    const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState<GuessStatus>('playing');
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const inputAreaRef = useRef<HTMLDivElement | null>(null);
    const isFinishingRef = useRef(false);
    const isSubmittingRef = useRef(false);
    const completionTimelineRef = useRef<gsap.core.Timeline | null>(null);

    // The answer word (its length + which letters are given for free) comes from
    // the server. The full word is never sent — the guess is validated server-side.
    useEffect(() => {
        async function loadTarget() {
            try {
                const team = await getMyTeam();
                setNameLength(team.name_length);
                setRevealedIndices(team.revealed_indices);
                setLetters(
                    Array.from({ length: team.name_length }, (_, i) =>
                        (team.revealed_letters[String(i)] ?? '').toUpperCase(),
                    ),
                );
            } catch {
                // not joined / session expired — leave the grid empty
            }
        }

        loadTarget();
    }, []);

    function findNextEditable(from: number, direction: 1 | -1) {
        let i = from + direction;
        while (i >= 0 && i < nameLength) {
            if (!revealedIndices.includes(i)) return i;
            i += direction;
        }
        return -1;
    }

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isVisible || nameLength === 0) return;
        const firstEditable = findNextEditable(-1, 1);
        inputsRef.current[firstEditable]?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, nameLength, revealedIndices]);

    useEffect(() => {
        return () => {
            completionTimelineRef.current?.kill();
        };
    }, []);

    function shakeWrong() {
        setStatus('wrong');

        if (!inputAreaRef.current) return;
        const target = inputAreaRef.current;
        gsap.killTweensOf(target);

        gsap.timeline()
            .set(target, { x: 0 })
            .to(target, { x: -12, duration: 0.05, ease: 'power1.inOut' })
            .to(target, { x: 12, duration: 0.05, ease: 'power1.inOut' })
            .to(target, { x: -8, duration: 0.05, ease: 'power1.inOut' })
            .to(target, { x: 8, duration: 0.05, ease: 'power1.inOut' })
            .to(target, { x: -4, duration: 0.04, ease: 'power1.inOut' })
            .to(target, { x: 4, duration: 0.04, ease: 'power1.inOut' })
            .to(target, { x: 0, duration: 0.04, ease: 'power1.out' });
    }

    function celebrateCorrect() {
        setStatus('correct');

        if (isFinishingRef.current) return;
        isFinishingRef.current = true;

        const inputElements = inputsRef.current.filter(Boolean);

        if (inputElements.length === 0) {
            finishGame();
            return;
        }

        inputElements.forEach((input) => {
            input.blur();
            input.disabled = true;
        });

        const timeline = gsap.timeline({
            delay: 0.2,
            onComplete: finishGame,
        });
        completionTimelineRef.current = timeline;

        timeline
            .to(inputElements, {
                backgroundColor: '#12C898',
                duration: 0.12,
                ease: 'power1.inOut',
            })
            .to(inputElements, {
                backgroundColor: 'transparent',
                duration: 0.12,
                ease: 'power1.inOut',
            })
            .to(inputElements, {
                backgroundColor: '#12C898',
                duration: 0.12,
                ease: 'power1.inOut',
            })
            .to(inputElements, {
                backgroundColor: 'transparent',
                duration: 0.12,
                ease: 'power1.inOut',
            })
            .to({}, { duration: 0.35 });
    }

    // Submit the guess to the server once every cell is filled.
    useEffect(() => {
        if (nameLength === 0 || letters.length !== nameLength) return;

        if (letters.some((letter) => letter === '')) {
            setStatus('playing');
            return;
        }

        if (isFinishingRef.current || isSubmittingRef.current) return;

        let cancelled = false;
        isSubmittingRef.current = true;

        guessReconstruct(letters.join(''))
            .then((result) => {
                if (cancelled) return;
                isSubmittingRef.current = false;

                if (result.correct) {
                    celebrateCorrect();
                } else {
                    shakeWrong();
                }
            })
            .catch(() => {
                isSubmittingRef.current = false;
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [letters, nameLength]);

    const setLetterAt = (index: number, char: string) => {
        setLetters((prev) => {
            const next = [...prev];
            next[index] = char;
            return next;
        });
    };

    const handleChange = (index: number, value: string) => {
        const char = value
            .slice(-1)
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
        setLetterAt(index, char);

        if (char) {
            const next = findNextEditable(index, 1);
            if (next !== -1) inputsRef.current[next]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === 'Backspace' && !letters[index] && index > 0) {
            const prev = findNextEditable(index, -1);
            if (prev !== -1) inputsRef.current[prev]?.focus();
        }
    };

    const handlePaste = (
        index: number,
        e: ClipboardEvent<HTMLInputElement>,
    ) => {
        const pasted = e.clipboardData
            .getData('text')
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
        if (!pasted) return;
        e.preventDefault();

        let cursor = index;
        let lastFilled = index;
        for (const char of pasted) {
            while (cursor < nameLength && revealedIndices.includes(cursor))
                cursor++;
            if (cursor >= nameLength) break;
            setLetterAt(cursor, char);
            lastFilled = cursor;
            cursor++;
        }

        inputsRef.current[lastFilled]?.focus();
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0A0C0F] text-white">
            <section className="relative flex flex-col items-center justify-center -space-y-40 text-center">
                <div
                    className={`z-10 flex items-center justify-center transition-all duration-700 ease-out ${
                        isVisible
                            ? 'scale-100 opacity-100'
                            : 'scale-75 opacity-0'
                    }`}
                >
                    <img
                        src={titleID}
                        alt="Reconstruct Identity title"
                        className="h-auto max-w-[100vw] object-contain md:max-w-[950px]"
                    />
                </div>

                <div
                    className={`relative flex items-center justify-center transition-all duration-700 ease-out ${
                        isVisible
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-12 opacity-0'
                    }`}
                >
                    <img
                        src={stripID}
                        alt="Reconstruct Identity strip"
                        className="h-auto max-w-[90vw] object-contain md:max-w-[2000px]"
                    />

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div
                            ref={inputAreaRef}
                            className="flex -rotate-6 items-center justify-center"
                        >
                            {letters.map((letter, index) => {
                                const revealed = revealedIndices.includes(index);
                                return (
                                    <div
                                        key={index}
                                        className="group relative mx-2 mt-12 h-40 w-36"
                                    >
                                        {/* Black focus background */}
                                        <div className="pointer-events-none absolute inset-0 z-0 bg-[#0A0C0F] opacity-0 [clip-path:polygon(15%_0%,100%_0%,90%_100%,0%_100%)] group-focus-within:opacity-100" />

                                        <input
                                            ref={(el) => {
                                                if (el)
                                                    inputsRef.current[index] =
                                                        el;
                                            }}
                                            type="text"
                                            inputMode="text"
                                            maxLength={1}
                                            value={letter}
                                            readOnly={revealed}
                                            tabIndex={revealed ? -1 : 0}
                                            autoComplete="off"
                                            autoCorrect="off"
                                            spellCheck={false}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    e.target.value,
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(index, e)
                                            }
                                            onPaste={(e) =>
                                                handlePaste(index, e)
                                            }
                                            className={`${INPUT_CLASSES} ${revealed ? 'pointer-events-none' : 'pointer-events-auto'}`}
                                            aria-label={
                                                revealed
                                                    ? `Strip letter ${index + 1} (revealed)`
                                                    : `Strip letter ${index + 1}`
                                            }
                                        />

                                        {revealed ? (
                                            <></>
                                        ) : (
                                            <InputBorderBottom className="pointer-events-none absolute -bottom-2 left-1/2 z-20 h-auto w-[60%] -translate-x-1/2" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center">
                <p
                    className={`font-noto text-2xl font-bold text-red-500 transition-opacity duration-200 ${
                        status === 'wrong' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    ERROR !
                </p>
            </div>
        </main>
    );
}
