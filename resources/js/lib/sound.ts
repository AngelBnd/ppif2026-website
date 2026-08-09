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

const PLAY_THROUGH: Set<SfxName> = new Set(['hoverButton']);

export function playSfx(name: SfxName) {
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

    audio.currentTime = 0;
    audio.play().catch(() => {
        // ignore autoplay/user-interaction errors
    });
}
