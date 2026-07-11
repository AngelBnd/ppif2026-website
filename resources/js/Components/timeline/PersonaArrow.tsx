import leftArrow from '@/assets/timeline/LeftArrow.svg';
import rightArrow from '@/assets/timeline/RightArrow.svg';

type PersonaArrowProps = {
    direction: 'left' | 'right';
    onClick: () => void;
    className?: string;
    ariaLabel?: string;
};

/*Persona-style arrow used as the timeline state-switching control.
Renders an external SVG asset depending on the direction prop.*/

export default function PersonaArrow({
    direction,
    onClick,
    className = '',
    ariaLabel = 'switch timeline view',
}: PersonaArrowProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className={`group flex items-center justify-center transition duration-200 hover:scale-110 active:scale-95 ${className}`}
        >
            <img
                src={direction === 'left' ? leftArrow : rightArrow}
                alt={`${direction} arrow`}
                className="h-full w-full object-contain"
            />
        </button>
    );
}
