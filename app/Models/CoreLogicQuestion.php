<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoreLogicQuestion extends Model
{
    protected $fillable = [
        'order',
        'question',
        'options',
        'correct_index',
        'explanation',
    ];

    protected $casts = [
        'order' => 'integer',
        'options' => 'array',
        'correct_index' => 'integer',
    ];
}
