import { playSfx } from '@/lib/sound';
import { useEffect, useRef } from 'react';

export default function ClickSound() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const interactive =
                target.closest('button') ??
                target.closest('[data-click-sound]');
            if (!interactive) return;

            if (interactive.hasAttribute('data-no-click-sound')) return;

            // Back buttons play their own sound instead of the generic click.
            if (target.closest('[data-back-sound]')) {
                playSfx('backButton');
                return;
            }

            const audio = audioRef.current;
            if (!audio) return;

            audio.currentTime = 0;
            audio.play().catch(() => {
                // ignore autoplay/user-interaction errors
            });
        }

        function handleHover(event: PointerEvent) {
            if (event.pointerType !== 'mouse') return;

            const target = event.target;
            if (!(target instanceof Element)) return;

            if (
                target.closest(
                    'button, [data-back-sound], [data-click-sound]',
                )
            ) {
                playSfx('hoverButton');
            }
        }

        document.addEventListener('click', handleClick);
        document.addEventListener('pointerenter', handleHover, true);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('pointerenter', handleHover, true);
        };
    }, []);

    return (
        <audio
            ref={(el) => {
                audioRef.current = el;
                if (el) el.volume = 0.15;
            }}
            preload="auto"
            className="hidden"
            src="/audio/click.wav"
        />
    );
}
