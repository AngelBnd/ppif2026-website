import CardSVG from '@/assets/about/divisions/DVCard.svg?react';
import type { CSSProperties, ElementType } from 'react';

type DivisionCardProps = {
    imageSrc: string;
    TitleSVG: ElementType;
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
    TitleSVG,
    direction = 'right',
    className = '',
    style,
    key,
    namePosition,
}: DivisionCardProps) {
    const isLeft = direction === 'left';

    return (
        <div
            style={style}
            className={[
                `h-auto w-64 ${className}`,

                'transition-transform duration-300 ease-out',
                'hover:rotate-[3deg] hover:scale-105',
                'active:scale-95',
            ].join(' ')}
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
                    <TitleSVG className="block h-auto w-full" />
                </div>
            </div>
        </div>
    );
}
