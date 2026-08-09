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
    /** Pauses the backsound while `active` and resumes it when released. */
    setSuspended: (active: boolean) => void;
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
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const suspendedRef = useRef(false);
    const wasPlayingRef = useRef(false);

    const toggle = useCallback(() => {
        if (audioRef.current?.paused) {
            setIsPlaying(true);
            audioRef.current.play().catch(() => {
                setIsPlaying(false);
            });
        } else {
            setIsPlaying(false);
            audioRef.current?.pause();
        }
    }, []);

    const setSuspended = useCallback((active: boolean) => {
        const audio = audioRef.current;
        if (active) {
            if (suspendedRef.current) return;
            suspendedRef.current = true;
            wasPlayingRef.current = !audio?.paused;
            if (audio && !audio.paused) {
                audio.pause();
                setIsPlaying(false);
            }
        } else {
            if (!suspendedRef.current) return;
            suspendedRef.current = false;
            if (wasPlayingRef.current && audio) {
                audio.play().catch(() => {
                    setIsPlaying(false);
                });
                setIsPlaying(true);
            }
        }
    }, []);

    const value = useMemo(
        () => ({ isPlaying, toggle, setSuspended }),
        [isPlaying, toggle, setSuspended],
    );

    return (
        <MusicContext.Provider value={value}>
            <audio
                ref={(el) => {
                    audioRef.current = el;
                    if (el) el.volume = 0.015;
                }}
                loop
                preload="none"
                src="/audio/backsound.mp3"
            />

            {children}
        </MusicContext.Provider>
    );
}
