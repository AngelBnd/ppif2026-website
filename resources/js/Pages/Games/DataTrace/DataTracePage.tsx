import { useState, FormEvent } from 'react';
import type { GamePageChildProps } from '../GamePage';
import { IMG_QS } from '@/data/gameQuestions/dataTraceQuestions'; 

// assets
import CurrentQuestionBanner from '@/assets/games/dataTrace/svgs/CurrentQuestionBanner.svg'
import ExclamationShape from '@/assets/games/dataTrace/svgs/ExclamationShape.svg'
import InputFieldShape from '@/assets/games/dataTrace/svgs/InputFieldShape.svg'
import OkButton from '@/assets/games/dataTrace/svgs/OkButton.svg'
import okButtonHover from '@/assets/games/dataTrace/svgs/OkButtonHover.svg'
import QuestionRemainingBanner from '@/assets/games/dataTrace/svgs/QuestionRemainingBanner.svg'
import Shape1 from '@/assets/games/dataTrace/svgs/Shape1.svg'
import QuestionBackground from '@/assets/games/dataTrace/svgs/QuestionBackground.svg'

export default function DataTracePage({ finishGame }: GamePageChildProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');
    const [isWrong, setIsWrong] = useState<boolean>(false);

    const currentQuestion = IMG_QS[currentIndex];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const sanitizedInput = userInput.trim().toLowerCase();
        const isCorrect = currentQuestion.ans.some(
            (acceptableAnswer) => acceptableAnswer.toLowerCase() === sanitizedInput
        );

        if (isCorrect) {
            setIsWrong(false);
            setUserInput('');

            if (currentIndex < IMG_QS.length - 1) {
                setCurrentIndex((prev) => prev + 1);
            } else {
                finishGame();
            }
        } else {
            setIsWrong(true);
            setTimeout(() => setIsWrong(false), 500);
        }
    };

    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 font-mono text-zinc-300 selection:bg-zinc-800 selection:text-white">

            {/* MAIN WRAPPER CONTAINER */}
            <div className="absolute z-10 flex h-[620px] w-full max-w-[1440px] flex-col items-center justify-between p-8 sm:p-10   border-dashed border-yellow-400">
                
                {/* QUESTION CONTAINER */}
                <div className="absolute z-10 flex w-full flex-col items-center">

                    {/* paper asset*/}
                    <div className="absolute bottom-[-620px] left-[220px] h-[800px] w-[920px] z-0 select-none pointer-events-none">
                        <img src={QuestionBackground} alt="Background Card" className="h-full w-full object-stretch" />
                    </div>
                
                    {/* shape dekorasi*/}
                    <div className="absolute -left-[-1050px] -top-[-130px] w-30 h-44 z-10 pointer-events-none   border-yellow-400">
                        <img src={ExclamationShape} alt="Exclamation Shape" className="h-full w-full opacity-80" />
                    </div>
                    <div className="absolute -right-[-1090px] -bottom-[480px] w-40 h-40 z-10 pointer-events-none   border-yellow-400">
                        <img src={Shape1} alt="Shape Decoration" className="h-full w-full opacity-80" />
                    </div>
                
                    {/* Header progress soal */}
                    <div className="absolute top-[-40px] left-[50%] -translate-x-1/2 z-10 flex h-44 w-full max-w-[1200px] items-center justify-between gap-4   border-yellow-400">

                        {/* 1. Current Question Banner */}
                        <div 
                            className="relative flex flex-1 items-center justify-center h-full w-full"
                            style={{
                                width: '120px',
                                height: '190px',
                                top: '20px',
                                left: '-130px',
                                transform: 'rotate(-8deg)' 
                            }}
                        >
                            <img src={CurrentQuestionBanner} alt="Current Question Banner" className="absolute inset-0 h-full w-full object-fill" />

                            <div 
                                className="relative z-10 text-[28px] font-black tracking-[0.2em] text-white uppercase select-none whitespace-nowrap pl-4 inline-block"
                                style={{
                                    top:"-10px",
                                    left:"5px",
                                    transform: 'rotate(-3deg)'
                                }}
                            >
                                SOAL {currentIndex + 1}
                            </div>
                        </div>
                            
                        {/* 2. Question Progress Banner */}
                        <div 
                            className="relative flex flex-1 items-center justify-center h-full w-full"
                            style={{
                                width: '120px',
                                height: '120px',
                                top: '-43px',
                                left: '-400px',
                                transform: 'rotate(-8deg)' 
                            }}
                        >
                            <img src={QuestionRemainingBanner} alt="Question Remaining Banner" className="absolute inset-0 h-full w-full object-fill" />

                            <div className="relative z-10 flex items-center justify-center gap-1.5 text-[28px] font-black tracking-[0.2em] text-zinc-900 select-none whitespace-nowrap"
                                style={{
                                    top:"2px",
                                    left:"50px",
                                    transform: 'rotate(-5deg)'
                                }}
                            >
                                <span className="text-white text-center">
                                    {String(currentIndex + 1).padStart(2, '0')}
                                </span>
                                <span className="text-zinc-500 font-normal">/</span>
                                <span className="text-zinc-700">
                                    {String(IMG_QS.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                            
                    </div>

                    {/* Display Gambar Soal */}
                    <div className="absolute -bottom-[330px] -right-[-250px] z-10 flex flex-wrap items-center justify-center gap-3 min-h-[150px] w-[calc(100%-4rem)] "
                        style={{
                            transform: "rotate(-6deg)"
                        }}
                    >
                        {currentQuestion.imgs.map((imgSrc, index) => (
                            <div 
                                key={index} 
                                className="group relative flex items-center justify-center overflow-hidden"
                                style={{
                                    flex: currentQuestion.n === 1 ? '1 1 180px' : '1 1 90px',
                                    maxWidth: currentQuestion.n === 1 ? '210px' : '100px',
                                    aspectRatio: '1/1'
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
                    <div className="absolute top-[150px] left-[680px] z-10 text-left   border-yellow-400"
                        style={{
                            width: '350px',
                            minHeight: '140px',
                            transform: 'rotate(-6deg)'
                        }}
                    >
                        <p className="text-xs font-bold text-[22px] leading-relaxed text-zinc-800">
                            {currentQuestion.desc}
                        </p>
                    </div>

                </div>
                    
                {/* ACTION CONTROLS CONTAINER */}
                <form onSubmit={handleSubmit} className="absolute -bottom-[0px] -right-[0px] z-10 gap-5 flex w-full h-[140px] flex-row items-center justify-center   border-dashed border-yellow-400">
                    
                    {/* Input Field */}
                    <div 
                        className="relative flex w-full items-center justify-center h-32 max-w-[420px] transition-all duration-300 hover:scale-[1.03] group/input   border-dashed border-yellow-400"
                    >
                        <img src={InputFieldShape} alt="Input Wrapper Shape" className="absolute inset-0 h-full w-full object-contain" />

                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="INPUT HERE"
                            className={`relative z-10 w-[334px] bg-transparent px-6 text-center text-24px font-black tracking-[0.25em] uppercase placeholder:text-zinc-400 outline-none border-none focus:outline-none focus:ring-0 focus:border-none cursor-text transition-all ${
                                isWrong ? 'animate-shake text-red-600' : 'text-white'
                            }`}
                            autoFocus
                        />
                    </div>

                    {/* Button Section */}
                    <button
                        type="submit"
                        className="group relative flex h-28 w-full max-w-[240px] items-center justify-center overflow-hidden transition-transform active:scale-[0.97]   border-dashed border-yellow-400"
                    >
                        {/* Idle State */}
                        <img src={OkButton} alt="Action Confirm" className="absolute inset-0 h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-0" />
                        
                        {/* Hover State */}
                        <div className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <img src={okButtonHover} alt="Action Confirm Hover" className="h-full w-full object-contain" />
                        </div>

                    </button>

                    {/* Alert wrong answer */}
                    <div className="absolute -bottom-4 left-0 right-0 h-4 text-center   border-dashed border-yellow-400">
                        {isWrong && (
                            <span className="text-[18px] font-black tracking-widest text-red-600 animate-pulse">
                                [ALERT: WRONG INPUT]
                            </span>
                        )}
                    </div>
                </form>

            </div>
            
        </main>
    );
}