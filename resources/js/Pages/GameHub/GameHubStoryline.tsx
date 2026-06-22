type Props = {
    onReady: () => void;
};

export default function GameHubStoryline({ onReady }: Props) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
            <section className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                    Storyline
                </p>

                <h1 className="mt-4 text-5xl font-bold">The Mission Begins</h1>

                <div className="mt-8 space-y-5 text-left text-lg leading-relaxed text-white/70">
                    loooooorem ipsuuuuum
                </div>

                <button
                    onClick={onReady}
                    className="mt-10 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 active:scale-95"
                >
                    I'm Ready
                </button>
            </section>
        </main>
    );
}
