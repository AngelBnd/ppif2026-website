import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import BubbleChat from '../assets/contact/BubbleChat.svg';
import DiscordText from '../assets/contact/Discord.svg';
import Fingers from '../assets/contact/Fingers.svg';
import Whatsapp from '../assets/contact/Frame180.svg';
import Discord from '../assets/contact/Frame181.svg';
import Instagram from '../assets/contact/Frame182.svg';
import ContactText from '../assets/contact/Frame185.svg';
import UsText from '../assets/contact/Frame186.svg';
import InstagramText from '../assets/contact/Instagram.svg';
import PhoneBack3 from '../assets/contact/Phone.svg?react';
import Vector1 from '../assets/contact/Vector1.svg';
// import Vector2 from '../assets/contact/Vector2.svg';
import Shape1 from '@/assets/games/dataTrace/svgs/Shape1.svg';
import Fingers3 from '../assets/contact/Fingers3.svg';
import Vector406 from '../assets/contact/Vector406.svg';
import ArrowLeft from '../assets/contact/Vector8.svg';
import WhatsAppText from '../assets/contact/WhatsApp.svg';
import { DecorShape } from './Games/DataTrace/DataTracePage';

const REF_WIDTH = 1920;
const REF_HEIGHT = 1080;
const SHIFT_VU = 13;

export default function Contact() {
    const iconGroupsRef = useRef<HTMLDivElement>(null);
    const bubbleRef = useRef<HTMLDivElement>(null);
    const bubbleTextRef = useRef<HTMLDivElement>(null);
    const handPhoneRef = useRef<HTMLDivElement>(null);
    const phoneBodyRef = useRef<HTMLDivElement>(null);
    const bubbleAjaRef = useRef<HTMLImageElement>(null);
    const shape1Ref = useRef<HTMLDivElement>(null);
    const streakRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const icons =
                iconGroupsRef.current?.querySelectorAll<HTMLElement>(
                    '[data-icon]',
                );
            const arrow =
                iconGroupsRef.current?.querySelector<HTMLElement>(
                    '[data-arrow]',
                );
            const bubble = bubbleRef.current;
            const bubbleAja = bubbleAjaRef.current;
            const hand = handPhoneRef.current;
            const phone = phoneBodyRef.current;
            const streak = streakRef.current;
            if (!icons || !bubble || !arrow || !hand || !phone) return;

            const startY = window.innerHeight + 120;

            const masterTl = gsap.timeline();

            masterTl.set(phone, {
                y: startY,
                rotation: 35,
                transformOrigin: 'bottom center',
            });
            masterTl.set(hand, {
                y: startY,
                rotation: 35,
                transformOrigin: 'bottom center',
            });
            masterTl.set(icons, { opacity: 0, x: 80 });
            masterTl.set(arrow, { opacity: 0, x: 60 });
            masterTl.set(bubble, { scale: 0, opacity: 0 });
            masterTl.set(streak, { clipPath: 'inset(0% 0% 100% 0%)' });

            masterTl.fromTo(
                bubbleAja,
                {
                    skewX: 3,
                    skewY: 0,
                },
                {
                    repeat: -1,
                    yoyo: true,
                    skewX: 4,
                    skewY: 2,
                    duration: 0.55,
                    ease: 'linear',
                },
            );

            masterTl.to(
                phone,
                {
                    y: 0,
                    rotation: 0,
                    duration: 1.15,
                    ease: 'power3.out',
                },
                0,
            );

            masterTl.to(
                hand,
                {
                    y: 0,
                    rotation: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                },
                0.07,
            );

            masterTl.to(
                bubble,
                {
                    skewX: 3,
                    skewY: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.55,
                    ease: 'elastic.out(1, 0.6)',
                },
                0.78,
            );

            masterTl.to(
                arrow,
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                0.88,
            );

            masterTl.to(
                streak,
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                },
                0.88,
            );

            masterTl.to(
                icons,
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.45,
                    stagger: 0.12,
                    ease: 'back.out(1.7)',
                },
                0.88,
            );

            gsap.to(shape1Ref.current, {
                scale: 1.28,
                duration: 1.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const icons =
            iconGroupsRef.current?.querySelectorAll<HTMLElement>('[data-icon]');
        if (!icons) return;

        icons.forEach((icon) => {
            const bg = icon.querySelector<HTMLElement>('[data-hover-bg]');
            if (!bg) return;

            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.08,
                    duration: 0.25,
                    ease: 'power2.out',
                });
                gsap.to(bg, {
                    autoAlpha: 1,
                    duration: 0.25,
                    ease: 'power2.out',
                });
            });
            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, { scale: 1, duration: 0.25, ease: 'power2.out' });
                gsap.to(bg, {
                    autoAlpha: 0,
                    duration: 0.25,
                    ease: 'power2.out',
                });
            });
            icon.addEventListener('click', () => {
                const href = icon.getAttribute('data-href');
                if (href) window.open(href, '_blank', 'noopener,noreferrer');
            });
        });

        return () => {
            icons.forEach((icon) => {
                gsap.killTweensOf(icon);
                const bg = icon.querySelector<HTMLElement>('[data-hover-bg]');
                if (bg) gsap.killTweensOf(bg);
            });
        };
    }, []);

    useEffect(() => {
        function update() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const effectiveWidth = Math.min(w, h * (REF_WIDTH / REF_HEIGHT));
            const cappedWidth = Math.min(effectiveWidth, REF_WIDTH);
            document.documentElement.style.setProperty(
                '--vu',
                `${cappedWidth / 100}px`,
            );
        }
        update();
        window.addEventListener('resize', update);
        window.addEventListener('orientationchange', update);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('orientationchange', update);
        };
    }, []);

    return (
        <div className="bg h-screen w-screen overflow-hidden">
            <div className="transition-300 absolute z-0 h-full w-full ease-in"></div>
            <div className="relative z-30 flex h-full w-full flex-col items-center justify-between pt-24 lg:flex-row lg:pt-0">
                {/* Tangan + Handphone */}
                <div className="bg h-screen w-screen overflow-hidden">
                    <div className="transition-300 absolute z-0 h-full w-full bg-[#0A0C0F] opacity-70 ease-in"></div>

                    <div className="relative z-30 flex h-full w-full flex-col items-center justify-between pt-20 lg:flex-row lg:pt-0">
                        {/* Combined Hand + Phone */}
                        <div
                            ref={handPhoneRef}
                            className="absolute bottom-0 z-30"
                            style={{
                                width: `calc(var(--vu)*70)`,
                                height: `calc(var(--vu)*60)`,
                                right: `calc(var(--vu)*(28 + ${SHIFT_VU}))`,
                            }}
                        >
                            {/* Hand layer 2 */}
                            <div
                                className="absolute -bottom-5 z-20"
                                style={{
                                    right: `calc(var(--vu)*0.8)`,
                                    bottom: `calc(var(--vu)*-2)`,
                                }}
                            >
                                <img
                                    src={Vector1}
                                    style={{ width: `calc(var(--vu)*25)` }}
                                    className="h-auto"
                                />
                            </div>

                            {/* Fingers */}
                            <div
                                className="absolute bottom-0 z-50"
                                style={{ right: `calc(var(--vu)*-40)` }}
                            >
                                <img
                                    src={Fingers}
                                    style={{ width: `calc(var(--vu)*13.021)` }}
                                    className="h-auto"
                                />
                            </div>

                            {/* Small finger */}
                            <div
                                className="absolute z-50"
                                style={{
                                    top: `calc(var(--vu)*27)`,
                                    right: `calc(var(--vu)*-45.5)`,
                                }}
                            >
                                <img
                                    src={Fingers3}
                                    style={{ width: `calc(var(--vu)*8.6)` }}
                                    className="h-auto"
                                />
                            </div>

                            {/* Phone body */}
                            <div
                                ref={phoneBodyRef}
                                className="absolute z-10"
                                style={{
                                    bottom: `calc(var(--vu)*-6)`,
                                    right: `calc(var(--vu)*-47)`,
                                    width: `calc(var(--vu)*65)`,
                                    height: `calc(var(--vu)*72)`,
                                }}
                            >
                                <div className="relative h-full w-full">
                                    {/* Main phone background */}
                                    <PhoneBack3 className="block h-auto w-full" />

                                    {/* Icon group */}
                                    <div
                                        ref={iconGroupsRef}
                                        className="absolute z-40"
                                        style={{
                                            width: `calc(var(--vu)*36)`,
                                            height: `calc(var(--vu)*42)`,
                                            top: `calc(var(--vu)*22)`,
                                            left: `calc(var(--vu)*16)`,
                                        }}
                                    >
                                        <div
                                            className="absolute flex h-full origin-top-left flex-col"
                                            style={{
                                                left: `calc(var(--vu)*2)`,
                                                width: `calc(var(--vu)*25)`,

                                                transform:
                                                    'rotate(0deg) scale(1.06)',
                                            }}
                                        >
                                            {/* WhatsApp */}
                                            <div
                                                data-icon
                                                data-href="https://wa.me/628123456789"
                                                className="relative flex shrink-0 cursor-pointer items-center"
                                            >
                                                <img
                                                    data-hover-bg
                                                    src={Vector406}
                                                    className="pointer-events-none absolute"
                                                    style={{
                                                        width: `calc(var(--vu)*28)`,
                                                        top: '45%',
                                                        left: `calc(var(--vu)*6.5)`,
                                                        transform:
                                                            'translateY(-50%)',
                                                        opacity: 0,
                                                    }}
                                                />

                                                <img
                                                    src={Whatsapp}
                                                    className="relative h-auto shrink-0"
                                                    style={{
                                                        width: `calc(var(--vu)*13.021)`,
                                                    }}
                                                />

                                                <div
                                                    className="shrink-0"
                                                    style={{
                                                        width: `calc(var(--vu)*1)`,
                                                    }}
                                                />

                                                <img
                                                    src={WhatsAppText}
                                                    className="relative h-auto shrink-0"
                                                    style={{
                                                        width: `calc(var(--vu)*18)`,
                                                        marginTop: `calc(var(--vu)*0.5)`,
                                                        marginLeft: `calc(var(--vu)*-0.9)`,
                                                    }}
                                                />
                                            </div>

                                            {/* Discord */}
                                            <div
                                                data-icon
                                                data-href="https://discord.gg/ppif"
                                                className="relative flex shrink-0 cursor-pointer items-center"
                                                style={{
                                                    left: `calc(var(--vu)*-2.4)`,
                                                }}
                                            >
                                                <img
                                                    data-hover-bg
                                                    src={Vector406}
                                                    className="pointer-events-none absolute"
                                                    style={{
                                                        width: `calc(var(--vu)*35)`,
                                                        top: '45%',
                                                        left: `calc(var(--vu)*6.5)`,
                                                        transform:
                                                            'translateY(-50%)',
                                                        opacity: 0,
                                                    }}
                                                />

                                                <img
                                                    src={Discord}
                                                    className="relative h-auto shrink-0"
                                                    style={{
                                                        width: `calc(var(--vu)*13.021)`,
                                                    }}
                                                />

                                                <div
                                                    className="shrink-0"
                                                    style={{
                                                        width: `calc(var(--vu)*1)`,
                                                    }}
                                                />

                                                <img
                                                    src={DiscordText}
                                                    className="relative h-auto shrink-0"
                                                    style={{
                                                        width: `calc(var(--vu)*14)`,
                                                        marginTop: `calc(var(--vu)*1.5)`,
                                                        marginLeft: `calc(var(--vu)*-0.9)`,
                                                    }}
                                                />
                                            </div>

                                            {/* Instagram */}
                                            <div
                                                data-icon
                                                data-href="https://www.instagram.com/ppif.umn/"
                                                className="relative mt-3 flex shrink-0 cursor-pointer items-center"
                                                style={{
                                                    left: `calc(var(--vu)*-3.9)`,
                                                }}
                                            >
                                                <img
                                                    data-hover-bg
                                                    src={Vector406}
                                                    className="pointer-events-none absolute"
                                                    style={{
                                                        width: `calc(var(--vu)*27.5)`,
                                                        top: '45%',
                                                        left: `calc(var(--vu)*6.5)`,
                                                        transform:
                                                            'translateY(-50%)',
                                                        opacity: 0,
                                                    }}
                                                />

                                                <img
                                                    src={Instagram}
                                                    className="relative h-auto shrink-0"
                                                    style={{
                                                        width: `calc(var(--vu)*13.021)`,
                                                    }}
                                                />

                                                <div
                                                    className="shrink-0"
                                                    style={{
                                                        width: `calc(var(--vu)*1)`,
                                                    }}
                                                />

                                                <img
                                                    src={InstagramText}
                                                    className="relative h-auto shrink-0"
                                                    style={{
                                                        width: `calc(var(--vu)*18)`,
                                                        marginTop: `calc(var(--vu)*0.7)`,
                                                        marginLeft: `calc(var(--vu)*-0.9)`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <img
                                            ref={streakRef}
                                            data-arrow
                                            src={ArrowLeft}
                                            className="absolute -left-4 -z-10 scale-x-[0.8] scale-y-[0.8]"
                                            style={{
                                                width: `calc(var(--vu)*15.625)`,
                                                height: `calc(var(--vu)*33.854)`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bubble Chat */}
                        <div
                            ref={bubbleRef}
                            className="absolute"
                            style={{
                                bottom: `calc(var(--vu)*1)`,
                                right: '10%',
                                transform: 'translateX(-50%)',
                                width: `calc(var(--vu)*72)`,
                            }}
                        >
                            <DecorShape
                                ref={shape1Ref}
                                src={Shape1}
                                alt=""
                                className="left-16 top-4 z-50"
                                imageClassName="-scale-y-100"
                            />
                            <div className="relative h-auto w-full">
                                {/* Bubble background */}
                                <img
                                    ref={bubbleAjaRef}
                                    src={BubbleChat}
                                    className="block h-auto w-full"
                                />

                                {/* Text wrapper */}
                                <div
                                    ref={bubbleTextRef}
                                    className="absolute z-20 flex flex-col items-start -space-y-20"
                                    style={{
                                        top: `calc(var(--vu)*13)`,
                                        left: '47.7%',
                                        transform: 'translateX(-55%)',
                                        width: `calc(var(--vu)*48)`,
                                    }}
                                >
                                    {/* CONTACT */}
                                    <img
                                        src={ContactText}
                                        className="block h-auto w-full"
                                    />

                                    {/* US */}
                                    <img
                                        src={UsText}
                                        className="block h-auto"
                                        style={{
                                            width: `calc(var(--vu)*19)`,
                                            marginLeft: `calc(var(--vu)*20)`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
