import { usePage } from '@inertiajs/react';

export default function BottomFrame() {
    const { url } = usePage();
    const isGamePage = url.startsWith('/games');

    return (
        <div
            className={`pointer-events-none fixed -bottom-8 left-0 block w-full overflow-hidden ${isGamePage ? 'pointer-events-none z-[0]' : ''}`}
        >
            <div className="bottomFrame-video-mask bg-[#0A0C0F]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="block w-full object-cover opacity-5"
                >
                    <source src="/videos/StarsLoop.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
}
