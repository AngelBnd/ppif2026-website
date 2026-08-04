import CrissCross from '@/Components/SignalDecoder/CrissCross';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import type { GamePageChildProps } from '../GamePage';

import { CWdata } from '@/data/gameQuestions/signalDecoderQuestions';

import HorizontalTitle from '@/assets/games/signalDecoder/Horizontal.svg?react';
import PaperBack1 from '@/assets/games/signalDecoder/PaperBack1.svg?react';
import PaperBack2 from '@/assets/games/signalDecoder/PaperBack2.svg?react';
import PaperMain from '@/assets/games/signalDecoder/PaperMain.svg?react';
import SwitchHorizontalVertical1 from '@/assets/games/signalDecoder/SwitchHoriVerti1.svg?react';
import SideBarBG from '@/assets/games/signalDecoder/thethingthingy.svg?react';
import VerticalTitle from '@/assets/games/signalDecoder/Vertical.svg?react';
import CircleWipe, { CircleWipeHandle } from '@/Components/global/CircleWipe';

export default function SignalDecoderPage({ finishGame }: GamePageChildProps) {
    const paperWrapperRef = useRef<HTMLDivElement | null>(null);
    const paperMainRef = useRef<HTMLDivElement | null>(null);
    const paperBack1Ref = useRef<HTMLDivElement | null>(null);
    const paperBack2Ref = useRef<HTMLDivElement | null>(null);
    const [isVertical, setIsVertical] = useState(false);

    const switchButtonRef = useRef<HTMLButtonElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const cluesRef = useRef<HTMLDivElement | null>(null);
    const sideBarBGRef = useRef<HTMLDivElement | null>(null);
    const switchingRef = useRef(false);
    const wipeRef = useRef<CircleWipeHandle>(null);

    useEffect(() => {
        wipeRef.current?.enter();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const main = paperMainRef.current;
            const back1 = paperBack1Ref.current;
            const back2 = paperBack2Ref.current;
            const sidebar = sideBarBGRef.current;

            if (!main || !back1 || !back2 || !sidebar) return;

            const tl = gsap.timeline({
                defaults: {
                    transformOrigin: 'bottom center',
                },
            });

            gsap.fromTo(
                sideBarBGRef.current,
                {
                    xPercent: 80,
                },
                {
                    xPercent: 0,

                    duration: 0.5,
                    ease: 'power3.out',
                },
            );

            // Paper main appears first
            tl.fromTo(
                main,
                {
                    y: 100,
                    rotation: -5,
                },
                {
                    y: 0,
                    rotation: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                },
            );

            // Paper back 2 follows
            tl.fromTo(
                back2,
                {
                    x: 0,
                    rotation: -10,
                },
                {
                    x: 20,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power3.out',
                },
                '<+=0.2',
            );

            // Paper back 1 appears last
            tl.fromTo(
                back1,
                {
                    rotation: 18,
                    x: 20,
                },
                {
                    x: 0,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power3.out',
                },
                '<+=0.2',
            );
        }, paperWrapperRef);

        return () => ctx.revert();
    }, []);

    const handleDirectionChange = () => {
        if (switchingRef.current) return;

        const button = switchButtonRef.current;
        const title = titleRef.current;
        const clues = cluesRef.current;
        const main = paperMainRef.current;
        const back1 = paperBack1Ref.current;
        const back2 = paperBack2Ref.current;

        if (!button || !title || !clues || !main || !back1 || !back2) {
            return;
        }

        switchingRef.current = true;

        gsap.killTweensOf([button, title, clues, main, back1, back2]);

        const tl = gsap.timeline();

        tl.add('switchStart');

        tl.to(
            button,
            {
                rotation: '-=180',
                duration: 0.25,
                ease: 'back.out(1.2)',
                transformOrigin: 'center center',
            },
            'switchStart',
        );

        tl.to(
            main,
            {
                rotation: -3,
                duration: 0.22,
                ease: 'power2.inOut',
            },
            0,
        );

        tl.to(
            back1,
            {
                rotation: -2,
                x: -10,
                duration: 0.25,
                ease: 'power2.inOut',
            },
            0,
        );

        tl.to(
            back2,
            {
                rotation: 2,
                x: 10,
                duration: 0.25,
                ease: 'power2.inOut',
            },
            0,
        );

        tl.to(
            [title, clues],
            {
                autoAlpha: 0,
                y: -12,
                duration: 0.18,
                ease: 'power2.in',
            },
            'switchStart',
        );

        tl.call(() => {
            setIsVertical((prev) => !prev);

            requestAnimationFrame(() => {
                const newButton = switchButtonRef.current;
                const newTitle = titleRef.current;
                const newClues = cluesRef.current;
                const newMain = paperMainRef.current;
                const newBack1 = paperBack1Ref.current;
                const newBack2 = paperBack2Ref.current;

                if (
                    !newButton ||
                    !newTitle ||
                    !newClues ||
                    !newMain ||
                    !newBack1 ||
                    !newBack2
                ) {
                    switchingRef.current = false;
                    return;
                }

                gsap.set([newTitle, newClues], {
                    autoAlpha: 0,
                    y: 14,
                });

                const enterTl = gsap.timeline({
                    onComplete: () => {
                        gsap.set([newTitle, newClues], {
                            clearProps: 'opacity,visibility,transform',
                        });

                        switchingRef.current = false;
                    },
                });

                enterTl.to(newButton, {
                    duration: 0.28,
                    ease: 'back.out(1.8)',
                });

                enterTl.to(
                    newMain,
                    {
                        rotation: 0,
                        duration: 0.35,
                        ease: 'back.out(1.5)',
                    },
                    '<',
                );

                enterTl.to(
                    newBack1,
                    {
                        rotation: 0,
                        x: 0,
                        duration: 0.35,
                        ease: 'back.out(1.7)',
                    },
                    '<',
                );

                enterTl.to(
                    newBack2,
                    {
                        rotation: 0,
                        x: 20,
                        duration: 0.35,
                        ease: 'back.out(1.7)',
                    },
                    '<',
                );

                enterTl.to(
                    [newTitle, newClues],
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.25,
                        stagger: 0.06,
                        ease: 'power3.out',
                    },
                    '<+=0.05',
                );
            });
        });
    };

    const CurrentTitle = isVertical ? VerticalTitle : HorizontalTitle;
    const currentTitleClassName = isVertical
        ? 'block h-auto w-[13rem] -rotate-[10deg]'
        : 'block h-auto w-[16rem] -rotate-[10deg]';

    const CurrentSwitch = SwitchHorizontalVertical1;

    const currentClues = isVertical ? CWdata.down : CWdata.across;
    return (
        <main className="flex h-screen w-screen items-center justify-start text-white">
            <div className="absolute z-[-10] h-screen w-screen bg-[#0A0C0F] opacity-30" />

            <CircleWipe ref={wipeRef} duration={1} />

            {/* testing button */}
            {/* <button
                type="button"
                onClick={finishGame}
                className="absolute left-4 top-4 z-50 rounded bg-black px-4 py-2 text-white"
            >
            
            </button> */}
            <section className="relative flex h-full w-full items-center justify-start">
                <div className="-mt-24 ml-36 h-[570px] w-[900px] shrink-0">
                    <CrissCross finishGame={finishGame} />
                </div>

                <div
                    ref={sideBarBGRef}
                    className="pointer-events-none absolute right-0 top-0 h-auto w-[52.083vw] bg-red-300"
                >
                    <SideBarBG className="pointer-events-none absolute h-auto w-full" />
                </div>

                <div
                    ref={paperWrapperRef}
                    className="absolute -right-12 bottom-0 h-[32rem] w-[40rem]"
                >
                    <div
                        ref={paperBack2Ref}
                        className="absolute -bottom-7 right-16 z-10 w-[14rem]"
                    >
                        <PaperBack2 className="block h-auto w-full" />
                    </div>

                    <div
                        ref={paperBack1Ref}
                        className="absolute !bottom-0 left-4 w-[16rem]"
                    >
                        <PaperBack1 className="block h-auto w-full" />
                    </div>

                    <div
                        ref={paperMainRef}
                        className="absolute !bottom-[-2rem] left-1/2 z-30 w-[33rem] -translate-x-1/2"
                    >
                        <div
                            ref={titleRef}
                            className={`pointer-events-none absolute z-20 ${
                                isVertical
                                    ? 'left-12 top-[5.8rem]'
                                    : 'left-12 top-[5rem]'
                            }`}
                        >
                            <CurrentTitle className={currentTitleClassName} />
                        </div>

                        <div
                            ref={cluesRef}
                            className="absolute left-16 top-[10.8rem] z-30 w-[22.5rem] -rotate-[8deg]"
                        >
                            <div className="flex max-h-[30rem] flex-col gap-2 overflow-y-auto pr-2 font-noto text-3xl font-bold text-[#050607]">
                                {currentClues.map((item) => (
                                    <div
                                        key={`${isVertical ? 'down' : 'across'}-${item.num}`}
                                        className="flex items-start gap-2"
                                    >
                                        <p className="text-lg leading-snug">
                                            {item.num}. {item.clue}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            ref={switchButtonRef}
                            type="button"
                            onClick={handleDirectionChange}
                            className="absolute right-8 top-0 z-40 w-[10rem] origin-center opacity-70 transition ease-out hover:rotate-[5deg] hover:scale-105 hover:opacity-100 active:scale-95"
                            aria-label={
                                isVertical
                                    ? 'Switch to horizontal clues'
                                    : 'Switch to vertical clues'
                            }
                        >
                            <CurrentSwitch
                                key={
                                    isVertical
                                        ? 'vertical-switch'
                                        : 'horizontal-switch'
                                }
                                className="block h-auto w-full hover:scale-105 active:scale-95"
                            />
                        </button>
                        <PaperMain className="block h-auto w-full" />
                    </div>
                </div>
            </section>
        </main>
    );
}
