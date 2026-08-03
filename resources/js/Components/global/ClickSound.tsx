import { useEffect, useRef } from 'react';

export default function ClickSound() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            const target = event.target as Element | null;
            if (!target) return;

            const interactive =
                target.closest('button') ??
                target.closest('[data-click-sound]');
            if (!interactive) return;

            if (interactive.hasAttribute('data-no-click-sound')) return;

            const audio = audioRef.current;
            if (!audio) return;

            audio.currentTime = 0;
            audio.play().catch(() => {
                // ignore autoplay/user-interaction errors
            });
        }

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <audio
            ref={audioRef}
            preload="auto"
            className="hidden"
            src="/audio/click.wav"
        />
    );
}
