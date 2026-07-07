import titleTimeline from '@/assets/timeline/title-timeline.png';
import AboutDDayModal from '@/Components/timeline/AboutDDayModal';
import DateSticker from '@/Components/timeline/DateSticker';
import DDayPanel from '@/Components/timeline/DDayPanel';
import PersonaArrow from '@/Components/timeline/PersonaArrow';
import TimelineBackground from '@/Components/timeline/TimelineBackground';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { useState, type CSSProperties } from 'react';

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
            top: '46%',
            transform: 'translate(-50%,-50%) scale(0.8)',
            zIndex: 10,
        },
        tue: {
            left: '33%',
            top: '66%',
            transform: 'translate(-50%,-50%) scale(1.05)',
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
            transform: 'translate(-50%,-50%) scale(0.8)',
            zIndex: 10,
        },
        logo: 'sat',
    },
};

const transition =
    'left 700ms cubic-bezier(0.65,0,0.35,1), top 700ms cubic-bezier(0.65,0,0.35,1), transform 700ms cubic-bezier(0.65,0,0.35,1)';

export default function Timeline() {
    const [view, setView] = useState<TimelineView>(1);
    const [modalOpen, setModalOpen] = useState(false);

    const pos = stickerPos[view];

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
                <DateSticker
                    day="15"
                    weekday="SAT"
                    color="blue"
                    withLogo={pos.logo === 'sat'}
                    style={{ ...pos.sat, transition }}
                />
                <DateSticker
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
                <DDayPanel onSeeDetails={() => setModalOpen(true)} />
            </div>

            {/* About D-Day overlay (shared by both views) */}
            <AboutDDayModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </AppLayout>
    );
}
