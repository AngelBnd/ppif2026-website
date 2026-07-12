import { router } from '@inertiajs/react';
import { TARGET_WORD } from '../ReconstructIdentity/ReconstructIdentityPage';

export default function FinalPage() {
    return (
        <main className="flex min-h-screen items-end justify-end bg-black text-white pb-48 pr-24">
            <section className=" -rotate-12 ">
                <h1 className="-mb-8 font-['Noto_Sans'] uppercase mt-4 text-5xl font-bold -rotate-6 -ml-32">
                    WELCOME TO 
                </h1>

                <h1 className="text-end font-['Noto_Sans'] uppercase mt-4 text-[11rem] font-bold pr-32">
                    PPIF 2026,
                </h1>
                
                <h1 className="-mt-2 text-end font-['Noto_Sans'] uppercase mt-4 text-8xl font-bold">
                    {TARGET_WORD}
                </h1>
            </section>
        </main>
    );
}
