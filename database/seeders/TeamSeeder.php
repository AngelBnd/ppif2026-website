<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Support\GameCatalog;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Seed the 24 groups transcribed from resources/js/data/mockBackend.ts.
     * Fragments are keyed by [signal-decoder, data-trace, core-logic-test];
     * reconstruct-identity has no fragment (it is the final assembly game).
     *
     * Each row: [name, code, revealed_indices, [SD letters], [DT letters], [CLT letters]].
     */
    public function run(): void
    {
        $groups = [
            ['Stella', 'E64A4', [2, 4], ['L', 'A'], ['E', 'T'], ['S', 'L']],
            ['Nexus', '8C692', [2], ['X', 'N'], ['E', 'S'], ['U']],
            ['Cosmo', '0C437', [1], ['O', 'S'], ['O', 'M'], ['C']],
            ['Nebula', '9DE3D', [1, 4], ['N', 'B'], ['E', 'L'], ['U', 'A']],
            ['Petra', '6C397', [1], ['E', 'A'], ['T', 'P'], ['R']],
            ['Sirius', 'E67D9', [1, 4], ['I', 'S'], ['S', 'U'], ['R', 'I']],
            ['Astreon', '24595', [0, 3], ['A', 'T', 'O'], ['S', 'E'], ['R', 'N']],
            ['Draco', '279F6', [1], ['C', 'A'], ['D', 'O'], ['R']],
            ['Lunar', '7FF3B', [3], ['A', 'R'], ['L', 'N'], ['U']],
            ['Linus', '5E1BE', [2], ['S', 'U'], ['N', 'I'], ['L']],
            ['Helios', 'DA12B', [0, 4], ['O', 'E'], ['H', 'L'], ['I', 'S']],
            ['Orion', '7E1AD', [3], ['I', 'N'], ['O', 'O'], ['R']],
            ['Terra', '9C557', [0], ['E', 'R'], ['R', 'T'], ['A']],
            ['Aster', 'E48AA', [3], ['S', 'A'], ['R', 'E'], ['T']],
            ['Starla', '135DA', [2, 4], ['R', 'L'], ['T', 'A'], ['S', 'A']],
            ['Gamma', '5A4B5', [0, 5], ['M', 'M'], ['A', 'G'], ['A']],
            ['Pandora', 'E55C2', [2, 6], ['A', 'O', 'R'], ['P', 'N'], ['A', 'D']],
            ['Alpha', '61322', [3], ['P', 'H'], ['L', 'A'], ['A']],
            ['Apollo', 'A6C3E', [1, 4], ['P', 'L'], ['O', 'L'], ['A', 'P']],
            ['Atlas', 'A6567', [2], ['T', 'L'], ['A', 'A'], ['S']],
            ['Ophelia', '25546', [1, 3], ['P', 'H'], ['E', 'L', 'O'], ['I', 'A']],
            ['Hydra', '0A79D', [3], ['A', 'H'], ['R', 'Y'], ['D']],
            ['Carina', '75DEB', [0, 5], ['A', 'I'], ['A', 'C'], ['R', 'N']],
            ['Kepler', '690B0', [1, 4], ['R', 'E'], ['E', 'K'], ['P', 'L']],
        ];

        foreach ($groups as [$name, $code, $revealedIndices, $signalDecoder, $dataTrace, $coreLogic]) {
            $team = Team::updateOrCreate(
                ['code' => $code],
                ['name' => $name, 'revealed_indices' => $revealedIndices],
            );

            $fragments = [
                GameCatalog::SIGNAL_DECODER => $signalDecoder,
                GameCatalog::DATA_TRACE => $dataTrace,
                GameCatalog::CORE_LOGIC => $coreLogic,
            ];

            foreach ($fragments as $slug => $letters) {
                $team->fragments()->updateOrCreate(
                    ['game_slug' => $slug],
                    ['letters' => $letters],
                );
            }
        }
    }
}
