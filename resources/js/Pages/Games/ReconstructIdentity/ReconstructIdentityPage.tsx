import InputBorderBottom from '@/assets/games/hub/InputBorderBottomSVG.svg?react';
import { GroupMockData } from '@/data/mockBackend';
import { findTeam } from '@/services/mockGameApi';
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

// const WORD_LENGTH = 6;

// const REVEALED_INDICES = [2, 4];

const INPUT_CLASSES =
    "relative z-10 h-full w-full appearance-none border-0 bg-transparent pt-3 text-center text-9xl text-white caret-white font-['Noto_Sans'] " +
    'font-bold outline-none ring-0 shadow-none focus:outline-none focus:ring-0 ' +
    'focus:border-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none [-webkit-tap-highlight-color:transparent]';

type GuessStatus = 'playing' | 'wrong' | 'correct';

export default function ReconstructIdentityPage({
    finishGame,
}: GamePageChildProps) {
    const [letters, setLetters] = useState<string[]>([]);
    const [targetWord, setTargetWord] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [teamData, setTeamData] = useState<GroupMockData | null>(null);
    const [status, setStatus] = useState<GuessStatus>('playing');
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const inputAreaRef = useRef<HTMLDivElement | null>(null);
    const isFinishingRef = useRef(false);

    useEffect(() => {
        async function loadTargetWord() {
            const teamId = Number(sessionStorage.getItem('teamId'));
            if (!teamId) return;
            const team = await findTeam(teamId);
            setTeamData(team ?? null);
            setTargetWord(team?.name.toUpperCase() ?? '');
            setLetters(
                Array.from({ length: team?.name.length ?? 0 }, (_, i) =>
                    team?.revealed_indices.includes(i)
                        ? team.name[i].toUpperCase()
                        : '',
                ),
            );
        }

        loadTargetWord();
    }, []);

    function findNextEditable(from: number, direction: 1 | -1) {
        let i = from + direction;
        while (i >= 0 && i < targetWord.length) {
            if (!teamData?.revealed_indices.includes(i)) return i;
            i += direction;
        }
        return -1;
    }

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const firstEditable = findNextEditable(-1, 1);
        inputsRef.current[firstEditable]?.focus();
    }, [isVisible]);

    useEffect(() => {
        if (!teamData || !targetWord) return;

        if (letters.some((letter) => letter === '')) {
            setStatus('playing');
            return;
        }

        if (letters.join('') !== targetWord) {
            setStatus('wrong');

            if (inputAreaRef.current) {
                const target = inputAreaRef.current;

                gsap.killTweensOf(target);

                gsap.timeline()
                    .set(target, {
                        x: 0,
                    })
                    .to(target, {
                        x: -12,
                        duration: 0.05,
                        ease: 'power1.inOut',
                    })
                    .to(target, {
                        x: 12,
                        duration: 0.05,
                        ease: 'power1.inOut',
                    })
                    .to(target, {
                        x: -8,
                        duration: 0.05,
                        ease: 'power1.inOut',
                    })
                    .to(target, {
                        x: 8,
                        duration: 0.05,
                        ease: 'power1.inOut',
                    })
                    .to(target, {
                        x: -4,
                        duration: 0.04,
                        ease: 'power1.inOut',
                    })
                    .to(target, {
                        x: 4,
                        duration: 0.04,
                        ease: 'power1.inOut',
                    })
                    .to(target, {
                        x: 0,
                        duration: 0.04,
                        ease: 'power1.out',
                    });
            }

            return;
        }

        setStatus('correct');

        if (isFinishingRef.current) return;

        const inputElements = inputsRef.current.filter(Boolean);

        if (inputElements.length === 0) {
            finishGame();
            return;
        }

        isFinishingRef.current = true;

        inputElements.forEach((input) => {
            input.blur();
            input.disabled = true;
        });

        const timeline = gsap.timeline({
            delay: 0.2,
            onComplete: finishGame,
        });

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
            .to(
                {},
                {
                    duration: 0.35,
                },
            );

        return () => {
            timeline.kill();
        };
    }, [letters, targetWord, teamData, finishGame]);

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
            while (
                cursor < targetWord.length &&
                teamData?.revealed_indices.includes(cursor)
            )
                cursor++;
            if (cursor >= targetWord.length) break;
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
                                const revealed =
                                    teamData?.revealed_indices.includes(index);
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
                    className={`font-['Noto_Sans'] text-2xl font-bold text-red-500 transition-opacity duration-200 ${
                        status === 'wrong' ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    ERROR !
                </p>
            </div>
        </main>
    );
}
