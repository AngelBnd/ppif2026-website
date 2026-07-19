import type { GameSlug } from './games';

export type GroupMockData = {
    teamId: number;
    name: string;
    code: string;
    fragments: Record<GameSlug, string[]>;
    revealed_indices: number[];
};

export type FragmentSet = {
    teamId: number;
    uniqueCode: string;
    finalAnswer: string;
    fragments: Record<GameSlug, string[]>;
};

export const groupMockData: GroupMockData[] = [
    {
        teamId: 1,
        name: 'Stella',
        code: 'E64A4',
        fragments: {
            'signal-decoder': ['L', 'A'],
            'data-trace': ['E', 'T'],
            'core-logic-test': ['S', 'L'],
            'reconstruct-identity': [],
        },
        revealed_indices: [2, 4],
    },
    {
        teamId: 2,
        name: 'Nexus',
        code: '8C692',
        fragments: {
            'signal-decoder': ['X', 'N'],
            'data-trace': ['E', 'S'],
            'core-logic-test': ['U'],
            'reconstruct-identity': [],
        },
        revealed_indices: [2],
    },
    {
        teamId: 3,
        name: 'Cosmo',
        code: '0C437',
        fragments: {
            'signal-decoder': ['O', 'S'],
            'data-trace': ['O', 'M'],
            'core-logic-test': ['C'],
            'reconstruct-identity': [],
        },
        revealed_indices: [1],
    },
    {
        teamId: 4,
        name: 'Nebula',
        code: '9DE3D',
        fragments: {
            'signal-decoder': ['N', 'B'],
            'data-trace': ['E', 'L'],
            'core-logic-test': ['U', 'A'],
            'reconstruct-identity': [],
        },
        revealed_indices: [1, 4],
    },
    {
        teamId: 5,
        name: 'Petra',
        code: '6C397',
        fragments: {
            'signal-decoder': ['E', 'A'],
            'data-trace': ['T', 'P'],
            'core-logic-test': ['R'],
            'reconstruct-identity': [],
        },
        revealed_indices: [1],
    },
    {
        teamId: 6,
        name: 'Sirius',
        code: 'E67D9',
        fragments: {
            'signal-decoder': ['I', 'S'],
            'data-trace': ['S', 'U'],
            'core-logic-test': ['R', 'I'],
            'reconstruct-identity': [],
        },
        revealed_indices: [1, 4],
    },
    {
        teamId: 7,
        name: 'Astreon',
        code: '24595',
        fragments: {
            'signal-decoder': ['A', 'T', 'O'],
            'data-trace': ['S', 'E'],
            'core-logic-test': ['R', 'N'],
            'reconstruct-identity': [],
        },
        revealed_indices: [0, 3],
    },
    {
        teamId: 8,
        name: 'Draco',
        code: '279F6',
        fragments: {
            'signal-decoder': ['C', 'A'],
            'data-trace': ['D', 'O'],
            'core-logic-test': ['R'],
            'reconstruct-identity': [],
        },
        revealed_indices: [1],
    },
    {
        teamId: 9,
        name: 'Lunar',
        code: '7FF3B',
        fragments: {
            'signal-decoder': ['A', 'R'],
            'data-trace': ['L', 'N'],
            'core-logic-test': ['U'],
            'reconstruct-identity': [],
        },
        revealed_indices: [3],
    },
    {
        teamId: 10,
        name: 'Linus',
        code: '5E1BE',
        fragments: {
            'signal-decoder': ['S', 'U'],
            'data-trace': ['N', 'I'],
            'core-logic-test': ['L'],
            'reconstruct-identity': [],
        },
        revealed_indices: [2],
    },
    {
        teamId: 11,
        name: 'Helios',
        code: 'DA12B',
        fragments: {
            'signal-decoder': ['O', 'E'],
            'data-trace': ['H', 'L'],
            'core-logic-test': ['I', 'S'],
            'reconstruct-identity': [],
        },
        revealed_indices: [0, 4],
    },
    {
        teamId: 12,
        name: 'Orion',
        code: '7E1AD',
        fragments: {
            'signal-decoder': ['I', 'N'],
            'data-trace': ['O', 'O'],
            'core-logic-test': ['R'],
            'reconstruct-identity': [],
        },
        revealed_indices: [3],
    },
    {
        teamId: 13,
        name: 'Terra',
        code: '9C557',
        fragments: {
            'signal-decoder': ['E', 'R'],
            'data-trace': ['R', 'T'],
            'core-logic-test': ['A'],
            'reconstruct-identity': [],
        },
        revealed_indices: [0],
    },
    {
        teamId: 14,
        name: 'Aster',
        code: 'E48AA',
        fragments: {
            'signal-decoder': ['S', 'A'],
            'data-trace': ['R', 'E'],
            'core-logic-test': ['T'],
            'reconstruct-identity': [],
        },
        revealed_indices: [3],
    },
    {
        teamId: 15,
        name: 'Starla',
        code: '135DA',
        fragments: {
            'signal-decoder': ['R', 'L'],
            'data-trace': ['T', 'A'],
            'core-logic-test': ['S', 'A'],
            'reconstruct-identity': [],
        },
        revealed_indices: [2, 4],
    },
    {
        teamId: 16,
        name: 'Gamma',
        code: '5A4B5',
        fragments: {
            'signal-decoder': ['M', 'M'],
            'data-trace': ['A', 'G'],
            'core-logic-test': ['A'],
            'reconstruct-identity': [],
        },
        revealed_indices: [0, 5],
    },
    {
        teamId: 17,
        name: 'Pandora',
        code: 'E55C2',
        fragments: {
            'signal-decoder': ['A', 'O', 'R'],
            'data-trace': ['P', 'N'],
            'core-logic-test': ['A', 'D'],
            'reconstruct-identity': [],
        },
        revealed_indices: [2, 6],
    },
    {
        teamId: 18,
        name: 'Alpha',
        code: '61322',
        fragments: {
            'signal-decoder': ['P', 'H'],
            'data-trace': ['L', 'A'],
            'core-logic-test': ['A'],
            'reconstruct-identity': [],
        },
        revealed_indices: [3],
    },
    {
        teamId: 19,
        name: 'Apollo',
        code: 'A6C3E',
        fragments: {
            'signal-decoder': ['P', 'L'],
            'data-trace': ['O', 'L'],
            'core-logic-test': ['A', 'P'],
            'reconstruct-identity': [],
        },
        revealed_indices: [1, 4],
    },
    {
        teamId: 20,
        name: 'Atlas',
        code: 'A6567',
        fragments: {
            'signal-decoder': ['T', 'L'],
            'data-trace': ['A', 'A'],
            'core-logic-test': ['S'],
            'reconstruct-identity': [],
        },
        revealed_indices: [2],
    },
    {
        teamId: 21,
        name: 'Ophelia',
        code: '25546',
        fragments: {
            'signal-decoder': ['P', 'H'],
            'data-trace': ['E', 'L', 'O'],
            'core-logic-test': ['I', 'A'],
            'reconstruct-identity': [],
        },
        revealed_indices: [1, 3],
    },
    {
        teamId: 22,
        name: 'Hydra',
        code: '0A79D',
        fragments: {
            'signal-decoder': ['A', 'H'],
            'data-trace': ['R', 'Y'],
            'core-logic-test': ['D'],
            'reconstruct-identity': [],
        },
        revealed_indices: [3],
    },
    {
        teamId: 23,
        name: 'Carina',
        code: '75DEB',
        fragments: {
            'signal-decoder': ['A', 'I'],
            'data-trace': ['A', 'C'],
            'core-logic-test': ['R', 'N'],
            'reconstruct-identity': [],
        },
        revealed_indices: [0, 5],
    },
    {
        teamId: 24,
        name: 'Kepler',
        code: '690B0',
        fragments: {
            'signal-decoder': ['R', 'E'],
            'data-trace': ['E', 'K'],
            'core-logic-test': ['P', 'L'],
            'reconstruct-identity': [],
        },
        revealed_indices: [1, 4],
    },
];
export const mockCompletedGames: Record<number, GameSlug[]> = {
    1: [],
    2: [],
};

export const mockFragments: FragmentSet[] = [
    {
        teamId: 1,
        uniqueCode: 'X7K9',
        finalAnswer: 'UNITY',
        fragments: {
            'signal-decoder': ['U', 'N'],
            'data-trace': ['I', 'T'],
            'core-logic-test': ['Y'],
            'reconstruct-identity': [],
        },
    },
    {
        teamId: 2,
        uniqueCode: 'A2P5',
        finalAnswer: 'HOPE',
        fragments: {
            'signal-decoder': ['H', 'O'],
            'data-trace': ['P'],
            'core-logic-test': ['E'],
            'reconstruct-identity': [],
        },
    },
];
