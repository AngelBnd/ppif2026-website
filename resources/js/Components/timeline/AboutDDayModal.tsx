import greyknife from '@/assets/timeline/grey-knife.svg';
import bgPage1 from '@/assets/timeline/aboutdday1.png';
import bgPage2 from '@/assets/timeline/aboutdday2.png';
import page1Text from '@/assets/timeline/page1.svg';
import page2Text from '@/assets/timeline/page2.svg';
import leftArrow from '@/assets/timeline/about-left-arrow.svg';
import rightArrow from '@/assets/timeline/about-right-arrow.svg';
import backButtonImg from '@/assets/icons/BackButtonSVG.svg';
import { useEffect, useState } from 'react';

type AboutDDayModalProps = {
    open: boolean;
    onClose: () => void;
};

export default function AboutDDayModal({ open, onClose }: AboutDDayModalProps) {
    const [page, setPage] = useState<1 | 2>(1);

    // Always re-open on the first page.
    useEffect(() => {
        if (open) setPage(1);
    }, [open]);

    // Allow Escape to close.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="About D-Day"
        >
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-black/75"
            />

            {/* Card Wrapper */}
            <div className="relative z-10 w-[85%] max-w-[1350px] -translate-y-[-6%]">
                
                {/* THE SVG BACKGROUNDS */}
                <img
                    src={page === 1 ? bgPage1 : bgPage2}
                    alt=""
                    className="w-full h-auto drop-shadow-2xl"
                />

                {/* THE ABSOLUTE OVERLAYS */}
                {/* Everything inside here floats on top of the SVG background */}
                <div className="absolute inset-0">
                    
                    {/* Grey knife */}
                    <img
                        src={greyknife}
                        alt=""
                        className="absolute -top-[27%] right-[10%] w-[25%] rotate-[0deg]]"
                    />

                    {/* Page 1 Body Text */}
                    {page === 1 && (
                        <div className="absolute left-[18%] top-[45%] w-[67%] -rotate-[0deg] text-white">
                            <p className="font-arsenal text-[2.5vmin] leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit, sed do eiusmod tempor Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit, sed do eiusmod
                                tempor eiusmod tempor eiusmod tempor eiusmod tempor
                                eiusmod tempor eiusmod tempor por eiusmod tempor
                                por eiusmod tempor por eiusmod tempor por eiusmod
                                tempor por eiusmod tempor.
                            </p>
                        </div>
                    )}

                    {/* Footer / Pagination Controls */}
                    <div className="absolute bottom-[5%] left-[14%] flex items-end gap-6 text-white -rotate-2">
                        {page === 1 ? (
                            // 1. The outer wrapper is now just a static flex div
                            <div className="flex items-center gap-0">
                                
                                {/* 2. The text is just a static image now */}
                                <img src={page1Text} alt="1/2 Page" className="h-[20vmin] w-auto object-contain" />
                                
                                {/* 3. The button ONLY wraps the arrow */}
                                <button
                                    type="button"
                                    onClick={() => setPage(2)}
                                    aria-label="Next page"
                                    // Moved the hover animations here (bumped to scale-110 so the arrow really pops)
                                    className="transition duration-200 hover:scale-110 active:scale-95"
                                >
                                    <img 
                                        src={rightArrow} 
                                        alt="Next" 
                                        className="h-[7vmin] w-auto object-contain -translate-x-[3vmin] translate-y-[0.5vmin]" 
                                    />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-0">
                                
                                {/* The button ONLY wraps the arrow */}
                                <button
                                    type="button"
                                    onClick={() => setPage(1)}
                                    aria-label="Previous page"
                                    // Added relative z-10 so the clickable area stays on top if the arrow overlaps the text
                                    className="relative z-10 transition duration-200 hover:scale-110 active:scale-95"
                                >
                                    <img 
                                        src={leftArrow} 
                                        alt="Previous" 
                                        // Make sure you mirror the translation for the left arrow if needed
                                        className="h-[7vmin] w-auto object-contain translate-x-[-1vmin] translate-y-[4.5vmin]" 
                                    />
                                </button>

                                {/* The text is just a static image now */}
                                <img src={page2Text} alt="2/2 Page" className="h-[20vmin] w-auto object-contain" />
                            </div>
                        )}
                        
                        {page === 2 && (
                            <span className="font-noto text-[2vmin] italic">
                                
                            </span>
                        )}
                    </div>

                    {/* Back button (closes the modal) */}
                    <button
                        type="button"
                        onClick={onClose}
                        // Removed the flex and gap since it is just one image now
                        className="absolute bottom-[-3%] right-[-15%] transition duration-200 hover:scale-105 active:scale-95 -rotate-2"
                    >
                        <img 
                            src={backButtonImg} 
                            alt="Back" 
                            // Set the height using vmin so it scales perfectly with your pagination
                            className="h-[13vmin] w-auto object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" 
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}