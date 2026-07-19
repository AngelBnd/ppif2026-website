import BackButton from '@/assets/icons/BackButtonSVG.svg?react';
import Button from '@/Components/global/Button';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import ErrorGimmick from './ErrorGimmick';
import GameHubStoryline from './GameHubStoryline';
import GameList from './GameList';
import InputUniqueCode from './UniqueCodeForm';

type GameHubScreen = 'story' | 'join' | 'games' | 'errorGimmick';

export default function GameHubPage() {
    const [screen, setScreen] = useState<GameHubScreen>(() => {
        const teamId = sessionStorage.getItem('teamId');

        if (teamId) return 'games';

        return 'story';
    });

    const handleBack = () => {
        if (screen === 'join') {
            setScreen('story');
            return;
        }

        router.visit('/');
    };

    return (
        <main className="h-screen w-screen overflow-hidden">
            <Button
                onClick={handleBack}
                Icon={BackButton}
                className="absolute bottom-4 left-6 z-30 w-[12rem]"
                iconClassName="w-full"
            />

            {screen === 'story' && (
                <GameHubStoryline onReady={() => setScreen('join')} />
            )}

            {screen === 'join' && (
                <InputUniqueCode onJoined={() => setScreen('errorGimmick')} />
            )}

            {screen === 'errorGimmick' && (
                <ErrorGimmick onJoined={() => setScreen('games')} />
            )}

            {screen === 'games' && <GameList />}
        </main>
    );
}
