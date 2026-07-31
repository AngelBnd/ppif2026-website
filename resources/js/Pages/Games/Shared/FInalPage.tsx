import { getRevealedName } from '@/services/gameApi';
import { useEffect, useState } from 'react';

import BackButton from '@/assets/icons/BackButtonSVG.svg';
import Button from '@/Components/global/Button';
import { router } from '@inertiajs/react';

export default function FinalPage() {
    const [targetWord, setTargetWord] = useState('');
    useEffect(() => {
        async function loadTargetWord() {
            try {
                const name = await getRevealedName();
                setTargetWord(name.toUpperCase());
            } catch {
                setTargetWord('');
            }
        }

        loadTargetWord();
    }, []);

    return (
        <main className="flex min-h-screen items-end justify-end bg-black pb-12 pr-24 text-white">
            <Button
                onClick={() => {
                    router.visit('/');
                }}
                Icon={BackButton}
                className="absolute bottom-4 left-6 z-30 w-[12rem]"
                iconClassName="w-full"
            />

            <section className="-rotate-12">
                <h1 className="-mb-12 -ml-32 -rotate-1 font-noto text-5xl font-bold uppercase">
                    WELCOME TO
                </h1>

                <h1 className="mt-4 pr-32 text-end font-noto text-[11rem] font-bold uppercase">
                    PPIF 2026,
                </h1>

                <h1 className="text-end font-noto text-8xl font-bold uppercase">
                    {targetWord}
                </h1>
            </section>
        </main>
    );
}
