import Button from '@/Components/global/Button';
import StartR from '@/assets/games/hub/StartRecoveryButton.svg?react';

type Props = {
    onJoined: () => void;
};

export default function ErrorGimmick({ onJoined }: Props) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0A0C0F] text-white">
            <div className="flex flex-col items-center gap-8 text-center">
                <div className="relative">
                    <h1 className="font-arsenal text-7xl font-bold tracking-widest text-red-600">
                        DATA CORRUPTED RECOVERY REQUIRED
                    </h1>
                </div>

                <Button
                    onClick={onJoined}
                    Icon={StartR}
                    className="w-[20rem]"
                    iconClassName="w-full h-full block"
                ></Button>
            </div>
        </main>
    );
}
