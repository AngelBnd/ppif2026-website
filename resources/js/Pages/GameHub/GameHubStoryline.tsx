import SLBox1 from '@/assets/games/storyline/lineboxesthingies/SLBox1.webp';
import SLBox2 from '@/assets/games/storyline/lineboxesthingies/SLBox2.webp';
import SLBox3 from '@/assets/games/storyline/lineboxesthingies/SLBox3.webp';
import SLBox4 from '@/assets/games/storyline/lineboxesthingies/SLBox4.webp';
import Panel1 from '@/assets/games/storyline/panels/Panel1.webp';
import Panel2 from '@/assets/games/storyline/panels/Panel2.webp';
import Panel3 from '@/assets/games/storyline/panels/Panel3.webp';
import { CAMERA_PATHS } from '@/Components/about/cameraPath';
import {
    CameraConfig,
    useDivisionCamera,
    type DivisionTrigger,
} from '@/Components/about/useDivisionCamera';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Props = {
    onReady: () => void;
};

export default function GameHubStoryline({ onReady }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const worldRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<HTMLDivElement>(null);
    const clipRef = useRef<HTMLDivElement>(null);
    const markRefs = useRef<(HTMLDivElement | null)[]>([]);

    const refs = useRef({
        scroller: scrollRef,
        panel: panelRef,
        camera: cameraRef,
        world: worldRef,
        clip: clipRef,
        marks: markRefs,
    }).current;

    const TRIGGERS: DivisionTrigger[] = [
        { left: 29, top: 20, inset: 64 },
        { left: 45, top: 20, inset: 43 },
        { left: 63, top: 20, inset: 32 },
        { left: 77, top: 20, inset: 0 },
    ];

    // Placeholder layout — tweak left/top/width per object. `beat` tags each one
    // for the fade-in/out buildBeat pattern (data-beat).
    const PANELS = [
        { src: Panel1, left: '200px', top: '10%', width: '520px', beat: 0 },
        { src: Panel2, left: '750px', top: '23%', width: '520px', beat: 1 },
        { src: Panel3, left: '1500px', top: '16%', width: '560px', beat: 2 },
    ];
    const BOXES = [
        { src: SLBox1, left: '80px', top: '7%', width: '360px', beat: 0 },
        { src: SLBox2, left: '540px', top: '18%', width: '400px', beat: 1 },
        { src: SLBox3, left: '30px', top: '58%', width: '200px', beat: 2 },
        { src: SLBox4, left: '40px', top: '64%', width: '480px', beat: 3 },
    ];

    const CAMERA_CONFIG: Partial<CameraConfig> = {
        perspective: 900,
        markers: true,
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
        dollyGain: 0,
        dollyMax: 0,
    };

    useDivisionCamera({
        enabled: true,
        triggers: TRIGGERS,
        refs,
        config: CAMERA_CONFIG,
    });

    return (
        <div className="absolute inset-0 overflow-hidden text-white">
            <div
                ref={scrollRef}
                className="absolute inset-0 z-20 h-screen overflow-x-auto overflow-y-hidden overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                <div
                    ref={panelRef}
                    className="relative"
                    style={{
                        width: '3400px',
                        height: '856px',
                        minWidth: '3400px',
                        minHeight: '856px',
                    }}
                >
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
                            className="absolute z-50 h-5 w-5 bg-green-500"
                        />
                    ))}

                    <div
                        ref={cameraRef}
                        className="relative h-[690px] w-[4000px]"
                        style={{ perspective: '900px' }}
                    >
                        <div
                            ref={worldRef}
                            className="absolute inset-0 h-full w-full"
                            style={{
                                transformStyle: 'preserve-3d',
                                willChange: 'transform',
                            }}
                        >
                            {/* <div
                                ref={clipRef}
                                className="h-full [clip-path:inset(0_80%_0_0)]"
                            >
                                <DivisionStreak className="relative z-20 h-full w-auto max-w-none drop-shadow-[0px_8px_0px_#0A0C0F]" />
                            </div> */}

                            {/* Storyline panels */}
                            {PANELS.map((p, i) => (
                                <img
                                    key={`panel-${i}`}
                                    src={p.src}
                                    alt=""
                                    draggable={false}
                                    data-beat={p.beat}
                                    style={{
                                        left: p.left,
                                        top: p.top,
                                        width: p.width,
                                    }}
                                    className="pointer-events-none absolute z-30 h-auto select-none"
                                />
                            ))}

                            {/* Dialogue / line boxes */}
                            {BOXES.map((b, i) => (
                                <img
                                    key={`box-${i}`}
                                    src={b.src}
                                    alt=""
                                    draggable={false}
                                    data-beat={b.beat}
                                    style={{
                                        left: b.left,
                                        top: b.top,
                                        width: b.width,
                                    }}
                                    className="pointer-events-none absolute z-40 h-auto select-none"
                                />
                            ))}
                        </div>

                        <button
                            onClick={onReady}
                            className="absolute bottom-6 right-4 z-30 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 active:scale-95"
                        >
                            I'm Ready
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
