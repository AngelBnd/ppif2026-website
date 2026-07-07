import ddayTitle from '@/assets/timeline/dday-title.png';
import detailsButton from '@/assets/timeline/details-button.svg';
import decor from '@/assets/timeline/decor.svg';
import aug26Tag from '@/assets/timeline/aug26-tag.svg';

type DDayPanelProps = {
    onSeeDetails: () => void;
};

export default function DDayPanel({ onSeeDetails }: DDayPanelProps) {
    return (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/2">

            {/* 1. THE MASKED BACKGROUNDS */}
            <div
                className="absolute inset-0 bg-[#0a0c0f]"
                style={{
                    clipPath: 'polygon(48% 0, 100% 0, 100% 100%, 10% 100%)',
                }}
            />
            {/* White panel face */}
            <div
                className="absolute inset-0 bg-white"
                style={{
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 15% 100%)',
                }}
            />

            {/* 2. THE UNMASKED CONTENT */}

            <div className="pointer-events-auto absolute inset-0 text-[#0a0c0f]">

                {/* AUG 2026 tag */}
                <img
                    src={aug26Tag}
                    alt="AUG 2026"
                    className="absolute left-[18%] top-[-5%] w-[45%] drop-shadow-md"
                />

                <div className="absolute left-[25%] top-[10%] flex w-[60%] flex-col items-start gap-[4vmin]">

                    {/* 1. D-DAY PPIF title */}
                    {/* Removed absolute positioning; it now takes 100% of the wrapper's width */}
                    <img
                        src={ddayTitle}
                        alt="D-DAY PPIF"
                        className="w-full mb-[-5vmin]"
                    />

                    {/* 2. Description */}
                    {/* Swapped absolute positioning for margin-left (ml-[12%]) to keep the staggered look */}
                    <div className="ml-[12%] mb-[0vmin] space-y-2 font-arsenal text-[2.5vmin] leading-snug -rotate-6">
                        <p>Lorem ipsum dolor sit amet, adalah salah satu rangkaian utama.</p>
                        <p>adalah salah satu rangkaian utama.</p>
                    </div>

                    {/* 3. See Details button */}
                    {/* Swapped absolute positioning for margin-left (ml-[15%]) */}
                    {/* Adjusted width to 45% of the wrapper instead of the whole screen */}
                    <button
                        type="button"
                        onClick={onSeeDetails}
                        className="group ml-[13%] w-[55%] transition duration-200 hover:scale-[1.03] active:scale-95"
                    >
                        <img
                            src={detailsButton}
                            alt="See Details"
                            className="h-auto w-full object-contain"
                        />
                    </button>
                </div>

                {/* Decorative triangles */}
                <img
                    src={decor}
                    alt=""
                    className="absolute bottom-[6%] right-[6%] w-[10%] opacity-90"
                />
            </div>
        </div>
    );
}
