type Props = {
    onRetrieveFragments: () => void;
};

export default function CoreLogicResultPage({ onRetrieveFragments }: Props) {
    // Memungut data dari sessionStorage, pasang fallback 0 jika tidak terdefinisi
    const correctScore = Number(sessionStorage.getItem('core_logic_score') || 0);
    const totalQuestions = 10; 
    
    // Perhitungan persentase akurasi
    const percentage = Math.round((correctScore / totalQuestions) * 100);

    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white px-4">
            <section className="w-[90%] max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                    Core Logic Test Result
                </p>

                {/* Menampilkan Persentase Hasil */}
                <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
                    {percentage}% Accuracy
                </h1>

                <p className="mt-6 text-xl text-white/60 max-w-md mx-auto">
                    You completed the Core Logic Test with <span className="text-white font-semibold">{correctScore}/{totalQuestions}</span> correct answers. A fragment has been recovered.
                </p>

                <button
                    onClick={onRetrieveFragments}
                    className="mt-10 rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105 active:scale-95"
                >
                    Retrieve Fragment
                </button>
            </section>
        </main>
    );
}