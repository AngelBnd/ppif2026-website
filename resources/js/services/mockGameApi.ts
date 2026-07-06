import type { GameSlug } from '@/data/games';
import {
    groupMockData,
    mockCompletedGames,
    mockFragments,
} from '@/data/mockBackend';

export async function mockJoinTeam(uniqueCode: string) {
    const team = groupMockData.find(
        (team) => team.code.toLowerCase() === uniqueCode.toLowerCase(),
    );

    if (!team) {
        throw new Error('Invalid team name or unique code.');
    }

    sessionStorage.setItem('teamId', String(team.no));
    sessionStorage.setItem('uniqueCode', team.code);

    return team;
}

export async function mockGetCompletedGames(teamId: number) {
    return mockCompletedGames[teamId] ?? [];
}

export async function mockCompleteGame(teamId: number, gameSlug: GameSlug) {
    if (!mockCompletedGames[teamId]) {
        mockCompletedGames[teamId] = [];
    }

    if (!mockCompletedGames[teamId].includes(gameSlug)) {
        mockCompletedGames[teamId].push(gameSlug);
    }

    return mockCompletedGames[teamId];
}

export async function mockGetFragment(teamId: number, gameSlug: GameSlug) {
    const fragmentSet = mockFragments.find((item) => item.teamId === teamId);

    if (!fragmentSet) {
        throw new Error('Fragment not found.');
    }

    return {
        letters: fragmentSet.fragments[gameSlug],
        finalAnswer: fragmentSet.finalAnswer,
    };
}
