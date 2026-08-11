import InputBorderBottom from '@/assets/games/hub/InputBorderBottomSVG.svg?react';
import InputUniqueCodeSVG from '@/assets/games/hub/InputUniqueCodeSVG.svg?react';
import OKButton from '@/assets/games/hub/OkButtonSVG.svg?react';
import RedStreakGame from '@/assets/games/hub/RedStreakGame.svg?react';
import Button from '@/Components/global/Button';
import { playSfx } from '@/lib/sound';
import { joinTeam } from '@/services/gameApi';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';

type Props = {
    onJoined: () => void;
};

type CodeInputProps = {
    length?: number;
    onComplete?: (value: string) => void;
    inputBgRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
};

function CodeInput({ length = 6, onComplete, inputBgRefs }: CodeInputProps) {
    const [values, setValues] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const inputValue = e.target.value;
        const char = inputValue.slice(-1).toUpperCase();

        if (char) {
            playSfx('input');
        }

        const newValues = [...values];
        newValues[index] = char;
        setValues(newValues);

        if (char && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        const finalValue = newValues.join('');

        if (finalValue.length === length && !newValues.includes('')) {
            onComplete?.(finalValue);
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === 'Backspace' && values[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData('text')
            .slice(0, length)
            .toUpperCase()
            .split('');

        const newValues = Array(length).fill('');

        pasted.forEach((char, index) => {
            newValues[index] = char;
        });

        setValues(newValues);

        const nextIndex = Math.min(pasted.length, length - 1);
        inputRefs.current[nextIndex]?.focus();

        if (pasted.length === length) {
            onComplete?.(newValues.join(''));
        }
    };
    return (
        <div className="flex gap-4">
            {values.map((value, index) => (
                <div key={index} className="group relative h-32 w-16">
                    {/* Black focus background */}
                    <div className="pointer-events-none absolute inset-0 z-0 bg-[#0A0C0F] opacity-0 [clip-path:polygon(15%_0%,100%_0%,90%_100%,0%_100%)] group-focus-within:opacity-100" />

                    {/* Green success flash background */}
                    <div
                        ref={(el) => {
                            inputBgRefs.current[index] = el;
                        }}
                        className="pointer-events-none absolute inset-0 z-[1] bg-green-500 opacity-0 [clip-path:polygon(15%_0%,100%_0%,90%_100%,0%_100%)]"
                    />

                    <input
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        value={value}
                        maxLength={1}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="relative z-10 h-full w-full appearance-none border-0 bg-transparent text-center font-arsenal text-[3rem] font-bold text-white outline-none focus:outline-none focus:ring-0"
                    />

                    <InputBorderBottom className="pointer-events-none absolute bottom-2 left-2 z-20 h-auto w-[70%]" />
                </div>
            ))}
        </div>
    );
}
export default function UniqueCodeForm({ onJoined }: Props) {
    const [uniqueCode, setUniqueCode] = useState('');
    const [error, setError] = useState('');

    const formRef = useRef<HTMLDivElement | null>(null);
    const inputBgRefs = useRef<Array<HTMLDivElement | null>>([]);
    const redStreakRef = useRef<SVGSVGElement | null>(null);
    const inputSvgRef = useRef<SVGSVGElement | null>(null);
    const codeInputWrapRef = useRef<HTMLDivElement | null>(null);
    const btnWrapRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const redStreak = redStreakRef.current;
        const inputSvg = inputSvgRef.current;
        const codeInputWrap = codeInputWrapRef.current;
        const btnWrap = btnWrapRef.current;

        if (!inputSvg || !codeInputWrap || !btnWrap) return;

        const ctx = gsap.context(() => {
            gsap.set(redStreak, { clipPath: 'inset(0% 100% 0% 0%)' });
            gsap.set(inputSvg, { x: -120, opacity: 0 });
            gsap.set([codeInputWrap, btnWrap], { x: -80, opacity: 0 });

            const tl = gsap.timeline({ delay: 0.3 });

            tl.to(redStreak, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 0.7,
                ease: 'power2.out',
            })
                .to(
                    inputSvg,
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'back.out(1.2)',
                    },
                    '-=0.35',
                )
                .to(
                    [codeInputWrap, btnWrap],
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.45,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                    '-=0.3',
                );
        });

        return () => ctx.revert();
    }, []);

    const handleJoin = async () => {
        try {
            setError('');

            await joinTeam(uniqueCode);

            playSfx('inputSuccess');

            const inputBgs = inputBgRefs.current.filter(Boolean);

            gsap.fromTo(
                inputBgs,
                {
                    backgroundColor: '#12C898',
                    opacity: 0,
                },
                {
                    backgroundColor: '#12C898',
                    opacity: 1,
                    duration: 0.18,
                    repeat: 2,
                    yoyo: true,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        onJoined();
                    },
                },
            );
        } catch (error) {
            setError('Invalid unique code.');
            playSfx('inputError');

            if (formRef.current) {
                gsap.fromTo(
                    formRef.current,
                    { x: 0 },
                    {
                        x: 14,
                        duration: 0.06,
                        repeat: 5,
                        yoyo: true,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            gsap.set(formRef.current, { x: 0 });
                        },
                    },
                );
            }

            setInterval(() => {
                setError('');
            }, 4000);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center text-white">
            <div className="absolute h-full w-full bg-[#0A0C0F] opacity-35" />

            <RedStreakGame ref={redStreakRef} className="absolute h-auto" />

            <div
                ref={formRef}
                className="absolute -ml-6 mt-16 flex -rotate-[9deg] items-center space-x-16"
            >
                <InputUniqueCodeSVG
                    ref={inputSvgRef}
                    className="auto h-auto w-[35rem]"
                />
                <div ref={codeInputWrapRef}>
                    <CodeInput
                        length={5}
                        inputBgRefs={inputBgRefs}
                        onComplete={(value) => {
                            setUniqueCode(value);
                            setError('');
                        }}
                    />
                </div>

                <div ref={btnWrapRef}>
                    <Button
                        onClick={() => {
                            handleJoin();
                        }}
                        Icon={OKButton}
                        iconClassName="w-full h-auto block"
                        className="w-[12rem]"
                    />
                </div>

                {error && (
                    <p className="absolute bottom-[10%] left-1/2 z-[99] -translate-x-1/2 font-arsenal text-3xl font-bold text-red-500">
                        {error}
                    </p>
                )}
            </div>
        </main>
    );
}
