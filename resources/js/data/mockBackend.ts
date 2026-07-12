import type { GameSlug } from './games';

export type GroupMockData = {
    no: number;
    name: string;
    code: string;
    activities: [string, string, string];
    assemble: string;
};

export type FragmentSet = {
    teamId: number;
    uniqueCode: string;
    finalAnswer: string;
    fragments: Record<GameSlug, string[]>;
};

export const groupMockData: GroupMockData[] = [
    {
        no: 1,
        name: 'Stella',
        code: 'E64A4',
        activities: ['L, A', 'E, T', 'S, L'],
        assemble: '_ _ E _ L _',
    },
    {
        no: 2,
        name: 'Nexus',
        code: '8C692',
        activities: ['X, N', 'E, S', 'U'],
        assemble: '_ _ X _ _',
    },
    {
        no: 3,
        name: 'Cosmo',
        code: '0C437',
        activities: ['O, S', 'O, M', 'C'],
        assemble: '_ O _ _ _',
    },
    {
        no: 4,
        name: 'Nebula',
        code: '9DE3D',
        activities: ['N, B', 'E, L', 'U, A'],
        assemble: '_ E _ _ L _',
    },
    {
        no: 5,
        name: 'Petra',
        code: '6C397',
        activities: ['E, A', 'T, P', 'R'],
        assemble: '_ E _ _ _',
    },
    {
        no: 6,
        name: 'Sirius',
        code: 'E67D9',
        activities: ['I, S', 'S, U', 'R, I'],
        assemble: '_ I _ _ U _',
    },
    {
        no: 7,
        name: 'Astreon',
        code: '24595',
        activities: ['A, T, O', 'S, E', 'R, N'],
        assemble: 'A _ _ T _ _ _',
    },
    {
        no: 8,
        name: 'Draco',
        code: '279F6',
        activities: ['C, A', 'D, O', 'R'],
        assemble: '_ R _ _ _',
    },
    {
        no: 9,
        name: 'Lunar',
        code: '7FF3B',
        activities: ['A, R', 'L, N', 'U'],
        assemble: '_ _ _ A _',
    },
    {
        no: 10,
        name: 'Linus',
        code: '5E1BE',
        activities: ['S, U', 'N, I', 'L'],
        assemble: '_ _ N _ _',
    },
    {
        no: 11,
        name: 'Helios',
        code: 'DA12B',
        activities: ['O, E', 'H, L', 'I, S'],
        assemble: 'H _ _ _ O _',
    },
    {
        no: 12,
        name: 'Orion',
        code: '7E1AD',
        activities: ['I, N', 'O, O', 'R'],
        assemble: '_ _ _ O _',
    },
    {
        no: 13,
        name: 'Terra',
        code: '9C557',
        activities: ['E, R', 'R, T', 'A'],
        assemble: 'T _ _ _ _',
    },
    {
        no: 14,
        name: 'Aster',
        code: 'E48AA',
        activities: ['S, A', 'R, E', 'T'],
        assemble: '_ _ _ E _',
    },
    {
        no: 15,
        name: 'Starla',
        code: '135DA',
        activities: ['R, L', 'T, A', 'S, A'],
        assemble: '_ _ A _ L _',
    },
    {
        no: 16,
        name: 'Gamma',
        code: '5A4B5',
        activities: ['M, M', 'A, G', 'A'],
        assemble: 'A _ _ _ _ A',
    },
    {
        no: 17,
        name: 'Pandora',
        code: 'E55C2',
        activities: ['A, O, R', 'P, N', 'A, D'],
        assemble: '_ _ N _ _ _ A',
    },
    {
        no: 18,
        name: 'Alpha',
        code: '61322',
        activities: ['P, H', 'L, A', 'A'],
        assemble: '_ _ _ H _',
    },
    {
        no: 19,
        name: 'Apollo',
        code: 'A6C3E',
        activities: ['P, L', 'O, L', 'A, P'],
        assemble: '_ P _ _ L _',
    },
    {
        no: 20,
        name: 'Atlas',
        code: 'A6567',
        activities: ['T, L', 'A, A', 'S'],
        assemble: '_ _ L _ _',
    },
    {
        no: 21,
        name: 'Ophelia',
        code: '25546',
        activities: ['P, H', 'E, L, O', 'I, A'],
        assemble: '_ P _ E _ _ _',
    },
    {
        no: 22,
        name: 'Hydra',
        code: '0A79D',
        activities: ['A, H', 'R, Y', 'D'],
        assemble: '_ _ _ R _',
    },
    {
        no: 23,
        name: 'Carina',
        code: '75DEB',
        activities: ['A, I', 'A, C', 'R, N'],
        assemble: 'C _ _ _ _ A',
    },
    {
        no: 24,
        name: 'Kepler',
        code: '690B0',
        activities: ['R, E', 'E, K', 'P, L'],
        assemble: '_ E _ _ E _',
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
