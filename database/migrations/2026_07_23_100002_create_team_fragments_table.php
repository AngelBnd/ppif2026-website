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
        Schema::create('team_fragments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            // Which game unlocks this fragment (signal-decoder, data-trace, ...).
            $table->string('game_slug');
            // The letters revealed to the team after finishing that game.
            // No DB default: MySQL forbids DEFAULT on JSON columns (seeder always sets it).
            $table->json('letters');
            $table->timestamps();

            $table->unique(['team_id', 'game_slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_fragments');
    }
};
