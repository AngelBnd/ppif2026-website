import * as React from 'react';

export default function ArchiveBackground() {
    return (
        <div className="absolute inset-0 w-full h-full bg-[#08080a] overflow-hidden select-none pointer-events-none z-0">
            
            {/* BACKGROUND IMAGE DUMMY */}
            <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920" 
                alt="Archive Background Dummy" 
                className="w-full h-full object-cover opacity-20 grayscale brightness-75"
            />

        </div>
    );
}