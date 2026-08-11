<?php

namespace App\Support;

use App\Models\DataTraceQuestion;

/**
 * Server-side validation for the Data Trace quiz, backed by the
 * data_trace_questions table. Mirrors the normalization DataTracePage.tsx
 * already does client-side (trim + lowercase, any accepted answer matches).
 */
class DataTraceCatalog
{
    public static function questionCount(): int
    {
        return DataTraceQuestion::count();
    }

    /**
     * @param  array<int, string>  $answers  Submitted answer per question, in order.
     */
    public static function isSolved(array $answers): bool
    {
        $questions = DataTraceQuestion::orderBy('order')->get();

        foreach ($questions as $index => $question) {
            $submitted = strtolower(trim((string) ($answers[$index] ?? '')));

            $accepted = array_map(
                fn (string $answer) => strtolower(trim($answer)),
                $question->answers,
            );

            if (! in_array($submitted, $accepted, true)) {
                return false;
            }
        }

        return true;
    }
}
