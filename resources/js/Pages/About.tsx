import Button from '@/Components/global/Button';
import SeeDetailsButton from '../assets/svgs/SeeDetailsButtonTest.svg?react';
export default function About() {
    return (
        <div className="bg h-screen w-screen">
            <div className="transition-300 absolute z-0 h-full w-full bg-[#7C131E] opacity-70 ease-in"></div>
            <div className="flex flex-col gap-2">
                <div className="font-noto relative z-20 pt-32">
                    Font noto nanti dipakai buat heading, kalau ada
                    {/* cara pakai component button */}
                    <Button
                        Icon={SeeDetailsButton}
                        onClick={() => alert('Halo, semangat interface!^_^')}
                        iconClassName="w-28 h-8 "
                        ariaLabel="test"
                    />
                </div>
                <div className="font-arsenal relative z-20 pt-4 text-white">
                    Font arsenal nanti dipakai buat body
                </div>
            </div>
        </div>
    );
}
