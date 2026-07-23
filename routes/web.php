<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

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

Route::get('/games/{gameSlug}', function ($gameSlug) {
    return Inertia::render('Games/GamePage', [
        'gameSlug' => $gameSlug,
    ]);
});

Route::get('/games/core-logic-test/reveal', function () {
    return Inertia::render('Games/ReconstructIdentity/FragmentRevealPage', [
        'gameSlug' => 'reconstruct-identity',
    ]);
});

Route::prefix('api')->group(function () {
    Route::post('teams/join', [TeamController::class, 'join']);

    Route::middleware('team')->group(function () {
        Route::get('teams/me', [TeamController::class, 'me']);
        Route::get('teams/me/reveal', [TeamController::class, 'reveal']);
        Route::post('teams/logout', [TeamController::class, 'logout']);

        Route::post('games/reconstruct-identity/guess', [GameController::class, 'guess']);
        Route::post('games/{slug}/start', [GameController::class, 'start']);
        Route::post('games/{slug}/complete', [GameController::class, 'complete']);
    });
});

require __DIR__.'/auth.php';
