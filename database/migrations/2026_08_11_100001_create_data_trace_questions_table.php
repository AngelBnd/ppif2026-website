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
        Schema::create('data_trace_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->unique();
            $table->text('description');
            // Accepted answer strings (case/whitespace normalized at check time).
            $table->json('answers');
            // Asset keys resolved client-side via resources/js/data/dataTraceAssets.ts.
            $table->json('images');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_trace_questions');
    }
};
