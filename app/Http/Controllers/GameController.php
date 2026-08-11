<?php

namespace App\Http\Controllers;

use App\Models\GameProgress;
use App\Models\Team;
use App\Support\CoreLogicCatalog;
use App\Support\DataTraceCatalog;
use App\Support\GameCatalog;
use App\Support\SignalDecoderCatalog;
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
        GameCatalog::assertValidSlug($slug);
        $team = $this->team($request);
        GameCatalog::assertUnlocked($team, $slug);

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
     * Finish one of the three puzzle games: validate the submitted answers against
     * the server's own copy of the answer key, stamp the completion time, persist
     * the duration and (for Core Logic Test) the score, then hand back the fragment.
     */
    public function complete(Request $request, string $slug): JsonResponse
    {
        GameCatalog::assertValidSlug($slug);

        if ($slug === GameCatalog::FINAL) {
            abort(422, 'Reconstruct Identity is completed via the guess endpoint.');
        }

        $team = $this->team($request);
        GameCatalog::assertUnlocked($team, $slug);

        // Every answer is re-checked here against the DB-backed answer key; the
        // client's own local check (used for live UI feedback) is never trusted.
        $validated = match ($slug) {
            GameCatalog::CORE_LOGIC => $request->validate([
                'answers' => ['required', 'array', 'size:'.CoreLogicCatalog::questionCount()],
                'answers.*' => ['required', 'integer', 'min:0', 'max:3'],
            ]),
            GameCatalog::SIGNAL_DECODER => $request->validate([
                'values' => ['required', 'array'],
                'values.*' => ['nullable', 'string', 'max:1'],
            ]),
            GameCatalog::DATA_TRACE => $request->validate([
                'answers' => ['required', 'array', 'size:'.DataTraceCatalog::questionCount()],
                'answers.*' => ['required', 'string', 'max:64'],
            ]),
            default => [],
        };

        // Captured before finalize() so a replayed /complete call (e.g. with a
        // more favourable answers array) can never overwrite a score that was
        // already locked in by the first, genuine completion. Also means a replay
        // can never be rejected by the checks below just because it resubmits a
        // blank/stale grid — only the first, genuine completion is gated on it.
        $alreadyCompleted = in_array($slug, $team->completedSlugs(), true);

        if (! $alreadyCompleted) {
            if ($slug === GameCatalog::SIGNAL_DECODER && ! SignalDecoderCatalog::isSolved($validated['values'])) {
                abort(422, 'The crossword is not solved yet.');
            }

            if ($slug === GameCatalog::DATA_TRACE && ! DataTraceCatalog::isSolved($validated['answers'])) {
                abort(422, 'The quiz is not solved yet.');
            }
        }

        $progress = $this->finalize($team, $slug);

        if ($slug === GameCatalog::CORE_LOGIC && ! $alreadyCompleted) {
            $progress->score = CoreLogicCatalog::score($validated['answers']);
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
        GameCatalog::assertUnlocked($team, $slug);

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

    private function team(Request $request): Team
    {
        return $request->attributes->get('team');
    }
}
