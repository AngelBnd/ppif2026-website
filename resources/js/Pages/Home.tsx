import { Link } from '@inertiajs/react';

export default function Home() {
    return (
        <div>
            <Link href="/games/story" data-click-sound>
                {/* <div className="absolute right-[20rem] top-[28rem] h-32 w-32 cursor-pointer bg-red-500 p-4 font-bold text-white">
                    Placeholder button buat pergi ke gamesnya
                </div> */}
            </Link>
        </div>
    );
}
