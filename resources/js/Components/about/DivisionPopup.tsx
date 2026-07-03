import ChainBG1 from '@/assets/about/divisions/ChainBG1.svg?react';
import ChainBG2 from '@/assets/about/divisions/ChainBG2.svg?react';
import ChainFG1 from '@/assets/about/divisions/ChainFG1.svg?react';
import ChainFG2 from '@/assets/about/divisions/ChainFG2.svg?react';

import BottomTriangle from '@/assets/about/divisions/BottomTriangle.svg?react';
import CardBGPlain from '@/assets/about/divisions/CardBGPlain.svg?react';
import CardBGPlain2 from '@/assets/about/divisions/CardBGPlain2.svg?react';
import DivPopupBG from '@/assets/about/divisions/DivisionPopUpBG.svg?react';
import DivisionCardPopup from '@/assets/about/divisions/DivisionPopupCard.svg?react';

import IdentityBox from '@/assets/about/divisions/IdentityBox.svg?react';
import LeftArrow from '@/assets/svgs/LeftArrow.svg?react';
import RightArrow from '@/assets/svgs/RightArrow.svg?react';

import BackButtonSVG from '@/assets/icons/BackButtonSVG.svg?react';
import Button from '../global/Button';

import gsap from 'gsap';

import {
    forwardRef,
    SetStateAction,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import { DivisionData } from '@/data/divisions';

export type DivisionPopupRef = {
    wrapper: HTMLDivElement | null;

    cardBGPlain: HTMLDivElement | null;
    popupCard: HTMLDivElement | null;
    cardBGPlain2: HTMLDivElement | null;

    chainBG1Top: HTMLDivElement | null;
    chainBG1BottomLeft: HTMLDivElement | null;
    chainBG1BottomRight: HTMLDivElement | null;
    chainBG2Top: HTMLDivElement | null;
    chainBG2Bottom: HTMLDivElement | null;

    chainFG1: HTMLDivElement | null;
    chainFG2: HTMLDivElement | null;
};

type DivisionPopupProps = {
    division: DivisionData;
    onClose?: () => void;
    isClosing?: boolean;
    setRenderDivisionPopup: React.Dispatch<SetStateAction<boolean>>;
    setIsClosingDivisionPopup: React.Dispatch<SetStateAction<boolean>>;
    isClosingDivisionPopup: boolean;
};

const DivisionPopup = forwardRef<DivisionPopupRef, DivisionPopupProps>(
    (
        {
            division,
            setRenderDivisionPopup,
            setIsClosingDivisionPopup,
            isClosingDivisionPopup,
        },
        ref,
    ) => {
        const popupCardRef = useRef<HTMLDivElement | null>(null);
        const cardBGPlainRef = useRef<HTMLDivElement | null>(null);
        const cardBGPlain2Ref = useRef<HTMLDivElement | null>(null);

        const chainBG1TopRef = useRef<HTMLDivElement | null>(null);
        const chainBG1BottomLeftRef = useRef<HTMLDivElement | null>(null);
        const chainBG1BottomRightRef = useRef<HTMLDivElement | null>(null);
        const chainBG2TopRef = useRef<HTMLDivElement | null>(null);
        const chainBG2BottomRef = useRef<HTMLDivElement | null>(null);

        const chainFG1Ref = useRef<HTMLDivElement | null>(null);
        const chainFG2Ref = useRef<HTMLDivElement | null>(null);
        const wrapperRef = useRef<HTMLDivElement | null>(null);

        const memberImageRefs = useRef<(HTMLDivElement | null)[]>([]);
        const identityBoxRefs = useRef<(HTMLDivElement | null)[]>([]);

        const [idxImgDisplay, setIdxImgDisplay] = useState(0);

        const popupTimelineRef = useRef<gsap.core.Timeline | null>(null);
        const openTimelineRef = useRef<gsap.core.Timeline | null>(null);
        const closeTimelineRef = useRef<gsap.core.Timeline | null>(null);

        useImperativeHandle(ref, () => ({
            wrapper: wrapperRef.current,

            cardBGPlain: cardBGPlainRef.current,
            popupCard: popupCardRef.current,
            cardBGPlain2: cardBGPlain2Ref.current,

            chainBG1Top: chainBG1TopRef.current,
            chainBG1BottomLeft: chainBG1BottomLeftRef.current,
            chainBG1BottomRight: chainBG1BottomRightRef.current,
            chainBG2Top: chainBG2TopRef.current,
            chainBG2Bottom: chainBG2BottomRef.current,

            chainFG1: chainFG1Ref.current,
            chainFG2: chainFG2Ref.current,
        }));

        const members = division.members;

        const lastPageIndex = Math.max(
            0,
            Math.ceil(members.length / 2) * 2 - 2,
        );

        const handleNext = () => {
            setIdxImgDisplay((prev) => {
                const nextIndex = prev + 2;
                return nextIndex > lastPageIndex ? 0 : nextIndex;
            });
        };

        const handlePrev = () => {
            setIdxImgDisplay((prev) => {
                const prevIndex = prev - 2;
                return prevIndex < 0 ? lastPageIndex : prevIndex;
            });
        };

        const memberSlots = Array.from({ length: 2 }, (_, index) => {
            return members[idxImgDisplay + index];
        });

        useEffect(() => {
            setIdxImgDisplay(0);
        }, [division.name]);

        useLayoutEffect(() => {
            popupTimelineRef.current?.kill();
            popupTimelineRef.current = null;
            const wrapper = wrapperRef.current;
            const popupCard = popupCardRef.current;
            const cardBGPlain = cardBGPlainRef.current;
            const cardBGPlain2 = cardBGPlain2Ref.current;

            if (!wrapper) return;

            const foregroundChains = [
                {
                    el: chainFG1Ref.current,
                    rotateFrom: 50,
                    xFrom: 70,
                    yFrom: -20,
                    transformOrigin: 'center right',
                },
                {
                    el: chainFG2Ref.current,
                    rotateFrom: -30,
                    xFrom: 35,
                    yFrom: 20,
                    transformOrigin: 'bottom right',
                },
            ].filter(
                (
                    chain,
                ): chain is {
                    el: HTMLDivElement;
                    rotateFrom: number;
                    xFrom: number;
                    yFrom: number;
                    transformOrigin: string;
                } => Boolean(chain.el),
            );

            const backgroundChains = [
                {
                    el: chainBG1TopRef.current,
                    rotateFrom: -20,
                    xFrom: 20,
                    yFrom: 0,
                    transformOrigin: 'right bottom',
                },
                {
                    el: chainBG2TopRef.current,
                    rotateFrom: -18,
                    xFrom: 20,
                    yFrom: 0,
                    transformOrigin: 'left bottom',
                },

                {
                    el: chainBG1BottomRightRef.current,
                    rotateFrom: 14,
                    xFrom: -20,
                    yFrom: 0,
                    transformOrigin: 'top left',
                },
                {
                    el: chainBG2BottomRef.current,
                    rotateFrom: -10,
                    xFrom: 20,
                    yFrom: 0,
                    transformOrigin: 'top center',
                },
                {
                    el: chainBG1BottomLeftRef.current,
                    rotateFrom: 7,
                    xFrom: -20,
                    yFrom: 0,
                    transformOrigin: 'bottom right',
                },
            ].filter(
                (
                    chain,
                ): chain is {
                    el: HTMLDivElement;
                    rotateFrom: number;
                    xFrom: number;
                    yFrom: number;
                    transformOrigin: string;
                } => Boolean(chain.el),
            );

            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                },
            });

            openTimelineRef.current = tl;

            tl.set(wrapper, {
                autoAlpha: 1,
                pointerEvents: 'auto',
            });

            if (popupCard) {
                tl.fromTo(
                    popupCard,
                    {
                        scale: 0.75,
                        x: -90,
                        autoAlpha: 0.8,
                    },
                    {
                        x: 0,
                        scale: 1,
                        autoAlpha: 1,
                        duration: 0.3,
                        ease: 'power4.out',
                    },
                    0.1,
                );
            }

            if (cardBGPlain) {
                tl.fromTo(
                    cardBGPlain,
                    {
                        x: -40,
                        autoAlpha: 0,
                    },
                    {
                        x: 0,
                        autoAlpha: 1,
                        duration: 0.3,
                        ease: 'power4.out',
                    },
                    0,
                );
            }

            if (cardBGPlain2) {
                tl.fromTo(
                    cardBGPlain2,
                    {
                        x: -30,
                        autoAlpha: 0,
                    },
                    {
                        x: 0,
                        rotate: 0,
                        autoAlpha: 1,
                        duration: 0.5,
                        ease: 'power4.out',
                    },
                    0.08,
                );
            }

            if (backgroundChains.length > 0) {
                tl.fromTo(
                    backgroundChains.map((chain) => chain.el),
                    {
                        autoAlpha: 0,
                        x: (index) => backgroundChains[index].xFrom,
                        y: (index) => backgroundChains[index].yFrom,
                        rotation: (index) => backgroundChains[index].rotateFrom,
                        transformOrigin: (index) =>
                            backgroundChains[index].transformOrigin,
                    },
                    {
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        rotation: 0,
                        duration: 0.4,
                        ease: 'back.out(1.8)',
                        stagger: {
                            each: 0.1,
                            from: 'start',
                        },
                    },
                    0.05,
                );
            }

            if (foregroundChains.length > 0) {
                tl.fromTo(
                    foregroundChains.map((chain) => chain.el),
                    {
                        autoAlpha: 1,
                        x: (index) => foregroundChains[index].xFrom,
                        y: (index) => foregroundChains[index].yFrom,
                        rotation: (index) => foregroundChains[index].rotateFrom,
                        transformOrigin: (index) =>
                            foregroundChains[index].transformOrigin,
                    },
                    {
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        rotation: 0,
                        duration: 0.55,
                        ease: 'power4.out',
                        stagger: {
                            each: 0.12,
                            from: 'start',
                        },
                    },
                    0.1,
                );
            }

            return () => {
                tl.kill();
            };
        }, [division.name]);

        const finishClose = () => {
            setRenderDivisionPopup(false);
            setIsClosingDivisionPopup(false);
        };

        const handleCloseDivisionPopup = () => {
            if (isClosingDivisionPopup) return;

            popupTimelineRef.current?.kill();
            popupTimelineRef.current = null;

            const wrapper = wrapperRef.current;
            const popupCard = popupCardRef.current;
            const cardBGPlain = cardBGPlainRef.current;
            const cardBGPlain2 = cardBGPlain2Ref.current;

            if (!wrapper) {
                setRenderDivisionPopup(false);
                setIsClosingDivisionPopup(false);
                return;
            }

            openTimelineRef.current?.kill();
            closeTimelineRef.current?.kill();

            setIsClosingDivisionPopup(true);

            gsap.set(wrapper, {
                pointerEvents: 'none',
            });
            const foregroundChains = [
                {
                    el: chainFG1Ref.current,
                    rotateTo: -5,
                    xTo: -10,
                    yTo: 10,
                    transformOrigin: 'center right',
                },
                {
                    el: chainFG2Ref.current,
                    rotateTo: 5,
                    xTo: -5,
                    yTo: -5,
                    transformOrigin: 'bottom right',
                },
            ].filter(
                (
                    chain,
                ): chain is {
                    el: HTMLDivElement;
                    rotateTo: number;
                    xTo: number;
                    yTo: number;
                    transformOrigin: string;
                } => Boolean(chain.el),
            );

            const backgroundChains = [
                {
                    el: chainBG1TopRef.current,
                    rotateTo: 5,
                    xTo: 0,
                    yTo: 0,
                    transformOrigin: 'right bottom',
                },
                {
                    el: chainBG2TopRef.current,
                    rotateTo: 5,
                    xTo: 0,
                    yTo: 0,
                    transformOrigin: 'left bottom',
                },
                {
                    el: chainBG1BottomRightRef.current,
                    rotateTo: -5,
                    xTo: 0,
                    yTo: 0,
                    transformOrigin: 'top left',
                },
                {
                    el: chainBG2BottomRef.current,
                    rotateTo: 5,
                    xTo: 0,
                    yTo: 0,
                    transformOrigin: 'top center',
                },
                {
                    el: chainBG1BottomLeftRef.current,
                    rotateTo: -5,
                    xTo: 0,
                    yTo: 0,
                    transformOrigin: 'bottom right',
                },
            ].filter(
                (
                    chain,
                ): chain is {
                    el: HTMLDivElement;
                    rotateTo: number;
                    xTo: number;
                    yTo: number;
                    transformOrigin: string;
                } => Boolean(chain.el),
            );

            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.inOut',
                },
            });

            closeTimelineRef.current = tl;

            if (backgroundChains.length > 0) {
                tl.to(
                    backgroundChains.map((chain) => chain.el),
                    {
                        autoAlpha: 0,
                        x: (index) => backgroundChains[index].xTo,
                        y: (index) => backgroundChains[index].yTo,
                        rotation: (index) => backgroundChains[index].rotateTo,
                        transformOrigin: (index) =>
                            backgroundChains[index].transformOrigin,
                        duration: 0.45,
                        ease: 'power1.out',
                        stagger: {
                            each: 0.08,
                            from: 'start',
                        },
                    },
                    0,
                );
            }

            if (foregroundChains.length > 0) {
                tl.to(
                    foregroundChains.map((chain) => chain.el),
                    {
                        autoAlpha: 0,
                        x: (index) => foregroundChains[index].xTo,
                        y: (index) => foregroundChains[index].yTo,
                        rotation: (index) => foregroundChains[index].rotateTo,
                        transformOrigin: (index) =>
                            foregroundChains[index].transformOrigin,
                        duration: 0.55,
                        ease: 'power4.out',
                        stagger: {
                            each: 0.12,
                            from: 'start',
                        },
                    },
                    0.05,
                );
            }

            if (popupCard) {
                tl.to(
                    popupCard,
                    {
                        duration: 0.35,
                        x: 20,
                        ease: 'power4.in',
                    },
                    0,
                );
            }

            if (cardBGPlain) {
                tl.to(
                    cardBGPlain,
                    {
                        duration: 0.35,
                        x: 20,
                        ease: 'power4.in',
                    },
                    0,
                );
            }

            if (cardBGPlain2) {
                tl.to(
                    cardBGPlain2,
                    {
                        duration: 0.35,
                        x: 20,
                        ease: 'power4.in',
                    },
                    0,
                );
            }

            tl.to(
                wrapper,
                {
                    autoAlpha: 0,
                    duration: 0.3,
                    ease: 'power4.out',
                },
                0.15,
            );

            tl.call(finishClose, [], 0.5);
            return () => {
                tl.kill();
            };
        };

        useLayoutEffect(() => {
            const memberImages = memberImageRefs.current.filter(Boolean);
            const identityBoxes = identityBoxRefs.current.filter(Boolean);

            const tl = gsap.timeline();

            if (memberImages.length > 0) {
                tl.fromTo(
                    memberImages,
                    {
                        x: -30,
                    },
                    {
                        x: 0,

                        duration: 0.5,
                        ease: 'expo.out',
                        stagger: {
                            each: 0.12,
                            from: 'start',
                        },
                    },
                    0,
                );
            }

            if (identityBoxes.length > 0) {
                tl.fromTo(
                    identityBoxes,
                    {
                        x: -40,
                    },
                    {
                        x: 0,

                        duration: 0.85,
                        ease: 'expo.out',
                        stagger: {
                            each: 0.1,
                            from: 'start',
                        },
                    },
                    '<',
                );
            }

            return () => {
                tl.kill();
            };
        }, [division.name, idxImgDisplay]);
        const isLeft = division.direction === 'left';
        return (
            <div ref={wrapperRef} className="absolute z-40 h-screen w-screen">
                <div className="absolute z-0 h-screen w-screen bg-[#7C131E] opacity-65" />

                <div className="absolute -left-[10%] top-12">
                    <DivPopupBG className="block h-auto w-[85rem]" />
                </div>

                <div className="absolute bottom-0 left-0 z-20 h-auto w-[30rem]">
                    <BottomTriangle className="z-0 block h-auto w-full" />
                    <p className="absolute bottom-4 left-2 z-20 scale-x-90 scale-y-150 font-noto text-5xl font-bold text-[#282829]">
                        {division.members.length} Anggota
                    </p>
                </div>

                <div className="pointer-events-auto absolute bottom-0 left-0 z-10 flex h-full w-[55%] items-end">
                    <div className="pointer-events-auto absolute bottom-[35%] z-20 flex h-fit w-full justify-between px-4">
                        <Button
                            Icon={LeftArrow}
                            onClick={handlePrev}
                            className="block cursor-pointer transition hover:-translate-x-3"
                            iconClassName="h-auto w-[5rem]"
                        />

                        <Button
                            Icon={RightArrow}
                            onClick={handleNext}
                            className="block cursor-pointer transition hover:translate-x-3"
                            iconClassName="h-auto w-[5rem]"
                        />
                    </div>

                    <div className="pointer-events-none absolute bottom-0 right-0 z-10 flex h-screen w-full items-end">
                        <div className="flex h-[90%] w-full items-start justify-start">
                            {memberSlots.map((data, index) => (
                                <div
                                    key={`member-${division.name}-${idxImgDisplay}-${index}`}
                                    ref={(el) => {
                                        memberImageRefs.current[index] = el;
                                    }}
                                    className={`relative h-full w-full ${
                                        index !== 0 ? '-ml-[9rem]' : ''
                                    } ${!data ? 'invisible' : ''}`}
                                >
                                    <img
                                        src={data?.picture}
                                        alt={data?.name}
                                        draggable={false}
                                        className="absolute bottom-0 left-1/2 z-10 h-full w-auto -translate-x-1/2 select-none object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute bottom-20 left-0 z-20 flex h-full w-[55%] items-end justify-end gap-16 px-5">
                    {memberSlots.map((data, index) => (
                        <div
                            key={`identity-${division.name}-${idxImgDisplay}-${index}`}
                            ref={(el) => {
                                identityBoxRefs.current[index] = el;
                            }}
                            className={`relative z-20 h-[1%] w-1/2 ${
                                !data ? 'invisible' : ''
                            }`}
                        >
                            {data && (
                                <>
                                    <IdentityBox
                                        className={`absolute bottom-0 left-0 z-10 h-auto w-full ${
                                            index !== 0 ? '' : '-scale-x-100'
                                        }`}
                                    />

                                    <div className="absolute bottom-4 left-0 z-20 h-[5rem] w-full px-9 py-4">
                                        <h3 className="font-noto text-2xl font-bold">
                                            {data.name}
                                        </h3>

                                        <p className="font-md font-arsenal text-lg">
                                            {data.role}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="absolute right-0 top-[6%] h-full w-[45rem]">
                    <div
                        ref={cardBGPlainRef}
                        className="absolute left-[2%] top-1/2 z-10 w-full -translate-y-1/2"
                    >
                        <CardBGPlain className="block h-auto w-[33%]" />
                    </div>

                    <div
                        ref={popupCardRef}
                        className="absolute left-[25%] top-1/2 z-20 w-full -translate-y-1/2"
                    >
                        <div className="relative w-[68%]">
                            <DivisionCardPopup className="block h-fit w-full" />

                            <div className="absolute left-[20%] top-[16%] z-10 flex w-[70%] justify-center">
                                <h1 className="mt-3 origin-center -rotate-[6deg] scale-x-90 scale-y-150 font-noto text-3xl font-black leading-relaxed text-[#0A0C0F]">
                                    {division.name}
                                </h1>
                            </div>
                            <div className="absolute left-[17%] top-[44%] z-10 w-[70%]">
                                <p className="text-md mt-3 font-arsenal leading-relaxed text-[#F0F2F5]">
                                    {division.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={cardBGPlain2Ref}
                        className="absolute left-[4.5%] top-1/2 z-30 w-full -translate-y-1/2"
                    >
                        <div className="relative w-[29%]">
                            <CardBGPlain2 className="block h-auto w-full" />

                            <div
                                className={[
                                    'absolute',
                                    'left-[20%] top-[6%] h-[85%] w-[67%]',
                                    '[perspective:500px]',
                                ].join(' ')}
                            >
                                <div
                                    className={[
                                        'absolute inset-0 h-full w-full overflow-hidden',
                                        '[transform-style:preserve-3d]',
                                        '[transform:rotateY(20deg)_rotate(-12.3deg)_skewY(3deg)]',
                                    ].join(' ')}
                                >
                                    <img
                                        src={division.image}
                                        alt={division.name}
                                        draggable={false}
                                        className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 select-none object-cover"
                                    />
                                </div>
                                <division.NameSVG
                                    style={{
                                        left:
                                            division.namePositionPopup?.left ??
                                            '0%',
                                        bottom:
                                            division.namePositionPopup
                                                ?.bottom ?? '0%',
                                        width: division.widthPopup,
                                    }}
                                    className={[
                                        'pointer-events-none absolute z-20 h-auto',
                                        'bottom-0 origin-center',
                                        isLeft ? 'rotate-[-33deg]' : '[]',
                                    ].join(' ')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Background chains */}
                    <div className="absolute z-0 h-full w-full">
                        <div className="absolute -left-[30rem] -top-4 w-[40rem]">
                            <div ref={chainBG1TopRef}>
                                <ChainBG1 className="block h-auto w-full" />
                            </div>
                        </div>

                        <div className="absolute -left-[29rem] bottom-[1rem] w-[38rem] rotate-12 -scale-y-100">
                            <div ref={chainBG1BottomLeftRef}>
                                <ChainBG1 className="block h-auto w-full" />
                            </div>
                        </div>

                        <div className="absolute bottom-[2rem] left-[8rem] w-[40rem] -rotate-[10deg] -scale-x-100 -scale-y-100">
                            <div ref={chainBG1BottomRightRef}>
                                <ChainBG1 className="block h-auto w-full" />
                            </div>
                        </div>

                        <div className="absolute -top-5 left-[9rem] h-[16rem] w-[14rem] rotate-[30deg]">
                            <div ref={chainBG2TopRef}>
                                <ChainBG2 className="block h-auto w-full" />
                            </div>
                        </div>

                        <div className="absolute bottom-12 left-[2.5rem] h-[16rem] w-[14rem]">
                            <div ref={chainBG2BottomRef}>
                                <ChainBG2 className="block h-auto w-full" />
                            </div>
                        </div>
                    </div>

                    {/* foreground chains */}
                    <div className="absolute right-0 z-20 h-full w-[40rem]">
                        <div className="absolute -top-24 right-0 w-[77%]">
                            <div ref={chainFG1Ref}>
                                <ChainFG1 className="block h-auto w-full" />
                            </div>
                        </div>

                        <div className="absolute -bottom-11 right-0 w-[40rem]">
                            <div ref={chainFG2Ref}>
                                <ChainFG2 className="block h-auto w-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    className="bg fixed bottom-6 right-6 z-40"
                    Icon={BackButtonSVG}
                    iconClassName="w-[12rem] h-fit"
                    onClick={handleCloseDivisionPopup}
                />
            </div>
        );
    },
);

DivisionPopup.displayName = 'DivisionPopup';

export default DivisionPopup;
