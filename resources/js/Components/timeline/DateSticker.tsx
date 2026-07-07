import knife from '@/assets/timeline/knife.svg';
import sat15Img from '@/assets/timeline/15-saturday.svg';
import tue18Img from '@/assets/timeline/18-tuesday.svg';

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

export default function DateSticker({
    day,
    weekday,
    color,
    withLogo = false,
    style,
    className = '',
}: DateStickerProps) {

    // Determine which image to show based on the 'day' prop
    const stickerImg = day === '15' ? sat15Img : tue18Img;

    return (
        <div
            className={`pointer-events-none absolute select-none ${className}`}
            style={style}
        >
            <div className="relative -rotate-3 flex flex-col items-center">
                {/* Keep the knife/logo logic exactly the same */}
                {withLogo && (
                    <img
                        src={knife}
                        alt=""
                        className="absolute -top-[45%] left-[105%] w-[70%] -translate-x-1/2 drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)] z-10"
                    />
                )}

                {/* Render the selected SVG file instead of the hardcoded text spans */}
                <img
                    src={stickerImg}
                    alt={`${day} ${weekday}`}
                    // Width uses vmin to keep it responsive and similar in scale to your old font size
                    className="w-[25vmin] h-auto object-contain"
                />
            </div>
        </div>
    );
}
