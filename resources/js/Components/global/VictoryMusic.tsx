import { useEffect } from 'react';
import { useMusic } from './MusicProvider';

/**
 * Mount on a victory screen to make the shared music track switch to the
 * victory theme. It carries no audio of its own — the MusicProvider owns the
 * element, so the global music toggle mutes/plays it just like the backsound.
 */
export default function VictoryMusic() {
    const { setVictory } = useMusic();

    useEffect(() => {
        setVictory(true);
        return () => setVictory(false);
    }, [setVictory]);

    return null;
}
