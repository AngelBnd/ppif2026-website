'use client';
import SBInfor from '@/assets/about/SwitchButton_Informatics.svg?react';
import SBPPIF from '@/assets/about/SwitchButton_PPIF.svg?react';
import { currentInfo } from '@/Pages/About';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

type Props = {
    className: string;
    currentInfo: string;
    setCurrentInfo: (info: currentInfo) => void;
};

export default function InfoSwitcher({
    className,
    currentInfo,
    setCurrentInfo,
}: Props) {
    const sbInforRef = useRef<HTMLDivElement | null>(null);
    const sbPPIFRef = useRef<HTMLDivElement | null>(null);
    const [isCoolingDown, setIsCoolingDown] = useState(false);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const handleChange = () => {
        if (isCoolingDown) return;
        timelineRef.current?.kill();

        setIsCoolingDown(true);

        if (currentInfo === 'informatics') setCurrentInfo('ppif');
        else setCurrentInfo('informatics');

        setTimeout(() => {
            setIsCoolingDown(false);
        }, 1000);
    };

    useEffect(() => {
        const tl = gsap.timeline();
        if (currentInfo === 'informatics') {
            tl.to(sbInforRef.current, {
                rotation: '-=360',
                duration: 0.5,
                ease: 'back.out(1.4)',
            }).to(sbPPIFRef.current, {
                rotation: '0',
                duration: 0.5,
                ease: 'back.out(1.7)',
            });
        } else {
            tl.to(sbPPIFRef.current, {
                rotation: '-=360',
                duration: 0.5,
                ease: 'back.out(1.4)',
            }).to(sbInforRef.current, {
                rotation: '0',
                duration: 0.5,
                ease: 'back.out(1.7)',
            });
        }

        timelineRef.current = tl;

        return () => {
            tl.kill();
        };
    }, [currentInfo]);

    return (
        <div className={className}>
            <button
                onClick={handleChange}
                className="block w-[18vw] overflow-hidden p-0 leading-none transition duration-200 hover:scale-105 active:scale-95"
            >
                <div
                    ref={sbInforRef}
                    className={
                        currentInfo === 'informatics' ? 'block' : 'hidden'
                    }
                >
                    <SBInfor className="block h-auto w-full" />
                </div>

                <div
                    ref={sbPPIFRef}
                    className={currentInfo === 'ppif' ? 'block' : 'hidden'}
                >
                    <SBPPIF className="h-auto w-full" />
                </div>
            </button>
        </div>
    );
}
