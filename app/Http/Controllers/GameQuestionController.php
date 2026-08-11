<?php

namespace App\Http\Controllers;

use App\Models\CoreLogicQuestion;
use App\Models\DataTraceQuestion;
use App\Models\SignalDecoderClue;
use App\Models\Team;
use App\Support\GameCatalog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GameQuestionController extends Controller
{
    /**
     * Serve a puzzle game's question content. Gated the same way start/complete
     * are: the game must be unlocked for the requesting team.
     */
    public function show(Request $request, string $slug): JsonResponse
    {
        GameCatalog::assertValidSlug($slug);

        $team = $this->team($request);
        GameCatalog::assertUnlocked($team, $slug);

        return match ($slug) {
            GameCatalog::SIGNAL_DECODER => response()->json([
                'across' => $this->clues('across'),
                'down' => $this->clues('down'),
            ]),
            GameCatalog::DATA_TRACE => response()->json(
                DataTraceQuestion::orderBy('order')
                    ->get()
                    ->map(fn (DataTraceQuestion $question) => [
                        'order' => $question->order,
                        'description' => $question->description,
                        'answers' => $question->answers,
                        'images' => $question->images,
                    ])
            ),
            GameCatalog::CORE_LOGIC => response()->json(
                CoreLogicQuestion::orderBy('order')
                    ->get()
                    ->map(fn (CoreLogicQuestion $question) => [
                        'order' => $question->order,
                        'question' => $question->question,
                        'options' => $question->options,
                        'correctIndex' => $question->correct_index,
                        'explanation' => $question->explanation,
                    ])
            ),
            default => abort(404, 'This game has no question content.'),
        };
    }

    /**
     * @return array<int, array{num: int, row: int, col: int, word: string, clue: string}>
     */
    private function clues(string $direction): array
    {
        return SignalDecoderClue::where('direction', $direction)
            ->orderBy('number')
            ->get()
            ->map(fn (SignalDecoderClue $clue) => [
                'num' => $clue->number,
                'row' => $clue->row,
                'col' => $clue->col,
                'word' => $clue->word,
                'clue' => $clue->clue,
            ])
            ->all();
    }

    private function team(Request $request): Team
    {
        return $request->attributes->get('team');
    }
}
