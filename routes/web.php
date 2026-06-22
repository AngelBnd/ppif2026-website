<?php

use App\Http\Controllers\ProfileController;
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
    return Inertia::render('Archive');
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

require __DIR__.'/auth.php';
