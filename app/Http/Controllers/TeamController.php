<?php

namespace App\Http\Controllers;

use App\Http\Requests\JoinTeamRequest;
use App\Models\Team;
use App\Support\GameCatalog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TeamController extends Controller
{
    /**
     * Validate a unique code and open a session for that team.
     */
    public function join(JoinTeamRequest $request): JsonResponse
    {
        $code = $request->validated()['code'];
        $team = Team::where('code', $code)->first();

        if (! $team) {
            throw ValidationException::withMessages([
                'code' => 'Invalid unique code.',
            ]);
        }

        // New session identity on login to prevent session fixation.
        $request->session()->regenerate();
        $request->session()->put('team_id', $team->id);

        return response()->json([
            'team' => $team->publicData(),
        ]);
    }

    /**
     * Public, secret-free snapshot of the joined team (used by the game list and
     * the Reconstruct Identity grid).
     */
    public function me(Request $request): JsonResponse
    {
        $team = $this->team($request);

        return response()->json([
            'team' => $team->publicData(),
        ]);
    }

    /**
     * Reveal the answer word, but only once the team has actually reconstructed it.
     * Used by the final "WELCOME TO PPIF 2026, {NAME}" screen.
     */
    public function reveal(Request $request): JsonResponse
    {
        $team = $this->team($request);

        if (! in_array(GameCatalog::FINAL, $team->completedSlugs(), true)) {
            abort(403, 'The identity has not been reconstructed yet.');
        }

        return response()->json([
            'name' => $team->name,
        ]);
    }

    /**
     * Leave the team (clears the session) without destroying CSRF protection.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->session()->forget('team_id');
        $request->session()->regenerateToken();

        return response()->json(['ok' => true]);
    }

    private function team(Request $request): Team
    {
        return $request->attributes->get('team');
    }
}
