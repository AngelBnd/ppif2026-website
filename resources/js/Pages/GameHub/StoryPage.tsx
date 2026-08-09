import BackButton from '@/assets/icons/BackButtonSVG.svg';
import Button from '@/Components/global/Button';
import { Head, router } from '@inertiajs/react';
import GameHubStoryline from './GameHubStoryline';

// The story lives on its own URL (/games/story) so it's always shown as the
// entry to the games flow — even when a teamId is already in sessionStorage.
export default function StoryPage() {
    return (
        <main className="z-50 h-screen w-screen overflow-hidden">
            <Head title="Story" />
            <Button
                onClick={() => router.visit('/home')}
                Icon={BackButton}
                back
                className="absolute bottom-6 left-6 z-30 w-[12rem]"
                iconClassName="w-full"
                iconStyle={{ width: 'clamp(5.4rem, 26.4vh, 12rem)' }}
            />

            <GameHubStoryline onReady={() => router.visit('/games')} />
        </main>
    );
}
