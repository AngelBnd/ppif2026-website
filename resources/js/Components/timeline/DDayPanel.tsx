import aug26Tag from '@/assets/timeline/aug26-tag.svg';
import detailsButton from '@/assets/timeline/details-button.svg';

import {
    useLayoutEffect,
    useRef,
    type ComponentType,
    type SVGProps,
} from 'react';

import gsap from 'gsap';

import Star from '@/assets/about/Star4Points.svg?react';
import PaperBack1 from '@/assets/games/signalDecoder/PaperBack1.svg?react';
import PaperBack2 from '@/assets/games/signalDecoder/PaperBack2.svg?react';
import PaperMain from '@/assets/games/signalDecoder/PaperMain.svg?react';
import BriefingDayTitle from '@/assets/timeline/BriefingDayTitle.svg?react';
import DdayTitle from '@/assets/timeline/DDayTitle.svg?react';
import timelinetitle from '@/assets/timeline/TimelineTitle.svg';

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
}: DDayPanelProps) {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const augTagRef = useRef<HTMLImageElement | null>(null);
    const decorShape1ref = useRef<HTMLImageElement | null>(null);
    const decorShape2ref = useRef<HTMLImageElement | null>(null);
    const hasMountedRef = useRef(false);

    const paperWrapperRef = useRef<HTMLDivElement | null>(null);
    const paperMainRef = useRef<HTMLDivElement | null>(null);
    const paperBack1Ref = useRef<HTMLDivElement | null>(null);
    const paperBack2Ref = useRef<HTMLDivElement | null>(null);

    const CurrentTitle =
        currentInfo === 'BriefingDay' ? BriefingDayTitle : DdayTitle;

    const currentTitleClassName =
        currentInfo === 'BriefingDay'
            ? 'block h-auto w-[clamp(3rem,30vh,15rem)] -rotate-[5deg] '
            : 'block h-auto w-[clamp(3rem,20vh,13rem)] -rotate-[7deg]';

    const titleRef = useRef<HTMLDivElement | null>(null);
    const descRef = useRef<HTMLDivElement | null>(null);
    const detailsButtonRef = useRef<HTMLButtonElement | null>(null);
    const timelineTitleRef = useRef<HTMLImageElement | null>(null);
    const starRef = useRef<HTMLDivElement | null>(null);

    // Timeline title + star entrance — plays once on first render.
    useLayoutEffect(() => {
        const title = timelineTitleRef.current;
        const star = starRef.current;
        if (!title || !star) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            tl.fromTo(
                title,
                { x: -120, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' },
            ).fromTo(
                star,
                { rotation: -180, scale: 0.85, opacity: 0 },
                {
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.35,
                    ease: 'back.out(1.2)',
                    transformOrigin: '50% 50%',
                },
                '<0.1',
            );
        });

        return () => ctx.revert();
    }, []);

    // When currentInfo flips (D-Day <-> BriefingDay), shuffle the paper stack
    // and fade the fresh content back in — same feel as the paper-switch
    // animation used elsewhere.
    useLayoutEffect(() => {
        // Skip the very first render; the panel has its own entrance.
        // paperMain still needs its permanent xPercent offset baked in,
        // since that value isn't part of the entrance animation.
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            if (paperMainRef.current) {
                gsap.set(paperMainRef.current, { xPercent: -50 });
            }
            return;
        }

        const main = paperMainRef.current;
        const back1 = paperBack1Ref.current;
        const back2 = paperBack2Ref.current;
        const title = titleRef.current;
        const desc = descRef.current;
        const button = detailsButtonRef.current;

        if (!main || !back1 || !back2 || !title || !desc || !button) return;

        const ctx = gsap.context(() => {
            gsap.killTweensOf([main, back1, back2, title, desc, button]);

            const tl = gsap.timeline();

            tl.fromTo(
                main,
                { rotation: -5, xPercent: -50 },
                {
                    rotation: 0,
                    xPercent: -50,
                    transformOrigin: 'center bottom',
                    duration: 0.5,
                    ease: 'back.out(1.5)',
                },
                0,
            );
            tl.fromTo(
                back1,
                { rotation: -2, x: -10 },
                {
                    rotation: 0,
                    x: 0,
                    duration: 0.4,
                    transformOrigin: 'center bottom',
                    ease: 'back.out(1.7)',
                },
                0,
            );
            tl.fromTo(
                back2,
                { rotation: 2, x: 10 },
                {
                    rotation: 0,
                    x: 0,
                    duration: 0.4,
                    transformOrigin: 'center bottom',
                    ease: 'back.out(1.7)',
                },
                0,
            );

            tl.fromTo(
                [title, button],
                { autoAlpha: 0, y: 14 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.28,
                    stagger: 0.08,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity,visibility',
                },
                0.08,
            );

            tl.fromTo(
                desc,
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                    clearProps: 'opacity,visibility',
                },
                0.14,
            );
        });

        return () => ctx.revert();
    }, [currentInfo]);

    // Entire panel enters from the right on initial render
    useLayoutEffect(() => {
        const panel = panelRef.current;
        const augTag = augTagRef.current;
        const paper = paperWrapperRef.current;

        if (!panel || !augTag) return;

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
                paper,
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

    return (
        <div
            ref={panelRef}
            className="bg pointer-events-none absolute inset-y-0 -right-12 z-30 w-1/2"
        >
            {/* 1. THE MASKED BACKGROUNDS */}
            {/* <div
                className="absolute inset-0 bg-[#0a0c0f]"
                style={{
                    clipPath: 'polygon(48% 0, 100% 0, 100% 100%, 10% 100%)',
                }}
            /> */}
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
                    className="absolute left-[18%] top-[-4%] w-[42%]"
                />
                <div
                    className="absolute z-[50]"
                    style={{
                        top: 'clamp(-2rem, calc(10vh - 2rem), 3.5rem)',
                        right: 'clamp(4.5%, calc(1vh + 8%), 10%)',
                        width: 'clamp(27%, calc(30vh + 40%), 65%)',
                    }}
                >
                    <div
                        ref={starRef}
                        className="absolute z-50"
                        style={{
                            top: 'clamp(0.2rem, (1vh - 0.2rem), 3rem)',
                            right: 'clamp(1.8rem, 8.8vh, 4rem)',
                            width: 'clamp(5.4rem, 26.4vh, 12rem)',
                        }}
                    >
                        <Star className="block h-auto w-full" />
                    </div>
                    <img
                        ref={timelineTitleRef}
                        src={timelinetitle}
                        className="block h-auto w-full"
                    />
                </div>
                <div
                    ref={paperWrapperRef}
                    className="absolute bottom-0"
                    style={{
                        right: 'clamp(-0.45rem, -3svh, -3rem)',
                        height: 'clamp(12.4rem, 59svh, 32rem)',
                        width: 'clamp(12rem, 84svh, 48rem)',
                    }}
                >
                    <div
                        ref={paperBack2Ref}
                        className="absolute -bottom-12 z-10"
                        style={{
                            right: 'clamp(0.2rem, 7svh, 4rem)',
                            height: 'clamp(6.3rem, 60svh, 30rem)',
                        }}
                    >
                        <PaperBack2 className="block h-full w-auto" />
                    </div>

                    <div
                        ref={paperBack1Ref}
                        className="absolute !-bottom-12 left-0"
                        style={{ height: 'clamp(9rem, 63svh, 25rem)' }}
                    >
                        <PaperBack1 className="block h-full w-auto" />
                    </div>

                    <div
                        ref={paperMainRef}
                        className="absolute !-bottom-2 z-30 pt-[2%]"
                        style={{
                            right: '0',
                            height: 'clamp(8rem, 59svh, 63rem)',
                            width: 'clamp(2.85rem, 53svh, 33rem)',
                        }}
                    >
                        <div
                            ref={titleRef}
                            className="pointer-events-none relative left-[10%] z-20 mb-[0.2%] mt-[5%] w-fit"
                        >
                            <CurrentTitle className={currentTitleClassName} />
                        </div>

                        <div
                            ref={descRef}
                            className="relative z-[999] mb-[2%] ml-[15%] -rotate-6 font-arsenal leading-snug"
                            style={{
                                marginBottom: '1.4vmin',
                                fontSize: 'clamp(0.2rem, 2.5svh, 1.6rem)',
                                width: 'clamp(6rem, 44svh, 26rem)',
                            }}
                        >
                            <p>{informationDisplayed}</p>
                        </div>

                        <button
                            ref={detailsButtonRef}
                            type="button"
                            onClick={onSeeDetails}
                            className="bg group pointer-events-auto relative z-[999] ml-[15%] w-[50%] hover:scale-[1.03] active:scale-95"
                        >
                            <img
                                src={detailsButton}
                                alt="See Details"
                                className="h-auto w-full object-contain"
                            />
                        </button>

                        <PaperMain
                            className="absolute block w-auto"
                            style={{
                                bottom: 'clamp(-14rem, -15svh, -4rem)',
                                height: 'clamp(14rem, 84svh, 50rem)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
