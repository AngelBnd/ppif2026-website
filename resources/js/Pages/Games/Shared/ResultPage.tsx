import { GameConfig } from '@/data/games';

type Props = {
    game: GameConfig;
    retrieveFragments: () => void;
};

export default function ResultPage({ game, retrieveFragments }: Props) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            <section className="text-center">
                <h1 className="text-5xl font-bold">
                    Puzzle Completed placeholder
                </h1>

                <p className="mt-4 text-white/60">
                    You completed {game.title}.
                </p>

                <button
                    onClick={retrieveFragments}
                    className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black"
                >
                    Retrieve Fragment
                </button>
            </section>
        </main>
    );
}
