import { useState, FormEvent } from 'react';
import type { GamePageChildProps } from '../GamePage';
import { IMG_QS } from '@/data/gameQuestions/dataTraceQuestions'; 

// assets - Menggunakan import string URL standar
import CurrentQuestionBanner from '@/assets/games/dataTrace/svgs/CurrentQuestionBanner.svg'
import ExclamationShape from '@/assets/games/dataTrace/svgs/ExclamationShape.svg'
import InputFieldShape from '@/assets/games/dataTrace/svgs/InputFieldShape.svg'
import OkButton from '@/assets/games/dataTrace/svgs/OkButton.svg'
import okButtonHover from '@/assets/games/dataTrace/svgs/OkButtonHover.svg'
import QuestionRemainingBanner from '@/assets/games/dataTrace/svgs/CurrentQuestionBanner.svg'
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

            {/* =========================================================
                MAIN WRAPPER CONTAINER (MENAMPUNG SEMUA KONTEN DI ATAS KERTAS)
               ========================================================= */}
            <div className="relative z-10 flex h-[620px] w-full max-w-[440px] flex-col items-center justify-between p-8 sm:p-10">
                
                {/* =========================================================
                    SINGLE CONSOLIDATED CONTAINER: BANNER, DESKRIPSI, DAN GAMBAR FRAGMENT
                   ========================================================= */}
                <div className="relative z-10 flex w-full flex-col items-center">

                    {/* BACKGROUND ASSET: QuestionBackground */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        <img src={QuestionBackground} alt="Background Card" className="h-full w-full object-stretch drop-shadow-[0_25px_30px_rgba(0,0,0,0.6)]" />
                    </div>
                
                    {/* DECORATIVE BACKGROUND INNER SHAPES (Aksen Ornamen Luar) */}
                    <div className="absolute -left-3 top-1/3 z-10 pointer-events-none">
                        <img src={ExclamationShape} alt="Exclamation Shape" className="h-10 w-auto opacity-80" />
                    </div>
                    <div className="absolute -right-4 bottom-1/4 z-10 pointer-events-none">
                        <img src={Shape1} alt="Shape Decoration" className="h-12 w-auto opacity-80" />
                    </div>
                
                    {/* Header Informasi Progress Soal (Menggunakan Banner SVG) */}
                    <div className="relative z-10 flex w-full items-center justify-center h-12 mt-6">
                        <img src={CurrentQuestionBanner} alt="Current Question Banner" className="absolute inset-0 h-full w-full object-contain" />
                        <div className="relative z-10 flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-zinc-900">
                            <span>STAGE:</span>
                            <span className="bg-zinc-950 px-1.5 py-0.5 rounded text-white text-xs">
                                {String(currentIndex + 1).padStart(2, '0')}
                            </span>
                            <span className="text-zinc-500">/</span>
                            <span className="text-zinc-700">{String(IMG_QS.length).padStart(2, '0')}</span>
                        </div>
                    </div>

                    {/* Container Display Gambar Fragment Soal */}
                    <div className="relative z-10 mt-4 mb-6 flex flex-wrap items-center justify-center gap-3 min-h-[150px] w-[calc(100%-4rem)] shadow-inner">
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
                
                    {/* Deskripsi Teks Pertanyaan */}
                    <div className="relative z-10 mt-4 min-h-[40px] text-center px-8">
                        <p className="text-xs font-bold leading-relaxed text-zinc-800">
                            {currentQuestion.desc}
                        </p>
                    </div>

                </div>
                    
                {/* =========================================================
                    DIV UTAMA 2: ACTION CONTROLS (INPUT FIELD & SUBMIT CONFIRMATION)
                   ========================================================= */}
                <form onSubmit={handleSubmit} className="relative z-10 flex w-full flex-col items-center gap-4 pb-4">
                    
                    {/* Input Field Section with Absolute Layout Shape */}
                    <div className="relative flex w-full items-center justify-center h-14 max-w-[320px]">
                        <img src={InputFieldShape} alt="Input Wrapper Shape" className="absolute inset-0 h-full w-full object-contain" />
                        
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="INPUT_PASSWORD_KEY..."
                            className={`relative z-10 w-full bg-transparent px-6 text-center text-xs font-black tracking-[0.25em] uppercase placeholder:text-zinc-400 focus:outline-none transition-all ${
                                isWrong ? 'animate-shake text-red-600' : 'text-zinc-950'
                            }`}
                            autoFocus
                        />
                    </div>

                    {/* Interactive Button Section (OkButton & Hover state injection) */}
                    <button
                        type="submit"
                        className="group relative flex h-12 w-full max-w-[160px] items-center justify-center overflow-hidden transition-transform active:scale-[0.97]"
                    >
                        {/* Default Asset State */}
                        <img src={OkButton} alt="Action Confirm" className="absolute inset-0 h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-0" />
                        
                        {/* Hover Asset State */}
                        <div className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <img src={okButtonHover} alt="Action Confirm Hover" className="h-full w-full object-contain" />
                        </div>

                        {/* Button Interactive Invisible Foreground Text Trigger */}
                        <span className="relative z-10 text-[10px] font-black tracking-widest text-zinc-950 uppercase hidden">
                            DECODE
                        </span>
                    </button>

                    {/* Error Notification Alert */}
                    <div className="absolute -bottom-4 left-0 right-0 h-4 text-center">
                        {isWrong && (
                            <span className="text-[9px] font-black tracking-widest text-red-600 animate-pulse">
                                [ALERT: ACCESS_DENIED]
                            </span>
                        )}
                    </div>
                </form>

            </div>

            {/* PERSISTENT FOOTER NOTATION */}
            <footer className="absolute bottom-4 z-20 text-center text-[9px] tracking-[0.3em] text-zinc-700 select-none">
                SECURE INTERFACE // PROTOCOL_ACT_I_2026
            </footer>
        </main>
    );
}