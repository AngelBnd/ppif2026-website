import type { ComponentType, CSSProperties, SVGProps } from 'react';
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
    iconStyle?: CSSProperties;
    /** Marks the button as a "go back" control so it plays back sounds. */
    back?: boolean;
};

export default function Button({
    Icon,
    onClick,
    className = '',
    iconClassName = '',
    ariaLabel = 'button',
    iconStyle,
    back = false,
}: SvgButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            data-back-sound={back || undefined}
            className={`transition duration-200 hover:scale-105 active:scale-95 ${className}`}
        >
            {typeof Icon === 'string' ? (
                <img
                    src={Icon}
                    alt=""
                    draggable={false}
                    style={iconStyle}
                    className={`select-none ${iconClassName}`}
                />
            ) : (
                <Icon className={iconClassName} style={iconStyle} />
            )}
        </button>
    );
}
