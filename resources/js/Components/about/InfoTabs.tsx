'use client';

import ChoiceSelected1 from '@/assets/about/ChoiceSelected1.svg?react';
import ChoiceSelected1_1 from '@/assets/about/ChoiceSelected1_1.svg?react';
import ChoiceSelected1_2 from '@/assets/about/ChoiceSelected1_2.svg?react';
import ChoiceSelected2 from '@/assets/about/ChoiceSelected2.svg?react';
import ChoiceSelected2_1 from '@/assets/about/ChoiceSelected2_1.svg?react';
import ChoiceSelected2_2 from '@/assets/about/ChoiceSelected2_2.svg?react';
import ChoiceUnselected1 from '@/assets/about/ChoiceUnselected1.svg?react';
import { currentTab } from '@/Pages/About';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { useEffect, useRef, useState } from 'react';
import ChoiceUnselected2 from '../../assets/about/ChoiceUnselected2.svg?react';

gsap.registerPlugin(MorphSVGPlugin);

type InfoTabsProps = {
    className: string;
    topicChosen: 'informatics' | 'ppif';
    activeTab: currentTab;
    setActiveTab: React.Dispatch<React.SetStateAction<currentTab>>;
};

type TabButtonProps = {
    label: string;
    active: boolean;
    onClick: () => void;
    className?: string;
    UnselectedSvg: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    SelectedSvg: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    SelectedSvg2: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    SelectedSvg3: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function TabButton({
    label,
    active,
    onClick,
    className = '',
    UnselectedSvg,
    SelectedSvg,
    SelectedSvg2,
    SelectedSvg3,
}: TabButtonProps) {
    const visibleRef = useRef<HTMLDivElement | null>(null);
    const unselectedTargetRef = useRef<HTMLDivElement | null>(null);
    const selectedTarget1Ref = useRef<HTMLDivElement | null>(null);
    const selectedTarget2Ref = useRef<HTMLDivElement | null>(null);
    const selectedTarget3Ref = useRef<HTMLDivElement | null>(null);

    const loopTimelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const mainPath =
            visibleRef.current?.querySelector('[data-part="main"]');
        const accentPath = visibleRef.current?.querySelector(
            '[data-part="accent"]',
        );
        if (!mainPath || !accentPath) return;

        const visiblePaths = visibleRef.current?.querySelectorAll('path');
        const unselectedPaths =
            unselectedTargetRef.current?.querySelectorAll<SVGPathElement>(
                'path',
            );

        const selected1Paths =
            selectedTarget1Ref.current?.querySelectorAll<SVGPathElement>(
                'path',
            );

        const selected2Paths =
            selectedTarget2Ref.current?.querySelectorAll<SVGPathElement>(
                'path',
            );

        const selected3Paths =
            selectedTarget3Ref.current?.querySelectorAll<SVGPathElement>(
                'path',
            );

        if (
            !visiblePaths ||
            !unselectedPaths ||
            !selected1Paths ||
            !selected2Paths ||
            !selected3Paths
        )
            return;

        const tl = gsap.timeline({
            repeat: -1,
            defaults: {
                duration: 0.23,
                ease: 'linear',
            },
        });
        loopTimelineRef.current?.kill();
        loopTimelineRef.current = null;

        if (active) {
            visiblePaths.forEach((path, index) => {
                const shape1 = selected1Paths[index];
                const shape2 = selected2Paths[index];
                const shape3 = selected3Paths[index];

                if (!shape1 || !shape2 || !shape3) return;

                gsap.set(path, {
                    morphSVG: shape1,
                    fill: shape1.getAttribute('fill') ?? undefined,
                });

                tl.to(
                    path,
                    {
                        morphSVG: shape1,
                        fill: shape1.getAttribute('fill') ?? undefined,
                    },
                    0,
                );

                tl.to(
                    path,
                    {
                        morphSVG: shape2,
                        fill: shape2.getAttribute('fill') ?? undefined,
                    },
                    0.1,
                );

                tl.to(
                    path,
                    {
                        morphSVG: shape3,
                        fill: shape3.getAttribute('fill') ?? undefined,
                    },
                    0.2,
                );

                tl.to(
                    path,
                    {
                        morphSVG: shape1,
                        fill: shape1.getAttribute('fill') ?? undefined,
                    },
                    0.25,
                );

                loopTimelineRef.current = tl;
            });
        } else {
            visiblePaths.forEach((path, index) => {
                const unselectedPath = unselectedPaths[index];

                if (!unselectedPath) return;

                gsap.to(path, {
                    duration: 0.35,
                    morphSVG: unselectedPath,
                    fill: unselectedPath.getAttribute('fill') ?? undefined,
                    ease: 'power3.out',
                });
            });
        }

        return () => {
            loopTimelineRef.current?.kill();
            loopTimelineRef.current = null;
        };
    }, [active]);

    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative ${className}`}
        >
            <div ref={visibleRef} className="relative z-10">
                <UnselectedSvg className="block h-auto w-full" />
            </div>

            <div
                ref={unselectedTargetRef}
                className="pointer-events-none invisible absolute left-0 top-0 w-full"
            >
                <UnselectedSvg className="block h-auto w-full" />
            </div>

            <div
                ref={selectedTarget1Ref}
                className="pointer-events-none invisible absolute left-0 top-0 w-full"
            >
                <SelectedSvg className="block h-auto w-full" />
            </div>
            <div
                ref={selectedTarget2Ref}
                className="pointer-events-none invisible absolute left-0 top-0 w-full"
            >
                <SelectedSvg2 className="block h-auto w-full" />
            </div>
            <div
                ref={selectedTarget3Ref}
                className="pointer-events-none invisible absolute left-0 top-0 w-full"
            >
                <SelectedSvg3 className="block h-auto w-full" />
            </div>

            <span
                className={`absolute left-[33%] top-[24%] z-50 font-arsenal text-sm ${active ? 'text-[#0A0C0F]' : 'text-[#F0F2F5]'} md:text-xl`}
            >
                {label}
            </span>
        </button>
    );
}

export default function InfoTabs({
    className,
    topicChosen,
    setActiveTab,
    activeTab,
}: InfoTabsProps) {
    const [visualActiveTab, setVisualActiveTab] = useState<
        'information' | 'gallery'
    >('information');

    useEffect(() => {
        if (activeTab === 'information' || activeTab === 'gallery') {
            setVisualActiveTab(activeTab);
        }
    }, [activeTab]);

    return (
        <div className={`${className} w-[40%] max-w-[22rem]`}>
            <div className="relative flex w-full -rotate-12 flex-col -space-y-2">
                <TabButton
                    label="Information"
                    active={visualActiveTab === 'information'}
                    onClick={() => setActiveTab('information')}
                    className="z-50 w-[98%] -rotate-12"
                    UnselectedSvg={ChoiceUnselected1}
                    SelectedSvg={ChoiceSelected1}
                    SelectedSvg2={ChoiceSelected1_1}
                    SelectedSvg3={ChoiceSelected1_2}
                />

                <TabButton
                    label="Gallery"
                    active={visualActiveTab === 'gallery'}
                    onClick={() => setActiveTab('gallery')}
                    className="z-20 ml-6 w-[95%]"
                    UnselectedSvg={ChoiceUnselected2}
                    SelectedSvg={ChoiceSelected2}
                    SelectedSvg2={ChoiceSelected2_1}
                    SelectedSvg3={ChoiceSelected2_2}
                />
            </div>
        </div>
    );
}
