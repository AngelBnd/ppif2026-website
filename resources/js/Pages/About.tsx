import DivisionButtonSVG from '@/assets/icons/DivisionsButtonSVG.svg?react';
import GalleryPopup from '@/Components/about/GalleryPopup';
import Heading from '@/Components/about/Heading';
import InfoSwitcher from '@/Components/about/InfoSwitcher';
import InfoTabs from '@/Components/about/InfoTabs';
import MorphingAboutBox from '@/Components/about/MorphingAboutBox';
import CustomScrollBox from '@/Components/global/CustomScrollBox';

import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    lazy,
    Suspense,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import { type DivisionsSectionRef } from '@/Components/about/DivisionsSection';
import Button from '@/Components/global/Button';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
export type currentInfo = 'informatics' | 'ppif';
export type currentTab = 'information' | 'gallery' | 'divisions';

const Gallery = lazy(() => import('@/Components/about/Gallery'));
const DivisionsSection = lazy(
    () => import('@/Components/about/DivisionsSection'),
);

const informationPlaceholder: {
    topic: currentInfo;
    tabs: Record<currentTab, string>;
    images: string[];
}[] = [
    {
        topic: 'ppif',
        tabs: {
            information:
                'ya lorem lorem ppiflah lorem h lorem lorem ppiflah lorem lorem ppiflah lorem lorem ppiflah lore h lorem lorem ppiflah lorem lorem ppiflah lorem lorem ppiflah lore h lorem lorem ppiflah lorem lorem ppiflah lorem lorem ppiflah lore h lorem lorem ppiflah lorem lorem ppiflah lorem lorem ppiflah lore lorem ppiflah lorem lorem ppiflah lorem lorem ppiflah lorem lorem ppiflah lorem lorem ppiflah orem lorem ppiflah lorem lorem ppiflah orem lorem ppiflah lorem lorem ppiflah',
            gallery:
                'Here are the gallery pictures for PPIF 2025. Scroll through the gallery to explore the moments, and click on any picture to view it in more detail.',
            divisions: 'Here are the divisions in PPIF 2026.',
        },
        images: [
            '/pngs/ppif/1.webp',
            '/pngs/ppif/2.webp',
            '/pngs/ppif/3.webp',
            '/pngs/ppif/4.webp',
            '/pngs/ppif/5.webp',
            '/pngs/ppif/6.webp',
            '/pngs/ppif/7.webp',
            '/pngs/ppif/8.webp',
            '/pngs/ppif/9.webp',
            '/pngs/ppif/10.webp',
            '/pngs/ppif/11.webp',
            '/pngs/ppif/12.webp',
            '/pngs/ppif/13.webp',
            '/pngs/ppif/14.webp',
            '/pngs/ppif/15.webp',
            '/pngs/ppif/16.webp',
            '/pngs/ppif/17.webp',
            '/pngs/ppif/18.webp'
        ],
    },
    {
        topic: 'informatics',
        tabs: {
            information:
                'SY SGT SUKA SAMA SMEMUA MATKU LDI NFORATMATIAK KAJWJADASDKADSSAS LOREM IPSUM APALAGI KALAU DOSENNYA KEREN KWKWKWKWKWKWKSY SGT SUKA SAMA SMEMUA MATKU LDI NFORATMATIAK KAJWJADASDKADSSAS LOREM IPSUM APALAGI KALAU DOSENNYA KEREN KWKWKWKWKWKWK',
            gallery:
                'Here are the gallery pictures for Informatics. Scroll through the gallery to explore the moments, and click on any picture to view it in more detail.',
            divisions: '',
        },
        images: [
            '/pngs/informatics/1.webp',
            '/pngs/informatics/2.webp',
            '/pngs/informatics/3.webp',
            '/pngs/informatics/4.webp',
            '/pngs/informatics/5.webp',
            '/pngs/informatics/6.webp',
            '/pngs/informatics/7.webp',
            '/pngs/informatics/8.webp',
            '/pngs/informatics/9.webp',
            '/pngs/informatics/10.webp',
            '/pngs/informatics/11.webp',
            '/pngs/informatics/12.webp',
            '/pngs/informatics/13.webp',
            '/pngs/informatics/14.webp',
            '/pngs/informatics/15.webp',
            '/pngs/informatics/16.webp',
            '/pngs/informatics/17.webp'
        ],
    },
];

export default function About() {
    const mainWrapperInfo = useRef<HTMLDivElement>(null);
    const galleryWrapper = useRef<HTMLDivElement>(null);
    const divisionsSectionRef = useRef<DivisionsSectionRef>(null);
    const tabTimelineRef = useRef<gsap.core.Timeline | null>(null);
    const codieRef = useRef<HTMLDivElement>(null);
    const morphBoxRef = useRef<HTMLDivElement>(null);
    const tabRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            videoRef.current?.play();
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const [renderDivisions, setRenderDivisions] = useState(false);
    const [divisionsReady, setDivisionsReady] = useState(false);

    const [renderMainContent, setRenderMainContent] = useState(true);
    const divisionButtonRef = useRef<HTMLDivElement | null>(null);
    const [currentInfo, setCurrentInfo] = useState<currentInfo>('informatics');
    const [activeTab, setActiveTab] = useState<currentTab>('information');
    const [isGalleryPopupOpen, setIsGalleryPopupOpen] = useState(false);
    const [idxClicked, setIdxClicked] = useState(0);
    const [renderDivisionButton, setRenderDivisionButton] = useState(
        currentInfo === 'ppif',
    );
    const [codieIntroDone, setCodieIntroDone] = useState(false);

    useLayoutEffect(() => {
        if (!morphBoxRef.current || !tabRef.current) return;

        const timeline = gsap.timeline();
        timeline
            .set(morphBoxRef.current, {
                xPercent: -30,
                rotation: -4,
                scale: 0.7,
                autoAlpha: 0,
            })
            .set(tabRef.current, {
                xPercent: -10,
                rotation: -6,
                scale: 1,
                autoAlpha: 0,
            })
            .to(morphBoxRef.current, {
                xPercent: 3,
                rotation: 2,
                scale: 1.02,
                autoAlpha: 1,
                duration: 0.55,
                ease: 'power3.out',
            })
            .to(morphBoxRef.current, {
                xPercent: -2,
                rotation: -1,
                scale: 0.99,
                duration: 0.15,
                ease: 'power2.inOut',
            })
            .to(morphBoxRef.current, {
                xPercent: 0,
                rotation: 0,
                scale: 1,
                duration: 0.12,
                ease: 'power2.out',
            })
            .to(
                tabRef.current,
                {
                    xPercent: 5,
                    rotation: 3,
                    scale: 1,
                    duration: 0.12,
                    autoAlpha: 1,
                    ease: 'power2.out',
                },
                '<',
            )
            .to(tabRef.current, {
                xPercent: 0,
                rotation: 0,
                scale: 1,
                duration: 0.12,
                autoAlpha: 1,
                ease: 'power2.out',
            });

        return () => {
            timeline.kill();
        };
    }, []);

    const selectedInfo = informationPlaceholder.find(
        (info) => info.topic === currentInfo,
    );

    const images = selectedInfo?.images ?? [];

    const handleChangeInfo = (nextInfo: currentInfo) => {
        setCurrentInfo(nextInfo);

        if (nextInfo === 'informatics' && activeTab === 'divisions') {
            setActiveTab('information');
        }
    };

    useEffect(() => {
        if (activeTab === 'divisions') {
            setRenderDivisions(true);
        } else {
            setRenderMainContent(true);
        }
    }, [activeTab]);

    useEffect(() => {
        const main = mainWrapperInfo.current;
        const gallery = galleryWrapper.current;
        const divisions = divisionsSectionRef.current?.wrapper;

        if (!main || !gallery) return;

        tabTimelineRef.current?.kill();
        tabTimelineRef.current = null;

        gsap.killTweensOf([main, gallery, divisions].filter(Boolean));

        const tl = gsap.timeline();
        tabTimelineRef.current = tl;

        // animasi buat tab divisions
        if (activeTab === 'divisions') {
            if (!renderDivisions || !divisionsReady || !divisions) return;

            tl.set(divisions, {
                xPercent: 100,
                autoAlpha: 1,
                pointerEvents: 'auto',
            });

            tl.to(
                [main, gallery],
                {
                    delay: 0.3,
                    xPercent: -130,
                    autoAlpha: 0,
                    duration: 0.65,
                    ease: 'power3.inOut',
                    stagger: 0.04,
                },
                0,
            );

            tl.to(
                divisions,
                {
                    xPercent: 0,
                    duration: 0.75,
                    ease: 'back.out(1.1)',
                },
                '<0.24',
            );

            tl.call(() => {
                setRenderMainContent(false);
            });

            return;
        }

        // animasi buat tab gallery
        if (activeTab === 'gallery') {
            tl.to(
                main,
                {
                    xPercent: 0,
                    x: 20,
                    autoAlpha: 1,
                    duration: 0.45,
                    ease: 'back.out(1.8)',
                },
                0,
            );

            tl.to(
                gallery,
                {
                    xPercent: 0,
                    autoAlpha: 1,
                    duration: 0.45,
                    ease: 'power3.out',
                },
                0,
            );
            return;
        }

        // animasi buat tab information
        if (divisions) {
            gsap.set(main, {
                xPercent: -150,
                autoAlpha: 1,
                opacity: 0,
            });

            tl.to(
                divisions,
                {
                    xPercent: 100,
                    autoAlpha: 0,
                    pointerEvents: 'none',
                    duration: 0.65,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        setRenderDivisions(false);
                        setDivisionsReady(false);
                    },
                },
                0,
            );

            tl.to(
                [main, gallery],
                {
                    xPercent: 0,
                    autoAlpha: 1,
                    opacity: 1,
                    duration: 0.65,
                    ease: 'back.out(1.2)',
                },
                '<0.24',
            );
        } else {
            tl.to(
                main,
                {
                    xPercent: 0,
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: 'back.out(1.2)',
                },
                0,
            );
        }

        return () => {
            tl.kill();
        };
    }, [activeTab, renderDivisions, renderMainContent, divisionsReady]);

    // animasi button division dipisah saat buat masuk & leave buat mastiin ga null refnya
    useEffect(() => {
        const button = divisionButtonRef.current;

        if (currentInfo === 'ppif') {
            setRenderDivisionButton(true);
            return;
        }

        if (button) {
            gsap.to(button, {
                rotate: 18,
                autoAlpha: 0,
                duration: 0.35,
                ease: 'back.out(1.6)',
                transformOrigin: '50% 100%',
                onComplete: () => {
                    setRenderDivisionButton(false);
                },
            });
        }
    }, [currentInfo]);

    useEffect(() => {
        const button = divisionButtonRef.current;
        if (!button || currentInfo !== 'ppif') return;

        gsap.fromTo(
            button,
            {
                rotate: -18,

                transformOrigin: '50% 100%',
            },
            {
                rotate: 0,

                duration: 0.35,
                ease: 'back.out(1.8)',
            },
        );
    }, [renderDivisionButton, currentInfo]);

    return (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
            <div className="transition-300 pointer-events-none absolute z-0 h-full w-full bg-[#7C131E] opacity-70 ease-in" />
            <div
                ref={codieRef}
                className="absolute -bottom-2 left-0 z-0 h-auto"
            >
                {!codieIntroDone ? (
                    <video
                        ref={videoRef}
                        key="intro"
                        muted
                        playsInline
                        preload="auto"
                        className="block h-auto w-full"
                        onEnded={() => setCodieIntroDone(true)}
                    >
                        <source
                            src="/videos/CODIEDYNAMIC.webm"
                            type="video/webm"
                        />
                    </video>
                ) : (
                    <video
                        key="static"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="block h-auto w-full"
                    >
                        <source
                            src="/videos/CODIESTATIC1.webm"
                            type="video/webm"
                        />
                    </video>
                )}
            </div>

            {/* <AboutBackground /> */}
            {renderMainContent ? (
                <>
                    {/* bg-red-400 */}
                    <div
                        ref={mainWrapperInfo}
                        className="pointer-events-none relative z-20 ml-[16rem] mt-[5rem] h-[84%] w-[73%] min-w-[20rem]"
                    >
                        <div className="absolute bottom-0 z-10">
                            {/* bg-blue-600 */}
                            <div className="absolute bottom-0 left-[16%] right-0 top-[4%] z-20">
                                <Heading
                                    className=""
                                    currentInfo={currentInfo}
                                />
                                <div
                                    ref={tabRef}
                                    className="absolute -top-[30%] w-full"
                                >
                                    <InfoTabs
                                        className={` ${activeTab === 'divisions' ? 'pointer-events-none' : 'pointer-events-auto'} absolute right-0`}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                </div>
                                {renderDivisionButton && (
                                    <div
                                        ref={divisionButtonRef}
                                        className="pointer-events-auto absolute -right-8 top-6 origin-bottom"
                                    >
                                        <Button
                                            Icon={DivisionButtonSVG}
                                            onClick={() => {
                                                setDivisionsReady(false);
                                                setRenderDivisions(true);
                                                setActiveTab('divisions');
                                            }}
                                            className="h-auto origin-bottom transition-transform hover:rotate-[9deg]"
                                            iconClassName="h-auto w-[15rem] "
                                        />
                                    </div>
                                )}
                            </div>

                            <div ref={morphBoxRef}>
                                <div className="absolute bottom-[14%] right-[23.7%] z-20 h-[42%] w-[48%] origin-top-left [perspective:380px]">
                                    {/* bg-green-400 */}
                                    <div className="pointer-events-auto h-full w-full origin-left [transform:rotateZ(-4deg)_rotateY(-11deg)_skewX(2deg)]">
                                        <CustomScrollBox
                                            text={selectedInfo?.tabs[activeTab]}
                                        />
                                    </div>
                                </div>
                                {/* bg-red-200 */}
                                <MorphingAboutBox activeTab={activeTab} />
                            </div>

                            <InfoSwitcher
                                className={`${activeTab === 'divisions' ? 'pointer-events-none' : 'pointer-events-auto'} absolute -bottom-6 -right-12 z-20`}
                                currentInfo={currentInfo}
                                setCurrentInfo={handleChangeInfo}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}

            <div
                ref={galleryWrapper}
                className="pointer-events-none absolute inset-0 z-10"
            >
                <Suspense fallback={null}>
                    <Gallery
                        activeTab={activeTab}
                        setIsOpen={setIsGalleryPopupOpen}
                        setIdxClicked={setIdxClicked}
                        images={images}
                    />
                </Suspense>
            </div>

            {isGalleryPopupOpen && (
                <GalleryPopup
                    images={images}
                    onClose={() => setIsGalleryPopupOpen(false)}
                    idxClicked={idxClicked}
                    isOpen={isGalleryPopupOpen}
                />
            )}

            {renderDivisions && (
                <Suspense fallback={null}>
                    <DivisionsSection
                        ref={divisionsSectionRef}
                        onReady={() => setDivisionsReady(true)}
                        renderDivisions={renderDivisions}
                        setActiveTab={setActiveTab}
                        setRenderMainContent={setRenderMainContent}
                    />
                </Suspense>
            )}
        </div>
    );
}
