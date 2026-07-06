import { useEffect, useRef, useState, type KeyboardEvent, type ClipboardEvent } from 'react';
import type { GamePageChildProps } from '../GamePage';
import stripID from '../../../assets/games/reconstructIdentity/stripID.webp';
import titleID from '../../../assets/games/reconstructIdentity/titleID.webp';

const WORD_LENGTH = 6;

const TARGET_WORD = 'STELLA'; // INI PASSWORDNYA / KEYWORD

const REVEALED_INDICES = [2, 4];

const INPUT_CLASSES =
    "w-36 bg-transparent pt-20 border-0 text-center text-9xl text-white caret-white font-['Noto_Sans'] " +
    'font-bold outline-none ring-0 shadow-none appearance-none focus:outline-none focus:ring-0 ' +
    "focus:border-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none [-webkit-tap-highlight-color:transparent]";

type GuessStatus = 'playing' | 'wrong' | 'correct';

export default function ReconstructIdentityPage({ finishGame }: GamePageChildProps) {
    const [letters, setLetters] = useState<string[]>(() =>
        Array.from({ length: WORD_LENGTH }, (_, i) => (REVEALED_INDICES.includes(i) ? TARGET_WORD[i] : ''))
    );
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState<GuessStatus>('playing');
    const inputsRef = useRef<HTMLInputElement[]>([]);

    function findNextEditable(from: number, direction: 1 | -1) {
        let i = from + direction;
        while (i >= 0 && i < WORD_LENGTH) {
            if (!REVEALED_INDICES.includes(i)) return i;
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
        if (letters.some((letter) => letter === '')) {
            setStatus('playing');
            return;
        }

        if (letters.join('') === TARGET_WORD) {
            setStatus('correct');
            finishGame();
        } else {
            setStatus('wrong');
        }
    }, [letters, finishGame]);

    const setLetterAt = (index: number, char: string) => {
        setLetters((prev) => {
            const next = [...prev];
            next[index] = char;
            return next;
        });
    };

    const handleChange = (index: number, value: string) => {
        const char = value.slice(-1).toUpperCase().replace(/[^A-Z0-9]/g, '');
        setLetterAt(index, char);

        if (char) {
            const next = findNextEditable(index, 1);
            if (next !== -1) inputsRef.current[next]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !letters[index] && index > 0) {
            const prev = findNextEditable(index, -1);
            if (prev !== -1) inputsRef.current[prev]?.focus();
        }
    };

    const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('text').toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (!pasted) return;
        e.preventDefault();

        let cursor = index;
        let lastFilled = index;
        for (const char of pasted) {
            while (cursor < WORD_LENGTH && REVEALED_INDICES.includes(cursor)) cursor++;
            if (cursor >= WORD_LENGTH) break;
            setLetterAt(cursor, char);
            lastFilled = cursor;
            cursor++;
        }

        inputsRef.current[lastFilled]?.focus();
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            <section className="relative flex flex-col items-center justify-center pb-20 text-center">
                <div
                    className={`flex items-center justify-center transition-all duration-700 ease-out ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                    }`}
                >
                    <img
                        src={titleID}
                        alt="Reconstruct Identity title"
                        className="h-auto max-w-[100vw] object-contain md:max-w-[1112.87px]"
                    />
                </div>

                <div
                    className={`relative flex items-center justify-center transition-all duration-700 ease-out ${
                        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                    }`}
                >
                    <img
                        src={stripID}
                        alt="Reconstruct Identity strip"
                        className="h-auto max-w-[80vw] object-contain md:max-w-[2003.5px]"
                    />

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center justify-center -rotate-6">
                            {letters.map((letter, index) => {
                                const revealed = REVEALED_INDICES.includes(index);
                                return (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            if (el) inputsRef.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="text"
                                        maxLength={1}
                                        value={letter}
                                        placeholder={revealed ? undefined : '__'}
                                        readOnly={revealed}
                                        tabIndex={revealed ? -1 : 0}
                                        autoComplete="off"
                                        autoCorrect="off"
                                        spellCheck={false}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={(e) => handlePaste(index, e)}
                                        className={`${INPUT_CLASSES} ${revealed ? 'pointer-events-none' : 'pointer-events-auto'}`}
                                        aria-label={revealed ? `Strip letter ${index + 1} (revealed)` : `Strip letter ${index + 1}`}
                                    />
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