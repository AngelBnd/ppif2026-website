<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameProgress extends Model
{
    protected $table = 'game_progress';

    protected $fillable = [
        'team_id',
        'game_slug',
        'started_at',
        'completed_at',
        'duration_ms',
        'score',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'duration_ms' => 'integer',
        'score' => 'integer',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
