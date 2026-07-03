import CardSVG from '@/assets/about/divisions/DVCard.svg?react';

type DivisionCardShadowProps = {
    direction?: 'left' | 'right';
    style?: React.CSSProperties;
};

export default function DivisionCardShadow({
    direction = 'right',
    style,
}: DivisionCardShadowProps) {
    const isLeft = direction === 'left';

    return (
        <div
            style={{
                ...style,
                transform: 'translate(0px, 8px)',
            }}
            className="absolute h-auto w-64"
        >
            <div
                className={[
                    'relative h-auto w-full origin-center',
                    isLeft ? 'scale-x-[-1]' : '',
                ].join(' ')}
            >
                <CardSVG className="block h-auto w-full text-[#0A0C0F] [&_*]:fill-[#0A0C0F]" />
            </div>
        </div>
    );
}
