export type CameraPreset = 'home' | 'about' | 'timeline' | 'contact';

export const cameraPresets: Record<
    CameraPreset,
    { position: [number, number, number]; lookAt: [number, number, number] }
> = {
    home: {
        position: [10, 4, 1],
        lookAt: [3, 1.5, 1],
    },
    about: {
        position: [3, 1.2, 5],
        lookAt: [0, 0.2, 0],
    },
    timeline: {
        position: [-3, 2, 5],
        lookAt: [0, 0, 0],
    },
    contact: {
        position: [0, 3, 4],
        lookAt: [0, 0, 0],
    },
};
