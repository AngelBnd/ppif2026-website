<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamFragment extends Model
{
    protected $fillable = [
        'team_id',
        'game_slug',
        'letters',
    ];

    protected $casts = [
        'letters' => 'array',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
