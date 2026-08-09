import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import CodieSVG from '@/assets/archive/Codie.svg?react';
import DialogueBoxSVG from '@/assets/archive/DialogueBox.svg?react';
import DialogueNameSVG from '@/assets/archive/DialogueName.svg?react';

interface ArchiveWaitInfoProps {
    onClose?: () => void;
}

export default function ArchiveWaitInfo({ onClose }: ArchiveWaitInfoProps) {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const codieRef = useRef<HTMLDivElement | null>(null);
    const dialogueNameRef = useRef<HTMLDivElement | null>(null);
    const dialogueBoxRef = useRef<HTMLDivElement | null>(null);

    const [isExiting, setIsExiting] = useState(false);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const overlay = overlayRef.current;
        const codie = codieRef.current;
        const name = dialogueNameRef.current;
        const box = dialogueBoxRef.current;

        if (!overlay || !codie || !name || !box) return;

        const tl = gsap.timeline({
            onReverseComplete: () => {
                onClose?.();
            },
        });

        tlRef.current = tl;

        // --- 2. FADE IN OVERLAY ---
        tl.fromTo(
            overlay,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
        );

        // --- 3. CODIE MUNCUL DULUAN (Animasi seperti Informatics_AboutInformatics) ---
        tl.fromTo(
            codie,
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: 'bounce.out' },
            '-=0.1',
        );

        // --- 4. DIALOGUE NAME MUNCUL (Animasi bergaya Tab Information) ---
        tl.fromTo(
            name,
            { xPercent: -15, rotation: -6, scale: 0.9, autoAlpha: 0 },
            {
                xPercent: 4,
                rotation: 2,
                scale: 1.02,
                autoAlpha: 1,
                duration: 0.25,
                ease: 'power3.out',
            },
            '-=0.1',
        ).to(name, {
            xPercent: 0,
            rotation: 0,
            scale: 1,
            duration: 0.15,
            ease: 'power2.out',
        });

        tl.fromTo(
            box,
            { xPercent: -10, rotation: -4, scale: 0.95, autoAlpha: 0 },
            {
                xPercent: 3,
                rotation: 1,
                scale: 1.01,
                autoAlpha: 1,
                duration: 0.3,
                ease: 'power3.out',
            },
            '-=0.15',
        ).to(box, {
            xPercent: 0,
            rotation: 0,
            scale: 1,
            duration: 0.15,
            ease: 'power2.out',
        });

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            tl.kill();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[49] flex select-none items-center justify-center overflow-hidden">
            {/* BLACK OVERLAY (LOW OPACITY) */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            />

            {/* CONTAINER CONTENT */}
            <div className="pointer-events-none relative z-10 flex h-full w-full max-w-6xl items-center justify-between px-10">
                {/* KIRI: CODIE */}
                <div
                    ref={codieRef}
                    className="relative z-20 -ml-32 w-[400px] shrink-0 origin-bottom-left self-end md:w-[550px]"
                >
                    <CodieSVG className="h-auto w-full drop-shadow-2xl" />
                </div>

                {/* KANAN: DIALOGUE NAME & BOX */}
                <div className="items-emd relative z-40 -ml-16 mt-52 flex max-w-2xl flex-col md:-ml-24">
                    {/* DIALOGUE NAME */}
                    <div
                        ref={dialogueNameRef}
                        className="relative z-20 -mb-12 ml-7 w-[180px] origin-bottom-left md:w-[220px]"
                    >
                        <DialogueNameSVG className="h-auto w-full" />
                    </div>

                    {/* DIALOGUE BOX WITH TEXT */}
                    <div
                        ref={dialogueBoxRef}
                        className="relative z-10 w-full origin-top-left"
                    >
                        <DialogueBoxSVG className="h-auto w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
