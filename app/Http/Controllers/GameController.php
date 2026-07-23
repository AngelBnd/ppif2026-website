<?php

namespace App\Http\Controllers;

use App\Models\GameProgress;
use App\Models\Team;
use App\Support\GameCatalog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Start (or restart) a game's timer. Called when the game screen opens.
     * The clock only runs from here until /complete, so time spent choosing a
     * game on the hub is never included in the total.
     */
    public function start(Request $request, string $slug): JsonResponse
    {
        $this->assertValidSlug($slug);
        $team = $this->team($request);
        $this->assertUnlocked($team, $slug);

        $progress = GameProgress::firstOrNew([
            'team_id' => $team->id,
            'game_slug' => $slug,
        ]);

        // Once a game is finished its duration is locked in; reopening it does nothing.
        if ($progress->completed_at) {
            return response()->json([
                'already_completed' => true,
                'duration_ms' => $progress->duration_ms,
            ]);
        }

        $progress->started_at = now();
        $progress->save();

        return response()->json([
            'started_at' => $progress->started_at,
        ]);
    }

    /**
     * Finish one of the three puzzle games: stamp the completion time, persist the
     * duration and (for Core Logic Test) the score, then hand back the fragment.
     */
    public function complete(Request $request, string $slug): JsonResponse
    {
        $this->assertValidSlug($slug);

        if ($slug === GameCatalog::FINAL) {
            abort(422, 'Reconstruct Identity is completed via the guess endpoint.');
        }

        $validated = $request->validate([
            'score' => ['nullable', 'integer', 'min:0', 'max:10'],
        ]);

        $team = $this->team($request);
        $this->assertUnlocked($team, $slug);

        $progress = $this->finalize($team, $slug);

        if ($slug === GameCatalog::CORE_LOGIC && array_key_exists('score', $validated) && $validated['score'] !== null) {
            $progress->score = (int) $validated['score'];
            $progress->save();
        }

        $fragment = $team->fragments()->where('game_slug', $slug)->first();

        return response()->json([
            'fragment' => ['letters' => $fragment?->letters ?? []],
            'completed_games' => $team->completedSlugs(),
            'duration_ms' => $progress->duration_ms,
        ]);
    }

    /**
     * Validate a Reconstruct Identity guess on the server so the answer word is
     * never shipped to the client. On success it also finalises the game timer.
     */
    public function guess(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'guess' => ['required', 'string', 'max:64'],
        ]);

        $team = $this->team($request);
        $slug = GameCatalog::FINAL;
        $this->assertUnlocked($team, $slug);

        $isCorrect = mb_strtoupper(trim($validated['guess'])) === mb_strtoupper($team->name);

        if (! $isCorrect) {
            return response()->json(['correct' => false]);
        }

        $this->finalize($team, $slug);

        return response()->json([
            'correct' => true,
            'name' => $team->name,
            'total_duration_ms' => $team->totalDurationMs(),
        ]);
    }

    /**
     * Stamp completion + duration for a game, idempotently.
     */
    private function finalize(Team $team, string $slug): GameProgress
    {
        $progress = GameProgress::firstOrNew([
            'team_id' => $team->id,
            'game_slug' => $slug,
        ]);

        if (! $progress->completed_at) {
            $startedAt = $progress->started_at ?? now();
            $completedAt = now();

            $progress->started_at = $startedAt;
            $progress->completed_at = $completedAt;
            $progress->duration_ms = (int) round(max(0, $startedAt->diffInMilliseconds($completedAt)));
            $progress->save();
        }

        return $progress;
    }

    private function assertValidSlug(string $slug): void
    {
        if (! GameCatalog::isValid($slug)) {
            abort(404, 'Unknown game.');
        }
    }

    /**
     * Enforce the play order server-side: a game is locked until its predecessor
     * has been completed.
     */
    private function assertUnlocked(Team $team, string $slug): void
    {
        $prerequisite = GameCatalog::prerequisite($slug);

        if ($prerequisite && ! in_array($prerequisite, $team->completedSlugs(), true)) {
            abort(403, 'This game is locked.');
        }
    }

    private function team(Request $request): Team
    {
        return $request->attributes->get('team');
    }
}
