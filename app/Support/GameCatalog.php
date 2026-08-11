<?php

namespace App\Support;

use App\Models\Team;

/**
 * Single source of truth for the game order and unlock rules on the server.
 * Mirrors resources/js/data/games.ts so unlock gating cannot be bypassed by
 * calling the API directly.
 */
class GameCatalog
{
    public const SIGNAL_DECODER = 'signal-decoder';
    public const DATA_TRACE = 'data-trace';
    public const CORE_LOGIC = 'core-logic-test';
    public const RECONSTRUCT = 'reconstruct-identity';

    /** Games in the order they must be played. */
    public const ORDER = [
        self::SIGNAL_DECODER,
        self::DATA_TRACE,
        self::CORE_LOGIC,
        self::RECONSTRUCT,
    ];

    /** The final game: assembling the group name. */
    public const FINAL = self::RECONSTRUCT;

    public static function isValid(string $slug): bool
    {
        return in_array($slug, self::ORDER, true);
    }

    /**
     * The game that must be completed before $slug unlocks, or null for the first.
     */
    public static function prerequisite(string $slug): ?string
    {
        $index = array_search($slug, self::ORDER, true);

        return $index > 0 ? self::ORDER[$index - 1] : null;
    }

    public static function assertValidSlug(string $slug): void
    {
        if (! self::isValid($slug)) {
            abort(404, 'Unknown game.');
        }
    }

    /**
     * Enforce the play order server-side: a game is locked until its predecessor
     * has been completed.
     */
    public static function assertUnlocked(Team $team, string $slug): void
    {
        $prerequisite = self::prerequisite($slug);

        if ($prerequisite && ! in_array($prerequisite, $team->completedSlugs(), true)) {
            abort(403, 'This game is locked.');
        }
    }
}
