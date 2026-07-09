import type { ComponentType, SVGProps } from 'react';

import Border1 from '@/assets/about/gallery/Border1.svg?react';
import Border2 from '@/assets/about/gallery/Border2.svg?react';
import Border3 from '@/assets/about/gallery/Border3.svg?react';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

type BorderComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Props = {
    className?: string;
    images: string[];
    setIdxClicked: React.Dispatch<React.SetStateAction<number>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type GalleryImage = {
    path: string;
    originalIndex: number;
    width: string;
    border: BorderComponent;
    marginBottom: string;
};

type GalleryColumn = {
    id: 'left' | 'middle' | 'right';
    speed: number;
    images: GalleryImage[];
};

type PictureProps = {
    picPath: string;
    originalIndex: number;
    className?: string;
    Border: BorderComponent;
    setIdxClicked: React.Dispatch<React.SetStateAction<number>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type PictureColumnProps = {
    column: GalleryColumn;
    className?: string;
    zIndex: string;
    columnRef: (el: HTMLDivElement | null) => void;
    setIdxClicked: React.Dispatch<React.SetStateAction<number>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const galleryColumnLayouts = [
    {
        id: 'left',
        speed: 48,
        images: [
            {
                width: 'w-[14rem]',
                marginBottom: 'mb-[6rem]',
                border: Border1,
            },
            {
                width: 'w-[13rem]',
                marginBottom: 'mb-[5rem]',
                border: Border2,
            },
            {
                width: 'w-[18rem]',
                marginBottom: 'mb-[2rem]',
                border: Border3,
            },
            {
                width: 'w-[13rem]',
                marginBottom: 'mb-[5rem]',
                border: Border2,
            },
        ],
    },
    {
        id: 'middle',
        speed: 32,
        images: [
            {
                width: 'w-[20rem]',
                marginBottom: 'mb-[7rem]',
                border: Border2,
            },
            {
                width: 'w-[28rem]',
                marginBottom: 'mb-[4rem]',
                border: Border1,
            },
            {
                width: 'w-[22rem]',
                marginBottom: 'mb-[6rem]',
                border: Border3,
            },
        ],
    },
    {
        id: 'right',
        speed: 50,
        images: [
            {
                width: 'w-[19rem]',
                marginBottom: 'mb-[2rem]',
                border: Border3,
            },
            {
                width: 'w-[12.5rem]',
                marginBottom: 'mb-[9rem]',
                border: Border1,
            },
            {
                width: 'w-[16rem]',
                marginBottom: 'mb-[7rem]',
                border: Border2,
            },
            {
                width: 'w-[14rem]',
                marginBottom: 'mb-[8rem]',
                border: Border1,
            },
        ],
    },
] as const;

function Picture({
    picPath,
    originalIndex,
    Border,
    className = '',
    setIdxClicked,
    setIsOpen,
}: PictureProps) {
    return (
        <div
            onClick={() => {
                setIdxClicked(originalIndex);
                setIsOpen(true);
            }}
            className={`pointer-events-auto relative aspect-video ${className} cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.08]`}
        >
            <img
                src={picPath}
                alt="Gallery placeholder"
                className="absolute right-2 z-20 h-full w-full scale-[0.81] rounded-md object-cover"
            />

            <Border className="pointer-events-none absolute inset-0 z-10 h-full w-full" />
        </div>
    );
}

function PictureColumns({
    className = '',
    column,
    zIndex,
    columnRef,
    setIdxClicked,
    setIsOpen,
}: PictureColumnProps) {
    const loopedImages = [...column.images, ...column.images];

    return (
        <div
            className={`pointer-events-none relative h-[117vh] -translate-y-[20vh] overflow-hidden ${zIndex} ${className}`}
        >
            <div
                ref={columnRef}
                className="flex flex-col items-center will-change-transform"
            >
                {loopedImages.map((img, index) => (
                    <Picture
                        key={`${index}-${img.path}`}
                        picPath={img.path}
                        originalIndex={img.originalIndex}
                        Border={img.border}
                        className={`${img.width} ${img.marginBottom}`}
                        setIdxClicked={setIdxClicked}
                        setIsOpen={setIsOpen}
                    />
                ))}
            </div>
        </div>
    );
}
export default function GalleryScroll({
    className = '',
    images,
    setIdxClicked,
    setIsOpen,
}: Props) {
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollBoostRef = useRef(0);
    const isScrollingUpRef = useRef(false);

    let imageIndex = 0;

    const galleryColumns = galleryColumnLayouts.map((column) => ({
        ...column,
        images: column.images.map((imageConfig) => {
            const originalIndex = imageIndex % images.length;
            const path = images[imageIndex % images.length];
            imageIndex++;

            return {
                ...imageConfig,
                path,
                originalIndex,
            };
        }),
    }));

    useEffect(() => {
        let cleanupTicker: (() => void) | null = null;

        const setupAnimation = () => {
            const columns = columnRefs.current.filter(
                Boolean,
            ) as HTMLDivElement[];

            if (!columns.length) return;

            const states = columns.map((el, index) => {
                const halfHeight = el.scrollHeight / 2;

                gsap.set(el, {
                    y: -halfHeight,
                });

                return {
                    el,
                    y: -halfHeight,
                    halfHeight,
                    speed: galleryColumns[index].speed,
                };
            });

            const handleWheel = (event: WheelEvent) => {
                const isScrollingUp = event.deltaY < 0;

                isScrollingUpRef.current = isScrollingUp;

                scrollBoostRef.current += event.deltaY * 1.2;

                scrollBoostRef.current = gsap.utils.clamp(
                    -300,
                    300,
                    scrollBoostRef.current,
                );
            };

            window.addEventListener('wheel', handleWheel, { passive: true });

            const ticker = () => {
                const deltaTime = gsap.ticker.deltaRatio(60) / 60;

                states.forEach((state) => {
                    const baseMove = isScrollingUpRef.current
                        ? 0
                        : state.speed * deltaTime;

                    const scrollMove = scrollBoostRef.current * deltaTime;

                    state.y += baseMove + scrollMove;

                    state.y = gsap.utils.wrap(-state.halfHeight, 0, state.y);

                    gsap.set(state.el, {
                        y: state.y,
                    });
                });

                scrollBoostRef.current *= 0.92;

                if (Math.abs(scrollBoostRef.current) < 0.1) {
                    scrollBoostRef.current = 0;
                    isScrollingUpRef.current = false;
                }
            };

            gsap.ticker.add(ticker);

            cleanupTicker = () => {
                window.removeEventListener('wheel', handleWheel);
                gsap.ticker.remove(ticker);
            };
        };

        const waitForImages = async () => {
            const images = Array.from(document.querySelectorAll('img'));

            await Promise.all(
                images.map((img) => {
                    if (img.complete) return Promise.resolve();

                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                }),
            );

            setupAnimation();
        };

        waitForImages();

        return () => {
            cleanupTicker?.();
        };
    }, []);

    return (
        <div className={`${className} [perspective:1200px]`}>
            <div className="flex justify-center -space-x-40 [transform-style:preserve-3d] [transform:rotateY(30deg)_rotateX(2deg)]">
                <PictureColumns
                    column={galleryColumns[0]}
                    zIndex="z-20"
                    columnRef={(el) => {
                        columnRefs.current[0] = el;
                    }}
                    setIdxClicked={setIdxClicked}
                    setIsOpen={setIsOpen}
                />

                <PictureColumns
                    column={galleryColumns[1]}
                    zIndex="z-10"
                    className="mt-12"
                    columnRef={(el) => {
                        columnRefs.current[1] = el;
                    }}
                    setIdxClicked={setIdxClicked}
                    setIsOpen={setIsOpen}
                />

                <PictureColumns
                    column={galleryColumns[2]}
                    zIndex="z-20"
                    columnRef={(el) => {
                        columnRefs.current[2] = el;
                    }}
                    setIdxClicked={setIdxClicked}
                    setIsOpen={setIsOpen}
                />
            </div>
        </div>
    );
}
