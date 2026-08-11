<?php

namespace Database\Seeders;

use App\Models\SignalDecoderClue;
use Illuminate\Database\Seeder;

class SignalDecoderClueSeeder extends Seeder
{
    /**
     * Seed the crossword clues transcribed from
     * resources/js/data/gameQuestions/signalDecoderQuestions.ts (`CWdata`).
     */
    public function run(): void
    {
        $across = [
            ['num' => 1, 'row' => 0, 'col' => 8, 'word' => 'RUNTUH', 'clue' => 'Keadaan Wooden Puppet Universe setelah bad virus menyebar terlalu lama.'],
            ['num' => 4, 'row' => 3, 'col' => 1, 'word' => 'FRAGMENTASI', 'clue' => 'Kondisi saat signal Orbits pecah dan tidak terkirim dengan sempurna.'],
            ['num' => 7, 'row' => 6, 'col' => 2, 'word' => 'LIGHTUNIVERSE', 'clue' => 'Universe paling stabil dan menjadi pusat pengamatan Orbits.'],
            ['num' => 8, 'row' => 9, 'col' => 3, 'word' => 'ORBITS', 'clue' => 'Sistem pengawas yang mengamati seluruh multiverse.'],
            ['num' => 9, 'row' => 9, 'col' => 11, 'word' => 'IDENTITAS', 'clue' => 'Hal yang harus dipulihkan Variants sebelum memulai misi'],
            ['num' => 10, 'row' => 11, 'col' => 0, 'word' => 'VARIANTS', 'clue' => 'Sebutan untuk para penghuni berbagai universe.'],
        ];

        $down = [
            ['num' => 2, 'row' => 0, 'col' => 11, 'word' => 'TERINFEKSI', 'clue' => 'Kondisi Codie Puppet setelah terkena bad virus.'],
            ['num' => 3, 'row' => 2, 'col' => 8, 'word' => 'STAGNANSI', 'clue' => 'Keadaan saat Variants berhenti berkembang dan kehilangan motivasi.'],
            ['num' => 5, 'row' => 3, 'col' => 3, 'word' => 'ANTIBIOTIK', 'clue' => 'Ramuan kuno untuk melawan bad virus.'],
            ['num' => 6, 'row' => 5, 'col' => 14, 'word' => 'PEMANDU', 'clue' => 'Peran Codie Puppet di Wooden Puppet Universe.'],
        ];

        foreach (['across' => $across, 'down' => $down] as $direction => $clues) {
            foreach ($clues as $clue) {
                SignalDecoderClue::updateOrCreate(
                    ['direction' => $direction, 'number' => $clue['num']],
                    [
                        'row' => $clue['row'],
                        'col' => $clue['col'],
                        'word' => $clue['word'],
                        'clue' => $clue['clue'],
                    ],
                );
            }
        }
    }
}
