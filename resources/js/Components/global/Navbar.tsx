import { Link, usePage } from '@inertiajs/react';
import AboutButton from '../../assets/icons/AboutButtonNBSVG.svg?react';
import ArchiveButton from '../../assets/icons/ArchiveButton.svg?react';
import ContactButton from '../../assets/icons/ContactButtonNBSVG.svg?react';
import HomeButton from '../../assets/icons/HomeButtonNBSVG.svg?react';
import MusicButton from '../../assets/icons/MusicButton.svg?react';
import TimelineButton from '../../assets/icons/TimelineButtonNBSVG.svg?react';

export default function Navbar() {
    const { url } = usePage();
    const isGamePage = url.startsWith('/games');

    return (
        <nav
            className={`fixed -top-4 left-0 w-full ${isGamePage ? 'pointer-events-none z-[0] opacity-0' : 'z-50'}`}
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
                        <Link href="/home">
                            <HomeButton className="w-36" />
                        </Link>

                        <Link href="/about">
                            <AboutButton className="w-36" />
                        </Link>

                        <Link href="/timeline">
                            <TimelineButton className="w-48" />
                        </Link>

                        <Link href="/contact">
                            <ContactButton className="w-44" />
                        </Link>
                    </div>

                    <div className="mx-4 flex gap-1">
                        <Link href="/archive">
                            <ArchiveButton className="w-16" />
                        </Link>

                        <button>
                            <MusicButton className="w-16" />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
