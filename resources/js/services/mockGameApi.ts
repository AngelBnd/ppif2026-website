import type { GameSlug } from '@/data/games';
import { groupMockData, mockCompletedGames } from '@/data/mockBackend';

// utk validasi unique code
export async function mockJoinTeam(uniqueCode: string) {
    const team = groupMockData.find(
        (team) => team.code.toLowerCase() === uniqueCode.toLowerCase(),
    );

    if (!team) {
        throw new Error('Invalid team name or unique code.');
    }

    sessionStorage.setItem('teamId', String(team.teamId));
    sessionStorage.setItem('uniqueCode', team.code);

    return team;
}

// buat kembaliin tim sesuai id, dipakai buat reconstruct identity buat ambil namanya aja sbg target word yang harus ditemuin sama playernya
// nanti boleh dibikin supaya diambil nama dan revealed indices timnya aja daripada semua properti
export async function findTeam(teamId: number) {
    return groupMockData.find((item) => item.teamId === teamId);
}

// buat kembaliin games apa aja yang udah dikelarin tim dgn id tsb
export async function mockGetCompletedGames(teamId: number) {
    return mockCompletedGames[teamId] ?? [];
}

// buat push ke array pny teamid tsb dgn game yg udh dikelarin
export async function mockCompleteGame(teamId: number, gameSlug: GameSlug) {
    if (!mockCompletedGames[teamId]) {
        mockCompletedGames[teamId] = [];
    }

    if (!mockCompletedGames[teamId].includes(gameSlug)) {
        mockCompletedGames[teamId].push(gameSlug);
    }

    return mockCompletedGames[teamId];
}

// buat fragmen tiap penyelesaian game
export async function mockGetFragment(teamId: number, gameSlug: GameSlug) {
    const fragmentSet = groupMockData.find((item) => item.teamId === teamId);

    if (!fragmentSet) {
        throw new Error('Fragment not found.');
    }

    return {
        letters: fragmentSet.fragments[gameSlug],
    };
}
