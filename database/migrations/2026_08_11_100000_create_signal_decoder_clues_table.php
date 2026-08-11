<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('signal_decoder_clues', function (Blueprint $table) {
            $table->id();
            // 'across' or 'down'.
            $table->string('direction');
            // The crossword clue number shown in the grid.
            $table->unsignedInteger('number');
            $table->unsignedInteger('row');
            $table->unsignedInteger('col');
            $table->string('word');
            $table->text('clue');
            $table->timestamps();

            $table->unique(['direction', 'number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signal_decoder_clues');
    }
};
