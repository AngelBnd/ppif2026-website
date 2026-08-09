import DivisionStreak from '@/assets/about/divisions/DivisionsStreak.svg?react';

import BackButtonSVG2 from '@/assets/icons/BackButtonSVG2.svg';
import DivisionCard from '@/Components/about/DivisionCard';
import Button from '../global/Button';

import { divisionData, DivisionData } from '@/data/divisions';
import { currentTab } from '@/Pages/About';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import {
    CameraConfig,
    useDivisionCamera,
    type DivisionTrigger,
} from './useDivisionCamera';

import { CAMERA_PATHS } from './cameraPath';
import DivisionPopup, { DivisionPopupRef } from './DivisionPopup';
gsap.registerPlugin(ScrollTrigger);

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
        const worldRef = useRef<HTMLDivElement>(null);
        const cameraRef = useRef<HTMLDivElement>(null);
        const streakClipRef = useRef<HTMLDivElement>(null);
        const markRefs = useRef<(HTMLDivElement | null)[]>([]);

        const divisionPopupRef = useRef<DivisionPopupRef | null>(null);
        const [renderDivisionPopup, setRenderDivisionPopup] = useState(false);
        const [isClosingDivisionPopup, setIsClosingDivisionPopup] =
            useState(false);
        const [selectedDivision, setSelectedDivision] =
            useState<DivisionData | null>(null);

        const refs = useRef({
            scroller: divisionScrollRef,
            panel: panelRef,
            camera: cameraRef,
            world: worldRef,
            clip: streakClipRef,
            marks: markRefs,
        }).current;

        useImperativeHandle(ref, () => ({
            wrapper: divisionsWrapper.current,
        }));

        const TRIGGERS: DivisionTrigger[] = [
            { left: 29, top: 20, inset: 64 },
            { left: 45, top: 20, inset: 43 },
            { left: 63, top: 20, inset: 32 },
            { left: 80, top: 20, inset: 0 },
        ];

        const CAMERA_CONFIG: Partial<CameraConfig> = {
            perspective: 900,
            markers: false,
            paths: {
                lift: {
                    d: 'M0,183.62 C0,183.62 451.83,183.62 808.52,183.62 C1165.2,183.62 1374.43,2.09 1735.62,7.59 C2096.82,13.09 2409.76,173.59 2729.48,138.59 C3049.18,103.59 3400,274.09 3400,274.09',
                    zero: 'mean',

                    gain: 0.23,
                },
                scale: { d: CAMERA_PATHS.scale, gain: 0.03 },
                sway: { d: CAMERA_PATHS.sway, zero: 'mean', gain: 0 },
            },
            bankGain: 0.0009,
            bankSlopeGain: 0.008,
            dollyGain: 0.0,
            dollyMax: 0,
        };

        useDivisionCamera({
            enabled: renderDivisions,
            triggers: TRIGGERS,
            refs,
            config: CAMERA_CONFIG,
        });

        const handleOpenDivisionPopup = (division: DivisionData) => {
            if (renderDivisionPopup || isClosingDivisionPopup) return;

            setSelectedDivision(division);
            setRenderDivisionPopup(true);
        };

        useLayoutEffect(() => {
            if (!renderDivisions) return;
            const id = requestAnimationFrame(() => onReady?.());
            return () => cancelAnimationFrame(id);
        }, [renderDivisions, onReady]);

        return (
            <div
                ref={divisionsWrapper}
                className="pointer-events-auto invisible absolute inset-0 z-40"
            >
                <div
                    ref={divisionScrollRef}
                    className="absolute inset-0 z-20 h-screen overflow-y-auto overflow-x-visible pl-[24px] pr-[4px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ top: 'clamp(-4rem, calc(15vh - 4rem), 4rem)' }}
                >
                    <div
                        ref={panelRef}
                        className="relative"
                        style={{
                            width: 'clamp(1700px, 461.43vh, 3400px)',
                            height: 'clamp(350px, 95vh, 700px)',
                            minWidth: 'clamp(1700px, 461.43vh, 3400px)',
                            minHeight: 'clamp(350px, 95vh, 700px)',
                        }}
                    >
                        {/* <CameraPathDebug
                            scrollerRef={divisionScrollRef}
                            panelWidth={3400}
                            markers={TRIGGERS.map((t) => t.left)}
                            channels={[
                                {
                                    d: 'M0,243.62 C0,243.62 451.83,228.12 808.52,243.62 C1165.2,259.12 1374.43,2.09 1735.62,7.59 C2096.82,13.09 2409.76,173.59 2729.48,138.59 C3049.18,103.59 3400,274.09 3400,274.09',
                                    zero: 'mean',
                                    label: 'lift',
                                    color: '#00FFAE',

                                    gain: 0.15,
                                },
                            ]}
                        /> */}

                        {TRIGGERS.map((trg, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    markRefs.current[i] = el;
                                }}
                                style={{
                                    left: `${trg.left}%`,
                                    top: `${trg.top}%`,
                                }}
                                className="absolute z-50 h-5 w-5"
                            ></div>
                        ))}

                        <div
                            ref={cameraRef}
                            className="relative"
                            style={{
                                width: 'clamp(1700px, 461.43vh, 3400px)',
                                height: 'clamp(350px, 95vh, 700px)',
                                perspective: '900px',
                            }}
                        >
                            <div
                                ref={worldRef}
                                className="absolute inset-0 h-full w-full"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    willChange: 'transform',
                                }}
                            >
                                <div
                                    ref={streakClipRef}
                                    className="h-full [clip-path:inset(0_80%_0_0)]"
                                >
                                    <DivisionStreak className="relative z-20 h-full w-auto max-w-none drop-shadow-[0px_8px_0px_#0A0C0F]" />
                                </div>

                                <div className="absolute inset-0 z-30 h-full">
                                    {divisionData.map((division) => (
                                        <div
                                            key={division.name}
                                            data-click-sound
                                            className="pointer-events-auto absolute cursor-pointer"
                                            style={{
                                                left: division.left,
                                                [division.vertical.side]:
                                                    division.vertical.value,
                                            }}
                                            onClick={() =>
                                                handleOpenDivisionPopup(
                                                    division,
                                                )
                                            }
                                        >
                                            <DivisionCard
                                                key={division.name}
                                                imageSrc={division.image}
                                                titleSrc={division.nameSrc}
                                                direction={division.direction}
                                                namePosition={
                                                    division.namePosition
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        className="fixed bottom-6 left-6 z-40 w-60"
                        Icon={BackButtonSVG2}
                        iconClassName="h-fit"
                        iconStyle={{ width: 'clamp(8rem, 30vh, 15rem)' }}
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
