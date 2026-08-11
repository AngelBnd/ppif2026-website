<?php

namespace Tests\Feature;

use App\Models\DataTraceQuestion;
use App\Models\SignalDecoderClue;
use App\Models\Team;
use App\Support\GameCatalog;
use Database\Seeders\CoreLogicQuestionSeeder;
use Database\Seeders\DataTraceQuestionSeeder;
use Database\Seeders\SignalDecoderClueSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GameFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            SignalDecoderClueSeeder::class,
            DataTraceQuestionSeeder::class,
            CoreLogicQuestionSeeder::class,
        ]);
    }

    /**
     * A correct Signal Decoder grid submission, built from the seeded clues.
     */
    private function signalDecoderSolution(): array
    {
        $values = [];

        foreach (SignalDecoderClue::all() as $clue) {
            foreach (str_split($clue->word) as $offset => $letter) {
                $row = $clue->direction === 'across' ? $clue->row : $clue->row + $offset;
                $col = $clue->direction === 'across' ? $clue->col + $offset : $clue->col;
                $values["{$row}-{$col}"] = $letter;
            }
        }

        return $values;
    }

    /**
     * A correct Data Trace answer submission, built from the seeded questions.
     */
    private function dataTraceSolution(): array
    {
        return DataTraceQuestion::orderBy('order')
            ->get()
            ->map(fn (DataTraceQuestion $question) => $question->answers[0])
            ->all();
    }

    /**
     * Create a team with the three puzzle fragments, mirroring the seeder shape.
     * "Stella" (len 6), revealed indices 2 & 4 -> letters E and L.
     */
    private function makeTeam(array $overrides = []): Team
    {
        $team = Team::create(array_merge([
            'name' => 'Stella',
            'code' => 'ABC12',
            'revealed_indices' => [2, 4],
        ], $overrides));

        $team->fragments()->createMany([
            ['game_slug' => GameCatalog::SIGNAL_DECODER, 'letters' => ['L', 'A']],
            ['game_slug' => GameCatalog::DATA_TRACE, 'letters' => ['E', 'T']],
            ['game_slug' => GameCatalog::CORE_LOGIC, 'letters' => ['S', 'L']],
        ]);

        return $team;
    }

    private function actingAsTeam(Team $team): self
    {
        return $this->withSession(['team_id' => $team->id]);
    }

    public function test_join_with_valid_code_opens_session_and_never_leaks_the_name(): void
    {
        $team = $this->makeTeam();

        // Codes are case-insensitive (normalised to uppercase).
        $response = $this->postJson('/api/teams/join', ['code' => 'abc12']);

        $response->assertOk()
            ->assertJsonPath('team.id', $team->id)
            ->assertJsonPath('team.name_length', 6)
            ->assertJsonPath('team.revealed_letters.2', 'E')
            ->assertJsonPath('team.revealed_letters.4', 'L')
            // The secret answer word must not appear anywhere in the payload.
            ->assertJsonMissingPath('team.name');

        $this->assertStringNotContainsString('Stella', $response->getContent());
        $response->assertSessionHas('team_id', $team->id);
    }

    public function test_join_with_invalid_code_is_rejected(): void
    {
        $this->makeTeam();

        $this->postJson('/api/teams/join', ['code' => 'ZZZZZ'])
            ->assertStatus(422);
    }

    public function test_protected_endpoints_require_a_joined_session(): void
    {
        $this->getJson('/api/teams/me')->assertStatus(401);
    }

    public function test_game_order_is_enforced_server_side(): void
    {
        $team = $this->makeTeam();

        // data-trace is locked until signal-decoder is completed.
        $this->actingAsTeam($team)
            ->postJson('/api/games/data-trace/complete')
            ->assertStatus(403);
    }

    public function test_reveal_is_forbidden_until_the_name_is_reconstructed(): void
    {
        $team = $this->makeTeam();

        $this->actingAsTeam($team)
            ->getJson('/api/teams/me/reveal')
            ->assertStatus(403);
    }

    public function test_completing_a_game_returns_its_fragment_and_tracks_progress(): void
    {
        $team = $this->makeTeam();

        $this->actingAsTeam($team)
            ->postJson('/api/games/signal-decoder/complete', ['values' => $this->signalDecoderSolution()])
            ->assertOk()
            ->assertJsonPath('fragment.letters', ['L', 'A'])
            ->assertJsonPath('completed_games', ['signal-decoder']);

        $this->assertDatabaseHas('game_progress', [
            'team_id' => $team->id,
            'game_slug' => 'signal-decoder',
        ]);
    }

    public function test_full_flow_from_join_to_reveal(): void
    {
        $team = $this->makeTeam();

        $this->postJson('/api/teams/join', ['code' => 'ABC12'])->assertOk();

        $this->actingAsTeam($team)
            ->postJson('/api/games/signal-decoder/complete', ['values' => $this->signalDecoderSolution()])
            ->assertJsonPath('fragment.letters', ['L', 'A']);

        $this->actingAsTeam($team)
            ->postJson('/api/games/data-trace/complete', ['answers' => $this->dataTraceSolution()])
            ->assertJsonPath('fragment.letters', ['E', 'T']);

        $this->actingAsTeam($team)
            ->postJson('/api/games/core-logic-test/complete', ['score' => 7])
            ->assertJsonPath('fragment.letters', ['S', 'L']);

        // Core Logic Test accuracy is persisted.
        $this->assertDatabaseHas('game_progress', [
            'team_id' => $team->id,
            'game_slug' => 'core-logic-test',
            'score' => 7,
        ]);

        // A wrong guess reveals nothing.
        $this->actingAsTeam($team)
            ->postJson('/api/games/reconstruct-identity/guess', ['guess' => 'NEXUS'])
            ->assertOk()
            ->assertJsonPath('correct', false)
            ->assertJsonMissingPath('name');

        // The correct guess (case-insensitive) returns the answer word.
        $this->actingAsTeam($team)
            ->postJson('/api/games/reconstruct-identity/guess', ['guess' => 'stella'])
            ->assertOk()
            ->assertJsonPath('correct', true)
            ->assertJsonPath('name', 'Stella');

        // Now, and only now, the name may be revealed for the final screen.
        $this->actingAsTeam($team)
            ->getJson('/api/teams/me/reveal')
            ->assertOk()
            ->assertJsonPath('name', 'Stella');
    }

    public function test_total_time_sums_game_durations_and_excludes_hub_idle(): void
    {
        $team = $this->makeTeam();

        // Freeze at a whole-second boundary so timestamp precision (the columns
        // store whole seconds) can't skew the arithmetic.
        $this->travelTo(now()->startOfSecond());

        // Game 1 takes 2s.
        $this->actingAsTeam($team)->postJson('/api/games/signal-decoder/start');
        $this->travel(2)->seconds();
        $this->actingAsTeam($team)
            ->postJson('/api/games/signal-decoder/complete', ['values' => $this->signalDecoderSolution()]);

        // 10s spent idle choosing the next game on the hub — must NOT be counted.
        $this->travel(10)->seconds();

        // Game 2 takes 3s.
        $this->actingAsTeam($team)->postJson('/api/games/data-trace/start');
        $this->travel(3)->seconds();
        $this->actingAsTeam($team)
            ->postJson('/api/games/data-trace/complete', ['answers' => $this->dataTraceSolution()]);

        // Total = 2s + 3s = 5s. The 10s of hub-idle time is excluded — if it
        // were counted the total would be ~15s. (Delta tolerates whole-second
        // timestamp truncation.)
        $response = $this->actingAsTeam($team)
            ->getJson('/api/teams/me')
            ->assertOk();

        $this->assertEqualsWithDelta(
            5000,
            $response->json('team.total_duration_ms'),
            999,
        );
    }
}
