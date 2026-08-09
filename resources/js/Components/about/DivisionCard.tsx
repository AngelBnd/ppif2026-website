import CardSVG from '@/assets/about/divisions/DVCard.svg?react';
import type { CSSProperties } from 'react';

type DivisionCardProps = {
    imageSrc: string;
    titleSrc: string;
    direction?: 'left' | 'right';
    className?: string;
    style?: CSSProperties;
    namePosition?: {
        left: string;
        bottom: string;
    };
    key: string;
};

export default function DivisionCard({
    imageSrc,
    titleSrc,
    direction = 'right',
    className = '',
    style,
    key,
    namePosition,
}: DivisionCardProps) {
    const isLeft = direction === 'left';

    return (
        <div
            className={[
                `h-auto ${className}`,

                'transition-transform duration-300 ease-out',
                'hover:rotate-[3deg] hover:scale-105',
                'active:scale-95',
            ].join(' ')}
            style={{ width: 'clamp(9rem, 50vh, 16rem)', ...style }}
        >
            <div
                className={[
                    'relative h-auto w-full origin-center',
                    isLeft ? 'scale-x-[-1]' : '',
                ].join(' ')}
            >
                {/* Card SVG */}
                <CardSVG className="block h-auto w-full" />

                {/* Image perspective wrapper */}
                <div
                    className={[
                        'absolute',
                        'left-[27%] top-[12%] h-[70%] w-[53%]',
                        '[perspective:500px]',
                        isLeft ? 'scale-x-[-1]' : '',
                    ].join(' ')}
                >
                    {/* Image area */}
                    <div
                        className={[
                            'h-full w-full overflow-hidden',
                            '[transform-style:preserve-3d]',
                            isLeft
                                ? '[transform:rotateY(-20deg)_rotate(13.8deg)_skewY(-3deg)]'
                                : '[transform:rotateY(20deg)_rotate(-13.8deg)_skewY(3deg)]',
                        ].join(' ')}
                    >
                        <img
                            src={imageSrc}
                            alt={key}
                            draggable={false}
                            className="h-full w-full select-none object-cover"
                        />
                    </div>
                </div>

                {/* Text */}
                <div
                    style={{
                        left: namePosition?.left ?? '0%',
                        bottom: namePosition?.bottom ?? '0%',
                    }}
                    className={[
                        'pointer-events-none absolute z-20',
                        'bottom-0 origin-center',
                        isLeft
                            ? '[transform:scale(-0.8,0.8)]'
                            : '[transform:scale(0.8)]',
                    ].join(' ')}
                >
                    <img
                        src={titleSrc}
                        alt=""
                        draggable={false}
                        className="block h-auto w-full select-none"
                    />
                </div>
            </div>
        </div>
    );
}
