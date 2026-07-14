import { useState } from 'react';
import type { GamePageChildProps } from '../GamePage';
import { MCQ } from '@/data/gameQuestions/coreLogicQuestions';

// assets
import QuestionBackground from '@/assets/games/coreLogic/svgs/QuestionBackground.svg'
import CurrentQuestionBanner from '@/assets/games/coreLogic/svgs/CurrentQuestionBanner.svg'
import QuestionRemainingBanner from '@/assets/games/coreLogic/svgs/QuestionRemainingBanner.svg'
import ExclamationShape from '@/assets/games/coreLogic/svgs/ExclamationShape.svg'
import Shape1 from '@/assets/games/coreLogic/svgs/Shape1.svg'
import Lives from '@/assets/games/coreLogic/svgs/Lives.svg'
import LivesBackground from '@/assets/games/coreLogic/svgs/LivesBackground.svg'
import AnswerCircle from '@/assets/games/coreLogic/svgs/AnswerCircle.svg'
import AnswerCircleHover from '@/assets/games/coreLogic/svgs/AnswerCircleHover.svg'
import AnswerCross from '@/assets/games/coreLogic/svgs/AnswerCross.svg'
import AnswerCrossHover from '@/assets/games/coreLogic/svgs/AnswerCrossHover.svg'
import AnswerSquare from '@/assets/games/coreLogic/svgs/AnswerSquare.svg'
import AnswerSquareHover from '@/assets/games/coreLogic/svgs/AnswerSquareHover.svg'
import AnswerTriangle from '@/assets/games/coreLogic/svgs/AnswerTriangle.svg'
import AnswerTriangleHover from '@/assets/games/coreLogic/svgs/AnswerTriangleHover.svg'
import Coddie from '@/assets/games/coreLogic/svgs/Coddie.svg'
import CoddieHappy from '@/assets/games/coreLogic/svgs/CoddieHappy.svg'
import CoddieSad from '@/assets/games/coreLogic/svgs/CoddieSad.svg'
import CoddieSleep from '@/assets/games/coreLogic/svgs/CoddieSleep.svg'
import CoddieSorry from '@/assets/games/coreLogic/svgs/CoddieSorry.svg'
import CoddieReady from '@/assets/games/coreLogic/svgs/CoddieReady.svg'
import DialogueAlertBox from '@/assets/games/coreLogic/svgs/DialogueAlertBox.svg'
import OkButton from '@/assets/games/coreLogic/svgs/OkButton.svg'
import OkButtonHover from '@/assets/games/coreLogic/svgs/OkButtonHover.svg'

export default function CoreLogicPage({ finishGame }: GamePageChildProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lives, setLives] = useState<number>(3);
    const [correctCount, setCorrectCount] = useState<number>(0);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    
    const [coddieState, setCoddieState] = useState<'sleep' | 'idle' | 'happy' | 'sad' | 'feel_sorry'>('sleep');
    const [customMessage, setCustomMessage] = useState<string>('');
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const currentQuestion = MCQ[currentIndex];

    const getCoddieAsset = () => {
        switch (coddieState) {
            case 'idle': return CoddieReady;
            case 'happy': return CoddieHappy;
            case 'sad': return CoddieSad;
            case 'feel_sorry': return CoddieSorry;
            case 'sleep':
            default: return CoddieSleep;
        }
    };

    // A = Kotak (Square), B = Bulat (Circle), C = Silang (Cross), D = Segitiga (Triangle)
    const getOptionAssets = (idx: number) => {
        switch (idx) {
            case 0: return { default: AnswerSquare, hover: AnswerSquareHover, alt: 'Square Option Banner' };
            case 1: return { default: AnswerCircle, hover: AnswerCircleHover, alt: 'Circle Option Banner' };
            case 2: return { default: AnswerCross, hover: AnswerCrossHover, alt: 'Cross Option Banner' };
            case 3: 
            default: return { default: AnswerTriangle, hover: AnswerTriangleHover, alt: 'Triangle Option Banner' };
        }
    };

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
                setCustomMessage("GAME OVER! Nyawa kamu telah habis. Jangan menyerah, ayo coba lagi dari soal pertama!");
                setShowExplanation(true);
            } else {
                setCoddieState('sad');
                setCustomMessage(currentQuestion.exp);
                setShowExplanation(true);
            }
        }
    };

    const handleNextQuestion = () => {
        setShowExplanation(false);
        setCoddieState('sleep');

        if (isGameOver) {
            resetGame();
            return;
        }

        if (currentIndex < MCQ.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            handleFinish(correctCount);
        }
    };

    const handleFinish = (finalCorrectScore: number) => {
        sessionStorage.setItem('core_logic_score', String(finalCorrectScore));
        finishGame();
    };

    const resetGame = () => {
        setCurrentIndex(0);
        setLives(3);
        setCorrectCount(0);
        setIsGameOver(false);
        setCustomMessage('');
    };

    return (
        <main className="flex min-h-screen items-center justify-center text-white px-4 md:px-8 py-8 overflow-x-hidden">
            <div className="w-full items-center justify-center max-w-6xl flex flex-col">

{/* 1 & 3: BARIS ATAS */}
<div className="absolute top-[90px] left-[0px] flex flex-col lg:flex-row gap-36 justify-center h-120 w-[1540px]  -2  -yellow-300">
    
    {/* DIV 1: Section Soal (Kiri) - Diperbesar 1.2x lipat secara proporsional */}
    <section className="relative overflow-visible w-[560px] h-[330px] bg-transparent  -2  -red-900 flex-shrink-0 transform scale-125 origin-top-left">
        <div className="absolute top-[0px] left-[0px] z-10 flex w-[560px] h-[330px] flex-col items-center select-none  -2  -green-500">
            
            <div className="absolute top-[0px] left-[50px] h-[330px] w-[500px] z-10  -2  -blue-900">
                <img src={QuestionBackground} alt="Question Paper" className="h-full w-full object-stretch" />
            </div>

            <div className="absolute top-[0px] left-[30px] w-[180px] h-[95px] z-20 pointer-events-none animate-pulse-slow  -2  -yellow-400">
                <img src={CurrentQuestionBanner} alt="Current Question Banner" className="absolute inset-0 h-full w-full object-contain"
                    style= {{ top: '-25px', left: '0px', width: '300px', height: '125px' }}
                />
                <div 
                    className="absolute z-10 text-[16px] font-black tracking-[0.1em] text-white uppercase select-none whitespace-nowrap  -2  -yellow-400"
                    style={{ top: "17px", left: "55px", transform: 'rotate(-2deg)', fontFamily: "'NotoSans', sans-serif" }}
                >
                    Soal {currentIndex + 1}
                </div>
            </div>
                
            <div className="absolute top-[0px] right-[20px] w-[220px] h-[80px] z-20 pointer-events-none" style={{ transform: 'rotate(-2deg)' }}>
                <img src={QuestionRemainingBanner} alt="Question Remaining Banner" className="absolute inset-0 h-full w-full object-contain" />
                <div 
                    className="absolute z-30 flex items-center justify-center gap-1 text-[22px] font-black text-white select-none whitespace-nowrap"
                    style={{ top: "25px", right: "55px", transform: 'rotate(-5deg)', fontFamily: "'NotoSans', sans-serif" }}
                >
                    <span>{currentIndex + 1}</span>
                    <span className="text-white/40 font-normal">/</span>
                    <span>{MCQ.length}</span>
                </div>
            </div>
                
            <div className="absolute top-[60px] left-[-5px] w-[95px] h-[220px] z-0 flex flex-col items-center  -2  -yellow-300">
                <img src={LivesBackground} alt="Lives Background" className="absolute inset-0 h-full w-full object-contain" />
                <span className="absolute top-[45px] left-6 z-10 text-white font-black text-[16px] tracking-wide select-none">Lives:</span>
                <div className="absolute top-[70px] left-8 z-10 flex flex-col gap-1 items-center  -2  -yellow-300" style={{ transform: 'rotate(-2deg)' }}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div 
                            key={index}
                            className={`w-9 h-8 transition-all duration-500 transform hover:scale-110 ${index >= lives ? 'opacity-0 scale-75 blur-sm' : 'opacity-100'}`}
                        >
                            <img src={Lives} alt="Life Heart Icon" className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>
                
            <div className="absolute left-[55px] bottom-[60px] w-14 h-14 z-20 pointer-events-none  -2  -yellow-300" style={{ width: "90px", height: "90px" }}>
                <img src={Shape1} alt="Shape 1 Decoration" className="h-full w-full object-contain" />
            </div>
                
            <div className="absolute right-[20px] bottom-[120px] w-14 h-[80px] z-20 pointer-events-none  -2  -yellow-300" style={{ width: "110px", height: "130px" }}>
                <img src={ExclamationShape} alt="Exclamation Shape Decoration" className="h-full w-full object-contain" />
            </div>
            <div className="absolute right-[10px] bottom-[70px] w-14 h-[80px] z-20 pointer-events-none  -2  -yellow-300" style={{ width: "110px", height: "130px" }}>
                <img src={ExclamationShape} alt="Exclamation Shape Decoration" className="h-full w-full object-contain" />
            </div>
                
            <div 
                className="absolute z-30 text-left pointer-events-auto overflow-y-auto  -2  -yellow-300"
                style={{ top: '81px', left: '90px', width: '380px', height: '150px', transform: 'rotate(-1.5deg)' }}
            >
                <p className="font-extrabold text-[22px] leading-relaxed text-zinc-950 font-sans tracking-tight pr-2 selection:bg-black selection:text-white">
                    {currentQuestion.q}
                </p>
            </div>
        </div>
    </section>

    {/* DIV 3: Dynamic Dialogue Box (Kanan) - Diperkecil 0.85x lipat secara proporsional */}
    <section className="relative w-[610px] h-[330px] bg-transparent overflow-visible transform scale-85 origin-top-right">
        <div 
            className={`absolute inset-0 z-10 overflow-visible transition-all duration-500
                ${showExplanation 
                    ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto' 
                    : 'opacity-0 scale-95 pointer-events-none lg:translate-x-4'
                }`}
        >
            <div className="absolute top-0 left-0 w-[470px] h-[300px] z-10 pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
                <img src={DialogueAlertBox} alt="Dialogue Alert Box" className="w-full h-full object-stretch" />
            </div>

            <div 
                className="absolute z-20 text-left overflow-y-auto  -2 "
                style={{ top: '35px', left: '22px', width: '367px', height: '190px', transform: 'rotate(3.5deg)' }}
            >
                <p className={`font-bold text-[17px] leading-relaxed font-sans tracking-wide pr-2 selection:bg-white selection:text-black ${isGameOver ? 'text-red-400' : 'text-white'}`}>
                    {customMessage}
                </p>
            </div>

            <div className="absolute z-30" style={{ bottom: '10px', left: '-15px', width: '175px', height: '95px' }}>
                <button
                    onClick={handleNextQuestion}
                    className="w-full h-full relative group bg-transparent  -none outline-none p-0 cursor-pointer active:scale-95 transition-transform duration-100"
                >
                    <img src={OkButton} alt="Advance Code Button" className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200 opacity-100 group-hover:opacity-0" />
                    <img src={OkButtonHover} alt="Advance Code Button Hover" className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                </button>
            </div>
        </div>

        <div 
            onClick={() => {
                if (coddieState === 'sleep') setCoddieState('idle');
            }}
            className={`absolute right-[-10px] bottom-[10px] w-[170px] h-[260px] z-20 cursor-pointer transition-all duration-300 active:scale-95
                ${coddieState === 'sleep' ? 'hover:brightness-110' : 'animate-bounce-slow'}`}
        >
            <img 
                src={getCoddieAsset()} 
                alt={`Coddie Mascot - ${coddieState}`} 
                className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
            />
        </div>
    </section>
</div>

{/* 2: BARIS BAWAH (Pilihan Ganda dengan Aset SVG Sebagai Background Penuh) */}
<section className=" absolute top-[390px] left-[200px] w-full max-w-7xl mx-auto mt-8 px-4 flex flex-col items-center  -2  -yellow-400">
    
    {/* ========================================================== */}
    {/* KELOMPOK ATAS / UP (Pilihan A dan B) */}
    {/* ========================================================== */}
    <div className="flex flex-col md:flex-row  -2  -blue-500 justify-center w-full">
        {[0, 1].map((idx) => {
            const option = currentQuestion.opts[idx];
            if (!option) return null; // Guard jika opsi tidak ada

            const optionAsset = getOptionAssets(idx);
            
            // Mengatur posisi absolute AND text-alignment secara independen
            const textPositionStyles: Record<number, string> = {
                0: "absolute bottom-[25px] right-[140px] text-right", // Opsi A (Posisi kanan bawah, teks rata kanan)
                1: "absolute bottom-[25px] left-[140px] text-left",  // Opsi B (Posisi kiri bawah, teks rata kiri)
            };

            return (
                <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleAnswerClick(idx)}
                    className={`relative w-[460px] h-[155px] bg-transparent outline-none group select-none transition-all duration-150 active:scale-[0.97]  -2  -yellow-400
                        ${showExplanation ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    {/* LAYER BACKDROP 1: Aset Spanduk Default */}
                    <img 
                        src={optionAsset.default} 
                        alt={optionAsset.alt} 
                        className="absolute inset-0 w-full h-full object-stretch transition-opacity duration-200 opacity-100 group-hover:opacity-0 pointer-events-none" 
                    />
                    
                    {/* LAYER BACKDROP 2: Aset Spanduk Hover */}
                    <img 
                        src={optionAsset.hover} 
                        alt={`${optionAsset.alt} Hover`} 
                        className="absolute inset-0 w-full h-full object-stretch transition-opacity duration-200 opacity-0 group-hover:opacity-100 pointer-events-none" 
                    />

                    {/* LAYER FOREGROUND: Konten Teks di atas Spanduk Asset */}
                    <div className="absolute inset-0 z-10 px-8">
                        <span 
                            className={`font-bold text-[16px] md:text-[18px] leading-snug max-w-[280px] drop-shadow-md transition-colors duration-200 text-white group-hover:text-yellow-300  -2  -blue-500
                                ${textPositionStyles[idx] || 'absolute inset-0 flex items-center justify-center'}
                            `}
                        >
                            {option}
                        </span>
                    </div>
                </button>
            );
        })}
    </div>

    {/* ========================================================== */}
    {/* KELOMPOK BAWAH / DOWN (Pilihan C dan D) */}
    {/* ========================================================== */}
    <div className="flex flex-col md:flex-row  -2  -green-500 justify-center w-full">
        {[2, 3].map((idx) => {
            const option = currentQuestion.opts[idx];
            if (!option) return null; // Guard jika opsi tidak ada

            const optionAsset = getOptionAssets(idx);

            // Mengatur posisi absolute AND text-alignment secara independen
            const textPositionStyles: Record<number, string> = {
                2: "absolute top-[25px] right-[140px] text-right", // Opsi C (Posisi kanan atas, teks rata kanan)
                3: "absolute top-[25px] left-[140px] text-left",  // Opsi D (Posisi kiri atas, teks rata kiri)
            };

            return (
                <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleAnswerClick(idx)}
                    className={`relative w-[460px] h-[155px] bg-transparent outline-none group select-none transition-all duration-150 active:scale-[0.97]  -2  -yellow-400
                        ${showExplanation ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    {/* LAYER BACKDROP 1: Aset Spanduk Default */}
                    <img 
                        src={optionAsset.default} 
                        alt={optionAsset.alt} 
                        className="absolute inset-0 w-full h-full object-stretch transition-opacity duration-200 opacity-100 group-hover:opacity-0 pointer-events-none" 
                    />
                    
                    {/* LAYER BACKDROP 2: Aset Spanduk Hover */}
                    <img 
                        src={optionAsset.hover} 
                        alt={`${optionAsset.alt} Hover`} 
                        className="absolute inset-0 w-full h-full object-stretch transition-opacity duration-200 opacity-0 group-hover:opacity-100 pointer-events-none" 
                    />

                    {/* LAYER FOREGROUND: Konten Teks di atas Spanduk Asset */}
                    <div className="absolute inset-0 z-10 px-8">
                        <span 
                            className={`font-bold text-[16px] md:text-[18px] leading-snug max-w-[280px] drop-shadow-md transition-colors duration-200 text-white group-hover:text-yellow-300  -2  -blue-500
                                ${textPositionStyles[idx] || 'absolute inset-0 flex items-center justify-center'}
                            `}
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
    );
}