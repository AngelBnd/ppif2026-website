import type { ComponentType, SVGProps } from 'react';

type SvgButtonProps = {
    /**
     * Either an inline SVG component (`?react` import) or an image URL (plain
     * `.svg` import). URLs are preferred for large or widely reused artwork:
     * they stay out of the JS bundle and are fetched once and shared across
     * chunks, instead of being inlined separately into each one.
     */
    Icon: ComponentType<SVGProps<SVGSVGElement>> | string;
    onClick: () => void;
    className?: string;
    iconClassName?: string;
    ariaLabel?: string;
};

export default function Button({
    Icon,
    onClick,
    className = '',
    iconClassName = '',
    ariaLabel = 'button',
}: SvgButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className={`transition duration-200 hover:scale-105 active:scale-95 ${className}`}
        >
            {typeof Icon === 'string' ? (
                <img
                    src={Icon}
                    alt=""
                    draggable={false}
                    className={`select-none ${iconClassName}`}
                />
            ) : (
                <Icon className={iconClassName} />
            )}
        </button>
    );
}
