import { findTeam } from '@/services/mockGameApi';
import { useEffect, useState } from 'react';

export default function FinalPage() {
    const [targetWord, setTargetWord] = useState('');
    useEffect(() => {
        async function loadTargetWord() {
            const teamId = Number(sessionStorage.getItem('teamId'));
            if (!teamId) return;
            const team = await findTeam(teamId);

            setTargetWord(team?.name.toUpperCase() ?? '');
        }

        loadTargetWord();
    }, []);

    return (
        <main className="flex min-h-screen items-end justify-end bg-black pb-12 pr-24 text-white">
            <section className="-rotate-12">
                <h1 className="-mb-12 -ml-32 -rotate-1 font-['Noto_Sans'] text-5xl font-bold uppercase">
                    WELCOME TO
                </h1>

                <h1 className="mt-4 pr-32 text-end font-['Noto_Sans'] text-[11rem] font-bold uppercase">
                    PPIF 2026,
                </h1>

                <h1 className="text-end font-['Noto_Sans'] text-8xl font-bold uppercase">
                    {targetWord}
                </h1>
            </section>
        </main>
    );
}
