<?php

namespace App\Http\Middleware;

use App\Models\Team;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Authorises a request as a joined team using the server session set at /join.
 * The client never sends its own team id, so it cannot act as another team.
 */
class EnsureTeamJoined
{
    public function handle(Request $request, Closure $next): Response
    {
        $teamId = $request->session()->get('team_id');
        $team = $teamId ? Team::find($teamId) : null;

        if (! $team) {
            return response()->json([
                'message' => 'Not joined. Please enter your unique code again.',
            ], 401);
        }

        // Make the resolved team available to controllers for this request.
        $request->attributes->set('team', $team);

        return $next($request);
    }
}
