<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Gates the panitia-only leaderboard with a static HTTP Basic Auth credential
 * from .env (LEADERBOARD_USERNAME / LEADERBOARD_PASSWORD). Deliberately does
 * not use the `users` table / Breeze auth guard: registration is open to
 * anyone, so any player could self-register an account and read every
 * team's name — the secret answer word — before solving it themselves.
 */
class RequireLeaderboardAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $username = config('services.leaderboard.username');
        $password = config('services.leaderboard.password');

        $providedUser = $request->getUser() ?? '';
        $providedPass = $request->getPassword() ?? '';

        $valid = $username && $password
            && hash_equals($username, $providedUser)
            && hash_equals($password, $providedPass);

        if (! $valid) {
            return response('Unauthorized.', 401, [
                'WWW-Authenticate' => 'Basic realm="Leaderboard"',
            ]);
        }

        return $next($request);
    }
}
