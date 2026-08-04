import BackButton from '@/assets/icons/BackButtonSVG.svg';
import Button from '@/Components/global/Button';
import { router } from '@inertiajs/react';
import GameHubStoryline from './GameHubStoryline';

// The story lives on its own URL (/games/story) so it's always shown as the
// entry to the games flow — even when a teamId is already in sessionStorage.
export default function StoryPage() {
    return (
        <main className="z-50 h-screen w-screen overflow-hidden">
            <Button
                onClick={() => router.visit('/home')}
                Icon={BackButton}
                className="absolute bottom-4 left-6 z-30 w-[12rem]"
                iconClassName="w-full"
            />

            <GameHubStoryline onReady={() => router.visit('/games')} />
        </main>
    );
}
