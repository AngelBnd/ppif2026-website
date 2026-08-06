<?php

namespace App\Http\Controllers;

use App\Support\Leaderboard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    public function index(Request $request): Response
    {
        $includeInProgress = $request->boolean('all');
        $rows = Leaderboard::rows($includeInProgress);

        return Inertia::render('Leaderboard', [
            'teams' => $rows->values()->map(fn ($row, $index) => [
                'rank' => $index + 1,
                'name' => $row->name,
                'code' => $row->code,
                'totalMs' => $row->total_ms,
                'totalFormatted' => Leaderboard::formatDuration($row->total_ms),
                'gamesDone' => $row->games_done,
            ]),
            'totalGames' => Leaderboard::totalGames(),
            'includeInProgress' => $includeInProgress,
        ]);
    }
}
