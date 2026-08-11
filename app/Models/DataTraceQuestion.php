<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataTraceQuestion extends Model
{
    protected $fillable = [
        'order',
        'description',
        'answers',
        'images',
    ];

    protected $casts = [
        'order' => 'integer',
        'answers' => 'array',
        'images' => 'array',
    ];
}
