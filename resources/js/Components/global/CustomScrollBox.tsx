'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
    text: string | undefined;
};

export default function CustomScrollBox({ text }: Props) {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const [progress, setProgress] = useState(0);
    const [hasOverflow, setHasOverflow] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const trackHeight = 120;
    const thumbHeight = 51;
    const thumbY = progress * (trackHeight - thumbHeight);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const updateScrollState = () => {
            const maxScroll = el.scrollHeight - el.clientHeight;
            const currentProgress =
                maxScroll === 0 ? 0 : el.scrollTop / maxScroll;

            setProgress(currentProgress);
            setHasOverflow(el.scrollHeight > el.clientHeight);
        };

        updateScrollState();

        el.addEventListener('scroll', updateScrollState);

        const resizeObserver = new ResizeObserver(updateScrollState);
        resizeObserver.observe(el);

        if (el.firstElementChild) {
            resizeObserver.observe(el.firstElementChild);
        }

        return () => {
            el.removeEventListener('scroll', updateScrollState);
            resizeObserver.disconnect();
        };
    }, [text]);

    const scrollToProgress = (newProgress: number) => {
        const scrollEl = scrollRef.current;
        if (!scrollEl) return;

        const clampedProgress = Math.min(Math.max(newProgress, 0), 1);
        const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;

        scrollEl.scrollTop = clampedProgress * maxScroll;
    };

    const getProgressFromMouse = (clientY: number) => {
        const svgEl = svgRef.current;
        if (!svgEl) return 0;

        const rect = svgEl.getBoundingClientRect();

        const y = clientY - rect.top;

        return Math.min(Math.max(y / rect.height, 0), 1);
    };

    const handleScrollbarClick = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    ) => {
        const newProgress = getProgressFromMouse(e.clientY);
        scrollToProgress(newProgress);
    };

    const handleThumbMouseDown = (
        e: React.MouseEvent<SVGGElement, MouseEvent>,
    ) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(true);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const newProgress = getProgressFromMouse(e.clientY);
            scrollToProgress(newProgress);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="relative h-full w-full">
            {/* Scrollable content */}
            <div
                ref={scrollRef}
                className="h-full overflow-y-scroll pr-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                <div className="font-arsenal text-xl font-semibold leading-relaxed text-[#F0F2F5]">
                    <p>{text}</p>
                </div>
            </div>

            {/* Custom SVG scrollbar */}
            {hasOverflow && (
                <svg
                    ref={svgRef}
                    onClick={handleScrollbarClick}
                    className="absolute -top-[2rem] right-0 h-[180px] w-[42px] cursor-pointer"
                    viewBox="0 0 42 135"
                    fill="none"
                >
                    {/* Border / track */}
                    <g transform="translate(8 0)">
                        <path
                            d="M19.7617 129.396L0 134.531L2.77539 1.125L26.0586 0L19.7617 129.396ZM6.65332 5.64062L5.38672 128.522L13.5566 124.991L22.2256 3.58203L6.65332 5.64062Z"
                            fill="#F0F2F5"
                        />
                    </g>

                    {/* Moving white box */}
                    <g
                        transform={`translate(11 ${thumbY}) scale(0.53 0.68)`}
                        onMouseDown={handleThumbMouseDown}
                        className="cursor-grab active:cursor-grabbing"
                    >
                        <path
                            d="M-2.02363e-05 88.2503L3.60874 2.97155e-06L36.8953 2.88483e-05L30.9998 83.7503L-2.02363e-05 88.2503Z"
                            fill="#F0F2F5"
                        />
                    </g>
                </svg>
            )}
        </div>
    );
}
