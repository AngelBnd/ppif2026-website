import * as React from 'react';

interface IconProps {
    className?: string;
}

export default function Shape1({ className = "w-6 h-6" }: IconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 1990 1294"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 832.5L1116.5 1294H1779L1989.5 983.5V799L1472.5 1164.5L20 0L0 832.5Z" 
                fill="currentColor" /* <--- Diubah agar warna fleksibel diatur dari file Archive */
            />
        </svg>
    );
}