<?php

namespace App\Support;

/**
 * Server-side copy of the Core Logic Test answer key
 * (resources/js/data/gameQuestions/coreLogicQuestions.ts `ans` values, in
 * question order). The client only ever submits the selected option index
 * per question; the score is always computed here so it cannot be spoofed.
 */
class CoreLogicCatalog
{
    public const QUESTION_COUNT = 10;

    /** Correct option index (0-3) for each question, in order. */
    public const ANSWERS = [0, 2, 3, 1, 3, 0, 2, 1, 0, 2];

    /**
     * @param  array<int, int>  $answers  Selected option index per question.
     */
    public static function score(array $answers): int
    {
        $score = 0;

        foreach (self::ANSWERS as $index => $correct) {
            if (($answers[$index] ?? null) === $correct) {
                $score++;
            }
        }

        return $score;
    }
}
