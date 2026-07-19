import DivisionStreak from '@/assets/about/divisions/DivisionsStreak.svg?react';

import BackButtonSVG2 from '@/assets/icons/BackButtonSVG2.svg?react';
import DivisionCard from '@/Components/about/DivisionCard';
import Button from '../global/Button';

import { currentTab } from '@/Pages/About';
import gsap from 'gsap';
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import DivisionPopup, { DivisionPopupRef } from './DivisionPopup';

import { divisionData, DivisionData } from '@/data/divisions';

type DivisionsSectionProps = {
    onReady?: () => void;
    renderDivisions: boolean;
    setActiveTab: React.Dispatch<React.SetStateAction<currentTab>>;
    setRenderMainContent: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DivisionsSectionRef = {
    wrapper: HTMLDivElement | null;
};

const DivisionsSection = forwardRef<DivisionsSectionRef, DivisionsSectionProps>(
    ({ renderDivisions, setActiveTab, setRenderMainContent, onReady }, ref) => {
        const divisionsWrapper = useRef<HTMLDivElement>(null);
        const divisionScrollRef = useRef<HTMLDivElement>(null);
        const panelRef = useRef<HTMLDivElement>(null);

        const divisionPopupRef = useRef<DivisionPopupRef | null>(null);
        const [renderDivisionPopup, setRenderDivisionPopup] = useState(false);
        const [isClosingDivisionPopup, setIsClosingDivisionPopup] =
            useState(false);
        const [selectedDivision, setSelectedDivision] =
            useState<DivisionData | null>(null);

        const handleOpenDivisionPopup = (division: DivisionData) => {
            if (renderDivisionPopup || isClosingDivisionPopup) return;

            setSelectedDivision(division);
            setRenderDivisionPopup(true);
        };

        useImperativeHandle(ref, () => ({
            wrapper: divisionsWrapper.current,
        }));

        useLayoutEffect(() => {
            onReady?.();
        }, [onReady]);

        useEffect(() => {
            if (!renderDivisions) return;

            const scroller = divisionScrollRef.current;
            if (!scroller) return;

            let scrollTween: gsap.core.Tween | null = null;

            let isDragging = false;
            let startX = 0;
            let startScrollLeft = 0;

            let lastX = 0;
            let velocity = 0;

            const clampScroll = (value: number) => {
                const maxScroll = scroller.scrollWidth - scroller.clientWidth;
                return gsap.utils.clamp(0, maxScroll, value);
            };

            const handleWheel = (e: WheelEvent) => {
                e.preventDefault();

                const nextScroll = clampScroll(
                    scroller.scrollLeft + e.deltaY * 1.6,
                );

                scrollTween?.kill();

                scrollTween = gsap.to(scroller, {
                    scrollLeft: nextScroll,
                    duration: 0.6,
                    ease: 'power3.out',
                });
            };

            const handleMouseDown = (e: MouseEvent) => {
                isDragging = true;

                startX = e.clientX;
                lastX = e.clientX;
                velocity = 0;

                startScrollLeft = scroller.scrollLeft;

                scrollTween?.kill();

                scroller.style.cursor = 'grabbing';
                scroller.style.userSelect = 'none';
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!isDragging) return;

                const dragDistance = e.clientX - startX;

                velocity = e.clientX - lastX;
                lastX = e.clientX;

                scroller.scrollLeft = clampScroll(
                    startScrollLeft - dragDistance,
                );
            };

            const releaseWithImpact = () => {
                if (!isDragging) return;

                isDragging = false;

                scroller.style.cursor = 'grab';
                scroller.style.userSelect = '';

                const impactScroll = clampScroll(
                    scroller.scrollLeft - velocity * 9,
                );

                scrollTween?.kill();

                scrollTween = gsap.to(scroller, {
                    scrollLeft: impactScroll,
                    duration: 0.55,
                    ease: 'power3.out',
                });
            };

            const handleMouseUp = () => {
                releaseWithImpact();
            };

            const handleMouseLeave = () => {
                releaseWithImpact();
            };

            scroller.addEventListener('wheel', handleWheel, {
                passive: false,
            });

            scroller.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            scroller.addEventListener('mouseleave', handleMouseLeave);

            scroller.style.cursor = 'grab';

            return () => {
                scrollTween?.kill();

                scroller.removeEventListener('wheel', handleWheel);
                scroller.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                scroller.removeEventListener('mouseleave', handleMouseLeave);

                scroller.style.cursor = '';
                scroller.style.userSelect = '';
            };
        }, [renderDivisions]);

        if (!renderDivisions) return null;

        return (
            <div
                ref={divisionsWrapper}
                className="pointer-events-auto invisible absolute inset-0 z-40"
            >
                <div
                    ref={divisionScrollRef}
                    className="absolute inset-0 top-16 z-20 h-screen overflow-x-auto overflow-y-hidden overscroll-contain pl-[24px] pr-[4px]"
                >
                    <div
                        ref={panelRef}
                        className="brelative"
                        style={{
                            width: '3400px',
                            height: '856px',
                            minWidth: '3400px',
                            minHeight: '856px',
                        }}
                    >
                        <div className="relative h-[690px] w-[3400px]">
                            <DivisionStreak className="relative z-20 h-full w-auto max-w-none drop-shadow-[0px_8px_0px_#0A0C0F]" />

                            <div className="absolute inset-0 z-30 h-full w-full">
                                {divisionData.map((division) => (
                                    <div
                                        key={division.name}
                                        className="pointer-events-auto absolute cursor-pointer"
                                        style={{
                                            left: division.left,
                                            [division.vertical.side]:
                                                division.vertical.value,
                                        }}
                                        onClick={() =>
                                            handleOpenDivisionPopup(division)
                                        }
                                    >
                                        <DivisionCard
                                            key={division.name}
                                            imageSrc={division.image}
                                            TitleSVG={division.NameSVG}
                                            direction={division.direction}
                                            namePosition={division.namePosition}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button
                        className="fixed bottom-6 left-6 z-40 w-60"
                        Icon={BackButtonSVG2}
                        iconClassName="w-60 h-fit"
                        onClick={() => {
                            setRenderMainContent(true);
                            setActiveTab('information');
                        }}
                    />
                </div>
                {renderDivisionPopup && selectedDivision && (
                    <DivisionPopup
                        ref={divisionPopupRef}
                        division={selectedDivision}
                        isClosing={isClosingDivisionPopup}
                        setRenderDivisionPopup={setRenderDivisionPopup}
                        setIsClosingDivisionPopup={setIsClosingDivisionPopup}
                        isClosingDivisionPopup={isClosingDivisionPopup}
                    />
                )}
            </div>
        );
    },
);

DivisionsSection.displayName = 'DivisionsSection';

export default DivisionsSection;
