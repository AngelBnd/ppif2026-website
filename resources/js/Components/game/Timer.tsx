import { useEffect, useRef, useState } from 'react';

type TimerProps = {
    initialSeconds: number;
    onTimeUp: () => void;
    isRunning?: boolean;
    className?: string;
};

export default function Timer({
    initialSeconds,
    onTimeUp,
    isRunning = true,
    className = '',
}: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const hasEndedRef = useRef(false);

    useEffect(() => {
        setTimeLeft(initialSeconds);
        hasEndedRef.current = false;
    }, [initialSeconds]);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);

                    if (!hasEndedRef.current) {
                        hasEndedRef.current = true;
                        onTimeUp();
                    }

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className={`text-3xl font-bold ${className}`}>{formattedTime}</div>
    );
}
