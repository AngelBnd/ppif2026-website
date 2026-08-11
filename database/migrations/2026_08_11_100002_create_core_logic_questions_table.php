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
        Schema::create('core_logic_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order')->unique();
            $table->text('question');
            // Exactly 4 option strings.
            $table->json('options');
            $table->unsignedTinyInteger('correct_index');
            $table->text('explanation');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('core_logic_questions');
    }
};
