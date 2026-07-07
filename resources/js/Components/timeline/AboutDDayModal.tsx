import bag from '@/assets/timeline/bag.png';
import notebook from '@/assets/timeline/notebook.png';
import pants from '@/assets/timeline/pants.png';
import logoUrl from '@/assets/timeline/ppif-logo.svg';
import tshirt from '@/assets/timeline/tshirt.png';
import { useEffect, useState } from 'react';

type AboutDDayModalProps = {
    open: boolean;
    onClose: () => void;
};

/** Small white chevron used in the page navigator. */
function Chevron({ dir }: { dir: 'left' | 'right' }) {
    return (
        <svg
            viewBox="0 0 24 40"
            className="h-[4.5vmin] w-auto"
            style={{ transform: dir === 'left' ? 'scaleX(-1)' : 'none' }}
        >
            <polyline
                points="4,4 20,20 4,36"
                fill="none"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/** Persona ransom-note rendering of the "About D-day" heading. */
function AboutHeading() {
    const letters = ['A', 'b', 'o', 'U', 'T'];
    const rot = [-4, 3, -2, 4, -3];
    const boxed = [false, false, true, false, true];

    return (
        <div className="relative">
            <div className="flex items-end">
                {letters.map((ch, i) => (
                    <span
                        key={i}
                        className={`inline-block font-noto text-[6.5vmin] leading-none ${
                            boxed[i]
                                ? 'bg-white px-[0.4vmin] text-[#161616]'
                                : 'text-white'
                        }`}
                        style={{ transform: `rotate(${rot[i]}deg)` }}
                    >
                        {ch}
                    </span>
                ))}
            </div>
            <span className="absolute -bottom-[3.5vmin] left-[28%] font-arsenal text-[4vmin] italic text-white">
                D-day
            </span>
        </div>
    );
}

/** White diagonal banner that holds the page question. */
function QuestionBanner({ children }: { children: React.ReactNode }) {
    return (
        <div className="-rotate-1 bg-white px-6 py-2 shadow-[4px_4px_0_rgba(0,0,0,0.35)]">
            <span className="font-noto text-[2.4vmin] tracking-wide text-[#161616]">
                {children}
            </span>
        </div>
    );
}

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
                className="absolute inset-0 cursor-default bg-black/60"
            />

            {/* Card */}
            <div className="relative z-10 w-[80%] max-w-[1100px] -rotate-1">
                {/* PPIF logo badge poking out of the top-right corner */}
                <img
                    src={logoUrl}
                    alt=""
                    className="absolute -top-[14%] right-[6%] w-[16%] rotate-[18deg] drop-shadow-[0_8px_10px_rgba(0,0,0,0.6)]"
                />

                <div className="relative overflow-hidden bg-[#1d1d1d] px-[5%] py-[4%] text-white shadow-[10px_10px_0_rgba(0,0,0,0.4)]">
                    {/* Header row */}
                    <div className="flex items-start gap-[5%]">
                        <AboutHeading />
                        <div className="mt-[3vmin] flex-1">
                            <QuestionBanner>
                                {page === 1
                                    ? 'Apa itu D-DAY PPIF?'
                                    : 'Apa saja yang harus saya bawa atau pakai?'}
                            </QuestionBanner>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="mt-[5vmin] min-h-[26vmin]">
                        {page === 1 ? (
                            <p className="max-w-[80%] font-arsenal text-[2vmin] leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit, sed do eiusmod tempor eiusmod tempor
                                eiusmod tempor eiusmod tempor eiusmod tempor
                                eiusmod tempor por eiusmod tempor por eiusmod
                                tempor por eiusmod tempor por eiusmod tempor por
                                eiusmod tempor.
                            </p>
                        ) : (
                            <div className="flex items-center justify-around gap-6">
                                <div className="flex items-end gap-2">
                                    <img
                                        src={tshirt}
                                        alt="Kaos putih"
                                        className="h-[20vmin] object-contain"
                                    />
                                    <img
                                        src={pants}
                                        alt="Celana hitam"
                                        className="h-[20vmin] object-contain"
                                    />
                                </div>
                                <img
                                    src={bag}
                                    alt="Tas serut"
                                    className="h-[22vmin] object-contain"
                                />
                                <img
                                    src={notebook}
                                    alt="Buku catatan"
                                    className="h-[20vmin] object-contain"
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-[3vmin] flex items-end gap-6">
                        {page === 1 ? (
                            <button
                                type="button"
                                onClick={() => setPage(2)}
                                aria-label="Next page"
                                className="group flex items-center gap-2 transition hover:gap-3"
                            >
                                <span className="font-noto text-[4.5vmin] leading-none">
                                    <span className="opacity-60">1</span>/2 Page
                                </span>
                                <Chevron dir="right" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setPage(1)}
                                aria-label="Previous page"
                                className="group flex items-center gap-2 transition hover:gap-3"
                            >
                                <Chevron dir="left" />
                                <span className="font-noto text-[4.5vmin] leading-none">
                                    <span className="opacity-60">2</span>/2 Page
                                </span>
                            </button>
                        )}

                        {page === 2 && (
                            <span className="font-noto text-[2vmin] italic">
                                *Perhatikan warna pakaian
                            </span>
                        )}
                    </div>

                    {/* Back button (closes the modal) */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="group absolute bottom-[4%] right-[4%] flex items-center gap-2 transition duration-200 hover:scale-105 active:scale-95"
                    >
                        <span className="flex h-[4vmin] w-[4vmin] items-center justify-center rounded-full border-[0.6vmin] border-white">
                            <span className="h-[1.6vmin] w-[1.6vmin] rounded-full bg-[#ff0000]" />
                        </span>
                        <span
                            className="font-noto text-[3vmin] text-white"
                            style={{
                                WebkitTextStroke: '0.45vmin #0a0c0f',
                                paintOrder: 'stroke fill',
                            }}
                        >
                            Back
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
