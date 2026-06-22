import Timer from '@/Components/game/Timer';
import { router } from '@inertiajs/react';

type Props = {
    letters: string[];
};

export default function FragmentRevealPage({ letters }: Props) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            <section className="text-center">
                <Timer
                    initialSeconds={3}
                    onTimeUp={() => {
                        router.visit('/games');
                    }}
                    className="mb-6 text-red-400"
                />
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                    Fragment Recovered placeholder
                </p>

                <h1 className="mt-4 text-5xl font-bold">You found:</h1>

                <div className="mt-8 flex justify-center gap-4">
                    {letters.map((letter, index) => (
                        <div
                            key={`${letter}-${index}`}
                            className="flex h-24 w-24 items-center justify-center rounded-xl bg-white text-5xl font-bold text-black"
                        >
                            {letter}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
