<?php

namespace App\Support;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * Panitia-only leaderboard query. Ranks teams by total in-game time (sum of
 * per-game durations; hub-idle time is excluded since it falls outside every
 * [started_at, completed_at] window). Shared by the `game:leaderboard`
 * artisan command and the web leaderboard route — never expose the result
 * of this query to players, since `name` is the secret answer word.
 */
class Leaderboard
{
    /**
     * @return Collection<int, object{name: string, code: string, total_ms: int, games_done: int}>
     */
    public static function rows(bool $includeInProgress = false): Collection
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

        if (! $includeInProgress) {
            $query->havingRaw('COUNT(gp.id) = ?', [$totalGames]);
        }

        return $query->get()->map(fn ($row) => (object) [
            'name' => $row->name,
            'code' => $row->code,
            'total_ms' => (int) $row->total_ms,
            'games_done' => (int) $row->games_done,
        ]);
    }

    public static function totalGames(): int
    {
        return count(GameCatalog::ORDER);
    }

    public static function formatDuration(int $ms): string
    {
        $totalSeconds = intdiv($ms, 1000);
        $minutes = intdiv($totalSeconds, 60);
        $seconds = $totalSeconds % 60;

        return sprintf('%d:%02d', $minutes, $seconds);
    }
}
