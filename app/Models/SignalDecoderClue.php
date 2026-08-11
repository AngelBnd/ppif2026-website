<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SignalDecoderClue extends Model
{
    protected $fillable = [
        'direction',
        'number',
        'row',
        'col',
        'word',
        'clue',
    ];

    protected $casts = [
        'number' => 'integer',
        'row' => 'integer',
        'col' => 'integer',
    ];
}
