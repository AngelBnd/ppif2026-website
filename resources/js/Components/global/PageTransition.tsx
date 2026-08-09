import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import CircleWipe, { CircleWipeHandle } from './CircleWipe';

export default function PageTransition() {
    const wipeRef = useRef<CircleWipeHandle>(null);
    const isTransitioningRef = useRef(false);
    const pendingVisitRef = useRef<string | null>(null);
    const isCommittingRef = useRef(false);

    useEffect(() => {
        const startCover = (url: string) => {
            isTransitioningRef.current = true;
            pendingVisitRef.current = url;

            wipeRef.current?.leave(() => {
                if (pendingVisitRef.current) {
                    const targetUrl = pendingVisitRef.current;
                    pendingVisitRef.current = null;
                    isCommittingRef.current = true;
                    router.visit(targetUrl);
                }
            });
        };

        const handleBefore = (event: any) => {
            const url = event.detail.visit.url;

            let pathname = '';
            try {
                pathname = new URL(url, window.location.origin).pathname;
            } catch (e) {
                pathname = url;
            }

            if (
                pathname.startsWith('/games') ||
                pathname.startsWith('/api') ||
                pathname === window.location.pathname
            ) {
                return;
            }

            if (isCommittingRef.current) {
                isCommittingRef.current = false;
                return;
            }

            event.preventDefault();

            if (isTransitioningRef.current) {
                pendingVisitRef.current = url;
                return;
            }

            startCover(url);
        };

        const handleNavigate = () => {
            if (!isTransitioningRef.current) return;

            wipeRef.current?.enter(() => {
                isTransitioningRef.current = false;

                if (pendingVisitRef.current) {
                    startCover(pendingVisitRef.current);
                }
            });
        };

        const unregisterBefore = router.on('before', handleBefore);
        const unregisterNavigate = router.on('navigate', handleNavigate);

        return () => {
            unregisterBefore();
            unregisterNavigate();
        };
    }, []);

    return (
        <CircleWipe
            ref={wipeRef}
            initialScale={20}
            fullScale={20}
            duration={1}
        />
    );
}
