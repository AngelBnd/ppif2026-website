import { useEffect, useRef, useState } from 'react';

/**
 * Draws the camera curves at TRUE x scale over the panel, so you can author
 * node positions against real content instead of guessing percentages.
 *
 * Mount it as a sibling of the camera, inside panelRef. Delete for production.
 *
 * Paths must be authored with x spanning 0..panelWidth. The overlay warns in
 * the console if a path's measured x extent doesn't match.
 */

type DebugChannel = {
    d: string;
    label: string;
    color: string;
    gain?: number;
    zero?: 'first' | 'mean' | 'none' | number;
    dashed?: boolean;
};

export function CameraPathDebug({
    scrollerRef,
    panelWidth,
    channels,
    markers = [],
    height = 320,
}: {
    scrollerRef: { current: HTMLElement | null };
    panelWidth: number;
    channels: DebugChannel[];
    /** Marker `left` values, so you can see where beats line up. */
    markers?: number[];
    height?: number;
}) {
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const playheadRef = useRef<SVGGElement | null>(null);

    const [transforms, setTransforms] = useState<string[]>([]);
    const [reach, setReach] = useState<[number, number]>([0, panelWidth]);

    /* Compute each channel's baseline + gain as an SVG transform, using the
     * same sampling the real sampler does. */
    useEffect(() => {
        const next = channels.map((ch, i) => {
            const el = pathRefs.current[i];
            if (!el) return '';

            const gain = ch.gain ?? 1;
            const zero = ch.zero ?? 'first';

            const len = el.getTotalLength();
            const S = 200;
            let base = 0;

            if (zero === 'first') {
                base = el.getPointAtLength(0).y;
            } else if (zero === 'mean') {
                let sum = 0;
                for (let s = 0; s <= S; s++)
                    sum += el.getPointAtLength((len * s) / S).y;
                base = sum / (S + 1);
            } else if (typeof zero === 'number') {
                base = zero;
            }

            const bbox = el.getBBox();
            if (Math.abs(bbox.width - panelWidth) > panelWidth * 0.02) {
                console.warn(
                    `[camera debug] "${ch.label}" spans ${Math.round(bbox.width)}px in x but the panel is ${panelWidth}px. Rescale the path or node positions will be off by ${Math.round((bbox.width / panelWidth - 1) * 100)}%.`,
                );
            }

            /* y' = (y - base) * gain, expressed as a matrix. */
            return `matrix(1 0 0 ${gain} 0 ${-base * gain})`;
        });
        setTransforms(next);
    }, [channels, panelWidth]);

    /* The window of x the viewport centre can actually reach. */
    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const compute = () => {
            const viewW = scroller.clientWidth;
            const span = Math.max(1, scroller.scrollWidth - viewW);
            const camLeft = scroller.scrollWidth - viewW - span; // padding-left
            setReach([viewW / 2 - camLeft, span + viewW / 2 - camLeft]);
        };
        compute();

        let raf = 0;
        const tick = () => {
            const g = playheadRef.current;
            if (g) {
                const viewW = scroller.clientWidth;
                const camLeft = 24; // matches pl-[24px]
                const x = scroller.scrollLeft + viewW / 2 - camLeft;
                g.setAttribute('transform', `translate(${x} 0)`);
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        window.addEventListener('resize', compute);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', compute);
        };
    }, [scrollerRef]);

    const half = height / 2;

    return (
        <svg
            aria-hidden
            width={panelWidth}
            height={height}
            viewBox={`0 ${-half} ${panelWidth} ${height}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-0 top-0 z-[60]"
        >
            <rect
                x={0}
                y={-half}
                width={reach[0]}
                height={height}
                fill="#000"
                opacity={0.35}
            />
            <rect
                x={reach[1]}
                y={-half}
                width={Math.max(0, panelWidth - reach[1])}
                height={height}
                fill="#000"
                opacity={0.35}
            />

            <line
                x1={0}
                y1={0}
                x2={panelWidth}
                y2={0}
                stroke="#ffffff"
                strokeWidth={1}
                opacity={0.35}
            />

            {markers.map((mx) => (
                <g key={mx}>
                    <line
                        x1={mx}
                        y1={-half}
                        x2={mx}
                        y2={half}
                        stroke="#00FFAE"
                        strokeWidth={1}
                        opacity={0.5}
                    />
                    <text
                        x={mx + 6}
                        y={-half + 18}
                        fill="#00FFAE"
                        fontSize={13}
                        fontFamily="monospace"
                    >
                        {mx}
                    </text>
                </g>
            ))}

            {[500, 1000, 1500, 2000, 2500, 3000].map((gx) => (
                <g key={gx}>
                    <line
                        x1={gx}
                        y1={-half}
                        x2={gx}
                        y2={half}
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        opacity={0.15}
                    />
                    <text
                        x={gx + 4}
                        y={half - 8}
                        fill="#ffffff"
                        fontSize={12}
                        fontFamily="monospace"
                        opacity={0.5}
                    >
                        {gx}
                    </text>
                </g>
            ))}

            {channels.map((ch, i) => (
                <g key={ch.label}>
                    <path
                        ref={(el) => {
                            pathRefs.current[i] = el;
                        }}
                        d={ch.d}
                        fill="none"
                        stroke={ch.color}
                        strokeWidth={1}
                        opacity={0.25}
                    />
                    <path
                        d={ch.d}
                        fill="none"
                        stroke={ch.color}
                        strokeWidth={3}
                        strokeDasharray={ch.dashed ? '10 6' : undefined}
                        transform={transforms[i]}
                    />
                    <text
                        x={12}
                        y={-half + 24 + i * 20}
                        fill={ch.color}
                        fontSize={14}
                        fontFamily="monospace"
                    >
                        {ch.label}
                    </text>
                </g>
            ))}

            <g ref={playheadRef}>
                <line
                    x1={0}
                    y1={-half}
                    x2={0}
                    y2={half}
                    stroke="#ffffff"
                    strokeWidth={2}
                />
            </g>
        </svg>
    );
}
