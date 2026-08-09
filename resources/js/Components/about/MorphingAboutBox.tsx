'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

import BoxAbout from '@/assets/about/Box_About.svg?react';
import BoxAboutGallery from '@/assets/about/BoxAbout_Gallery.svg?react';

import BoxAboutTransition1 from '@/assets/about/boxTransitions/BoxAboutTransition1.svg?react';
import BoxAboutTransition2 from '@/assets/about/boxTransitions/BoxAboutTransition2.svg?react';
import BoxAboutTransition3 from '@/assets/about/boxTransitions/BoxAboutTransition3.svg?react';

import BoxAboutIdle1 from '@/assets/about/boxTransitionIdle/BoxAboutIdle1.svg?react';
import BoxAboutIdle2 from '@/assets/about/boxTransitionIdle/BoxAboutIdle2.svg?react';

import type { currentTab } from '@/Pages/About';

gsap.registerPlugin(MorphSVGPlugin);

type MorphingAboutBoxProps = {
    activeTab: currentTab;
    className?: string;
};

export default function MorphingAboutBox({
    activeTab,
    className = '',
}: MorphingAboutBoxProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const originalBoxRef = useRef<HTMLDivElement>(null);

    const transition1Ref = useRef<HTMLDivElement>(null);
    const transition2Ref = useRef<HTMLDivElement>(null);
    const transition3Ref = useRef<HTMLDivElement>(null);
    const galleryBoxRef = useRef<HTMLDivElement>(null);

    const idle1Ref = useRef<HTMLDivElement>(null);
    const idle2Ref = useRef<HTMLDivElement>(null);

    const idleTimelineRef = useRef<gsap.core.Timeline | null>(null);
    const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);

    const isGallery = activeTab === 'gallery';

    useEffect(() => {
        const box = boxRef.current;
        const originalBox = originalBoxRef.current;

        const transition1 = transition1Ref.current;
        const transition2 = transition2Ref.current;
        const transition3 = transition3Ref.current;
        const galleryBox = galleryBoxRef.current;

        const idle1 = idle1Ref.current;
        const idle2 = idle2Ref.current;

        if (
            !box ||
            !originalBox ||
            !transition1 ||
            !transition2 ||
            !transition3 ||
            !galleryBox ||
            !idle1 ||
            !idle2
        ) {
            return;
        }

        const currentPaths = Array.from(box.querySelectorAll('path'));

        const originalPaths = originalBox.querySelectorAll('path');

        const transition1Paths = transition1.querySelectorAll('path');
        const transition2Paths = transition2.querySelectorAll('path');
        const transition3Paths = transition3.querySelectorAll('path');
        const galleryPaths = galleryBox.querySelectorAll('path');

        const idle1Paths = idle1.querySelectorAll('path');
        const idle2Paths = idle2.querySelectorAll('path');

        // Stop all previous animations before starting a new one
        idleTimelineRef.current?.kill();
        idleTimelineRef.current = null;

        transitionTimelineRef.current?.kill();
        transitionTimelineRef.current = null;

        gsap.killTweensOf(currentPaths);

        const startIdleLoop = () => {
            if (isGallery) return;

            idleTimelineRef.current?.kill();

            const idleTl = gsap.timeline({
                repeat: -1,
                repeatDelay: 0,
            });

            currentPaths.forEach((path, pathIndex) => {
                const idle1Path = idle1Paths[pathIndex];
                const idle2Path = idle2Paths[pathIndex];
                const originalPath = originalPaths[pathIndex];

                if (!idle1Path || !idle2Path || !originalPath) return;

                idleTl;
                idleTl
                    .to(
                        path,
                        {
                            morphSVG: idle1Path,
                            duration: 0.35,
                            ease: 'none',
                            overwrite: 'auto',
                        },
                        0,
                    )
                    .to(
                        path,
                        {
                            morphSVG: idle2Path,
                            duration: 0.35,
                            ease: 'none',
                            overwrite: 'auto',
                        },
                        0.35,
                    )
                    .to(
                        path,
                        {
                            morphSVG: originalPath,
                            duration: 0.35,
                            ease: 'none',
                            overwrite: 'auto',
                        },
                        0.7,
                    );
            });

            idleTimelineRef.current = idleTl;
        };

        const targets = isGallery
            ? [
                  transition1Paths,
                  transition2Paths,
                  transition3Paths,
                  galleryPaths,
              ]
            : [
                  transition3Paths,
                  transition2Paths,
                  transition1Paths,
                  originalPaths,
              ];
        const transitionTl = gsap.timeline({
            onComplete: () => {
                startIdleLoop();
            },
        });

        currentPaths.forEach((path, pathIndex) => {
            targets.forEach((targetPaths, targetIndex) => {
                const targetPath = targetPaths[pathIndex];

                if (!targetPath) return;

                const isFinalStep = targetIndex === targets.length - 1;

                transitionTl.to(
                    path,
                    {
                        morphSVG: targetPath,
                        duration: isFinalStep ? 0.18 : 0.08,
                        ease: isFinalStep ? 'back.out(2.0)' : 'power2.inOut',
                        overwrite: 'auto',
                    },
                    targetIndex * 0.07,
                );
            });
        });

        transitionTimelineRef.current = transitionTl;

        return () => {
            idleTimelineRef.current?.kill();
            idleTimelineRef.current = null;

            transitionTimelineRef.current?.kill();
            transitionTimelineRef.current = null;

            gsap.killTweensOf(currentPaths);
        };
    }, [isGallery]);

    return (
        <div className={`relative z-10 ${className}`}>
            <div ref={boxRef}>
                <BoxAbout className="h-auto w-full" />
            </div>

            <div
                ref={originalBoxRef}
                className="pointer-events-none invisible absolute inset-0"
            >
                <BoxAbout className="h-auto w-full" />
            </div>

            <div
                ref={transition1Ref}
                className="pointer-events-none invisible absolute inset-0"
            >
                <BoxAboutTransition1 className="h-auto w-full" />
            </div>

            <div
                ref={transition2Ref}
                className="pointer-events-none invisible absolute inset-0"
            >
                <BoxAboutTransition2 className="h-auto w-full" />
            </div>

            <div
                ref={transition3Ref}
                className="pointer-events-none invisible absolute inset-0"
            >
                <BoxAboutTransition3 className="h-auto w-full" />
            </div>

            <div
                ref={galleryBoxRef}
                className="pointer-events-none invisible absolute inset-0"
            >
                <BoxAboutGallery className="h-auto w-full" />
            </div>

            <div
                ref={idle1Ref}
                className="pointer-events-none invisible absolute inset-0"
            >
                <BoxAboutIdle1 className="h-auto w-full" />
            </div>

            <div
                ref={idle2Ref}
                className="pointer-events-none invisible absolute inset-0"
            >
                <BoxAboutIdle2 className="h-auto w-full" />
            </div>
        </div>
    );
}
