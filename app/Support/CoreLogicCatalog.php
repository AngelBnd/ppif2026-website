<?php

namespace App\Support;

use App\Models\CoreLogicQuestion;

/**
 * Server-side scoring for the Core Logic Test, backed by the
 * core_logic_questions table. The client only ever submits the selected
 * option index per question; the score is always computed here from the
 * DB's correct_index column so it cannot be spoofed.
 */
class CoreLogicCatalog
{
    public static function questionCount(): int
    {
        return CoreLogicQuestion::count();
    }

    /**
     * @param  array<int, int>  $answers  Selected option index per question, in order.
     */
    public static function score(array $answers): int
    {
        $correctIndexes = CoreLogicQuestion::orderBy('order')->pluck('correct_index');

        $score = 0;

        foreach ($correctIndexes as $index => $correct) {
            if (($answers[$index] ?? null) === $correct) {
                $score++;
            }
        }

        return $score;
    }
}
