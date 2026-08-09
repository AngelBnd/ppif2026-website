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
    aboutPage: 0.2,
};

const cache = new Map<SfxName, HTMLAudioElement>();

export function playSfx(name: SfxName) {
    let audio = cache.get(name);
    if (!audio) {
        audio = new Audio(`/audio/${name}.wav`);
        audio.volume = VOLUMES[name];
        audio.preload = 'auto';
        cache.set(name, audio);
    }
    audio.currentTime = 0;
    audio.play().catch(() => {
        // ignore autoplay/user-interaction errors
    });
}
