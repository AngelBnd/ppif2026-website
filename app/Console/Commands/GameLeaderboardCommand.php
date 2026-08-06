<?php

namespace App\Console\Commands;

use App\Support\Leaderboard;
use Illuminate\Console\Command;

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
        $totalGames = Leaderboard::totalGames();
        $rows = Leaderboard::rows($this->option('all'));

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
                    Leaderboard::formatDuration($row->total_ms),
                    "{$row->games_done}/{$totalGames}",
                    $row->total_ms,
                ];
            })->all(),
        );

        return self::SUCCESS;
    }
}
