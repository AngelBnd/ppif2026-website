<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GameQuestionController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/home');
});

Route::get('/home', function () {
    return Inertia::render('Home');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/timeline', function () {
    return Inertia::render('Timeline');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/archive', function () {
    return Inertia::render('Archive/ArchivePage');
});

Route::get('/archive/dday', function () {
    return Inertia::render('Archive/DDayPage');
});

Route::get('/archive/briefingday', function () {
    return Inertia::render('Archive/BriefingDayPage');
});

Route::get('/games', function () {
    return Inertia::render('GameHub/GameHubPage');
});

// Temporarily moved off the well-known /games/story path — some students
// already discovered and shared that URL before the reveal. Rename back (and
// update the two router.visit() call sites below) once ready to go public.
// Must be registered before the /games/{gameSlug} wildcard below.
Route::get('/games/story-8x2k4', function () {
    return Inertia::render('GameHub/StoryPage');
});

Route::get('/games/{gameSlug}', function ($gameSlug) {
    return Inertia::render('Games/GamePage', [
        'gameSlug' => $gameSlug,
    ]);
});

Route::get('/inibuatorbits/leaderboard', [LeaderboardController::class, 'index'])
    ->middleware('leaderboard.auth');

Route::prefix('api')->group(function () {
    Route::post('teams/join', [TeamController::class, 'join'])
        ->middleware('throttle:team-join');

    Route::middleware('team')->group(function () {
        Route::get('teams/me', [TeamController::class, 'me']);
        Route::get('teams/me/reveal', [TeamController::class, 'reveal']);
        Route::post('teams/logout', [TeamController::class, 'logout']);

        Route::post('games/reconstruct-identity/guess', [GameController::class, 'guess'])
            ->middleware('throttle:team-guess');
        Route::get('games/{slug}/questions', [GameQuestionController::class, 'show']);
        Route::post('games/{slug}/start', [GameController::class, 'start']);
        Route::post('games/{slug}/complete', [GameController::class, 'complete']);
    });
});
