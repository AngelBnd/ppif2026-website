import GalleryBG from './GalleryBG';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import GalleryScroll from './GalleryScroll';

type Props = {
    activeTab: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIdxClicked: React.Dispatch<React.SetStateAction<number>>;
    images: string[];
};

export default function Gallery({
    activeTab,
    setIsOpen,
    setIdxClicked,
    images,
}: Props) {
    const [shouldRenderGalleryScroll, setShouldRenderGalleryScroll] = useState(
        activeTab === 'gallery',
    );

    const galleryScrollRef = useRef<HTMLDivElement | null>(null);
    const galleryTlRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (activeTab === 'gallery') {
            setShouldRenderGalleryScroll(true);
        } else {
            setIsOpen(false);
        }
    }, [activeTab]);

    useEffect(() => {
        const el = galleryScrollRef.current;
        if (!el) return;

        galleryTlRef.current?.kill();

        if (activeTab === 'gallery') {
            galleryTlRef.current = gsap.fromTo(
                el,
                {
                    x: -80,
                    opacity: 0.9,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'back.out(1.5)',
                },
            );
        } else if (shouldRenderGalleryScroll) {
            galleryTlRef.current = gsap.to(el, {
                x: -80,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.5)',
                onComplete: () => {
                    if (activeTab !== 'gallery') {
                        setShouldRenderGalleryScroll(false);
                    }
                },
            });
        }

        return () => {
            galleryTlRef.current?.kill();
        };
    }, [activeTab, shouldRenderGalleryScroll]);

    return (
        <div className="pointer-events-auto">
            {shouldRenderGalleryScroll && (
                <div className="">
                    <GalleryBG isActive={activeTab === 'gallery'} />
                    <div
                        ref={galleryScrollRef}
                        className="absolute -left-3 top-20 z-30"
                    >
                        <GalleryScroll
                            images={images}
                            setIdxClicked={setIdxClicked}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
