import { useState } from 'react';
import GameHubStoryline from './GameHubStoryline';
import GameList from './GameList';
import InputUniqueCode from './UniqueCodeForm';

type GameHubScreen = 'story' | 'join' | 'games';

export default function GameHubPage() {
    const [screen, setScreen] = useState<GameHubScreen>(() => {
        const teamId = sessionStorage.getItem('teamId');

        if (teamId) {
            return 'games';
        }

        return 'story';
    });

    return (
        <main>
            {screen === 'story' && (
                <GameHubStoryline onReady={() => setScreen('join')} />
            )}

            {screen === 'join' && (
                <InputUniqueCode onJoined={() => setScreen('games')} />
            )}

            {screen === 'games' && <GameList />}
        </main>
    );
}
