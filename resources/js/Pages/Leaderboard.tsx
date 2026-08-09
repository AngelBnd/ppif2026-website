import { Head, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

type TeamRow = {
    rank: number;
    name: string;
    code: string;
    totalMs: number;
    totalFormatted: string;
    gamesDone: number;
};

type Props = {
    teams: TeamRow[];
    totalGames: number;
    includeInProgress: boolean;
};

const REFRESH_INTERVAL_MS = 15000;

export default function Leaderboard({
    teams,
    totalGames,
    includeInProgress,
}: Props) {
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['teams', 'totalGames', 'includeInProgress'] });
        }, REFRESH_INTERVAL_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="Leaderboard" />
            <div className="min-h-screen bg-[#0d0f13] px-6 py-10 text-white">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <h1 className="text-2xl font-bold">
                            Leaderboard PPIF 2026
                        </h1>
                        <a
                            href={
                                includeInProgress
                                    ? window.location.pathname
                                    : `${window.location.pathname}?all=1`
                            }
                            className="text-sm text-white/60 underline hover:text-white"
                        >
                            {includeInProgress
                                ? 'Tampilkan yang selesai saja'
                                : 'Tampilkan semua tim (termasuk belum selesai)'}
                        </a>
                    </div>

                    {teams.length === 0 ? (
                        <p className="text-white/60">
                            Belum ada kelompok yang menyelesaikan game.
                        </p>
                    ) : (
                        <div className="overflow-hidden rounded-lg border border-white/10">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead className="bg-white/10 text-white/70">
                                    <tr>
                                        <th className="px-4 py-3">#</th>
                                        <th className="px-4 py-3">Kelompok</th>
                                        <th className="px-4 py-3">Kode</th>
                                        <th className="px-4 py-3">
                                            Total Waktu
                                        </th>
                                        <th className="px-4 py-3">Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((team) => (
                                        <tr
                                            key={team.code}
                                            className="border-t border-white/10 odd:bg-white/[0.03]"
                                        >
                                            <td className="px-4 py-3 font-mono">
                                                {team.rank}
                                            </td>
                                            <td className="px-4 py-3 font-semibold">
                                                {team.name}
                                            </td>
                                            <td className="px-4 py-3 font-mono text-white/60">
                                                {team.code}
                                            </td>
                                            <td className="px-4 py-3 font-mono">
                                                {team.totalFormatted}
                                            </td>
                                            <td className="px-4 py-3 text-white/60">
                                                {team.gamesDone}/{totalGames}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <p className="mt-6 text-xs text-white/40">
                        Auto-refresh setiap 15 detik.
                    </p>
                </div>
            </div>
        </>
    );
}

Leaderboard.layout = (page: ReactNode) => page;
