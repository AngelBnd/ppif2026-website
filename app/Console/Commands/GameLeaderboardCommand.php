<?php

namespace App\Console\Commands;

use App\Support\GameCatalog;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Panitia-only leaderboard. Runs on the server terminal (not exposed to players),
 * so showing group names here is safe. Ranks teams that finished ALL games by
 * their total in-game time (sum of per-game durations; hub-idle time excluded).
 *
 *   php artisan game:leaderboard
 *   php artisan game:leaderboard --limit=10
 *   php artisan game:leaderboard --all   (include teams still in progress)
 */
class GameLeaderboardCommand extends Command
{
    protected $signature = 'game:leaderboard
        {--limit=0 : Only show the top N (0 = all)}
        {--all : Include teams that have not finished every game}';

    protected $description = 'Show the fastest teams by total in-game time';

    public function handle(): int
    {
        $totalGames = count(GameCatalog::ORDER);

        $query = DB::table('teams as t')
            ->join('game_progress as gp', function ($join) {
                $join->on('gp.team_id', '=', 't.id')
                    ->whereNotNull('gp.completed_at');
            })
            ->groupBy('t.id', 't.name', 't.code')
            ->orderByRaw('SUM(gp.duration_ms) ASC')
            ->select([
                't.name',
                't.code',
                DB::raw('SUM(gp.duration_ms) as total_ms'),
                DB::raw('COUNT(gp.id) as games_done'),
            ]);

        // By default only fully-finished teams are ranked.
        if (! $this->option('all')) {
            $query->havingRaw('COUNT(gp.id) = ?', [$totalGames]);
        }

        $rows = $query->get();

        if ($rows->isEmpty()) {
            $this->warn('Belum ada kelompok yang menyelesaikan game.');

            return self::SUCCESS;
        }

        $limit = (int) $this->option('limit');
        if ($limit > 0) {
            $rows = $rows->take($limit);
        }

        $rank = 0;

        $this->table(
            ['#', 'Kelompok', 'Kode', 'Total', 'Game', 'ms'],
            $rows->map(function ($row) use (&$rank, $totalGames) {
                $rank++;

                return [
                    $rank,
                    $row->name,
                    $row->code,
                    $this->formatDuration((int) $row->total_ms),
                    "{$row->games_done}/{$totalGames}",
                    (int) $row->total_ms,
                ];
            })->all(),
        );

        return self::SUCCESS;
    }

    private function formatDuration(int $ms): string
    {
        $totalSeconds = intdiv($ms, 1000);
        $minutes = intdiv($totalSeconds, 60);
        $seconds = $totalSeconds % 60;

        return sprintf('%d:%02d', $minutes, $seconds);
    }
}
