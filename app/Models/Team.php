<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    protected $fillable = [
        'name',
        'code',
        'revealed_indices',
    ];

    protected $casts = [
        'revealed_indices' => 'array',
    ];

    public function fragments(): HasMany
    {
        return $this->hasMany(TeamFragment::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(GameProgress::class);
    }

    /**
     * Indices of the name that are pre-filled for free, clamped to the name length.
     *
     * @return array<int, int>
     */
    public function revealedIndices(): array
    {
        $length = mb_strlen($this->name);

        return array_values(array_filter(
            $this->revealed_indices ?? [],
            fn ($index) => is_int($index) && $index >= 0 && $index < $length,
        ));
    }

    /**
     * Map of {index => letter} for the revealed positions only. This is the only
     * part of the answer word the client is ever allowed to see up front.
     *
     * @return array<int, string>
     */
    public function revealedLetters(): array
    {
        $letters = [];

        foreach ($this->revealedIndices() as $index) {
            $letters[$index] = mb_strtoupper(mb_substr($this->name, $index, 1));
        }

        return $letters;
    }

    /**
     * Slugs of the games this team has finished.
     *
     * @return array<int, string>
     */
    public function completedSlugs(): array
    {
        return $this->progress()
            ->whereNotNull('completed_at')
            ->pluck('game_slug')
            ->all();
    }

    /**
     * Sum of the per-game durations. Idle time on the game list is never counted
     * because it falls outside every [started_at, completed_at] window.
     */
    public function totalDurationMs(): int
    {
        return (int) $this->progress()
            ->whereNotNull('completed_at')
            ->sum('duration_ms');
    }

    /**
     * Public-safe representation. Deliberately omits `name` (the secret answer).
     *
     * @return array<string, mixed>
     */
    public function publicData(): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name_length' => mb_strlen($this->name),
            'revealed_indices' => $this->revealedIndices(),
            'revealed_letters' => $this->revealedLetters(),
            'completed_games' => $this->completedSlugs(),
            'total_duration_ms' => $this->totalDurationMs(),
        ];
    }
}
