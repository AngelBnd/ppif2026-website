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
        Schema::create('game_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->string('game_slug');
            // Server-authoritative timing. started_at is stamped when the game is
            // opened; completed_at when it is finished. duration_ms = the gap.
            // Time spent idle on the game list is never part of any [start, complete]
            // window, so it is naturally excluded from the total.
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->unsignedBigInteger('duration_ms')->nullable();
            // Core Logic Test accuracy (0-10 correct answers). Null for other games.
            $table->unsignedInteger('score')->nullable();
            $table->timestamps();

            $table->unique(['team_id', 'game_slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_progress');
    }
};
