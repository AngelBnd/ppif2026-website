import type { PageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex min-h-screen items-center justify-center bg-[#0d0f13] px-6 text-white">
                <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/5 p-8 text-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="mt-2 text-white/60">
                        Logged in as {auth.user.name} ({auth.user.email})
                    </p>
                    <button
                        onClick={() => router.post('/logout')}
                        className="mt-6 rounded bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => page;
