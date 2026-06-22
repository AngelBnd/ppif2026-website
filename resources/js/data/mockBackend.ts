import type { GameSlug } from './games';

export type Team = {
    id: number;
    name: string;
    uniqueCode: string;
};

export type FragmentSet = {
    teamId: number;
    uniqueCode: string;
    finalAnswer: string;
    fragments: Record<GameSlug, string[]>;
};

export const mockTeams: Team[] = [
    {
        id: 1,
        name: 'UNITY',
        uniqueCode: 'X7K9',
    },
    {
        id: 2,
        name: 'HOPE',
        uniqueCode: 'A2P5',
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
