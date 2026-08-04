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

    const value = useMemo(() => ({ isPlaying, toggle }), [isPlaying, toggle]);

    return (
        <MusicContext.Provider value={value}>
            <audio
                ref={(el) => {
                    audioRef.current = el;
                    if (el) el.volume = 0.015;
                }}
                loop
                preload="auto"
                src="/audio/backsound.mp3"
            />

            {children}
        </MusicContext.Provider>
    );
}
