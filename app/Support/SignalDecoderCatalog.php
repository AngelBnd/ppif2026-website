<?php

namespace App\Support;

use App\Models\SignalDecoderClue;

/**
 * Server-side validation for the Signal Decoder crossword, backed by the
 * signal_decoder_clues table. The client submits the full grid it filled in
 * (keyed "row-col" -> letter); this rebuilds the same answer map the client
 * uses for its live highlighting and checks it independently.
 */
class SignalDecoderCatalog
{
    /**
     * @param  array<string, string>  $values  Submitted grid, keyed "row-col" -> letter.
     */
    public static function isSolved(array $values): bool
    {
        foreach (SignalDecoderClue::all() as $entry) {
            $letters = str_split($entry->word);

            foreach ($letters as $offset => $expected) {
                $row = $entry->direction === 'across' ? $entry->row : $entry->row + $offset;
                $col = $entry->direction === 'across' ? $entry->col + $offset : $entry->col;
                $key = "{$row}-{$col}";

                $submitted = strtoupper((string) ($values[$key] ?? ''));

                if ($submitted !== strtoupper($expected)) {
                    return false;
                }
            }
        }

        return true;
    }
}
