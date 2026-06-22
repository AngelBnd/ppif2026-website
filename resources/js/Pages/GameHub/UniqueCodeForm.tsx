import { mockJoinTeam } from '@/services/mockGameApi';
import { useState } from 'react';

type Props = {
    onJoined: () => void;
};

export default function UniqueCodeForm({ onJoined }: Props) {
    const [uniqueCode, setUniqueCode] = useState('');
    const [error, setError] = useState('');

    const handleJoin = async () => {
        try {
            await mockJoinTeam(uniqueCode);
            onJoined();
        } catch (error) {
            setError('Invalid unique code.');
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            <section className="w-[90%] max-w-md rounded-2xl bg-white/10 p-8">
                <h1 className="text-3xl font-bold">Join Game</h1>
                <div>unique codenya X7K9, ada di js/data/mockBackend.ts</div>

                <input
                    value={uniqueCode}
                    onChange={(e) => setUniqueCode(e.target.value)}
                    placeholder="Unique Code"
                    className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-black"
                />

                {error && <p className="mt-4 text-red-400">{error}</p>}

                <button
                    onClick={handleJoin}
                    className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-semibold text-black"
                >
                    Join
                </button>
            </section>
        </main>
    );
}
