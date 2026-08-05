import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import DiscordText from '../assets/contact/Discord.svg';
import Fingers from '../assets/contact/Fingers.svg';
import Whatsapp from '../assets/contact/Frame180.svg';
import Discord from '../assets/contact/Frame181.svg';
import Instagram from '../assets/contact/Frame182.svg';
import InstagramText from '../assets/contact/Instagram.svg';
import PhoneBack3 from '../assets/contact/Phone.svg?react';
import Vector1 from '../assets/contact/Vector1.svg';
// import Vector2 from '../assets/contact/Vector2.svg';
import ContactUsText from '../assets/contact/CONTACTUS.svg';
import Fingers3 from '../assets/contact/Fingers3.svg';
import Vector406 from '../assets/contact/Vector406.svg';
import ArrowLeft from '../assets/contact/Vector8.svg';
import WhatsAppText from '../assets/contact/WhatsApp.svg';

const REF_WIDTH = 1920;
const REF_HEIGHT = 1080;
const SHIFT_VU = 13;

export default function Contact() {
    const iconGroupsRef = useRef<HTMLDivElement>(null);
    const handPhoneRef = useRef<HTMLDivElement>(null);
    const phoneBodyRef = useRef<HTMLDivElement>(null);
    const shape1Ref = useRef<HTMLDivElement>(null);
    const streakRef = useRef<HTMLImageElement>(null);
    const contactUsRef = useRef<HTMLImageElement>(null);
    const decor1Ref = useRef<SVGSVGElement>(null);
    const decor2Ref = useRef<SVGSVGElement>(null);
    const decor3Ref = useRef<SVGSVGElement>(null);
    const [scale, setScale] = useState(1);

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
            const hand = handPhoneRef.current;
            const phone = phoneBodyRef.current;
            const streak = streakRef.current;
            const contactUs = contactUsRef.current;

            if (contactUs) {
                gsap.fromTo(
                    contactUs,
                    { x: 80, opacity: 0, yPercent: -50, rotation: -3 },
                    {
                        x: 0,
                        opacity: 1,
                        yPercent: -50,
                        rotation: 6,
                        transformOrigin: 'right center',
                        duration: 0.6,
                        delay: 0.6,
                        ease: 'bounce.out',
                    },
                );
            }
            const buildD = (pts: { x: number; y: number }[]) =>
                `M${pts[0].x} ${pts[0].y}` +
                pts
                    .slice(1)
                    .map((p) => `L${p.x} ${p.y}`)
                    .join('') +
                'Z';

            const morphLeftEdge = (
                tl: gsap.core.Timeline,
                svg: SVGSVGElement | null,
                pts: { x: number; y: number }[],
                dx: number,
                dy: number,
                position: gsap.Position = '+=0',
            ) => {
                const path = svg?.querySelector('path');
                if (!path) return;

                const work = pts.map((p) => ({ ...p }));
                const leftIdx = [0, 3];

                leftIdx.forEach((i) => {
                    work[i].x += dx;
                    work[i].y += dy;
                });

                path.setAttribute('d', buildD(work));

                tl.fromTo(
                    svg,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.35,
                        ease: 'power2.out',
                    },
                    position,
                );

                const startIdle = () => {
                    leftIdx.forEach((i, k) => {
                        gsap.to(work[i], {
                            x: pts[i].x + (k === 0 ? 15 : -15),
                            y: pts[i].y + (k === 0 ? -8 : 10),
                            duration: 0.6 + k * 0.6,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut',
                            onUpdate: () =>
                                path.setAttribute('d', buildD(work)),
                        });
                    });
                };

                leftIdx.forEach((i, k) => {
                    const isLast = k === leftIdx.length - 1;
                    tl.to(
                        work[i],
                        {
                            x: pts[i].x,
                            y: pts[i].y,
                            duration: 0.3,
                            ease: 'back.out(1.7)',
                            onUpdate: () =>
                                path.setAttribute('d', buildD(work)),
                            // kick off the idle drift when the last point lands
                            onComplete: isLast ? startIdle : undefined,
                        },
                        position,
                    );
                });
            };

            if (!icons || !arrow || !hand || !phone) return;

            const startY = REF_HEIGHT + 120;

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
            masterTl.set(streak, { clipPath: 'inset(0% 0% 100% 0%)' });

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
                    opacity: 100,
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

            morphLeftEdge(
                masterTl,
                decor1Ref.current,
                [
                    { x: 220.639, y: 0 },
                    { x: 546.139, y: 265 },
                    { x: 498.873, y: 292.689 },
                    { x: -0.000456216, y: 51.281 },
                ],
                -200,
                -660,
                '<=0.1',
            );

            morphLeftEdge(
                masterTl,
                decor2Ref.current,
                [
                    { x: 0, y: 0 },
                    { x: 904.5, y: 207.5 },
                    { x: 827, y: 367 },
                    { x: 79.5, y: 390 },
                ],
                -200,
                -120,
                '<0.05',
            );

            morphLeftEdge(
                masterTl,
                decor3Ref.current,
                [
                    { x: 0, y: 30.8652 },
                    { x: 555.575, y: 0 },
                    { x: 555.575, y: 60.5 },
                    { x: 136.5, y: 177.229 },
                ],
                -300,
                580,
                '<0.05',
            );
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
        // --vu is now a fixed design unit (1% of the reference width). Instead
        // of scaling the unit, the whole 1920×1080 stage is uniformly scaled to
        // fit the viewport, so the composition stays exact on any aspect ratio.
        document.documentElement.style.setProperty(
            '--vu',
            `${REF_WIDTH / 100}px`,
        );

        function update() {
            setScale(
                Math.min(
                    window.innerWidth / REF_WIDTH,
                    window.innerHeight / REF_HEIGHT,
                ),
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
        <div className="relative h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[#0A0C0F] opacity-40" />

            {/* Fixed 1920×1080 stage, uniformly scaled to fit any viewport. */}
            <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div
                    className="relative shrink-0"
                    style={{
                        width: REF_WIDTH,
                        height: REF_HEIGHT,
                        transform: `scale(${scale})`,
                        transformOrigin: 'center',
                    }}
                >
                    <svg
                        ref={decor1Ref}
                        xmlns="http://www.w3.org/2000/svg"
                        width="547"
                        height="293"
                        className="absolute right-[50%] top-[18%] scale-125 overflow-visible"
                        viewBox="0 0 547 293"
                        fill="none"
                    >
                        <path
                            d="M194.639 -4.84054e-06L546.139 265L498.873 292.689L-0.000456216 51.281L194.639 -4.84054e-06Z"
                            fill="#BF1E2E"
                        />
                    </svg>

                    <svg
                        ref={decor2Ref}
                        xmlns="http://www.w3.org/2000/svg"
                        width="905"
                        height="390"
                        className="absolute right-[55%] top-[35%] overflow-visible"
                        viewBox="0 0 905 390"
                        fill="none"
                    >
                        <path
                            d="M0 0L904.5 207.5L827 367L79.5 390L0 0Z"
                            fill="#BF1E2E"
                        />
                    </svg>

                    <svg
                        ref={decor3Ref}
                        xmlns="http://www.w3.org/2000/svg"
                        width="556"
                        height="178"
                        className="absolute right-[62%] top-[80%] overflow-visible"
                        viewBox="0 0 556 178"
                        fill="none"
                    >
                        <path
                            d="M0 30.8652L555.575 1.85321e-05L555.575 60.5L136.5 177.229L0 30.8652Z"
                            fill="#BF1E2E"
                        />
                    </svg>
                    <img
                        ref={contactUsRef}
                        className="absolute -left-4 top-1/2 z-50 w-[50%] opacity-0"
                        src={ContactUsText}
                    />
                    {/* Tangan + Handphone */}
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
                            className="absolute bottom-0 z-20"
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
                                            data-click-sound
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
                                            data-click-sound
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
                                            data-click-sound
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
                </div>
            </div>
        </div>
    );
}
