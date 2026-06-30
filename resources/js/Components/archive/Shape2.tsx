import * as React from 'react';

interface IconProps {
    className?: string;
}

// className={className}

export default function Shape2({ className = "w-6 h-6" }: IconProps) {
    return (

    <svg className={className} width="2377" height="1179" viewBox="0 0 2377 1179" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M493 1026L4.19219e-07 357.5L445 1179L2376.5 288L2083.5 -2.4432e-06L493 1026Z" fill="#BF1E2E"/>
    </svg>

    );
}