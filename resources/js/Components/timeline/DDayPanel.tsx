import aug26Tag from '@/assets/timeline/aug26-tag.svg';
import decor from '@/assets/timeline/decor.svg';
import detailsButton from '@/assets/timeline/details-button.svg';

import {
    useLayoutEffect,
    useRef,
    type ComponentType,
    type SVGProps,
} from 'react';

import ShapeDecoLong from '@/assets/timeline/ShapeDecorativeLong.svg';
import ShapeDecoShort from '@/assets/timeline/ShapeDecoShort.svg';
import { DecorShape } from '@/Pages/Games/DataTrace/DataTracePage';

import gsap from 'gsap';

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
    const panelRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const augTagRef = useRef<HTMLImageElement | null>(null);
    const decorShape1ref = useRef<HTMLImageElement | null>(null);
    const decorShape2ref = useRef<HTMLImageElement | null>(null);
    const hasMountedRef = useRef(false);

    // Entire panel enters from the right on initial render
    useLayoutEffect(() => {
        const panel = panelRef.current;
        const content = contentRef.current;
        const augTag = augTagRef.current;

        if (!panel || !content || !augTag) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            gsap.fromTo(
                panel,
                {
                    xPercent: 10,
                },
                {
                    xPercent: 0,
                    delay: 0.3,
                    duration: 0.4,
                    ease: 'power4.out',
                    clearProps: 'transform',
                },
            );

            gsap.fromTo(
                content,
                {
                    x: 90,
                },
                {
                    x: 0,
                    delay: 0.3,
                    duration: 0.4,
                    ease: 'back.out(1.2)',
                },
            );
            tl.fromTo(
                augTag,
                {
                    rotate: '-10deg',
                    x: 90,
                    transformOrigin: 'top left',
                },
                {
                    x: 0,
                    delay: 0.3,
                    rotate: 3,
                    duration: 0.4,
                    ease: 'back.out(1.3)',
                },
                '>=0.06',
            );

            gsap.to(decorShape1ref.current, {
                scale: 1.09,
                duration: 1,
                repeat: -1,
                delay: 0.5,
                yoyo: true,
                ease: 'sine.inOut',
            });

            gsap.to(decorShape2ref.current, {
                scale: 1.1,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }, panel);

        return () => ctx.revert();
    }, []);

    // Stagger each content element in, one after another, when the info changes
    useLayoutEffect(() => {
        const content = contentRef.current;

        if (!content) return;

        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            return;
        }

        const ctx = gsap.context(() => {
            const items = Array.from(content.children).filter(
                (el) =>
                    el !== decorShape1ref.current &&
                    el !== decorShape2ref.current,
            );
            gsap.killTweensOf(items);

            gsap.fromTo(
                items,
                { x: 70, autoAlpha: 0 },
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.3,
                    ease: 'back.out(1.3)',
                    stagger: 0.12,
                    clearProps: 'transform',
                },
            );

            gsap.fromTo(
                [decorShape1ref.current],
                { x: 30, autoAlpha: 0, rotate: '-20deg' },
                {
                    rotate: '0deg',
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.3,
                    ease: 'back.out(1.4)',
                },
            );

            gsap.fromTo(
                [decorShape2ref.current],
                { x: 30, autoAlpha: 0, rotate: '20deg' },
                {
                    rotate: '0deg',
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.3,
                    ease: 'back.out(1.4)',
                },
            );
        }, content);

        return () => ctx.revert();
    }, [currentInfo]);

    return (
        <div
            ref={panelRef}
            className="bg pointer-events-none absolute inset-y-0 -right-12 z-30 w-1/2"
        >
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
                    ref={augTagRef}
                    src={aug26Tag}
                    alt="AUG 2026"
                    className="absolute left-[18%] top-[-9%] w-[42%] drop-shadow-md"
                />

                <div
                    ref={contentRef}
                    className="absolute left-[28%] top-[15%] mt-4 flex h-[33rem] w-[56%] flex-col items-start gap-[1vmin]"
                    style={{ top: 'clamp(6.75%, calc(2vh + 12%), 20%) ' }}
                >
                    {/* 1. D-DAY PPIF title */}
                    {/* Removed absolute positioning; it now takes 100% of the wrapper's width */}
                    <div
                        key={currentInfo}
                        className={`shrink-0 ${headerClassName} `}
                    >
                        <HeaderSVG className="block h-auto w-full" />
                    </div>
                    <div
                        className="absolute"
                        style={{
                            left: 'clamp(-18%, -12vh, -10%)',
                            top: 'clamp(16.5%, 20vh, 30%)',
                            width: 'clamp(18%, 22vh, 40%)',
                        }}
                    >
                        <DecorShape
                            ref={decorShape1ref}
                            src={ShapeDecoLong}
                            alt=""
                            className="w-full"
                        />
                    </div>

                    <div
                        className="absolute"
                        style={{
                            right: 'clamp(-21.6%, -20vh, -12%)',
                            top: 'clamp(-20%, calc(-25vh + 1rem), 0%)',
                            width: 'clamp(18%, 22vh, 40%)',
                        }}
                    >
                        <DecorShape
                            ref={decorShape2ref}
                            src={ShapeDecoShort}
                            alt=""
                            className="w-full"
                        />
                    </div>
                    {/* 2. Description */}
                    {/* Swapped absolute positioning for margin-left (ml-[12%]) to keep the staggered look */}
                    <div className="mx-3 my-3 [perspective:380px]">
                        <div className="mb-[0vmin] ml-[12%] -rotate-6 space-y-2 font-arsenal text-[2.5vmin] leading-snug [transform:rotateZ(-4deg)_rotateY(-9deg)_scaleY(1.12)_scaleX(1.1)_skewX(2deg)]">
                            <p>{informationDisplayed}</p>
                        </div>
                    </div>

                    {/* 3. See Details button */}
                    {/* Swapped absolute positioning for margin-left (ml-[15%]) */}
                    {/* Adjusted width to 45% of the wrapper instead of the whole screen */}
                    <button
                        type="button"
                        onClick={onSeeDetails}
                        className="group -bottom-8 ml-[13%] w-[50%] hover:scale-[1.03] active:scale-95"
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
