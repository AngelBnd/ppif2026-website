import { router } from '@inertiajs/react';
export default function FinalPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
            <section className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                    Final Game Completed placeholder
                </p>

                <h1 className="mt-4 text-5xl font-bold">
                    WELCAME TO PPIF2026!!!!
                </h1>

                <p className="mt-4 text-white/60">
                    You have completed the final challenge.
                </p>

                <button
                    onClick={() => router.visit('/home')}
                    className="mt-10 rounded-xl bg-white px-6 py-3 font-semibold text-black"
                >
                    Back to Home
                </button>
            </section>
        </main>
    );
}
