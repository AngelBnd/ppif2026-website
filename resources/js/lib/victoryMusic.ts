/**
 * Unlocks an HTMLAudioElement so later `play()` calls work outside a real user
 * gesture. Browsers block audible playback that isn't started by a direct
 * gesture — e.g. victory music triggered from an async server response after
 * the final guess. Playing muted once inside a gesture unlocks the element for
 * audible playback afterwards (the pattern Chrome recommends for autoplay).
 */
export function primeAudioElement(audio: HTMLAudioElement): void {
    if (audio.dataset.primed) return;

    const wasMuted = audio.muted;
    const wasPlaying = !audio.paused;

    audio.muted = true;
    audio.currentTime = 0;
    audio
        .play()
        .then(() => {
            if (!wasPlaying) {
                audio.pause();
                audio.currentTime = 0;
            }
            audio.muted = wasMuted;
            audio.dataset.primed = 'true';
        })
        .catch(() => {
            audio.muted = wasMuted;
        });
}
