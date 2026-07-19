import { IMG_QS } from '@/data/gameQuestions/dataTraceQuestions';
import { gsap } from 'gsap';
import { FormEvent, useEffect, useRef, useState } from 'react';
import type { GamePageChildProps } from '../GamePage';

// assets
import CurrentQuestionBanner from '@/assets/games/dataTrace/svgs/CurrentQuestionBanner.svg';
import ExclamationShape from '@/assets/games/dataTrace/svgs/ExclamationShape.svg';
import InputFieldShape from '@/assets/games/dataTrace/svgs/InputFieldShape.svg';
import OkButton from '@/assets/games/dataTrace/svgs/OkButton.svg';
import okButtonHover from '@/assets/games/dataTrace/svgs/OkButtonHover.svg';
import QuestionBackground from '@/assets/games/dataTrace/svgs/QuestionBackground.svg';
import QuestionRemainingBanner from '@/assets/games/dataTrace/svgs/QuestionRemainingBanner.svg';
import Shape1 from '@/assets/games/dataTrace/svgs/Shape1.svg';

export default function DataTracePage({ finishGame }: GamePageChildProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');
    const [isWrong, setIsWrong] = useState<boolean>(false);

    const currentQuestion = IMG_QS[currentIndex];

    // REFS GSAP
    const paperRef = useRef<HTMLDivElement>(null);
    const bannerLeftRef = useRef<HTMLDivElement>(null);
    const bannerRightRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // REFS Animasi Idle & Progress Soal
    const exclShapeRef = useRef<HTMLDivElement>(null);
    const shape1Ref = useRef<HTMLDivElement>(null);

    // REFS Progress Soal
    const progressTextRef = useRef<HTMLSpanElement>(null);
    const currentQuestionBannerRef = useRef<HTMLDivElement>(null);
    const progressAssetRef = useRef<HTMLImageElement>(null);

    // GSAP Page Entrance
    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'back.out(1.7)', duration: 0.5 },
        });

        // paper
        tl.fromTo(
            paperRef.current,
            { scale: 0, rotation: -25, opacity: 0 },
            {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.75)',
            },
        );

        // progress soal
        tl.fromTo(
            bannerLeftRef.current,
            { x: -300, rotation: -25, opacity: 0 },
            { x: 0, rotation: -8, opacity: 1 },
            '-=0.3',
        ).fromTo(
            bannerRightRef.current,
            { x: 300, rotation: 25, opacity: 0 },
            { x: 0, rotation: -8, opacity: 1 },
            '-=0.4',
        );

        // gambar + soal
        tl.fromTo(
            imageContainerRef.current,
            { scale: 0.8, rotation: 10, opacity: 0 },
            { scale: 1, rotation: -6, opacity: 1, ease: 'back.out(2)' },
            '-=0.2',
        ).fromTo(
            textRef.current,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
            {
                clipPath: 'inset(0 0% 0 0)',
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
            },
            '-=0.3',
        );

        // input field + ok button
        tl.fromTo(
            formRef.current,
            { y: 100, scale: 0.9, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, ease: 'elastic.out(1, 0.8)' },
            '-=0.2',
        );
    }, []);

    // Idle Animation
    useEffect(() => {
        // shape 1
        gsap.to(shape1Ref.current, {
            scale: 1.28,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        // exclamation shape
        gsap.to(exclShapeRef.current, {
            scale: 1.25,
            rotation: 3,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        // current question banner
        gsap.to(currentQuestionBannerRef.current, {
            rotation: '+=2',
            skewX: '+=1.5',
            duration: 0.7,
            repeat: -1,
            yoyo: true,
            ease: 'steps(1)',
        });
    }, []);

    // Question Progress Animation
    useEffect(() => {
        if (currentIndex === 0) return;

        const textTarget = progressTextRef.current;
        const assetTarget = progressAssetRef.current;
        if (!textTarget || !assetTarget) return;

        gsap.killTweensOf([textTarget, assetTarget]);

        // current question progress, text animation
        gsap.fromTo(
            textTarget,
            { scale: 1, color: '#ffffff' },
            {
                scale: 1.4,
                color: '#22c55e',
                duration: 0.2,
                ease: 'back.out(2)',
                onComplete: () => {
                    gsap.to(textTarget, {
                        scale: 1,
                        color: '#ffffff',
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                },
            },
        );

        // question progress, asset animation
        gsap.fromTo(
            assetTarget,
            { scale: 1 },
            {
                scale: 1.15,
                duration: 0.2,
                ease: 'back.out(1.5)',
                onComplete: () => {
                    gsap.to(assetTarget, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                },
            },
        );
    }, [currentIndex]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const sanitizedInput = userInput.trim().toLowerCase();
        const isCorrect = currentQuestion.ans.some(
            (acceptableAnswer) =>
                acceptableAnswer.toLowerCase() === sanitizedInput,
        );

        if (isCorrect) {
            setIsWrong(false);
            setUserInput('');

            // POOL COMPLIMENT CHANTS (PERSONA 5 STYLED)
            const p5Chants = [
                'BONAFIDE MONAFIDE!',
                "LOOKIN' COOL!",
                'NOT BAD!',
                'BULLSEYE!',
                'SWEET!',
                "THAT'S IT!",
                'JACKPOT!',
            ];

            const randomChant =
                p5Chants[Math.floor(Math.random() * p5Chants.length)];

            // 1. Current Question Banner, Randomized Chant Animation
            const currentSoalText =
                currentQuestionBannerRef.current?.querySelector('div');
            if (currentSoalText) {
                const rectLeft = currentSoalText.getBoundingClientRect();

                // flyout
                const flyingLeftText = document.createElement('span');
                flyingLeftText.innerText = randomChant;

                Object.assign(flyingLeftText.style, {
                    position: 'fixed',
                    top: `${rectLeft.top - 15}px`,
                    left: `${rectLeft.left + rectLeft.width / 6}px`,
                    zIndex: '9999',
                    fontFamily: 'monospace',
                    fontSize: '28px',
                    fontWeight: '900',
                    color: '#22c55e',
                    textShadow: '3px 3px 0px #000',
                    transform: 'skewX(-15deg) rotate(-3deg)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    userSelect: 'none',
                });

                document.body.appendChild(flyingLeftText);

                // Flyout + Fadeout Animation
                gsap.fromTo(
                    flyingLeftText,
                    { y: 0, scale: 0.5, opacity: 0 },
                    {
                        y: -90,
                        scale: 1.2,
                        opacity: 1,
                        rotation: 5,
                        duration: 0.25,
                        ease: 'back.out(2)',
                        onComplete: () => {
                            gsap.to(flyingLeftText, {
                                y: -140,
                                opacity: 0,
                                scale: 0.8,
                                duration: 0.3,
                                ease: 'power2.in',
                                onComplete: () => {
                                    flyingLeftText.remove();
                                },
                            });
                        },
                    },
                );
            }

            // 2. Question Progress, "+1" Increment Animation
            const targetText = progressTextRef.current;
            if (targetText) {
                const rectRight = targetText.getBoundingClientRect();

                const flyingRightText = document.createElement('span');
                flyingRightText.innerText = '+1';

                Object.assign(flyingRightText.style, {
                    position: 'fixed',
                    top: `${rectRight.top - 10}px`,
                    left: `${rectRight.left + 5}px`,
                    zIndex: '9999',
                    fontFamily: 'monospace',
                    fontSize: '32px',
                    fontWeight: '900',
                    color: '#22c55e',
                    textShadow: '3px 3px 0px #000',
                    transform: 'skewX(-15deg) rotate(-5deg)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                });

                document.body.appendChild(flyingRightText);

                gsap.fromTo(
                    flyingRightText,
                    { y: 0, scale: 0.5, opacity: 0 },
                    {
                        y: -80,
                        scale: 1.3,
                        opacity: 1,
                        rotation: -10,
                        duration: 0.25,
                        ease: 'back.out(2)',
                        onComplete: () => {
                            gsap.to(flyingRightText, {
                                y: -130,
                                opacity: 0,
                                scale: 0.8,
                                duration: 0.3,
                                ease: 'power2.in',
                                onComplete: () => {
                                    flyingRightText.remove();
                                },
                            });
                        },
                    },
                );
            }

            if (currentIndex < IMG_QS.length - 1) {
                setCurrentIndex((prev) => prev + 1);
            } else {
                finishGame();
            }
        } else {
            setIsWrong(true);

            // Wrong answer animation
            gsap.to(formRef.current, {
                x: 15,
                skewX: -8,
                repeat: 5,
                yoyo: true,
                duration: 0.05,
                onComplete: () => {
                    gsap.to(formRef.current, { x: 0, skewX: 0, duration: 0.1 });
                    setIsWrong(false);
                },
            });
        }
    };

    return (
        <>
            <style>{`
            @font-face {
                font-family: 'Arsenal';
                src: url('/fonts/Arsenal-Bold.ttf') format('truetype');
                font-weight: bold;
                font-style: normal;
            }
            @font-face {
                font-family: 'NotoSans';
                src: url('/fonts/NotoSans-Bold.ttf') format('truetype');
                font-weight: bold;
                font-style: normal;
            }
        `}</style>
            <main
                className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#BE202F] px-4 text-zinc-300 selection:bg-zinc-800 selection:text-white"
                style={{ fontFamily: "'Arsenal', monospace" }}
            >
                {import.meta.env.DEV && (
                    <button
                        onClick={() => finishGame()}
                        className="fixed right-2 top-2 z-[9999] rounded bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-red-700"
                    >
                        Skip (development)
                    </button>
                )}
                {/* MAIN WRAPPER CONTAINER */}
                <div className="absolute z-10 flex h-[620px] w-full max-w-[1440px] flex-col items-center justify-between border-dashed border-yellow-400 p-8 sm:p-10">
                    {/* QUESTION CONTAINER */}
                    <div className="absolute z-10 flex w-full flex-col items-center">
                        {/* paper asset */}
                        <div
                            ref={paperRef}
                            className="pointer-events-none absolute bottom-[-620px] left-[220px] z-0 h-[800px] w-[920px] select-none opacity-0"
                        >
                            <img
                                src={QuestionBackground}
                                alt="Background Card"
                                className="object-stretch h-full w-full"
                            />
                        </div>

                        {/* shape dekorasi */}
                        <div
                            ref={exclShapeRef}
                            className="w-30 pointer-events-none absolute -left-[-1050px] -top-[-130px] z-10 h-44 origin-center border-yellow-400"
                        >
                            <img
                                src={ExclamationShape}
                                alt="Exclamation Shape"
                                className="h-full w-full opacity-80"
                            />
                        </div>

                        <div
                            ref={shape1Ref}
                            className="pointer-events-none absolute -bottom-[480px] -right-[-1090px] z-10 h-40 w-40 origin-center border-yellow-400"
                        >
                            <img
                                src={Shape1}
                                alt="Shape Decoration"
                                className="h-full w-full opacity-80"
                            />
                        </div>

                        <div className="absolute left-[50%] top-[-40px] z-10 flex h-44 w-full max-w-[1200px] -translate-x-1/2 items-center justify-between gap-4 border-yellow-400">
                            {/* 1. Current Question Banner */}
                            <div
                                ref={bannerLeftRef}
                                className="relative flex h-full w-full flex-1 items-center justify-center opacity-0"
                                style={{
                                    width: '120px',
                                    height: '190px',
                                    top: '-10px',
                                    left: '-160px',
                                }}
                            >
                                <div
                                    ref={currentQuestionBannerRef}
                                    className="relative flex h-full w-full origin-center items-center justify-center"
                                >
                                    <img
                                        src={CurrentQuestionBanner}
                                        alt="Current Question Banner"
                                        className="absolute inset-0 h-full w-full object-fill"
                                    />

                                    <div
                                        className="relative z-10 inline-block select-none whitespace-nowrap pl-4 text-[28px] font-black uppercase tracking-[0.2em] text-white"
                                        style={{
                                            top: '-10px',
                                            left: '5px',
                                            transform: 'rotate(-3deg)',
                                            fontFamily:
                                                "'NotoSans', sans-serif",
                                        }}
                                    >
                                        SOAL {currentIndex + 1}
                                    </div>
                                </div>
                            </div>

                            {/* 2. Question Progress Banner */}
                            <div
                                ref={bannerRightRef}
                                className="relative flex h-full w-full flex-1 items-center justify-center opacity-0"
                                style={{
                                    width: '120px',
                                    height: '90px',
                                    top: '-70px',
                                    left: '-100px',
                                }}
                            >
                                <img
                                    ref={progressAssetRef}
                                    src={QuestionRemainingBanner}
                                    alt="Question Remaining Banner"
                                    className="absolute inset-0 h-full w-full origin-center object-fill"
                                />

                                <div
                                    className="relative z-10 flex select-none items-center justify-center gap-1.5 whitespace-nowrap text-[24px] font-black tracking-[0.2em] text-zinc-900"
                                    style={{
                                        top: '2px',
                                        left: '40px',
                                        transform: 'rotate(-2deg)',
                                    }}
                                >
                                    <span
                                        ref={progressTextRef}
                                        className="inline-block origin-center text-center text-white"
                                        style={{
                                            fontFamily:
                                                "'NotoSans', sans-serif",
                                        }}
                                    >
                                        {String(currentIndex + 1).padStart(
                                            2,
                                            '0',
                                        )}
                                    </span>
                                    <span
                                        className="font-normal text-zinc-500"
                                        style={{
                                            fontFamily:
                                                "'NotoSans', sans-serif",
                                        }}
                                    >
                                        /
                                    </span>
                                    <span
                                        className="text-zinc-700"
                                        style={{
                                            fontFamily:
                                                "'NotoSans', sans-serif",
                                        }}
                                    >
                                        {String(IMG_QS.length).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Display Gambar Soal */}
                        <div
                            ref={imageContainerRef}
                            className="absolute -bottom-[330px] -right-[-250px] z-10 flex min-h-[150px] w-[calc(100%-4rem)] flex-wrap items-center justify-center gap-3 opacity-0"
                        >
                            {currentQuestion.imgs.map((imgSrc, index) => (
                                <div
                                    key={index}
                                    className="group relative flex items-center justify-center overflow-hidden"
                                    style={{
                                        flex:
                                            currentQuestion.n === 1
                                                ? '1 1 180px'
                                                : '1 1 90px',
                                        maxWidth:
                                            currentQuestion.n === 1
                                                ? '210px'
                                                : '100px',
                                        aspectRatio: '1/1',
                                    }}
                                >
                                    <img
                                        src={imgSrc}
                                        alt={`Fragment Target Asset ${index + 1}`}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Teks Pertanyaan */}
                        <div
                            ref={textRef}
                            className="absolute left-[680px] top-[143px] z-10 border-yellow-400 text-left opacity-0"
                            style={{
                                width: '350px',
                                minHeight: '140px',
                                transform: 'rotate(-7deg)',
                            }}
                        >
                            <p className="text-[26px] font-bold leading-relaxed text-zinc-800">
                                {currentQuestion.desc}
                            </p>
                        </div>
                    </div>

                    {/* ACTION CONTROLS CONTAINER */}
                    <form
                        onSubmit={handleSubmit}
                        ref={formRef}
                        className="absolute -bottom-[0px] -right-[0px] z-10 flex h-[140px] w-full flex-row items-center justify-center gap-5 border-dashed border-yellow-400 opacity-0"
                    >
                        {/* Input Field */}
                        <div className="group/input relative flex h-32 w-full max-w-[420px] items-center justify-center border-dashed border-yellow-400 transition-all duration-300 hover:scale-[1.03]">
                            <img
                                src={InputFieldShape}
                                alt="Input Wrapper Shape"
                                className="absolute inset-0 h-full w-full object-contain"
                            />

                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => {
                                    const sanitized = e.target.value.replace(
                                        /[^a-zA-Z0-9 ]/g,
                                        '',
                                    );
                                    setUserInput(sanitized.slice(0, 20));
                                }}
                                placeholder="INPUT HERE"
                                className={`text-24px relative z-10 w-[334px] cursor-text border-none bg-transparent px-6 text-center font-black uppercase tracking-[0.25em] outline-none transition-all placeholder:text-zinc-400 focus:border-none focus:outline-none focus:ring-0 ${
                                    isWrong ? 'text-red-600' : 'text-white'
                                }`}
                                autoFocus
                                maxLength={20}
                            />
                        </div>

                        {/* Button Section */}
                        <button
                            type="submit"
                            className="group relative flex h-28 w-full max-w-[240px] items-center justify-center overflow-hidden border-dashed border-yellow-400 transition-transform active:scale-[0.97]"
                        >
                            <img
                                src={OkButton}
                                alt="Action Confirm"
                                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-0"
                            />

                            <div className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <img
                                    src={okButtonHover}
                                    alt="Action Confirm Hover"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </button>

                        {/* Alert wrong answer */}
                        <div className="absolute -bottom-4 left-0 right-0 h-4 border-dashed border-yellow-400 text-center">
                            {isWrong && (
                                <span
                                    className="inline-block animate-pulse bg-[#0A0C0F] px-2 text-[18px] font-black tracking-widest text-red-600"
                                    style={{ transform: 'skewX(-10deg)' }}
                                >
                                    [ALERT: WRONG INPUT]
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
