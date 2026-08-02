import BottomFrame from '@/Components/global/BottomBar';
import Navbar from '@/Components/global/Navbar';
import OrientationLayout from '@/Components/global/OrientationLayout';
import PageTransition from '@/Components/global/PageTransition';
import { Suspense, lazy, type ReactNode } from 'react';

// Lazy so three.js + GLTFLoader split into their own chunk instead of riding
// along in the shared layout bundle on every page.
const ModelBackground = lazy(
    () => import('@/Components/three/ModelBackground'),
);

type BackgroundPreset = 'home' | 'about' | 'timeline' | 'contact';

type AppLayoutProps = {
    children: ReactNode;
    backgroundPreset?: BackgroundPreset;
    showBackground?: boolean;
};

export default function AppLayout({
    children,
    backgroundPreset = 'home',
    showBackground = true,
}: AppLayoutProps) {
    return (
        <OrientationLayout>
            <div className="relative min-h-screen overflow-hidden bg-[#0d0f13] text-white">
                {showBackground && (
                    <Suspense fallback={null}>
                        <ModelBackground preset={backgroundPreset} />
                    </Suspense>
                )}

                <div className="relative z-10">
                    <Navbar />
                    <BottomFrame />
                    <PageTransition />

                    <main className="min-h-screen">{children}</main>
                </div>
            </div>
        </OrientationLayout>
    );
}
