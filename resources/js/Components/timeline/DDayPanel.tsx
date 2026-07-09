import aug26Tag from '@/assets/timeline/aug26-tag.svg';
import decor from '@/assets/timeline/decor.svg';
import detailsButton from '@/assets/timeline/details-button.svg';

import type { ComponentType, SVGProps } from 'react';
type SVGComponent = ComponentType<SVGProps<SVGSVGElement>>;

type DDayPanelProps = {
    currentInfo: 'D-Day' | 'BriefingDay';
    informationDisplayed: string;
    onSeeDetails: () => void;
    HeaderSVG: SVGComponent;
    headerClassName?: string;
};
export default function DDayPanel({
    currentInfo,
    informationDisplayed,
    onSeeDetails,
    HeaderSVG,
    headerClassName,
}: DDayPanelProps) {
    return (
        <div className="bg pointer-events-none absolute inset-y-0 -right-12 z-30 w-1/2">
            {/* 1. THE MASKED BACKGROUNDS */}
            <div
                className="absolute inset-0 bg-[#0a0c0f]"
                style={{
                    clipPath: 'polygon(48% 0, 100% 0, 100% 100%, 10% 100%)',
                }}
            />
            {/* White panel face */}
            <div
                className="absolute inset-0 bg-[#F0F2F5]"
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
                    className="absolute left-[18%] top-[-5%] w-[42%] drop-shadow-md"
                />

                <div className="absolute left-[30%] top-[8%] mt-4 flex h-[33rem] w-[56%] flex-col items-start gap-[1vmin]">
                    {/* 1. D-DAY PPIF title */}
                    {/* Removed absolute positioning; it now takes 100% of the wrapper's width */}
                    <div
                        key={currentInfo}
                        className={`shrink-0 ${headerClassName}`}
                    >
                        <HeaderSVG className="block h-auto w-full" />
                    </div>
                    {/* 2. Description */}
                    {/* Swapped absolute positioning for margin-left (ml-[12%]) to keep the staggered look */}
                    <div className="mb-[0vmin] ml-[12%] -rotate-6 space-y-2 font-arsenal text-[2.5vmin] leading-snug">
                        <p>{informationDisplayed}</p>
                    </div>

                    {/* 3. See Details button */}
                    {/* Swapped absolute positioning for margin-left (ml-[15%]) */}
                    {/* Adjusted width to 45% of the wrapper instead of the whole screen */}
                    <button
                        type="button"
                        onClick={onSeeDetails}
                        className="ransition group absolute -bottom-20 ml-[13%] w-[50%] duration-200 hover:scale-[1.03] active:scale-95"
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
                    className="absolute bottom-[6%] right-[12%] w-[10%] opacity-90"
                />
            </div>
        </div>
    );
}
