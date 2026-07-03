import LineBGSVG from '@/assets/about/LineBGSvg.svg?react';
import LineBGSVG2 from '@/assets/about/LineBGSvg2.svg?react';
import TrapesiumMask from '@/assets/about/TrapesiumMask.svg?react';
import TrapesiumMask2 from '@/assets/about/TrapesiumMask2.svg?react';

import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(MorphSVGPlugin);

export default function AboutBackground() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const maskCurrentRef = useRef<SVGGElement | null>(null);
    const maskFromRef = useRef<SVGGElement | null>(null);

    const lineCurrentRef = useRef<HTMLDivElement | null>(null);
    const lineFromRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const maskCurrentPaths =
                maskCurrentRef.current?.querySelectorAll('path');
            const maskFromPaths = maskFromRef.current?.querySelectorAll('path');

            const lineCurrentPaths =
                lineCurrentRef.current?.querySelectorAll('path');
            const lineFromPaths = lineFromRef.current?.querySelectorAll('path');

            if (!maskCurrentPaths || !maskFromPaths) return;
            if (!lineCurrentPaths || !lineFromPaths) return;

            const tl = gsap.timeline({
                defaults: {
                    duration: 0.4,
                    ease: 'none',
                },
            });

            maskCurrentPaths.forEach((path, index) => {
                const fromPath = maskFromPaths[index];
                if (!fromPath) return;

                tl.fromTo(
                    path,
                    {
                        morphSVG: fromPath,
                    },
                    {
                        morphSVG: path,
                    },
                    0,
                );
            });

            lineCurrentPaths.forEach((path, index) => {
                const fromPath = lineFromPaths[index];
                if (!fromPath) return;

                tl.fromTo(
                    path,
                    {
                        morphSVG: fromPath,
                    },
                    {
                        morphSVG: path,
                    },
                    0,
                );
            });
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="absolute h-full w-full">
            {/* Mask that is actually used */}
            <svg className="pointer-events-none absolute h-full w-full opacity-0">
                <defs>
                    <mask id="trapesium-video-mask" maskUnits="userSpaceOnUse">
                        <g ref={maskCurrentRef}>
                            <TrapesiumMask className="h-full w-full" />
                        </g>
                    </mask>
                </defs>
            </svg>

            {/* Hidden starting shape for mask morph */}
            <svg className="pointer-events-none absolute h-full w-full opacity-0">
                <g ref={maskFromRef}>
                    <TrapesiumMask2 className="h-full w-full" />
                </g>
            </svg>

            <div
                className="absolute h-full w-full bg-[#0A0C0F]"
                style={{
                    mask: 'url(#trapesium-video-mask)',
                    WebkitMask: 'url(#trapesium-video-mask)',
                }}
            />

            <video
                src="/videos/StarsLoop.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute h-full w-full object-cover opacity-35"
                style={{
                    mask: 'url(#trapesium-video-mask)',
                    WebkitMask: 'url(#trapesium-video-mask)',
                }}
            />

            {/* Visible line */}
            <div ref={lineCurrentRef} className="absolute left-[29%]">
                <LineBGSVG />
            </div>

            {/* Hidden starting line shape */}
            <div
                ref={lineFromRef}
                className="pointer-events-none absolute left-[29%] opacity-0"
            >
                <LineBGSVG2 />
            </div>
        </div>
    );
}
