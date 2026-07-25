import { MCQ } from '@/data/gameQuestions/coreLogicQuestions';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import type { GamePageChildProps } from '../GamePage';

// assets
import AnswerCircle from '@/assets/games/coreLogic/svgs/AnswerCircle.svg';
import AnswerCircleHover from '@/assets/games/coreLogic/svgs/AnswerCircleHover.svg';
import AnswerCross from '@/assets/games/coreLogic/svgs/AnswerCross.svg';
import AnswerCrossHover from '@/assets/games/coreLogic/svgs/AnswerCrossHover.svg';
import AnswerSquare from '@/assets/games/coreLogic/svgs/AnswerSquare.svg';
import AnswerSquareHover from '@/assets/games/coreLogic/svgs/AnswerSquareHover.svg';
import AnswerTriangle from '@/assets/games/coreLogic/svgs/AnswerTriangle.svg';
import AnswerTriangleHover from '@/assets/games/coreLogic/svgs/AnswerTriangleHover.svg';
import CoddieHappy from '@/assets/games/coreLogic/svgs/CoddieHappy.svg';
import CoddieReady from '@/assets/games/coreLogic/svgs/CoddieReady.svg';
import CoddieSad from '@/assets/games/coreLogic/svgs/CoddieSad.svg';
import CoddieSleep from '@/assets/games/coreLogic/svgs/CoddieSleep.svg';
import CoddieSorry from '@/assets/games/coreLogic/svgs/CoddieSorry.svg';
import CurrentQuestionBanner from '@/assets/games/coreLogic/svgs/CurrentQuestionBanner.svg';
import DialogueAlertBox from '@/assets/games/coreLogic/svgs/DialogueAlertBox.svg';
import ExclamationShape from '@/assets/games/coreLogic/svgs/ExclamationShape.svg';
import Lives from '@/assets/games/coreLogic/svgs/Lives.svg';
import LivesBackground from '@/assets/games/coreLogic/svgs/LivesBackground.svg';
import OkButton from '@/assets/games/coreLogic/svgs/OkButton.svg';
import OkButtonHover from '@/assets/games/coreLogic/svgs/OkButtonHover.svg';
import QuestionBackground from '@/assets/games/coreLogic/svgs/QuestionBackground.svg';
import QuestionRemainingBanner from '@/assets/games/coreLogic/svgs/QuestionRemainingBanner.svg';
import Shape1 from '@/assets/games/coreLogic/svgs/Shape1.svg';

export default function CoreLogicPage({ finishGame }: GamePageChildProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lives, setLives] = useState<number>(3);
    const [correctCount, setCorrectCount] = useState<number>(0);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    const [coddieState, setCoddieState] = useState<
        'sleep' | 'idle' | 'happy' | 'sad' | 'feel_sorry'
    >('idle');
    const [customMessage, setCustomMessage] = useState<string>('');
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const coddieRef = useRef<HTMLDivElement>(null);

    const currentQuestion = MCQ[currentIndex];

    // Refs Pembungkus
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    // Ref banner
    const currentQuestionBannerRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLDivElement>(null);
    const livesRef = useRef<HTMLDivElement>(null);
    const shape1Ref = useRef<HTMLDivElement>(null);
    const excl1Ref = useRef<HTMLDivElement>(null);
    const excl2Ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const dialogueBgRef = useRef<HTMLDivElement>(null);
    const dialogueTextRef = useRef<HTMLDivElement>(null);
    const dialogueButtonRef = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLElement>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Animasi Banner Progress Soal
    const triggerProgressAnimation = (isCorrect: boolean) => {
        if (!progressTextRef.current) return;

        const dynamicColor = isCorrect ? '#22c55e' : '#ef4444';
        const currentIndexEl = progressTextRef.current.querySelector(
            '#progress-current-index',
        );

        // 1. (Pop & Rotate) + warna text
        gsap.fromTo(
            progressTextRef.current,
            { scale: 1, rotation: 0 },
            {
                scale: 1.2,
                rotation: isCorrect ? 5 : -7,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'back.out(1.5)',
                onStart: () => {
                    if (currentIndexEl)
                        gsap.set(currentIndexEl, { color: dynamicColor });
                },
                onComplete: () => {
                    if (currentIndexEl)
                        gsap.set(currentIndexEl, { color: '#ffffff' });
                },
            },
        );

        // 2. Animasi Flyout "+1"
        const plusEl = document.createElement('div');
        plusEl.innerText = '+1';

        plusEl.style.position = 'absolute';
        plusEl.style.zIndex = '10000';
        plusEl.style.fontFamily = "'NotoSans', sans-serif";
        plusEl.style.fontWeight = '900';
        plusEl.style.fontSize = '16px';
        plusEl.style.textTransform = 'uppercase';
        plusEl.style.whiteSpace = 'nowrap';
        plusEl.style.pointerEvents = 'none';
        plusEl.style.color = dynamicColor;
        plusEl.style.textShadow =
            '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000';

        const rect = progressTextRef.current.getBoundingClientRect();
        const startX =
            rect.left +
            rect.width / 2 +
            (window.scrollX || window.pageXOffset) +
            60;
        const startY = rect.top + (window.scrollY || window.pageYOffset) + 160;

        plusEl.style.left = `${startX}px`;
        plusEl.style.top = `${startY}px`;

        document.body.appendChild(plusEl);

        const randomX = (Math.random() - 0.5) * 60;
        const randomY = -120 - Math.random() * 50;
        const randomRot = (Math.random() - 0.5) * 30;

        gsap.fromTo(
            plusEl,
            {
                scale: 0.2,
                opacity: 0,
                xPercent: -50,
                yPercent: -50,
                x: 0,
                y: 0,
            },
            {
                x: randomX,
                y: randomY,
                scale: 1.5,
                opacity: 1,
                rotation: randomRot,
                duration: 0.35,
                ease: 'back.out(1.8)',
                onComplete: () => {
                    gsap.to(plusEl, {
                        opacity: 0,
                        y: randomY - 20,
                        duration: 0.25,
                        delay: 0.3,
                        ease: 'power2.in',
                        onComplete: () => plusEl.remove(),
                    });
                },
            },
        );
    };

    // Animasi Chant Current Question
    const triggerChantAnimation = (isCorrect: boolean) => {
        if (!currentQuestionBannerRef.current) return;

        // 1. chant
        const correctChants = [
            'Looking cool!',
            'Great job!',
            'Outstanding!',
            'Perfect!',
            'Fist of Justice!',
        ];
        const wrongChants = [
            'Stay calm!',
            "Don't give up!",
            'Focus!',
            'Hang in there!',
            'Careful!',
        ];

        // teks acak berdasarkan jawaban
        const pool = isCorrect ? correctChants : wrongChants;
        const randomText = pool[Math.floor(Math.random() * pool.length)];

        // 2. buat elemen teks
        const chantEl = document.createElement('div');
        chantEl.innerText = randomText;

        // 3. styling dasar
        chantEl.style.position = 'absolute';
        chantEl.style.zIndex = '10000';
        chantEl.style.fontFamily = "'NotoSans', sans-serif";
        chantEl.style.fontWeight = '900';
        chantEl.style.fontSize = '16px';
        chantEl.style.textTransform = 'uppercase';
        chantEl.style.whiteSpace = 'nowrap';
        chantEl.style.pointerEvents = 'none';
        chantEl.style.color = isCorrect ? '#22c55e' : '#ef4444';
        chantEl.style.textShadow =
            '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000';

        const rect = currentQuestionBannerRef.current.getBoundingClientRect();
        const startX =
            rect.left +
            rect.width / 2 +
            (window.scrollX || window.pageXOffset) +
            40;
        const startY =
            rect.top +
            rect.height / 2 +
            (window.scrollY || window.pageYOffset) +
            70;

        chantEl.style.left = `${startX}px`;
        chantEl.style.top = `${startY}px`;

        document.body.appendChild(chantEl);

        // 5. arah terbang acak
        const randomX = (Math.random() - 0.3) * 160;
        const randomY = -80 - Math.random() * 100;
        const randomRot = (Math.random() - 0.5) * 45;

        // 6. animasi flyout & fadeout
        gsap.fromTo(
            chantEl,
            {
                scale: 0.2,
                opacity: 0,
                rotation: 0,
                xPercent: -50,
                yPercent: -50,
                x: 0,
                y: 0,
            },
            {
                x: randomX,
                y: randomY,
                scale: 1.4,
                opacity: 1,
                rotation: randomRot,
                duration: 0.4,
                ease: 'back.out(2)',
                onComplete: () => {
                    gsap.to(chantEl, {
                        opacity: 0,
                        scale: 1,
                        y: randomY - 30,
                        duration: 0.3,
                        delay: 0.4,
                        ease: 'power2.in',
                        onComplete: () => {
                            chantEl.remove(); // clear dom
                        },
                    });
                },
            },
        );
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // set transform origin banner
            gsap.set(currentQuestionBannerRef.current, {
                transformOrigin: '50% 50%',
            });
            gsap.set(progressTextRef.current, { transformOrigin: '50% 50%' });
            gsap.set(div3Ref.current, { transformOrigin: 'right top' });

            // kunci transform origin dekorasi di tengah
            gsap.set([shape1Ref.current, excl1Ref.current, excl2Ref.current], {
                transformOrigin: '50% 50%',
            });

            tl.fromTo(
                bgRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
            );

            tl.fromTo(
                currentQuestionBannerRef.current,
                { x: -200, opacity: 0, rotation: -15 },
                {
                    x: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    onComplete: () => {
                        gsap.timeline({ repeat: -1, yoyo: true })
                            .to(currentQuestionBannerRef.current, {
                                rotation: -2,
                                duration: 0.6,
                                ease: 'steps(1)',
                            })
                            .to(currentQuestionBannerRef.current, {
                                rotation: 2,
                                duration: 0.8,
                                ease: 'steps(1)',
                            })
                            .to(currentQuestionBannerRef.current, {
                                rotation: 0,
                                duration: 0.6,
                                ease: 'steps(1)',
                            });
                    },
                },
                '-=0.3',
            );

            tl.fromTo(
                progressTextRef.current,
                { y: -150, opacity: 0, rotation: 10 },
                {
                    y: 0,
                    opacity: 1,
                    rotation: -2,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                },
                '-=0.3',
            );

            tl.fromTo(
                livesRef.current,
                { x: -100, y: -50, opacity: 0 },
                { x: 0, y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
                '-=0.2',
            );

            // Animasi Dialogue Box & Coddie
            tl.fromTo(
                div3Ref.current,
                { scale: 0, x: 120, opacity: 0 },
                {
                    scale: 1,
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'back.out(1.4)',
                    clearProps: 'transform',
                },
                '-=0.3',
            );

            // entrance Dekorasi
            tl.fromTo(
                [shape1Ref.current, excl1Ref.current, excl2Ref.current],
                { scale: 0.3, y: 50, opacity: 0 },
                {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: 'back.out(2)',
                    stagger: 0.08,
                    onComplete: () => {
                        // Animasi Idle

                        // shape 1 (Kiri Bawah)
                        gsap.timeline({ repeat: -1, yoyo: true })
                            .to(shape1Ref.current, {
                                scale: 1.08,
                                rotation: 5,
                                y: -8,
                                duration: 0.8,
                                ease: 'sine.inOut',
                            })
                            .to(shape1Ref.current, {
                                scale: 0.95,
                                rotation: -4,
                                y: 4,
                                duration: 1.0,
                                ease: 'sine.inOut',
                            });

                        // tanda seru 1 (Kanan Bawah Atas)
                        gsap.timeline({ repeat: -1, yoyo: true, delay: 0.1 })
                            .to(excl1Ref.current, {
                                scaleX: 1.12,
                                scaleY: 0.92,
                                rotation: -6,
                                y: -5,
                                duration: 0.6,
                                ease: 'power1.inOut',
                            })
                            .to(excl1Ref.current, {
                                scaleX: 0.93,
                                scaleY: 1.08,
                                rotation: 4,
                                y: 5,
                                duration: 0.7,
                                ease: 'power1.inOut',
                            });

                        // tanda seru 2 (Kanan Bawah Bawah)
                        gsap.timeline({ repeat: -1, yoyo: true, delay: 0.25 })
                            .to(excl2Ref.current, {
                                scaleX: 0.94,
                                scaleY: 1.1,
                                rotation: 5,
                                y: 6,
                                duration: 0.7,
                                ease: 'power1.inOut',
                            })
                            .to(excl2Ref.current, {
                                scaleX: 1.08,
                                scaleY: 0.95,
                                rotation: -5,
                                y: -6,
                                duration: 0.5,
                                ease: 'power1.inOut',
                            });
                    },
                },
                '-=0.2',
            );

            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' },
                '-=0.1',
            );

            // Animasi Pilihan Ganda
            optionRefs.current.forEach((ref, idx) => {
                if (!ref) return;
                const isLeft = idx % 2 === 0;
                const startX = isLeft ? -150 : 150;

                tl.fromTo(
                    ref,
                    { x: startX, y: 80, opacity: 0, scale: 0.8 },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.45,
                        ease: 'back.out(1.5)',
                        clearProps: 'transform',
                    },
                    '-=0.35',
                );
            });
        });

        return () => ctx.revert();
    }, []);

    // Logic Idle & Animasi Coddie
    useEffect(() => {
        let idleTimer: NodeJS.Timeout;

        // 1. 3 detik untuk 'sleep'
        if (coddieState === 'idle') {
            idleTimer = setTimeout(() => {
                setCoddieState('sleep');
            }, 3000);
        }

        // 2. Animasi Coddie berdasarkan State
        const ctx = gsap.context(() => {
            if (!coddieRef.current) return;

            gsap.killTweensOf(coddieRef.current);

            gsap.set(coddieRef.current, { transformOrigin: '50% 100%' });

            const mainTimeline = gsap.timeline();

            // Sleep
            if (coddieState === 'sleep') {
                mainTimeline
                    .to(coddieRef.current, {
                        rotation: 0,
                        y: 0,
                        scaleX: 1,
                        scaleY: 1,
                        duration: 0.35,
                        ease: 'power2.out',
                    })
                    .add(() => {
                        gsap.timeline({ repeat: -1 })
                            .to(coddieRef.current, {
                                scaleY: 1.06,
                                scaleX: 0.95,
                                duration: 1.1,
                                ease: 'sine.inOut',
                            })
                            .to(coddieRef.current, {
                                scaleY: 1.08,
                                scaleX: 0.94,
                                duration: 0.3,
                                ease: 'sine.inOut',
                            })
                            .to(coddieRef.current, {
                                scaleY: 0.95,
                                scaleX: 1.04,
                                duration: 0.5,
                                ease: 'power1.out',
                            })
                            .to(coddieRef.current, {
                                scaleY: 1,
                                scaleX: 1,
                                duration: 0.9,
                                ease: 'sine.inOut',
                            });
                    });

                // Idle
            } else if (coddieState === 'idle') {
                mainTimeline
                    .to(coddieRef.current, {
                        y: 0,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                    })
                    .add(() => {
                        gsap.timeline({ repeat: -1, yoyo: true })
                            .to(coddieRef.current, {
                                rotation: -3,
                                duration: 0.4,
                                ease: 'steps(1)',
                            })
                            .to(coddieRef.current, {
                                rotation: 0,
                                duration: 0.3,
                                ease: 'steps(1)',
                            })
                            .to(coddieRef.current, {
                                rotation: 3,
                                duration: 0.5,
                                ease: 'steps(1)',
                            });
                    });

                // Happy
            } else if (coddieState === 'happy') {
                mainTimeline
                    .to(coddieRef.current, {
                        rotation: 0,
                        y: 0,
                        scaleY: 0.9,
                        scaleX: 1.06,
                        duration: 0.15,
                        ease: 'power2.in',
                    })
                    .add(() => {
                        gsap.timeline({ repeat: -1 })
                            .to(coddieRef.current, {
                                y: -35,
                                scaleY: 1.08,
                                scaleX: 0.94,
                                duration: 0.22,
                                ease: 'power3.out',
                            })
                            .to(coddieRef.current, {
                                scaleY: 0.98,
                                scaleX: 1.02,
                                duration: 0.08,
                                ease: 'sine.inOut',
                            })
                            .to(coddieRef.current, {
                                y: 0,
                                scaleY: 1.05,
                                scaleX: 0.96,
                                duration: 0.18,
                                ease: 'power3.in',
                            })
                            .to(coddieRef.current, {
                                scaleY: 0.88,
                                scaleX: 1.08,
                                duration: 0.1,
                                ease: 'power2.out',
                            })
                            .to(coddieRef.current, {
                                scaleY: 1,
                                scaleX: 1,
                                duration: 0.15,
                                ease: 'back.out(1.2)',
                            })
                            .to({}, { duration: 0.4 });
                    });

                // Sad & Sorry
            } else if (coddieState === 'sad' || coddieState === 'feel_sorry') {
                const isGameOver = coddieState === 'feel_sorry';
                const targetRotation = isGameOver ? -7 : -4;
                const dropY = isGameOver ? 8 : 4;

                mainTimeline
                    .to(coddieRef.current, {
                        rotation: targetRotation,
                        y: dropY,
                        scaleX: 1,
                        scaleY: 1,
                        duration: 0.08,
                        ease: 'power2.out',
                    })
                    .add(() => {
                        gsap.timeline({ repeat: -1 })
                            .to(coddieRef.current, {
                                rotation: targetRotation - 1,
                                y: dropY + 1.5,
                                duration: 1.0,
                                ease: 'sine.inOut',
                            })
                            .to(coddieRef.current, {
                                rotation: targetRotation,
                                y: dropY,
                                duration: 1.0,
                                ease: 'sine.inOut',
                            });
                    });
            }
        });

        // clear timer & animasi saat state berubah
        return () => {
            clearTimeout(idleTimer);
            ctx.revert();
        };
    }, [coddieState]);

    // Animasi Entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (showExplanation) {
                gsap.killTweensOf([
                    dialogueBgRef.current,
                    dialogueTextRef.current,
                    dialogueButtonRef.current,
                ]);

                gsap.set(dialogueBgRef.current, { transformOrigin: '50% 50%' });
                gsap.set(dialogueButtonRef.current, {
                    transformOrigin: '50% 50%',
                });

                const tl = gsap.timeline();

                // 1. dialog box
                tl.fromTo(
                    dialogueBgRef.current,
                    { scale: 0.6, rotation: -10, opacity: 0 },
                    {
                        scale: 1,
                        rotation: 0,
                        opacity: 1,
                        duration: 0.45,
                        ease: 'back.out(1.5)',
                    },
                );

                // 2. teks penjelasan
                tl.fromTo(
                    dialogueTextRef.current,
                    { x: 30, rotation: 3.5, opacity: 0 },
                    {
                        x: 0,
                        rotation: 3.5,
                        opacity: 1,
                        duration: 0.35,
                        ease: 'power2.out',
                    },
                    '-=0.25',
                );

                // 3. ok button
                tl.fromTo(
                    dialogueButtonRef.current,
                    { scale: 0, rotation: 12, opacity: 0 },
                    {
                        scale: 1,
                        rotation: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'back.out(1.8)',
                    },
                    '-=0.2',
                );
            } else {
                // hide dialogue
                gsap.killTweensOf([
                    dialogueBgRef.current,
                    dialogueTextRef.current,
                    dialogueButtonRef.current,
                ]);
                gsap.to(
                    [
                        dialogueBgRef.current,
                        dialogueTextRef.current,
                        dialogueButtonRef.current,
                    ],
                    {
                        opacity: 0,
                        duration: 0.2,
                        ease: 'power2.in',
                    },
                );
            }
        });

        return () => ctx.revert();
    }, [showExplanation]);

    // Asset Coddie
    const getCoddieAsset = () => {
        switch (coddieState) {
            case 'idle':
                return CoddieReady;
            case 'happy':
                return CoddieHappy;
            case 'sad':
                return CoddieSad;
            case 'feel_sorry':
                return CoddieSorry;
            case 'sleep':
            default:
                return CoddieSleep;
        }
    };

    // A = Kotak (Square), B = Bulat (Circle), C = Silang (Cross), D = Segitiga (Triangle)
    const getOptionAssets = (idx: number) => {
        switch (idx) {
            case 0:
                return {
                    default: AnswerSquare,
                    hover: AnswerSquareHover,
                    alt: 'Square Option Banner',
                };
            case 1:
                return {
                    default: AnswerCircle,
                    hover: AnswerCircleHover,
                    alt: 'Circle Option Banner',
                };
            case 2:
                return {
                    default: AnswerCross,
                    hover: AnswerCrossHover,
                    alt: 'Cross Option Banner',
                };
            case 3:
            default:
                return {
                    default: AnswerTriangle,
                    hover: AnswerTriangleHover,
                    alt: 'Triangle Option Banner',
                };
        }
    };

    // buat testing
    //
    // -- handleAnswerClick langsung ke handleFinish --
    // const handleAnswerClick = (selectedIdx: number) => {
    //     handleFinish(9); // kirim skor 9 buat testing
    // };

    // Handler Jawaban Pilihan Ganda
    const handleAnswerClick = (selectedIdx: number) => {
        if (showExplanation) return;

        const isCorrect = selectedIdx === currentQuestion.ans;

        if (isCorrect) {
            const nextCorrect = correctCount + 1;
            setCorrectCount(nextCorrect);

            setCoddieState('happy');
            setCustomMessage(currentQuestion.exp);
            setShowExplanation(true);
        } else {
            const nextLives = lives - 1;
            setLives(nextLives);

            if (nextLives <= 0) {
                setCoddieState('feel_sorry');
                setIsGameOver(true);
                setCustomMessage(
                    'GAME OVER! Nyawa kamu telah habis. Jangan menyerah, ayo coba lagi dari soal pertama!',
                );
                setShowExplanation(true);
            } else {
                setCoddieState('sad');
                setCustomMessage(currentQuestion.exp);
                setShowExplanation(true);
            }
        }
    };

    // Handler Lanjut Soal (Ok Button)
    const handleNextQuestion = () => {
        if (isGameOver) {
            setShowExplanation(false);
            setCoddieState('idle');
            resetGame();
            return;
        }

        const isCorrect = coddieState === 'happy';

        triggerChantAnimation(isCorrect);
        triggerProgressAnimation(isCorrect);

        setShowExplanation(false);
        setCoddieState('idle');

        if (currentIndex < MCQ.length - 1) {
            setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 250);
        } else {
            handleFinish(correctCount);
        }
    };

    // Handler Finish
    const handleFinish = (finalCorrectScore: number) => {
        sessionStorage.setItem('core_logic_score', String(finalCorrectScore));
        finishGame();
    };

    // Reset Game
    const resetGame = () => {
        setCurrentIndex(0);
        setLives(3);
        setCorrectCount(0);
        setIsGameOver(false);
        setCustomMessage('');

        if (progressTextRef.current) {
            const currentIndexEl = progressTextRef.current.querySelector(
                '#progress-current-index',
            );
            if (currentIndexEl) gsap.set(currentIndexEl, { color: '#ffffff' });
        }
    };

    return (
        <>
            <style>{`
            @font-face {
                font-family: 'Arsenal';
                src: url('/fonts/Arsenal-Bold.woff2') format('woff2');
                font-weight: bold;
                font-style: normal;
    font-display: swap;
            }
            @font-face {
                font-family: 'NotoSans';
                src: url('/fonts/NotoSans-Bold.woff2') format('woff2');
                font-weight: bold;
                font-style: normal;
    font-display: swap;
            }
        `}</style>
            <style>{`
            .game-canvas {
                width: 1540px;
                height: 740px;
                position: relative;
                transform-origin: top center;
                flex-shrink: 0;
            }
            @media (max-width: 1536px) {
                .game-canvas { transform: scale(0.93); margin-bottom: calc((0.93 - 1) * 740px); }
            }
            @media (max-width: 1280px) {
                .game-canvas { transform: scale(0.80); margin-bottom: calc((0.80 - 1) * 740px); }
            }
            @media (max-width: 1024px) {
                .game-canvas { transform: scale(0.63); margin-bottom: calc((0.63 - 1) * 740px); }
            }
            @media (max-width: 768px) {
                .game-canvas { transform: scale(0.48); margin-bottom: calc((0.48 - 1) * 740px); }
            }
            @media (max-width: 640px) {
                .game-canvas { transform: scale(0.38); margin-bottom: calc((0.38 - 1) * 740px); }
            }
            @media (max-width: 480px) {
                .game-canvas { transform: scale(0.30); margin-bottom: calc((0.30 - 1) * 740px); }
            }
        `}</style>

            <main
                className="flex min-h-screen items-center justify-center overflow-hidden text-white"
                style={{ fontFamily: "'Arsenal', sans-serif" }}
            >
                {import.meta.env.DEV && (
                    <button
                        onClick={() => handleFinish(7)}
                        className="fixed right-2 top-2 z-[9999] rounded bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg hover:bg-red-700"
                    >
                        Skip (7 correct)
                    </button>
                )}
                <div className="game-canvas">
                    {/* SOAL & DIALOG BOX */}
                    <div className="h-120 -2 -yellow-300 absolute left-[0px] top-[90px] flex w-[1540px] flex-col justify-center gap-36 lg:flex-row">
                        {/* Section Soal (Kiri) */}
                        <section
                            ref={sectionRef}
                            className="relative h-[330px] w-[560px] flex-shrink-0 origin-top-left scale-125 transform overflow-visible bg-transparent"
                        >
                            <div className="absolute left-[0px] top-[0px] z-10 flex h-[330px] w-[560px] select-none flex-col items-center">
                                {/* Paper Asset */}
                                <div
                                    ref={bgRef}
                                    className="absolute left-[50px] top-[0px] z-10 h-[330px] w-[500px]"
                                >
                                    <img
                                        src={QuestionBackground}
                                        alt="Question Paper"
                                        className="object-stretch h-full w-full"
                                    />
                                </div>

                                {/* Current Question Banner */}
                                <div
                                    ref={currentQuestionBannerRef}
                                    className="absolute left-[30px] top-[0px] z-30 h-[95px] w-[180px] overflow-visible"
                                >
                                    <img
                                        src={CurrentQuestionBanner}
                                        alt="Current Question Banner"
                                        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
                                        style={{
                                            top: '-25px',
                                            left: '0px',
                                            width: '300px',
                                            height: '125px',
                                        }}
                                    />
                                    <div
                                        className="pointer-events-none absolute z-10 select-none whitespace-nowrap text-[16px] uppercase tracking-[0.1em] text-white"
                                        style={{
                                            top: '17px',
                                            left: '55px',
                                            transform: 'rotate(-2deg)',
                                            fontFamily:
                                                "'NotoSans', sans-serif",
                                        }}
                                    >
                                        Soal {currentIndex + 1}
                                    </div>
                                </div>

                                {/* Question Remaining Banner */}
                                <div
                                    ref={progressTextRef}
                                    className="pointer-events-none absolute right-[20px] top-[0px] z-30 h-[80px] w-[220px] overflow-visible"
                                >
                                    <img
                                        src={QuestionRemainingBanner}
                                        alt="Question Remaining Banner"
                                        className="absolute inset-0 h-full w-full object-contain"
                                    />
                                    <div
                                        className="absolute z-30 flex select-none items-center justify-center gap-1 whitespace-nowrap text-[22px] text-white"
                                        style={{
                                            top: '25px',
                                            right: '55px',
                                            transform: 'rotate(-5deg)',
                                            fontFamily:
                                                "'NotoSans', sans-serif",
                                        }}
                                    >
                                        <span
                                            id="progress-current-index"
                                            style={{ color: '#ffffff' }}
                                        >
                                            {currentIndex + 1}
                                        </span>
                                        <span className="text-white/40">/</span>
                                        <span>{MCQ.length}</span>
                                    </div>
                                </div>

                                {/* Lives Panel */}
                                <div
                                    ref={livesRef}
                                    className="absolute left-[-5px] top-[60px] z-0 flex h-[220px] w-[95px] flex-col items-center"
                                >
                                    <img
                                        src={LivesBackground}
                                        alt="Lives Background"
                                        className="absolute inset-0 h-full w-full object-contain"
                                    />
                                    <span className="absolute left-6 top-[45px] z-10 select-none text-[16px] tracking-wide text-white">
                                        Lives:
                                    </span>
                                    <div
                                        className="absolute left-8 top-[70px] z-10 flex flex-col items-center gap-1"
                                        style={{ transform: 'rotate(-2deg)' }}
                                    >
                                        {Array.from({ length: 3 }).map(
                                            (_, index) => (
                                                <div
                                                    key={index}
                                                    className={`h-8 w-9 transform transition-all duration-500 hover:scale-110 ${index >= lives ? 'scale-75 opacity-0 blur-sm' : 'opacity-100'}`}
                                                >
                                                    <img
                                                        src={Lives}
                                                        alt="Life Heart Icon"
                                                        className="h-full w-full object-contain"
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* Shape 1 */}
                                <div
                                    ref={shape1Ref}
                                    className="pointer-events-none absolute bottom-[60px] left-[55px] z-20 will-change-transform"
                                    style={{ width: '90px', height: '90px' }}
                                >
                                    <img
                                        src={Shape1}
                                        alt="Shape 1 Decoration"
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                {/* Exclamation Shape 1 */}
                                <div
                                    ref={excl1Ref}
                                    className="pointer-events-none absolute bottom-[120px] right-[20px] z-20 will-change-transform"
                                    style={{ width: '110px', height: '130px' }}
                                >
                                    <img
                                        src={ExclamationShape}
                                        alt="Exclamation Shape Decoration"
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                {/* Exclamation Shape 2 */}
                                <div
                                    ref={excl2Ref}
                                    className="pointer-events-none absolute bottom-[70px] right-[10px] z-20 will-change-transform"
                                    style={{ width: '110px', height: '130px' }}
                                >
                                    <img
                                        src={ExclamationShape}
                                        alt="Exclamation Shape Decoration"
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                {/* Question Description */}
                                <div
                                    ref={textRef}
                                    className="pointer-events-auto absolute z-30 overflow-y-auto text-left"
                                    style={{
                                        top: '81px',
                                        left: '90px',
                                        width: '380px',
                                        height: '150px',
                                        transform: 'rotate(-1.5deg)',
                                    }}
                                >
                                    <p className="pr-2 text-[22px] leading-relaxed tracking-tight text-zinc-950 selection:bg-black selection:text-white">
                                        {currentQuestion.q}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Dialog Box (Kanan) */}
                        <section
                            ref={div3Ref}
                            className="scale-85 relative h-[330px] w-[610px] origin-top-right transform overflow-visible bg-transparent"
                        >
                            {/* Dialogue Box */}
                            <div
                                className={`absolute inset-0 z-10 overflow-visible ${showExplanation ? 'pointer-events-auto' : 'pointer-events-none'}`}
                            >
                                {/* Dialogue Box Background */}
                                <div
                                    ref={dialogueBgRef}
                                    style={{ opacity: 0 }}
                                    className="pointer-events-none absolute left-0 top-0 z-10 h-[300px] w-[470px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                                >
                                    <img
                                        src={DialogueAlertBox}
                                        alt="Dialogue Alert Box"
                                        className="object-stretch h-full w-full"
                                    />
                                </div>

                                {/* Dialogue Text */}
                                <div
                                    ref={dialogueTextRef}
                                    className="-2 absolute z-20 overflow-y-auto text-left"
                                    style={{
                                        top: '35px',
                                        left: '27px',
                                        width: '367px',
                                        height: '190px',
                                        transform: 'rotate(3.5deg)',
                                        opacity: 0,
                                    }}
                                >
                                    <div className="pr-2 text-[17px] leading-relaxed tracking-wide text-white selection:bg-white selection:text-black">
                                        {/* Keterangan Status Jawaban Utama */}
                                        <div className="mb-2 text-[19px] uppercase tracking-wider">
                                            Jawaban kamu:{' '}
                                            {coddieState === 'happy' ? (
                                                <span className="text-green-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                    BENAR!!
                                                </span>
                                            ) : (
                                                <span className="text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                    SALAH!!
                                                </span>
                                            )}
                                        </div>

                                        {/* Keterangan Kunci Jawaban (muncul saat salah) */}
                                        {coddieState === 'sad' &&
                                            !isGameOver &&
                                            currentQuestion && (
                                                <div className="mb-2 rounded border border-white/10 bg-black/40 px-2 py-1 text-[15px] text-gray-200">
                                                    Kunci Jawaban:{' '}
                                                    <span className="text-yellow-400">
                                                        {
                                                            currentQuestion
                                                                .opts[
                                                                currentQuestion
                                                                    .ans
                                                            ]
                                                        }
                                                    </span>
                                                </div>
                                            )}

                                        {/* Penjelasan Detail Soal */}
                                        <p
                                            className={`text-[15px] leading-normal opacity-90 ${isGameOver ? 'text-red-300' : 'text-gray-100'}`}
                                        >
                                            {customMessage}
                                        </p>
                                    </div>
                                </div>

                                {/* Next Question Button */}
                                <div
                                    ref={dialogueButtonRef}
                                    className="absolute z-30"
                                    style={{
                                        bottom: '10px',
                                        left: '-15px',
                                        width: '175px',
                                        height: '95px',
                                        opacity: 0,
                                    }}
                                >
                                    <button
                                        onClick={handleNextQuestion}
                                        className="-none group relative h-full w-full cursor-pointer bg-transparent p-0 outline-none transition-transform duration-100 active:scale-95"
                                    >
                                        <img
                                            src={OkButton}
                                            alt="Advance Code Button"
                                            className="absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
                                        />
                                        <img
                                            src={OkButtonHover}
                                            alt="Advance Code Button Hover"
                                            className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Coddie */}
                            <div
                                ref={coddieRef}
                                onClick={() => {
                                    if (coddieState === 'sleep')
                                        setCoddieState('idle');
                                }}
                                className={`absolute bottom-[10px] right-[-10px] z-20 h-[260px] w-[170px] cursor-pointer active:scale-95 ${coddieState === 'sleep' ? 'hover:brightness-110' : ''}`}
                            >
                                <img
                                    src={getCoddieAsset()}
                                    alt={`Coddie Mascot - ${coddieState}`}
                                    className="h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                                />
                            </div>
                        </section>
                    </div>

                    {/* PILIHAN GANDA */}
                    <section
                        className={`-2 -yellow-400 absolute left-[200px] top-[390px] mx-auto mt-8 flex w-full max-w-7xl flex-col items-center px-4 transition-opacity duration-300 ${showExplanation ? 'pointer-events-none opacity-20' : 'opacity-100'}`}
                    >
                        {/* KELOMPOK ATAS (Pilihan A dan B) */}
                        <div className="-2 -blue-500 flex w-full flex-col justify-center md:flex-row">
                            {[0, 1].map((idx) => {
                                const option = currentQuestion.opts[idx];
                                if (!option) return null;

                                const optionAsset = getOptionAssets(idx);

                                const textPositionStyles: Record<
                                    number,
                                    string
                                > = {
                                    0: 'absolute bottom-[25px] right-[140px] text-right', // Opsi A
                                    1: 'absolute bottom-[25px] left-[140px] text-left', // Opsi B
                                };

                                return (
                                    <button
                                        key={idx}
                                        ref={(el) => {
                                            optionRefs.current[idx] = el;
                                        }}
                                        style={{ opacity: 0 }}
                                        disabled={showExplanation}
                                        onClick={() => handleAnswerClick(idx)}
                                        className={`-2 -yellow-400 group relative h-[155px] w-[460px] select-none bg-transparent outline-none transition-all duration-150 active:scale-[0.97] ${showExplanation ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'} `}
                                    >
                                        {/* 1: Aset Spanduk Default */}
                                        <img
                                            src={optionAsset.default}
                                            alt={optionAsset.alt}
                                            className="object-stretch pointer-events-none absolute inset-0 h-full w-full opacity-100 transition-opacity duration-200 group-hover:opacity-0"
                                        />

                                        {/* 2: Aset Spanduk Hover */}
                                        <img
                                            src={optionAsset.hover}
                                            alt={`${optionAsset.alt} Hover`}
                                            className="object-stretch pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                        />

                                        {/* 3: Konten Teks */}
                                        <div className="absolute inset-0 z-10 px-8">
                                            <span
                                                className={`-2 -blue-500 max-w-[280px] text-[16px] font-bold leading-snug text-white drop-shadow-md transition-colors duration-200 group-hover:text-yellow-300 md:text-[18px] ${textPositionStyles[idx] || 'absolute inset-0 flex items-center justify-center'} `}
                                            >
                                                {option}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* KELOMPOK BAWAH (Pilihan C dan D) */}
                        <div className="-2 -green-500 flex w-full flex-col justify-center md:flex-row">
                            {[2, 3].map((idx) => {
                                const option = currentQuestion.opts[idx];
                                if (!option) return null;

                                const optionAsset = getOptionAssets(idx);
                                const textPositionStyles: Record<
                                    number,
                                    string
                                > = {
                                    2: 'absolute top-[25px] right-[140px] text-right',
                                    3: 'absolute top-[25px] left-[140px] text-left',
                                };

                                return (
                                    <button
                                        key={idx}
                                        ref={(el) => {
                                            optionRefs.current[idx] = el;
                                        }}
                                        style={{ opacity: 0 }}
                                        disabled={showExplanation}
                                        onClick={() => handleAnswerClick(idx)}
                                        className={`-2 -yellow-400 group relative h-[155px] w-[460px] select-none bg-transparent outline-none transition-all duration-150 active:scale-[0.97] ${showExplanation ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'} `}
                                    >
                                        {/* 1: Aset Spanduk Default */}
                                        <img
                                            src={optionAsset.default}
                                            alt={optionAsset.alt}
                                            className="object-stretch pointer-events-none absolute inset-0 h-full w-full opacity-100 transition-opacity duration-200 group-hover:opacity-0"
                                        />

                                        {/* 2: Aset Spanduk Hover */}
                                        <img
                                            src={optionAsset.hover}
                                            alt={`${optionAsset.alt} Hover`}
                                            className="object-stretch pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                        />

                                        {/* 3: Konten Teks */}
                                        <div className="absolute inset-0 z-10 px-8">
                                            <span
                                                className={`-2 -blue-500 max-w-[280px] text-[16px] font-bold leading-snug text-white drop-shadow-md transition-colors duration-200 group-hover:text-yellow-300 md:text-[18px] ${textPositionStyles[idx] || 'absolute inset-0 flex items-center justify-center'} `}
                                            >
                                                {option}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
