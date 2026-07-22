import timelineBg from '@/assets/timeline/timeline-bg.webp';

/**
 * Flat, hand-drawn comic-style backdrop for the Timeline page. Swapped in
 * place of the shared 3D <ModelBackground> via AppLayout's
 * `showBackground={false}`, since this view's reference design uses a 2D
 * illustration rather than the rendered train-car model.
 */
export default function TimelineBackground() {
    return (
        <img
            src={timelineBg}
            alt=""
            className="absolute inset-0 z-0 h-full w-[-10] object-contain object-bottom"
        />
    );
}
