import { useEffect, useRef } from 'react';
import { useMusic } from './MusicProvider';

export default function VictoryMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { setSuspended } = useMusic();

    useEffect(() => {
        setSuspended(true);

        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = 0;
        audio.play().catch(() => {
            // ignore autoplay/user-interaction errors
        });

        return () => {
            setSuspended(false);
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [setSuspended]);

    return (
        <audio
            ref={(el) => {
                audioRef.current = el;
                if (el) el.volume = 0.015;
            }}
            loop
            preload="auto"
            className="hidden"
            src="/audio/victory.mp3"
        />
    );
}
