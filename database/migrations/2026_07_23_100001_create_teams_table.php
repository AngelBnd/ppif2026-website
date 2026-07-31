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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            // Secret answer word (the group name players must reconstruct).
            // Never sent to the client until it has been guessed correctly.
            $table->string('name');
            // Join code players type in the unique-code form (5 chars).
            $table->string('code')->unique();
            // Indices of `name` that are pre-filled for free in Reconstruct Identity.
            // No DB default: MySQL forbids DEFAULT on JSON columns, and the seeder
            // always supplies a value (the model treats null as []).
            $table->json('revealed_indices');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
