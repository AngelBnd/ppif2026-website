<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // No session exists yet at this point, so the only identity available
        // is the IP. Bounds brute-forcing the 5-char team code.
        RateLimiter::for('team-join', function (Request $request) {
            return Limit::perMinute(8)->by($request->ip());
        });

        // Keyed by team (not IP): many teams share the venue's NAT'd IP, and a
        // per-team key stops one team's guesses from throttling everyone else
        // while still bounding brute-forcing of the reconstructed name.
        RateLimiter::for('team-guess', function (Request $request) {
            $key = $request->session()->get('team_id') ?? $request->ip();

            return Limit::perMinute(8)->by($key);
        });
    }
}
