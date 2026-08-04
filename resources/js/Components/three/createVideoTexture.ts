import { SRGBColorSpace, VideoTexture } from 'three';

export default function createVideoTexture(src: string) {
    const video = document.createElement('video');
    video.src = src;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.style.display = 'none';
    document.body.appendChild(video);
    video.play().catch((err) => {
        console.warn(`[tv] video autoplay blocked (${src}):`, err);
    });
    video.addEventListener('error', () =>
        console.error(`[tv] video failed to load (${src}):`, video.error),
    );

    const texture = new VideoTexture(video);
    texture.colorSpace = SRGBColorSpace;
    texture.center.set(0.5, 0.5);
    texture.rotation = Math.PI / 2;
    texture.repeat.set(5, 5);
    texture.offset.set(0.6, 0);

    return { video, texture };
}
