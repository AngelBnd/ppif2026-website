import backButtonImg from '@/assets/icons/BackButtonSVG.svg';
import leftArrow from '@/assets/timeline/about-left-arrow.svg';
import rightArrow from '@/assets/timeline/about-right-arrow.svg';
import aboutmodal from '@/assets/timeline/aboutmodal.svg';
import greyknife from '@/assets/timeline/grey-knife.svg';
import One from '@/assets/timeline/one.svg?react';
import Page from '@/assets/timeline/Page.svg?react';
import Perhatiakn from '@/assets/timeline/Perhatikan.svg?react';
import Two from '@/assets/timeline/two.svg?react';
import gsap from 'gsap';
import type { ComponentType, SVGProps } from 'react';
import { useEffect, useRef, useState } from 'react';
import CustomScrollBox from '../global/CustomScrollBox';

type SVGComponent = ComponentType<SVGProps<SVGSVGElement>>;

type AboutDDayModalProps = {
    open: boolean;
    onClose: () => void;
    name: 'D-Day' | 'BriefingDay';
    AboutTitle: SVGComponent;
    modalDescription: string;
    images: string[];
};
export default function AboutDDayModal({
    open,
    onClose,
    name,
    AboutTitle,
    modalDescription,
    images,
}: AboutDDayModalProps) {
    const [page, setPage] = useState<1 | 2>(1);
    const [shouldRender, setShouldRender] = useState(open);

    const modalWrapperRef = useRef<HTMLDivElement | null>(null);
    const modalCardRef = useRef<HTMLDivElement | null>(null);
    const knifeRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (open) {
            setShouldRender(true);
            setPage(1);
        }
    }, [open]);

    const handleClose = () => {
        if (!modalWrapperRef.current) {
            onClose();
            return;
        }

        gsap.killTweensOf(modalWrapperRef.current);

        gsap.to(modalWrapperRef.current, {
            autoAlpha: 0,
            duration: 0.1,
            ease: 'power2.out',
            onComplete: () => {
                setShouldRender(false);
                onClose();
            },
        });
    };

    useEffect(() => {
        if (!open) return;

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', onKey);

        return () => {
            window.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (
            !open ||
            !modalWrapperRef.current ||
            !modalCardRef.current ||
            !knifeRef.current
        ) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.killTweensOf([modalCardRef.current, knifeRef.current]);

            const modalTimeline = gsap.timeline();

            modalTimeline
                .fromTo(
                    modalCardRef.current,
                    {
                        x: -880,
                        y: 880,
                        rotate: -6,
                        transformOrigin: 'bottom left',
                    },
                    {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        duration: 0.35,
                        ease: 'power3.out',
                    },
                )
                .to(modalCardRef.current, {
                    x: -20,
                    y: 20,
                    duration: 0.1,
                    ease: 'power2.out',
                })
                .to(modalCardRef.current, {
                    x: 0,
                    y: 0,
                    duration: 0.08,
                    ease: 'power2.out',
                });

            const knifeTimeline = gsap.timeline({
                delay: 0.25,
            });

            knifeTimeline.fromTo(
                knifeRef.current,
                {
                    x: 260,
                    y: -260,
                    rotate: 8,
                    autoAlpha: 0,
                    transformOrigin: 'bottom left',
                },
                {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    autoAlpha: 1,
                    duration: 0.1,
                    ease: 'power3.out',
                },
            );
        }, modalWrapperRef);

        return () => {
            ctx.revert();
        };
    }, [open, shouldRender]);

    if (!shouldRender) return null;

    const displayName = name === 'BriefingDay' ? 'Briefing Day' : 'D-Day';

    return (
        <div
            ref={modalWrapperRef}
            className="fixed inset-0 z-[60] flex h-screen w-screen items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`About ${displayName}`}
        >
            {/*
             * Positioning wrapper stays static.
             * Modal card and knife are animated independently inside it.
             */}
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-black/75"
            />
            <div className="relative z-10 w-[85%] max-w-[1150px] translate-y-[6%]">
                {/* Independently animated knife */}
                <img
                    ref={knifeRef}
                    src={greyknife}
                    alt=""
                    className="pointer-events-none absolute -top-[27%] right-[10%] z-30 w-[25%]"
                />

                {/* Modal card and all regular content */}
                <div ref={modalCardRef} className="relative w-full">
                    <img
                        src={aboutmodal}
                        alt=""
                        className="h-auto w-full drop-shadow-2xl"
                    />

                    <div className="absolute inset-0">
                        {/* Dynamic About title */}
                        <div className="absolute left-[17%] top-[22%] w-[25%]">
                            <AboutTitle className="block h-auto w-full" />
                        </div>

                        {/* Page 1 */}
                        {page === 1 && (
                            <div className="absolute left-[18%] top-[39%] h-[13.4rem] w-[67%] text-[#F2F2F2]">
                                <h2 className="absolute -top-[27%] left-[35%] mb-[3vmin] -rotate-3 font-arsenal text-3xl font-bold text-[#282829]">
                                    Apa itu {displayName}?
                                </h2>

                                <div className="h-[13rem] pt-4">
                                    <CustomScrollBox text={modalDescription} />
                                </div>
                            </div>
                        )}

                        {/* Page 2 */}
                        {page === 2 && (
                            <div className="absolute left-[18%] top-[37%] h-[8rem] w-[67%] text-[#F2F2F2]">
                                <h2 className="absolute -top-[35%] left-[15%] mb-[3vmin] -rotate-3 font-arsenal text-3xl font-bold text-[#282829]">
                                    Apa yang harus saya bawa atau pakai?
                                </h2>

                                <div className="grid grid-cols-3 gap-[3vmin]">
                                    {images.map((image, index) => (
                                        <div
                                            key={`${image}-${index}`}
                                            className="flex items-center justify-center"
                                        >
                                            <img
                                                src={image}
                                                alt={`Perlengkapan ${index + 1}`}
                                                className="h-[30vmin] w-[30vmin] object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Perhatiakn className="absolute -bottom-[11rem] -right-[5rem] block h-auto w-[22rem]" />
                            </div>
                        )}

                        <div className="absolute bottom-[5%] left-[14%] h-24 w-[13rem]">
                            <Page className="absolute bottom-0 right-0 h-auto w-[10rem]" />

                            <div className="absolute bottom-1 w-[4rem]">
                                {page === 1 ? (
                                    <One className="block h-auto w-[2.5rem]" />
                                ) : (
                                    <Two className="block h-auto w-[3rem]" />
                                )}
                            </div>

                            <div className="absolute h-[5rem] w-[16.5rem]">
                                {page === 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => setPage(2)}
                                        aria-label="Next page"
                                        className="absolute right-0 top-2 transition duration-200 hover:scale-110 active:scale-95"
                                    >
                                        <img
                                            src={rightArrow}
                                            alt="Next"
                                            className="h-[7vmin] w-auto -translate-x-[3vmin] translate-y-[0.5vmin] object-contain"
                                        />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setPage(1)}
                                        aria-label="Previous page"
                                        className="absolute -left-10 -top-5 bottom-0 z-10 transition duration-200 hover:scale-110 active:scale-95"
                                    >
                                        <img
                                            src={leftArrow}
                                            alt="Previous"
                                            className="h-[7vmin] w-auto -translate-x-[1vmin] translate-y-[4.5vmin] object-contain"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Back button */}
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={handleClose}
                className="absolute bottom-6 right-6 transition duration-200 hover:scale-105 active:scale-95"
            >
                <img
                    src={backButtonImg}
                    alt="Back"
                    className="h-[13vmin] w-auto object-contain"
                />
            </button>
        </div>
    );
}
