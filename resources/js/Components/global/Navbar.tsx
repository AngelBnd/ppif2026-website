import BlackPartTopSVG from '@/../../public/svgs/BlackPartTopSVG.svg';
import { Link, usePage } from '@inertiajs/react';
import gsap from 'gsap';
import {
    useEffect,
    useRef,
    useState,
    type ComponentType,
    type SVGProps,
} from 'react';
import AboutButton from '../../assets/icons/AboutButtonNBSVG.svg?react';
import ArchiveButton from '../../assets/icons/ArchiveButton.svg?react';
import ContactButton from '../../assets/icons/ContactButtonNBSVG.svg?react';
import HomeButton from '../../assets/icons/HomeButtonNBSVG.svg?react';
import MusicButton from '../../assets/icons/MusicButton.svg?react';
import MusicButton2 from '../../assets/icons/MusicButton2.svg?react';
import TimelineButton from '../../assets/icons/TimelineButtonNBSVG.svg?react';
import { useMusic } from './MusicProvider';

type Section = 'home' | 'about' | 'timeline' | 'contact' | 'none';

type NavItemProps = {
    href: string;
    section: Section;
    activeTab: Section;
    onSelect: (section: Section) => void;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    iconClassName: string;
};

function NavItem({
    href,
    section,
    activeTab,
    onSelect,
    Icon,
    iconClassName,
}: NavItemProps) {
    const isActive = activeTab === section;

    return (
        <Link
            href={href}
            data-click-sound
            onClick={() => onSelect(section)}
            className={[
                'origin-bottom transition-transform duration-200 ease-out will-change-transform',
                'hover:rotate-3 hover:scale-110 active:scale-95',
                isActive ? 'rotate-3 scale-105' : '',
            ].join(' ')}
        >
            <Icon className={iconClassName} />
        </Link>
    );
}

export default function Navbar() {
    const leftPositions: Record<Section, string> = {
        home: '0.2rem',
        about: '8rem',
        timeline: '17.5rem',
        contact: '29rem',
        none: '0rem',
    };
    const { url } = usePage();
    const [activeTab, setActiveTab] = useState<Section>('home');
    const isGamePage = url.startsWith('/games');
    const polygonRef = useRef<SVGPolygonElement>(null);
    const musicIconRef = useRef<HTMLSpanElement>(null);
    const { toggle: toggleMusic, isPlaying } = useMusic();

    const points = useRef([
        { x: 30, y: 15 }, // top-left
        { x: 220, y: 25 }, // top-right
        { x: 210, y: 55 }, // bottom-right
        { x: 40, y: 85 }, // bottom-left
    ]).current;

    useEffect(() => {
        const path = url.split('?')[0];
        const tab: Section = path.startsWith('/about')
            ? 'about'
            : path.startsWith('/timeline')
              ? 'timeline'
              : path.startsWith('/contact')
                ? 'contact'
                : path.startsWith('/home')
                  ? 'home'
                  : 'none';
        setActiveTab(tab);
    }, [url]);

    function updatePolygon() {
        if (!polygonRef.current) return;
        const str = points.map((p) => `${p.x},${p.y}`).join(' ');
        polygonRef.current.setAttribute('points', str);
    }

    useEffect(() => {
        gsap.to(points[0], {
            x: 40,
            y: 30,
            duration: 0.2,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            onUpdate: updatePolygon,
        });
        gsap.to(points[1], {
            x: 240,
            y: 48,
            duration: 0.5,
            ease: 'power1.inOut',
            onUpdate: updatePolygon,
            yoyo: true,
            delay: 0.3,
            repeat: -1,
        });
        gsap.to(points[2], {
            x: 180,
            y: 80,
            duration: 0.3,
            ease: 'power1.inOut',
            onUpdate: updatePolygon,
            yoyo: true,
            delay: 0.6,
            repeat: -1,
        });
        gsap.to(points[3], {
            x: 70,
            y: 80,
            duration: 0.2,
            ease: 'power1.inOut',
            onUpdate: updatePolygon,
            yoyo: true,
            repeat: -1,
            delay: 0.1,
        });
    }, []);

    useEffect(() => {
        const el = musicIconRef.current;
        if (!el) return;

        gsap.killTweensOf(el);
        gsap.set(el, { rotation: 0, scale: 1 });

        let anim: gsap.core.Timeline | gsap.core.Tween;

        if (isPlaying) {
            anim = gsap.to(el, {
                scale: 1.05,
                duration: 1,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });
        } else {
            anim = gsap
                .timeline({ repeat: -1, repeatDelay: 1.5 })
                .to(el, { rotation: -8, duration: 0.09, ease: 'power1.inOut' })
                .to(el, { rotation: 8, duration: 0.09, ease: 'power1.inOut' })
                .to(el, { rotation: -6, duration: 0.09, ease: 'power1.inOut' })
                .to(el, { rotation: 6, duration: 0.09, ease: 'power1.inOut' })
                .to(el, { rotation: 0, duration: 0.09, ease: 'power1.inOut' });
        }

        return () => {
            anim.kill();
            gsap.set(el, { rotation: 0, scale: 1 });
        };
    }, [isPlaying]);

    return (
        <nav
            //  ${isGamePage ? 'pointer-events-none z-[0] opacity-0' : 'z-50'}
            className={`pointer-events-none fixed -top-4 left-0 w-full ${isGamePage ? 'z-[0]' : 'z-[50]'}`}
        >
            <img
                src={BlackPartTopSVG}
                className="absolute -top-3 h-auto w-[100vw]"
            />

            <div className="absolu left-0 top-0 w-full">
                <div className="navbar-video-mask bg-[#0A0C0F]">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover opacity-5"
                    >
                        <source
                            src="/videos/StarsLoop.webm"
                            type="video/webm"
                        />
                    </video>
                </div>
            </div>

            {!isGamePage && (
                <div
                    className="w-200 absolute left-1/2 z-10 flex -translate-x-1/2 items-center"
                    style={{
                        top: 'clamp(-1rem, calc(17.7vh - 6.2rem), 0.75rem)',
                    }}
                >
                    <div className="pointer-events-auto flex items-center -space-x-2">
                        <svg
                            viewBox="0 0 240 100"
                            width="clamp(80px, 14vh, 140px)"
                            height="clamp(68px, 12vh, 120px)"
                            className="pointer-events-none absolute left-2 z-50 opacity-70 mix-blend-difference ..."
                            style={{ left: leftPositions[activeTab] }}
                            preserveAspectRatio="none"
                        >
                            <polygon
                                ref={polygonRef}
                                id="rect"
                                points="0,0 240,0 240,100 0,100"
                                fill="rgba(191,30,46,0.9)"
                            />
                        </svg>
                        <NavItem
                            href="/home"
                            section="home"
                            activeTab={activeTab}
                            onSelect={setActiveTab}
                            Icon={HomeButton}
                            iconClassName="w-[clamp(4rem,20vh,9rem)]"
                        />

                        <NavItem
                            href="/about"
                            section="about"
                            activeTab={activeTab}
                            onSelect={setActiveTab}
                            Icon={AboutButton}
                            iconClassName="w-[clamp(4rem,20vh,9rem)]"
                        />

                        <NavItem
                            href="/timeline"
                            section="timeline"
                            activeTab={activeTab}
                            onSelect={setActiveTab}
                            Icon={TimelineButton}
                            iconClassName="w-[clamp(5rem,27vh,12rem)]"
                        />

                        <NavItem
                            href="/contact"
                            section="contact"
                            activeTab={activeTab}
                            onSelect={setActiveTab}
                            Icon={ContactButton}
                            iconClassName="w-[clamp(4.5rem,25vh,11rem)]"
                        />
                    </div>

                    <div
                        className="pointer-events-auto relative z-[999] mx-4 flex"
                        style={{ gap: 'clamp(0.5rem, 2vh, 1rem)' }}
                    >
                        <Link
                            href="/archive"
                            data-click-sound
                            className={[
                                'origin-bottom transition-transform duration-200 ease-out will-change-transform',
                                'hover:rotate-3 hover:scale-110 active:scale-95',
                            ].join(' ')}
                        >
                            <ArchiveButton className="w-[clamp(2.5rem,7vh,4rem)]" />
                        </Link>

                        <button
                            data-no-click-sound
                            onClick={toggleMusic}
                            className={[
                                'origin-bottom transition-transform duration-200 ease-out will-change-transform',
                                'hover:rotate-3 hover:scale-110 active:scale-95',
                                ,
                            ].join(' ')}
                        >
                            <span
                                ref={musicIconRef}
                                className="inline-block origin-bottom will-change-transform"
                            >
                                {isPlaying ? (
                                    <MusicButton className="w-[clamp(2.5rem,7vh,4rem)]" />
                                ) : (
                                    <MusicButton2 className="w-[clamp(2.5rem,7vh,4rem)]" />
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
