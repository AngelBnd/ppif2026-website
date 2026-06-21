import Button from '@/Components/global/Button';
import SeeDetailsButton from '../assets/svgs/SeeDetailsButtonTest.svg?react';
export default function About() {
    return (
        <div className="bg h-screen w-screen">
            <div className="transition-300 absolute z-0 h-full w-full bg-[#7C131E] opacity-70 ease-in"></div>
            <div className="relative z-20 pt-32 text-white">
                INI ABOUT
                {/* cara pakai component button */}
                <Button
                    Icon={SeeDetailsButton}
                    onClick={() => alert('Halo, semangat interface!^_^')}
                    iconClassName="w-20"
                    ariaLabel="test"
                />
            </div>
        </div>
    );
}
