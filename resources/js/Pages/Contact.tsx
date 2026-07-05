import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Vector2 from "../assets/contact/Vector2.svg"
import Vector1 from "../assets/contact/Vector1.svg"
import PhoneBack from "../assets/contact/Subtract.svg"
import PhoneBack2 from "../assets/contact/Vector3.svg"
import PhoneBack3 from "../assets/contact/Vector4.svg"
import PhoneBottom from "../assets/contact/Vector5.svg"
import Fingers from "../assets/contact/Fingers.svg"
import Fingers3 from "../assets/contact/Vector7.svg"
import Whatsapp from "../assets/contact/Frame180.svg"
import Discord from "../assets/contact/Frame181.svg"
import Instagram from "../assets/contact/Frame182.svg"
import ArrowLeft from "../assets/contact/Vector8.svg"
import BubbleChat from "../assets/contact/BubbleChat.svg"
import ContactText from "../assets/contact/Frame185.svg"
import UsText from "../assets/contact/Frame186.svg"
import WhatsAppText from "../assets/contact/WhatsApp.svg"
import DiscordText from "../assets/contact/Discord.svg"
import InstagramText from "../assets/contact/Instagram.svg"
import Vector406 from "../assets/contact/Vector406.svg"

const REF_WIDTH = 1920;
const REF_HEIGHT = 1080;
const SHIFT_VU = 13;

export default function Contact() {
    const iconGroupsRef = useRef<HTMLDivElement>(null);
    const bubbleRef     = useRef<HTMLDivElement>(null);
    const bubbleTextRef = useRef<HTMLDivElement>(null);
    const handPhoneRef  = useRef<HTMLDivElement>(null);  
    const phoneBodyRef  = useRef<HTMLDivElement>(null);   

    useEffect(() => {
        const ctx = gsap.context(() => {
            const icons  = iconGroupsRef.current?.querySelectorAll<HTMLElement>('[data-icon]');
            const arrow  = iconGroupsRef.current?.querySelector<HTMLElement>('[data-arrow]');
            const bubble = bubbleRef.current;
            const hand   = handPhoneRef.current;
            const phone  = phoneBodyRef.current;
            if (!icons || !bubble || !arrow || !hand || !phone) return;

            const startY = window.innerHeight + 120;

            const masterTl = gsap.timeline();

            masterTl.set(phone, { y: startY, rotation: 35, transformOrigin: "bottom center" });
            masterTl.set(hand,  { y: startY, rotation: 35, transformOrigin: "bottom center" });
            masterTl.set(icons,  { opacity: 0, x: 80 });
            masterTl.set(arrow,  { opacity: 0, x: 60 });
            masterTl.set(bubble, { scale: 0, opacity: 0 });

            masterTl.to(phone, {
                y: 0,
                rotation: 0,
                duration: 1.15,
                ease: 'power3.out', 
            }, 0);

            masterTl.to(hand, {
                y: 0,
                rotation: 0,
                duration: 1.2,
                ease: 'power3.out',
            }, 0.07);

            masterTl.to(bubble, {
                scale: 1,
                opacity: 1,
                duration: 0.55,
                ease: 'elastic.out(1, 0.6)',
            }, 0.78);

            masterTl.to(arrow, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: 'power2.out',
            }, 0.88);

            masterTl.to(icons, {
                opacity: 1,
                x: 0,
                duration: 0.45,
                stagger: 0.12,
                ease: 'back.out(1.7)',
            }, 0.88);
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const icons = iconGroupsRef.current?.querySelectorAll<HTMLElement>('[data-icon]');
        if (!icons) return;

        icons.forEach((icon) => {
            const bg = icon.querySelector<HTMLElement>('[data-hover-bg]');
            if (!bg) return;

            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, { scale: 1.08, duration: 0.25, ease: 'power2.out' });
                gsap.to(bg,   { autoAlpha: 1, duration: 0.25, ease: 'power2.out' });
            });
            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, { scale: 1,    duration: 0.25, ease: 'power2.out' });
                gsap.to(bg,   { autoAlpha: 0, duration: 0.25, ease: 'power2.out' });
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
            const cappedWidth    = Math.min(effectiveWidth, REF_WIDTH);
            document.documentElement.style.setProperty("--vu", `${cappedWidth / 100}px`);
        }
        update();
        window.addEventListener("resize", update);
        window.addEventListener("orientationchange", update);
        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("orientationchange", update);
        };
    }, []);

    return (
        <div className="bg h-screen w-screen overflow-hidden">
            <div className="transition-300 absolute z-0 h-full w-full bg-[#0A0C0F] opacity-70 ease-in"></div>
            <div className="relative z-30 flex flex-col lg:flex-row items-center justify-between h-full w-full pt-24 lg:pt-0">

                {/* Tangan + Handphone */}
                <div
                    ref={handPhoneRef}
                    className="absolute bottom-0 z-30"
                    style={{
                        width:  `calc(var(--vu)*26.042)`,
                        height: `calc(var(--vu)*36.458)`,
                        right:  `calc(var(--vu)*(25 + ${SHIFT_VU}))`,
                    }}
                >
                    <div className="absolute bottom-0 z-30" style={{ right: `calc(var(--vu)*0.625)` }}>
                        <img src={Vector2} style={{ width: `calc(var(--vu)*23.438)` }} className="h-auto" />
                    </div>
                    <div className="absolute bottom-0 z-20" style={{ right: `calc(var(--vu)*1.146)` }}>
                        <img src={Vector1} style={{ width: `calc(var(--vu)*26.042)` }} className="h-auto" />
                    </div>
                    <div className="absolute bottom-0 z-30" style={{ right: `calc(var(--vu)*-38.3)` }}>
                        <img src={Fingers} style={{ width: `calc(var(--vu)*13.021)` }} className="h-auto" />
                    </div>
                    <div className="absolute z-0" style={{ top: `calc(var(--vu)*4.88)`, right: `calc(var(--vu)*-39)` }}>
                        <img src={Fingers3} style={{ width: `calc(var(--vu)*4.167)` }} className="h-auto" />
                    </div>
                </div>

                {/* Badan HP */}
                <div
                    ref={phoneBodyRef}
                    className="absolute bottom-10 w-full"
                    style={{ height: `calc(var(--vu)*42.708)` }}
                >
                    <div className="absolute -bottom-10 z-10" style={{ right: `calc(var(--vu)*(-4.8 + ${SHIFT_VU}))` }}>
                        <img src={PhoneBottom} alt="Phone Bottom" />
                    </div>
                    <div className="absolute z-0 origin-bottom" style={{ right: `calc(var(--vu)*(-2.5 + ${SHIFT_VU}))` }}>
                        <img
                            src={PhoneBack3}
                            className="h-full scale-x-[1.76] scale-y-[2.2]"
                            style={{ width: `calc(var(--vu)*28.646)` }}
                        />
                    </div>
                    <div className="absolute -z-20 origin-bottom" style={{ right: `calc(var(--vu)*(-1.5 + ${SHIFT_VU}))` }}>
                        <img
                            src={PhoneBack}
                            className="h-full scale-x-[1.82] scale-y-[2.3]"
                            style={{ width: `calc(var(--vu)*29.948)` }}
                        />
                    </div>
                    <div className="absolute -z-10 origin-bottom" style={{ right: `calc(var(--vu)*(-2 + ${SHIFT_VU}))` }}>
                        <img
                            src={PhoneBack2}
                            className="h-full scale-x-[1.85] scale-y-[2.2]"
                            style={{ width: `calc(var(--vu)*28.646)` }}
                        />
                    </div>
                </div>

                {/* Icon */}
                <div
                    ref={iconGroupsRef}
                    className="absolute bottom-0 z-40"
                    style={{
                        width:  `calc(var(--vu)*26.042)`,
                        height: `calc(var(--vu)*36.458)`,
                        top:    `calc(var(--vu)*16)`,
                        right:  `calc(var(--vu)*(28 + ${SHIFT_VU}))`,
                    }}
                >
                    {/* WhatsApp */}
                    <div data-icon data-href="https://wa.me/628123456789" className="absolute flex items-center cursor-pointer" style={{ top: `calc(var(--vu)*-2)`, right: `calc(var(--vu)*-35)` }}>
                        <img data-hover-bg src={Vector406} className="pointer-events-none absolute"
                            style={{ width: `calc(var(--vu)*28)`, top: '45%', left: `calc(var(--vu)*5)`, transform: 'translateY(-50%)', opacity: 0 }} />
                        <img src={Whatsapp} className="h-auto relative" style={{ width: `calc(var(--vu)*13.021)` }} />
                        <div style={{ width: `calc(var(--vu)*1)` }} />
                        <img src={WhatsAppText} className="h-auto relative" style={{ marginTop: `calc(var(--vu)*0.5)`, marginLeft: `calc(var(--vu)*-0.5)` }} />
                    </div>

                    {/* Discord */}
                    <div data-icon data-href="https://discord.gg/ppif" className="absolute flex items-center cursor-pointer" style={{ top: `calc(var(--vu)*10)`, right: `calc(var(--vu)*-27)` }}>
                        <img data-hover-bg src={Vector406} className="pointer-events-none absolute"
                            style={{ width: `calc(var(--vu)*35)`, top: '45%', left: `calc(var(--vu)*5)`, transform: 'translateY(-50%)', opacity: 0 }} />
                        <img src={Discord} className="h-auto relative" style={{ width: `calc(var(--vu)*13.021)` }} />
                        <div style={{ width: `calc(var(--vu)*1)` }} />
                        <img src={DiscordText} className="h-auto relative" style={{ marginTop: `calc(var(--vu)*0.5)`, marginLeft: `calc(var(--vu)*-0.5)` }} />
                    </div>

                    {/* Instagram */}
                    <div data-icon data-href="https://www.instagram.com/ppif.umn/" className="absolute flex items-center cursor-pointer" style={{ top: `calc(var(--vu)*24)`, right: `calc(var(--vu)*-31)` }}>
                        <img data-hover-bg src={Vector406} className="pointer-events-none absolute"
                            style={{ width: `calc(var(--vu)*27.5)`, top: '45%', left: `calc(var(--vu)*6.5)`, transform: 'translateY(-50%)', opacity: 0 }} />
                        <img src={Instagram} className="h-auto relative" style={{ width: `calc(var(--vu)*13.021)` }} />
                        <div style={{ width: `calc(var(--vu)*1)` }} />
                        <img src={InstagramText} className="h-auto relative" style={{ marginTop: `calc(var(--vu)*0.7)`, marginLeft: `calc(var(--vu)*-0.5)` }} />
                    </div>

                    <img data-arrow src={ArrowLeft} className="absolute scale-x-[0.8] scale-y-[0.8] -z-10"
                        style={{ right: `calc(var(--vu)*-15)`, width: `calc(var(--vu)*15.625)`, height: `calc(var(--vu)*33.854)` }} />
                </div>

                {/* Bubble Chat */}
                <div ref={bubbleRef} className="absolute" style={{ bottom: `calc(var(--vu)*9.375)`, left: `calc(var(--vu)*0.167)` }}>
                    <div ref={bubbleTextRef} className="w-auto h-full">
                        <img src={ContactText} className="absolute z-10" style={{ top: `calc(var(--vu)*13.021)`, left: `calc(var(--vu)*7.812)` }} />
                        <img src={UsText}      className="absolute z-20" style={{ top: `calc(var(--vu)*24.479)`, left: `calc(var(--vu)*23.438)` }} />
                    </div>
                    <img src={BubbleChat} className="w-full h-full -z-10" />
                </div>

            </div>
        </div>
    );
}