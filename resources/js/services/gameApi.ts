import type { GameSlug } from '@/data/games';

/**
 * Real backend client for the PPIF 2026 game. Replaces the mock in
 * services/mockGameApi.ts. Uses native fetch with Laravel's session cookie +
 * CSRF token, so it needs no extra dependencies.
 *
 * The team is authenticated by a server session opened at /join, so requests
 * never send a team id — the server resolves the team from the session.
 */

/** Secret-free view of the joined team (the answer word is never included). */
export type TeamPublic = {
    id: number;
    code: string;
    name_length: number;
    revealed_indices: number[];
    /** { "2": "E", "4": "L" } — only the free/pre-filled positions. */
    revealed_letters: Record<string, string>;
    completed_games: GameSlug[];
    total_duration_ms: number;
};

export type SignalDecoderClue = {
    num: number;
    row: number;
    col: number;
    word: string;
    clue: string;
};

export type SignalDecoderQuestions = {
    across: SignalDecoderClue[];
    down: SignalDecoderClue[];
};

export type DataTraceQuestionData = {
    order: number;
    description: string;
    answers: string[];
    images: string[];
};

export type CoreLogicQuestionData = {
    order: number;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
};

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

function getXsrfToken(): string {
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

async function apiRequest<T>(
    method: 'GET' | 'POST',
    path: string,
    body?: unknown,
): Promise<T> {
    const headers: Record<string, string> = {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    };

    const token = getXsrfToken();
    if (token) headers['X-XSRF-TOKEN'] = token;

    const init: RequestInit = {
        method,
        headers,
        credentials: 'same-origin',
    };

    if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
        init.body = JSON.stringify(body);
    }

    const response = await fetch(path, init);

    if (!response.ok) {
        let message = 'Request failed.';
        try {
            const data = await response.json();
            message =
                data?.message ||
                data?.errors?.code?.[0] ||
                data?.errors?.guess?.[0] ||
                message;
        } catch {
            // non-JSON error body, keep the default message
        }
        throw new ApiError(message, response.status);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return (await response.json()) as T;
}

/**
 * Validate a unique code and open the team session. Mirrors the old
 * mockJoinTeam: also stores teamId/uniqueCode in sessionStorage for the UI.
 */
export async function joinTeam(uniqueCode: string): Promise<TeamPublic> {
    const { team } = await apiRequest<{ team: TeamPublic }>(
        'POST',
        '/api/teams/join',
        { code: uniqueCode },
    );

    sessionStorage.setItem('teamId', String(team.id));
    sessionStorage.setItem('uniqueCode', team.code);

    return team;
}

/** Secret-free snapshot of the joined team. */
export async function getMyTeam(): Promise<TeamPublic> {
    const { team } = await apiRequest<{ team: TeamPublic }>(
        'GET',
        '/api/teams/me',
    );
    return team;
}

/** Games this team has already finished. */
export async function getCompletedGames(): Promise<GameSlug[]> {
    const team = await getMyTeam();
    return team.completed_games;
}

/**
 * Start (or restart) a game's server-side timer. Call when the game screen
 * opens. Best-effort: a failure here only affects timing, not playability.
 */
export async function startGame(gameSlug: GameSlug): Promise<void> {
    try {
        await apiRequest('POST', `/api/games/${gameSlug}/start`);
    } catch {
        // ignore — /complete still records a (short) duration as a fallback
    }
}

/**
 * Fetch a puzzle game's question content. Only reachable once the game is
 * unlocked for the joined team (server-enforced, same as start/complete).
 */
export async function getGameQuestions<T>(gameSlug: GameSlug): Promise<T> {
    return apiRequest<T>('GET', `/api/games/${gameSlug}/questions`);
}

/**
 * Finish one of the three puzzle games. The payload carries whatever proof of
 * completion the game needs (MCQ answer indices, crossword grid, quiz answers) —
 * the server always re-checks it against its own answer key before accepting.
 * Stops the timer server-side and returns the unlocked fragment letters.
 */
export async function completeGame(
    gameSlug: GameSlug,
    payload?: Record<string, unknown>,
): Promise<{ letters: string[]; completedGames: GameSlug[] }> {
    const data = await apiRequest<{
        fragment: { letters: string[] };
        completed_games: GameSlug[];
        duration_ms: number;
    }>('POST', `/api/games/${gameSlug}/complete`, payload);

    return {
        letters: data.fragment.letters,
        completedGames: data.completed_games,
    };
}

/**
 * Validate a Reconstruct Identity guess on the server. The answer word is only
 * returned when the guess is correct.
 */
export async function guessReconstruct(
    guess: string,
): Promise<{ correct: boolean; name?: string; total_duration_ms?: number }> {
    return apiRequest('POST', '/api/games/reconstruct-identity/guess', {
        guess,
    });
}

/** Reveal the answer word — only works after Reconstruct Identity is solved. */
export async function getRevealedName(): Promise<string> {
    const { name } = await apiRequest<{ name: string }>(
        'GET',
        '/api/teams/me/reveal',
    );
    return name;
}

/** Leave the team (clears the server session and local UI state). */
export async function leaveTeam(): Promise<void> {
    try {
        await apiRequest('POST', '/api/teams/logout');
    } finally {
        sessionStorage.removeItem('teamId');
        sessionStorage.removeItem('uniqueCode');
    }
}
