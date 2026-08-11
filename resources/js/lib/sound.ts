export type SfxName =
    | 'input'
    | 'inputError'
    | 'inputSuccess'
    | 'hoverButton'
    | 'backButton'
    | 'hpGames'
    | 'hpContact'
    | 'aboutPage';

const VOLUMES: Record<SfxName, number> = {
    input: 0.2,
    inputError: 0.2,
    inputSuccess: 0.2,
    hoverButton: 0.1,
    backButton: 0.2,
    hpGames: 0.2,
    hpContact: 0.2,
    aboutPage: 0.18,
};

const cache = new Map<SfxName, HTMLAudioElement>();
const lastPlayedAt = new Map<SfxName, number>();

const PLAY_THROUGH: Set<SfxName> = new Set(['hoverButton']);

// Minimum gap between consecutive plays of a given sfx, in ms.
const COOLDOWNS: Partial<Record<SfxName, number>> = {
    hoverButton: 800,
};

export function playSfx(name: SfxName) {
    const cooldown = COOLDOWNS[name];
    if (cooldown) {
        const last = lastPlayedAt.get(name) ?? 0;
        if (Date.now() - last < cooldown) return;
    }

    let audio = cache.get(name);
    if (!audio) {
        audio = new Audio(`/audio/${name}.wav`);
        audio.volume = VOLUMES[name];
        audio.preload = 'auto';
        cache.set(name, audio);
    }

    if (PLAY_THROUGH.has(name) && !audio.paused && !audio.ended) {
        return;
    }

    lastPlayedAt.set(name, Date.now());
    audio.currentTime = 0;
    audio.play().catch(() => {
        // ignore autoplay/user-interaction errors
    });
}
