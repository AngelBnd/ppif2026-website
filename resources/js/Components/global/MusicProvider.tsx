import { primeAudioElement } from '@/lib/victoryMusic';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';

type MusicContextValue = {
    isPlaying: boolean;
    toggle: () => void;
    /**
     * Switches the active track to the victory theme while `active`, and back
     * to the looping backsound when released. The victory theme is governed by
     * the same on/off state as the backsound, so the music button mutes it too.
     */
    setVictory: (active: boolean) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
}

type MusicProviderProps = {
    children: ReactNode;
};

export default function MusicProvider({ children }: MusicProviderProps) {
    const backsoundRef = useRef<HTMLAudioElement | null>(null);
    const victoryRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlayingState] = useState(false);
    // Mirror of isPlaying for reads inside callbacks (avoids stale closures).
    const isPlayingRef = useRef(false);
    // Whether a victory screen is currently mounted (victory is the active track).
    const victoryActiveRef = useRef(false);
    // Music toggle state right before a victory screen took over, so we can
    // restore it once the victory screen unmounts.
    const wasOnBeforeVictoryRef = useRef(false);

    const setPlaying = useCallback((value: boolean) => {
        isPlayingRef.current = value;
        setIsPlayingState(value);
    }, []);

    // The track the toggle currently governs: the victory theme while a victory
    // screen is mounted, otherwise the looping backsound.
    const activeAudio = useCallback(
        () =>
            victoryActiveRef.current
                ? victoryRef.current
                : backsoundRef.current,
        [],
    );

    const toggle = useCallback(() => {
        const audio = activeAudio();
        if (!audio) return;

        if (audio.paused) {
            setPlaying(true);
            audio.play().catch(() => setPlaying(false));
        } else {
            setPlaying(false);
            audio.pause();
        }
    }, [activeAudio, setPlaying]);

    const setVictory = useCallback(
        (active: boolean) => {
            const backsound = backsoundRef.current;
            const victory = victoryRef.current;

            if (active) {
                if (victoryActiveRef.current) return;
                victoryActiveRef.current = true;
                wasOnBeforeVictoryRef.current = isPlayingRef.current;

                // Swap tracks: pause the backsound. The victory theme is the
                // payoff of the whole game, so it always plays — even when the
                // music toggle is off (no need to click the music button).
                backsound?.pause();
                if (victory) {
                    victory.muted = false;
                    victory.volume = 0.2;
                    victory.currentTime = 0;
                    setPlaying(true);
                    victory.play().catch(() => setPlaying(false));
                }
            } else {
                if (!victoryActiveRef.current) return;
                victoryActiveRef.current = false;

                if (victory) {
                    victory.pause();
                    victory.currentTime = 0;
                }
                // Restore the user's previous music state.
                setPlaying(wasOnBeforeVictoryRef.current);
                if (wasOnBeforeVictoryRef.current) {
                    backsound?.play().catch(() => setPlaying(false));
                }
            }
        },
        [setPlaying],
    );

    const value = useMemo(
        () => ({ isPlaying, toggle, setVictory }),
        [isPlaying, toggle, setVictory],
    );

    // The first real user gesture (click/tap/keystroke) unlocks the victory
    // audio element so it can play later without a direct gesture.
    useEffect(() => {
        const events = ['pointerdown', 'keydown', 'touchstart'] as const;
        const prime = () => {
            if (victoryRef.current) primeAudioElement(victoryRef.current);
        };
        events.forEach((event) => window.addEventListener(event, prime));
        return () => {
            events.forEach((event) => window.removeEventListener(event, prime));
        };
    }, []);

    return (
        <MusicContext.Provider value={value}>
            <audio
                ref={(el) => {
                    backsoundRef.current = el;
                    if (el) el.volume = 0.015;
                }}
                loop
                preload="none"
                src="/audio/backsound.mp3"
            />
            <audio
                ref={(el) => {
                    victoryRef.current = el;
                    if (el) el.volume = 0.015;
                }}
                loop
                preload="none"
                src="/audio/victory.mp3"
            />

            {children}
        </MusicContext.Provider>
    );
}
