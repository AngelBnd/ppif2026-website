import {
    CW_COLS,
    CW_ROWS,
    CWdata,
} from '@/data/gameQuestions/signalDecoderQuestions';

import gsap from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';

import CWBox from '@/assets/games/signalDecoder/crosswordBox.svg?react';
import CWBoxACT from '@/assets/games/signalDecoder/crosswordBoxACTIVE.svg?react';
import CWBoxCOR from '@/assets/games/signalDecoder/crosswordBoxCORRECT.svg?react';
import CWBoxHIG from '@/assets/games/signalDecoder/crosswordBoxHIGHLIGHT.svg?react';

type Props = {
    finishGame: () => void;
};
export default function CrissCross({ finishGame }: Props) {
    const accrossData = CWdata.across;
    const downData = CWdata.down;
    let i = 0;
    let j = 0;
    let indexWord = 0;
    let wordLengthAcross = 0;
    let savedColDowns: {
        row: number;
        col: number;
        lengthLeft: number;
        word: string;
        indexWord: number;
        num: number;
    }[] = [];

    const numbered: {
        isNumbered: boolean;
        number: number;
    } = { isNumbered: false, number: 0 };

    const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);
    const cellRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);
    const [values, setValues] = useState<Record<string, string>>({});
    const [isFlashingCorrect, setIsFlashingCorrect] = useState(false);

    const hasCompletedAnimationRef = useRef(false);
    const completionTimelineRef = useRef<gsap.core.Timeline | null>(null);
    const [completionFlashBox, setCompletionFlashBox] = useState<
        'normal' | 'correct' | null
    >(null);

    const [traverseHor, setTraverseHor] = useState(true);
    const traverseHorRef = useRef(traverseHor);
    const [activeCell, setActiveCell] = useState<{
        row: number;
        col: number;
    } | null>(null);

    const shakeCell = (indexI: number, indexJ: number) => {
        const cell = cellRefs.current[indexI]?.[indexJ];

        if (!cell) return;

        gsap.killTweensOf(cell);

        gsap.timeline({
            defaults: {
                duration: 0.045,
                ease: 'none',
            },
            onComplete: () => {
                gsap.set(cell, {
                    x: 0,
                    rotation: 0,
                    clearProps: 'transform',
                });
            },
        })
            .to(cell, {
                x: -4,
                y: 4,
                rotation: -3,
            })
            .to(cell, {
                x: 4,
                y: -4,
                rotation: 3,
            })
            .to(cell, {
                x: -3,
                rotation: -2,
            });
    };

    const updateTraverse = (horizontal: boolean) => {
        traverseHorRef.current = horizontal;
        setTraverseHor(horizontal);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        indexI: number,
        indexJ: number,
    ) => {
        const char = e.target.value.slice(-1).toUpperCase();

        setValues((prev) => ({
            ...prev,
            [`${indexI}-${indexJ}`]: char,
        }));
        shakeCell(indexI, indexJ);

        if (char) {
            if (traverseHorRef.current) {
                if (indexJ < CW_COLS - 1) {
                    inputRefs.current[indexI]?.[indexJ + 1]?.focus();
                }
            } else {
                if (indexI < CW_ROWS - 1) {
                    inputRefs.current[indexI + 1]?.[indexJ]?.focus();
                }
            }
        }
    };

    const focusNextCell = (
        startRow: number,
        startCol: number,
        rowStep: number,
        colStep: number,
    ) => {
        const nextRow = startRow + rowStep;
        const nextCol = startCol + colStep;

        const nextInput = inputRefs.current[nextRow]?.[nextCol];

        if (!nextInput) return;

        nextInput.focus();
        setActiveCell({
            row: nextRow,
            col: nextCol,
        });
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        indexI: number,
        indexJ: number,
    ) => {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                updateTraverse(true);
                focusNextCell(indexI, indexJ, 0, -1);
                return;

            case 'ArrowRight':
                e.preventDefault();
                updateTraverse(true);
                focusNextCell(indexI, indexJ, 0, 1);
                return;

            case 'ArrowUp':
                e.preventDefault();
                updateTraverse(false);
                focusNextCell(indexI, indexJ, -1, 0);
                return;

            case 'ArrowDown':
                e.preventDefault();
                updateTraverse(false);
                focusNextCell(indexI, indexJ, 1, 0);
                return;
        }

        const key = e.key.toUpperCase();
        if (
            /^[A-Z]$/.test(key) &&
            inputRefs.current[indexI]?.[indexJ] !== null
        ) {
            e.preventDefault();
            setValues((prev) => ({
                ...prev,
                [`${indexI}-${indexJ}`]: key,
            }));

            shakeCell(indexI, indexJ);

            if (traverseHor) {
                inputRefs.current[indexI]?.[indexJ + 1]?.focus();
            } else {
                inputRefs.current[indexI + 1]?.[indexJ]?.focus();
            }
            return;
        }

        if (
            e.key === 'Backspace' &&
            (values[`${indexI}-${indexJ}`] == null ||
                values[`${indexI}-${indexJ}`] === '')
        ) {
            if (traverseHor) {
                if (indexJ > 0)
                    inputRefs.current[indexI]?.[indexJ - 1]?.focus();
            } else {
                if (indexI > 0)
                    inputRefs.current[indexI - 1]?.[indexJ]?.focus();
            }
        }

        console.log(e.key);
        console.log(values[`${indexI}-${indexJ}`]);
    };

    const handleClick = (
        e: React.MouseEvent<HTMLInputElement>,
        indexI: number,
        indexJ: number,
    ) => {
        const hasHorizontal =
            inputRefs.current[indexI]?.[indexJ - 1] != null ||
            inputRefs.current[indexI]?.[indexJ + 1] != null;

        const hasVertical =
            inputRefs.current[indexI - 1]?.[indexJ] != null ||
            inputRefs.current[indexI + 1]?.[indexJ] != null;

        const clickedSameCell =
            activeCell?.row === indexI && activeCell?.col === indexJ;

        if (!clickedSameCell) {
            setActiveCell({
                row: indexI,
                col: indexJ,
            });

            if (hasHorizontal) {
                updateTraverse(true);
            } else if (hasVertical) {
                updateTraverse(false);
            }

            return;
        }

        if (hasHorizontal && hasVertical) {
            updateTraverse(!traverseHorRef.current);
        } else if (hasHorizontal) {
            updateTraverse(true);
        } else if (hasVertical) {
            updateTraverse(false);
        }
    };

    const checkTraverse = (
        activeCell: {
            row: number;
            col: number;
        } | null,
        activeWordCells: Set<string>,
    ) => {
        if (activeCell) {
            if (traverseHor) {
                const activeWord = accrossData.find((word) => {
                    const startCol = word.col;
                    const endCol = word.col + word.word.length - 1;

                    return (
                        word.row === activeCell.row &&
                        activeCell.col >= startCol &&
                        activeCell.col <= endCol
                    );
                });

                if (activeWord) {
                    for (
                        let offset = 0;
                        offset < activeWord.word.length;
                        offset++
                    ) {
                        activeWordCells.add(
                            `${activeWord.row}-${activeWord.col + offset}`,
                        );
                    }
                }
            } else {
                const activeWord = downData.find((word) => {
                    const startRow = word.row;
                    const endRow = word.row + word.word.length - 1;

                    return (
                        word.col === activeCell.col &&
                        activeCell.row >= startRow &&
                        activeCell.row <= endRow
                    );
                });

                if (activeWord) {
                    for (
                        let offset = 0;
                        offset < activeWord.word.length;
                        offset++
                    ) {
                        activeWordCells.add(
                            `${activeWord.row + offset}-${activeWord.col}`,
                        );
                    }
                }
            }
        }
    };

    const answerMap = useMemo(() => {
        const map: Record<string, string> = {};

        accrossData.forEach((data) => {
            data.word.split('').forEach((char, offset) => {
                map[`${data.row}-${data.col + offset}`] = char.toUpperCase();
            });
        });

        downData.forEach((data) => {
            data.word.split('').forEach((char, offset) => {
                const key = `${data.row + offset}-${data.col}`;
                const normalizedChar = char.toUpperCase();
                map[key] = normalizedChar;
            });
        });

        return map;
    }, [accrossData, downData]);

    const isCompleted = useMemo(() => {
        return Object.entries(answerMap).every(
            ([key, answer]) => values[key]?.toUpperCase() === answer,
        );
    }, [answerMap, values]);

    useEffect(() => {
        if (!isCompleted || hasCompletedAnimationRef.current) return;

        hasCompletedAnimationRef.current = true;

        inputRefs.current.flat().forEach((input) => {
            if (input) input.disabled = true;
        });

        const tl = gsap.timeline({
            onComplete: () => {
                finishGame();
            },
        });

        completionTimelineRef.current = tl;

        tl.call(() => {
            setCompletionFlashBox('correct');
        });

        tl.to({}, { duration: 0.2 });

        tl.call(() => {
            setCompletionFlashBox('normal');
        });

        tl.to({}, { duration: 0.2 });

        tl.call(() => {
            setCompletionFlashBox('correct');
        });

        tl.to({}, { duration: 0.2 });

        tl.call(() => {
            setCompletionFlashBox('normal');
        });

        tl.to({}, { duration: 0.2 });

        tl.call(() => {
            setCompletionFlashBox('correct');
        });

        tl.to({}, { duration: 0.25 });

        return () => {
            tl.kill();
            completionTimelineRef.current = null;
        };
    }, [isCompleted, finishGame]);

    const fillAllCells = () => {
        setValues({ ...answerMap });
    };

    return (
        <div
            className="h-full w-full"
            style={{
                perspective: '800px',
            }}
        >
            {/* testing button */}
            {import.meta.env.DEV && (
                <button
                    type="button"
                    onClick={fillAllCells}
                    className="absolute left-4 top-4 z-50 rounded bg-black px-4 py-2 text-white"
                >
                    Fill All
                </button>
            )}

            <div
                className="grid h-full w-full grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(13,minmax(0,1fr))] overflow-visible"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(18deg) rotateY(22deg) rotateZ(-2deg)',
                    transformOrigin: 'center center',
                }}
            >
                {Array.from({ length: CW_ROWS }).map((_, indexI) => {
                    if (downData[j].row === indexI) {
                        savedColDowns.push({
                            row: downData[j].row,
                            col: downData[j].col,
                            lengthLeft: downData[j].word.length,
                            word: downData[j].word,
                            indexWord: 0,
                            num: downData[j].num,
                        });
                        if (j < downData.length - 1) j++;
                    }

                    return Array.from({ length: CW_COLS }).map((_, indexJ) => {
                        const activeWordCells = new Set<string>();
                        let inputFieldDown = false;
                        let inputFieldAcross = false;
                        let isCorrect = false;
                        numbered.isNumbered = false;

                        checkTraverse(activeCell, activeWordCells);
                        const cellKey = `${indexI}-${indexJ}`;
                        const isActive =
                            activeCell?.row === indexI &&
                            activeCell?.col === indexJ;
                        const isHighlighted = activeWordCells.has(cellKey);

                        if (
                            (accrossData[i].row === indexI &&
                                accrossData[i].col === indexJ) ||
                            wordLengthAcross > 0
                        ) {
                            inputFieldAcross = true;

                            if (
                                values[`${indexI}-${indexJ}`] ===
                                accrossData[i].word[indexWord]
                            )
                                isCorrect = true;

                            console.log(accrossData[i].word[indexWord]);
                            indexWord++;

                            if (wordLengthAcross === 0) {
                                wordLengthAcross =
                                    accrossData[i].word.length - 1;
                                numbered.isNumbered = true;
                                numbered.number = accrossData[i].num;
                            } else {
                                numbered.isNumbered = false;
                                wordLengthAcross--;
                                if (
                                    wordLengthAcross === 0 &&
                                    i < accrossData.length - 1
                                ) {
                                    i = i + 1;
                                    indexWord = 0;
                                }
                            }
                        }

                        savedColDowns.forEach((data) => {
                            if (data.col === indexJ && data.lengthLeft > 0) {
                                inputFieldDown = true;

                                if (
                                    data.row === indexI &&
                                    data.indexWord === 0
                                ) {
                                    numbered.isNumbered = true;
                                    numbered.number = data.num;
                                }

                                if (
                                    values[`${indexI}-${indexJ}`] ===
                                    data.word[data.indexWord]
                                ) {
                                    isCorrect = true;
                                }
                                data.indexWord++;
                                data.lengthLeft--;
                            }
                        });

                        const CellBox =
                            completionFlashBox === 'correct'
                                ? CWBoxCOR
                                : completionFlashBox === 'normal'
                                  ? CWBox
                                  : isCorrect
                                    ? CWBoxCOR
                                    : isActive
                                      ? CWBoxACT
                                      : isHighlighted
                                        ? CWBoxHIG
                                        : CWBox;

                        return (
                            <div
                                key={`${indexI}-${indexJ}`}
                                ref={(el) => {
                                    if (!cellRefs.current[indexI]) {
                                        cellRefs.current[indexI] = [];
                                    }

                                    cellRefs.current[indexI][indexJ] = el;
                                }}
                                className="relative mt-[0.1rem] transform-gpu will-change-transform [transform-style:preserve-3d]"
                            >
                                {inputFieldAcross || inputFieldDown ? (
                                    <>
                                        <CellBox className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

                                        {numbered.isNumbered ? (
                                            <div className="absolute left-2 top-1 font-noto font-bold text-[#050607]">
                                                {' '}
                                                {numbered.number}{' '}
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        <input
                                            ref={(el) => {
                                                if (
                                                    !inputRefs.current[indexI]
                                                ) {
                                                    inputRefs.current[indexI] =
                                                        [];
                                                }

                                                inputRefs.current[indexI][
                                                    indexJ
                                                ] = el;
                                            }}
                                            className="relative z-10 h-full w-full border-0 bg-transparent text-center font-arsenal text-2xl text-[#050607] outline-none focus:outline-none focus:ring-0"
                                            maxLength={1}
                                            value={
                                                values[`${indexI}-${indexJ}`] ??
                                                ''
                                            }
                                            onChange={(e) =>
                                                handleChange(e, indexI, indexJ)
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, indexI, indexJ)
                                            }
                                            onClick={(e) =>
                                                handleClick(e, indexI, indexJ)
                                            }
                                        />
                                    </>
                                ) : null}
                            </div>
                        );
                    });
                })}
            </div>
        </div>
    );
}
