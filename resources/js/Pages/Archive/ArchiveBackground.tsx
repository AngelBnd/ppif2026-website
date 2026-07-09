export default function ArchiveBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none overflow-hidden bg-[#08080a]">
            {/* BACKGROUND IMAGE DUMMY */}
            <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920"
                alt="Archive Background Dummy"
                className="h-full w-full object-cover opacity-20 brightness-75 grayscale"
            />
        </div>
    );
}
