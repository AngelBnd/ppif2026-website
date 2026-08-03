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
    const { toggle: toggleMusic } = useMusic();

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
            duration: 0.9,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            onUpdate: updatePolygon,
        });
        gsap.to(points[1], {
            x: 240,
            y: 48,
            duration: 1,
            ease: 'power1.inOut',
            onUpdate: updatePolygon,
            yoyo: true,
            delay: 0.3,
            repeat: -1,
        });
        gsap.to(points[2], {
            x: 180,
            y: 80,
            duration: 0.6,
            ease: 'power1.inOut',
            onUpdate: updatePolygon,
            yoyo: true,
            delay: 0.6,
            repeat: -1,
        });
        gsap.to(points[3], {
            x: 70,
            y: 80,
            duration: 1.2,
            ease: 'power1.inOut',
            onUpdate: updatePolygon,
            yoyo: true,
            repeat: -1,
            delay: 0.1,
        });
    }, []);

    return (
        <nav
            //  ${isGamePage ? 'pointer-events-none z-[0] opacity-0' : 'z-50'}
            className={`fixed -top-4 left-0 w-full ${isGamePage ? 'pointer-events-none z-[0] opacity-0' : 'z-[50]'}`}
        >
            <div className="absolute -top-3 left-0 w-full">
                <div className="navbar-video-mask bg-[#0A0C0F]">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover opacity-5"
                    >
                        <source src="/videos/StarsLoop.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {!isGamePage && (
                <div className="w-200 absolute left-1/2 top-3 z-10 flex -translate-x-1/2 items-center">
                    <div className="flex items-center -space-x-2">
                        <svg
                            viewBox="0 0 240 100"
                            width="140"
                            height="120"
                            className={`pointer-events-none absolute left-2 z-50 opacity-70 mix-blend-difference ${activeTab === 'none' ? 'invisible' : ''}`}
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
                            iconClassName="w-36"
                        />

                        <NavItem
                            href="/about"
                            section="about"
                            activeTab={activeTab}
                            onSelect={setActiveTab}
                            Icon={AboutButton}
                            iconClassName="w-36"
                        />

                        <NavItem
                            href="/timeline"
                            section="timeline"
                            activeTab={activeTab}
                            onSelect={setActiveTab}
                            Icon={TimelineButton}
                            iconClassName="w-48"
                        />

                        <NavItem
                            href="/contact"
                            section="contact"
                            activeTab={activeTab}
                            onSelect={setActiveTab}
                            Icon={ContactButton}
                            iconClassName="w-44"
                        />
                    </div>

                    <div className="mx-4 flex gap-1">
                        <Link
                            href="/archive"
                            data-click-sound
                            className={[
                                'origin-bottom transition-transform duration-200 ease-out will-change-transform',
                                'hover:rotate-3 hover:scale-110 active:scale-95',
                            ].join(' ')}
                        >
                            <ArchiveButton className="w-16" />
                        </Link>

                        <button
                            data-no-click-sound
                            onClick={toggleMusic}
                            className={[
                                'origin-bottom transition-transform duration-200 ease-out will-change-transform',
                                'hover:rotate-3 hover:scale-110 active:scale-95',
                            ].join(' ')}
                        >
                            <MusicButton className="w-16" />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
