import knife from '@/assets/timeline/knife.svg';
import titleTimeline from '@/assets/timeline/title-timeline.png';
import AboutDDayModal from '@/Components/timeline/AboutDDayModal';
import DateSticker from '@/Components/timeline/DateSticker';
import DDayPanel from '@/Components/timeline/DDayPanel';
import PersonaArrow from '@/Components/timeline/PersonaArrow';
import TimelineBackground from '@/Components/timeline/TimelineBackground';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { timelineInformation } from '@/data/timeline';
import gsap from 'gsap';

type TimelineView = 1 | 2;

/**
 * Per-view placement for each date sticker. The two dates trade places when
 * the view flips: the "focused" date drops to the lower centre and scales up,
 * while the other tucks up and back. All transitions are CSS-driven.
 */
const stickerPos: Record<
    TimelineView,
    { sat: CSSProperties; tue: CSSProperties; logo: 'sat' | 'tue' }
> = {
    1: {
        sat: {
            left: '16%',
            top: '53%',
            transform: 'translate(-50%,-50%) scale(0.76)',
            zIndex: 10,
        },
        tue: {
            left: '33%',
            top: '66%',
            transform: 'translate(-50%,-50%) scale(1.08)',
            zIndex: 20,
        },
        logo: 'tue',
    },
    2: {
        sat: {
            left: '33%',
            top: '66%',
            transform: 'translate(-50%,-50%) scale(1.05)',
            zIndex: 20,
        },
        tue: {
            left: '51%',
            top: '52%',
            transform: 'translate(-50%,-50%) scale(0.75)',
            zIndex: 10,
        },
        logo: 'sat',
    },
};

const transition =
    'left 300ms cubic-bezier(0.16, 1, 0.3, 1), top 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
export default function Timeline() {
    const knifeRef = useRef<HTMLImageElement | null>(null);
    const satStickerRef = useRef<HTMLDivElement | null>(null);
    const tueStickerRef = useRef<HTMLDivElement | null>(null);
    const [view, setView] = useState<TimelineView>(1);
    const [modalOpen, setModalOpen] = useState(false);

    const pos = stickerPos[view];

    const currentInfo = timelineInformation[view];
    const HeaderSVG = currentInfo.header;

    useEffect(() => {
        const target =
            pos.logo === 'sat'
                ? satStickerRef.current
                : pos.logo === 'tue'
                  ? tueStickerRef.current
                  : null;

        if (!knifeRef.current || !target) return;

        const ctx = gsap.context(() => {
            const timeline = gsap.timeline();

            timeline
                .fromTo(
                    knifeRef.current,
                    {
                        x: 300,
                        y: -300,
                        rotate: 8,

                        transformOrigin: 'bottom left',
                    },
                    {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        delay: 0.3,
                        duration: 0.07,

                        ease: 'power3.out',
                    },
                )
                .to(knifeRef.current, {
                    rotate: 3,
                    duration: 0.04,
                    ease: 'power1.inOut',
                })
                .to(knifeRef.current, {
                    rotate: -2.4,
                    duration: 0.04,
                    ease: 'power1.inOut',
                })
                .to(knifeRef.current, {
                    rotate: 1,
                    duration: 0.04,
                    ease: 'power1.inOut',
                })
                .to(knifeRef.current, {
                    rotate: -1,
                    duration: 0.04,
                    ease: 'power1.inOut',
                })
                .to(knifeRef.current, {
                    rotate: 0,
                    duration: 0.04,
                    ease: 'power1.out',
                });
        });

        return () => ctx.revert();
    }, [view]);

    useEffect(() => {
        const target =
            pos.logo === 'sat'
                ? satStickerRef.current
                : pos.logo === 'tue'
                  ? tueStickerRef.current
                  : null;

        if (!target) return;

        const ctx = gsap.context(() => {
            gsap.killTweensOf(target);

            const timeline = gsap.timeline({
                delay: 0.35,
            });

            timeline
                .to(target, {
                    x: -3,
                    duration: 0.06,
                    ease: 'power1.inOut',
                })
                .to(target, {
                    x: 3,
                    duration: 0.06,
                    ease: 'power1.inOut',
                })
                .to(target, {
                    x: -1,
                    duration: 0.03,
                    ease: 'power1.inOut',
                })
                .to(target, {
                    x: 1,
                    duration: 0.03,
                    ease: 'power1.inOut',
                })
                .to(target, {
                    x: -0.3,
                    duration: 0.03,
                    ease: 'power1.inOut',
                })
                .to(target, {
                    x: 0,
                    duration: 0.03,
                    ease: 'power1.out',
                });
        });

        return () => ctx.revert();
    }, [pos.logo]);

    return (
        <AppLayout showBackground={false}>
            <Head title="Timeline" />

            <div className="relative z-40 h-screen w-full overflow-hidden">
                <TimelineBackground />

                {/* Timeline title sticker */}
                <img
                    src={titleTimeline}
                    alt="Timeline"
                    className="absolute left-[0%] top-[14%] z-20 w-[34%]"
                />

                {/* Date stickers (animate between the two views) */}

                <img
                    ref={knifeRef}
                    src={knife}
                    alt=""
                    className="absolute left-[36%] top-[26%] z-50 w-[11.5%] -translate-x-1/2"
                />
                <DateSticker
                    ref={satStickerRef}
                    day="15"
                    weekday="SAT"
                    color="blue"
                    withLogo={pos.logo === 'sat'}
                    style={{ ...pos.sat, transition }}
                />

                <DateSticker
                    ref={tueStickerRef}
                    day="18"
                    weekday="TUE"
                    color="white"
                    withLogo={pos.logo === 'tue'}
                    style={{ ...pos.tue, transition }}
                />

                {/* State-switching arrow: left in view 1, right in view 2 */}
                {view === 1 ? (
                    <PersonaArrow
                        direction="left"
                        onClick={() => setView(2)}
                        ariaLabel="Go to next timeline view"
                        className="absolute left-[-2%] top-[60%] z-30 h-[14%] w-[14%] -translate-y-1/2"
                    />
                ) : (
                    <PersonaArrow
                        direction="right"
                        onClick={() => setView(1)}
                        ariaLabel="Go to previous timeline view"
                        className="absolute left-[52%] top-[60%] z-40 h-[14%] w-[14%] -translate-y-1/2"
                    />
                )}

                {/* Right-hand D-Day information panel */}
                <DDayPanel
                    currentInfo={currentInfo.name}
                    informationDisplayed={currentInfo.informationDisplayed}
                    onSeeDetails={() => setModalOpen(true)}
                    HeaderSVG={HeaderSVG}
                    headerClassName={currentInfo.headerClassName}
                />
            </div>

            {/* About D-Day overlay (shared by both views) */}
            <AboutDDayModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                name={currentInfo.name}
                AboutTitle={currentInfo.aboutTitle}
                modalDescription={currentInfo.modalDescription}
                images={currentInfo.images}
            />
        </AppLayout>
    );
}
