import timelineBg from '@/assets/timeline/timeline-bg.webp';

/**
 * Flat, hand-drawn comic-style backdrop for the Timeline page. Swapped in
 * place of the shared 3D <ModelBackground> via AppLayout's
 * `showBackground={false}`, since this view's reference design uses a 2D
 * illustration rather than the rendered train-car model.
 */
export default function TimelineBackground() {
    return (
        <div className="h-screen w-screen">
            <img
                src={timelineBg}
                alt=""
                className="absolute z-0 h-[140%] object-contain object-bottom"
            />
        </div>
    );
}
