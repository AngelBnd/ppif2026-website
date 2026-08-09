import {
    createContext,
    useCallback,
    useContext,
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

                // Swap tracks: pause the backsound, and start the victory theme
                // only if music is currently on (respects the toggle state).
                backsound?.pause();
                if (victory) {
                    victory.currentTime = 0;
                    if (isPlayingRef.current) {
                        victory.play().catch(() => setPlaying(false));
                    }
                }
            } else {
                if (!victoryActiveRef.current) return;
                victoryActiveRef.current = false;

                if (victory) {
                    victory.pause();
                    victory.currentTime = 0;
                }
                // Hand control back to the backsound, resuming it only if music
                // is on right now.
                if (isPlayingRef.current) {
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
