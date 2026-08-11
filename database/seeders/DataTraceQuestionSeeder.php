<?php

namespace Database\Seeders;

use App\Models\DataTraceQuestion;
use Illuminate\Database\Seeder;

class DataTraceQuestionSeeder extends Seeder
{
    /**
     * Seed the quiz transcribed from
     * resources/js/data/gameQuestions/dataTraceQuestions.ts (`IMG_QS`). Image
     * keys are resolved to bundled assets client-side via
     * resources/js/data/dataTraceAssets.ts.
     */
    public function run(): void
    {
        $questions = [
            ['images' => ['ppif'], 'description' => 'Logo atau gambar apakah diatas ini??', 'answers' => ['ppif']],
            ['images' => ['html'], 'description' => 'Logo apakah diatas ini?', 'answers' => ['html']],
            ['images' => ['cloud', 'storage'], 'description' => 'Suatu istilah dalam teknologi yang sering kita pakai?', 'answers' => ['cloud storage', 'cloudstorage']],
            ['images' => ['fire', 'fox'], 'description' => 'Logo apakah ini?', 'answers' => ['fire fox', 'firefox']],
            ['images' => ['python'], 'description' => 'Salah satu bahasa pemrograman?', 'answers' => ['python']],
            ['images' => ['visual', 'studio', 'code'], 'description' => 'Suatu aplikasi yang digunakan para programmer', 'answers' => ['visual studio code', 'visualstudiocode', 'vscode', 'vs code']],
            ['images' => ['github'], 'description' => 'Logo apakah ini?', 'answers' => ['github']],
            ['images' => ['debug', 'code'], 'description' => 'Suatu proses dalam mencari error?', 'answers' => ['debugging', 'debug']],
            ['images' => ['copas'], 'description' => 'Kegunaan tombol ini?', 'answers' => ['copy paste', 'copypaste']],
            ['images' => ['codie'], 'description' => 'Siapakah ini??', 'answers' => ['codie']],
        ];

        foreach ($questions as $index => $question) {
            DataTraceQuestion::updateOrCreate(
                ['order' => $index + 1],
                [
                    'description' => $question['description'],
                    'answers' => $question['answers'],
                    'images' => $question['images'],
                ],
            );
        }
    }
}
