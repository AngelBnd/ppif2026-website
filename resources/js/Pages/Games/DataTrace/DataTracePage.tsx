import type { GamePageChildProps } from '../GamePage';

export default function DataTracePage({ finishGame }: GamePageChildProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            <section className="text-center">
                <h1 className="text-5xl font-bold">Data Trace</h1>

                <p className="mt-4 text-white/60">
                    Put Data Trace puzzle here.
                </p>

                <button
                    onClick={finishGame}
                    className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black"
                >
                    Finish Game
                </button>
            </section>
        </main>
    );
}
