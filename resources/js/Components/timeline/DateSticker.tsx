import sat15Img from '@/assets/timeline/15-saturday.svg';
import tue18Img from '@/assets/timeline/18-tuesday.svg';

import { forwardRef } from 'react';

type DateStickerProps = {
    /** The day-of-month number, e.g. "15". */
    day: string;
    /** Short weekday label, e.g. "SAT". */
    weekday: string;
    /** Number fill colour. */
    color?: 'blue' | 'white';
    /** Whether the PPIF logo badge is shown above this date. */
    withLogo?: boolean;
    /** Absolute position + transform inside the timeline stage. */
    style?: React.CSSProperties;
    className?: string;
};

const DateSticker = forwardRef<HTMLDivElement, DateStickerProps>(
    ({ day, weekday, color, withLogo = false, className = '', style }, ref) => {
        // Determine which image to show based on the 'day' prop
        const stickerImg = day === '15' ? sat15Img : tue18Img;

        return (
            <div
                className={`pointer-events-none absolute select-none ${className}`}
                style={style}
            >
                <div
                    ref={ref}
                    className="relative flex -rotate-3 flex-col items-center"
                >
                    <img
                        src={stickerImg}
                        alt={`${day} ${weekday}`}
                        className="h-auto w-[27vmin] object-contain"
                    />
                </div>
            </div>
        );
    },
);

export default DateSticker;
