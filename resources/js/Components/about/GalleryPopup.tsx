import Border1 from '@/assets/about/gallery/Border1.svg?react';
import Border2 from '@/assets/about/gallery/Border2.svg?react';
import Border3 from '@/assets/about/gallery/Border3.svg?react';
import BackButton from '@/assets/icons/BackButtonSVG.svg';
import LeftArrow from '@/assets/svgs/LeftArrow.svg?react';
import RightArrow from '@/assets/svgs/RightArrow.svg?react';
import Button from '../global/Button';

import gsap from 'gsap';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

type GalleryPopupProps = {
    images: string[];
    onClose: () => void;
    idxClicked: number;
    isOpen: boolean;
};

function GalleryPhoto({
    src,
    Border,
    className = '',
    photoRef,
}: {
    src: string;
    Border: React.ElementType;
    className?: string;
    photoRef?: React.Ref<HTMLDivElement>;
}) {
    return (
        <div
            ref={photoRef}
            className={`absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 ${className}`}
        >
            <div className="relative z-20 aspect-video w-full overflow-hidden rounded-md">
                <img
                    src={src}
                    alt="Gallery"
                    draggable={false}
                    className="h-full w-full select-none object-cover"
                />
            </div>

            <Border className="pointer-events-none absolute inset-0 left-[3%] z-10 h-full w-full scale-[1.23]" />
        </div>
    );
}

export default function GalleryPopup({
    images,
    onClose,
    idxClicked,
    isOpen,
}: GalleryPopupProps) {
    const [visibleIndexes, setVisibleIndexes] = useState(() => [
        idxClicked,
        (idxClicked + 1) % images.length,
        (idxClicked + 2) % images.length,
    ]);

    const [currIdx, setCurrIdx] = useState(0);

    const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isAnimating = useRef(false);

    const rotations = [-7, 8, 2];

    const getStackOrder = (frontIdx: number) => {
        const middleIdx = (frontIdx + 1) % 3;
        const backIdx = (frontIdx + 2) % 3;

        return {
            frontIdx,
            middleIdx,
            backIdx,
        };
    };

    const handleNext = () => {
        if (isAnimating.current) return;

        const currentPhoto = photoRefs.current[currIdx];
        if (!currentPhoto) return;

        const currentRotation = rotations[currIdx];
        const nextIdx = (currIdx + 1) % 3;

        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrIdx(nextIdx);

                setVisibleIndexes((prev) => {
                    const updated = [...prev];

                    const currentFrontImageIndex = prev[currIdx];
                    const newBackImageIndex =
                        (currentFrontImageIndex + 3) % images.length;

                    updated[currIdx] = newBackImageIndex;

                    return updated;
                });

                isAnimating.current = false;
            },
        });

        tl.to(currentPhoto, {
            y: 260,
            opacity: 0,
            rotate: currentRotation + 18,
            duration: 0.4,
            ease: 'power2.in',
        });

        tl.add(() => {
            const { frontIdx, middleIdx, backIdx } = getStackOrder(nextIdx);

            gsap.set(photoRefs.current[frontIdx], {
                zIndex: 30,
            });

            gsap.set(photoRefs.current[middleIdx], {
                zIndex: 20,
            });

            gsap.set(photoRefs.current[backIdx], {
                zIndex: 10,
            });
        });

        tl.set(currentPhoto, {
            rotate: currentRotation - 20,
        });

        tl.to(currentPhoto, {
            y: 0,
            opacity: 1,
            rotate: currentRotation,
            duration: 0.4,
            ease: 'back.out(1.2)',
        });
    };

    const handlePrev = () => {
        if (isAnimating.current) return;

        const prevIdx = (currIdx - 1 + 3) % 3;
        const currentPhoto = photoRefs.current[prevIdx];

        if (!currentPhoto) return;

        const currentRotation = rotations[prevIdx];

        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrIdx(prevIdx);
                isAnimating.current = false;
            },
        });

        tl.to(currentPhoto, {
            y: 260,
            opacity: 0,
            rotate: currentRotation + 18,
            duration: 0.4,
            ease: 'power2.in',
        });

        tl.add(() => {
            flushSync(() => {
                setVisibleIndexes((prev) => {
                    const updated = [...prev];

                    const currentFrontImageIndex = prev[currIdx];
                    const newFrontImageIndex =
                        (currentFrontImageIndex - 1 + images.length) %
                        images.length;

                    updated[prevIdx] = newFrontImageIndex;

                    return updated;
                });
            });

            const { frontIdx, middleIdx, backIdx } = getStackOrder(prevIdx);

            gsap.set(photoRefs.current[frontIdx], {
                zIndex: 30,
            });

            gsap.set(photoRefs.current[middleIdx], {
                zIndex: 20,
            });

            gsap.set(photoRefs.current[backIdx], {
                zIndex: 10,
            });
        });

        tl.set(currentPhoto, {
            rotate: currentRotation - 20,
        });

        tl.to(currentPhoto, {
            y: 0,
            opacity: 1,
            rotate: currentRotation,
            duration: 0.4,
            ease: 'back.out(1.2)',
        });
    };

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-40 mt-[2rem] flex h-screen w-screen items-center justify-center">
            <div className="absolute inset-0 h-full w-full bg-[#0A0C0F] opacity-75" />

            <div className="pointer-events-none relative flex aspect-video w-full items-center justify-center">
                <div className="relative h-[40rem] w-[60rem]">
                    <GalleryPhoto
                        src={images[visibleIndexes[2]]}
                        Border={Border1}
                        photoRef={(el) => {
                            photoRefs.current[2] = el;
                        }}
                        className="z-10 rotate-[2deg]"
                    />

                    <GalleryPhoto
                        src={images[visibleIndexes[1]]}
                        Border={Border2}
                        photoRef={(el) => {
                            photoRefs.current[1] = el;
                        }}
                        className="z-20 rotate-[8deg]"
                    />

                    <GalleryPhoto
                        src={images[visibleIndexes[0]]}
                        Border={Border3}
                        photoRef={(el) => {
                            photoRefs.current[0] = el;
                        }}
                        className="z-30 rotate-[-7deg]"
                    />
                </div>
            </div>

            <div className="pointer-events-auto absolute inset-0 left-1/2 z-40 flex h-full min-w-[75%] -translate-x-1/2 items-center justify-between">
                <Button
                    Icon={LeftArrow}
                    onClick={handlePrev}
                    className="block cursor-pointer transition hover:-translate-x-3"
                    iconClassName="h-auto w-[5rem]"
                />

                <Button
                    Icon={RightArrow}
                    onClick={handleNext}
                    className="block cursor-pointer transition hover:translate-x-3"
                    iconClassName="h-auto w-[5rem]"
                />
            </div>

            <Button
                Icon={BackButton}
                onClick={onClose}
                className="absolute bottom-6 right-6 z-50"
                iconClassName=""
                iconStyle={{ width: 'clamp(5.4rem, 26.4vh, 12rem)' }}
            />
        </div>
    );
}
