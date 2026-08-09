import Button from '@/Components/global/Button';
import { getRevealedName } from '@/services/gameApi';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import StartR from '../../assets/games/finalPage/start.svg';

import logo from '../../assets/games/finalPage/eror.webp';
import backgroundFinal from '../../assets/games/finalPage/finalPage.webp';
import starLogo from '../../assets/games/finalPage/starEror.webp';

// aset rantai pojok + garis sobekan diagonal
import cornerBL from '../../assets/games/finalPage/chain-corner-bl.webp';
import cornerBR from '../../assets/games/finalPage/chain-corner-br.webp';
import cornerTL from '../../assets/games/finalPage/chain-corner-tl.webp';
import cornerTR from '../../assets/games/finalPage/chain-corner-tr.webp';
import edgeStripeBottom from '../../assets/games/finalPage/edge-stripe-bottom.webp';
import edgeStripeTop from '../../assets/games/finalPage/edge-stripe-top.webp';

// aset judul "DATA CorruPTED / RECOVERY REQUIRED"
import corruptedText from '../../assets/games/finalPage/corrupted.webp';
import dataCard from '../../assets/games/finalPage/Group.webp';
import recoveryRequiredText from '../../assets/games/finalPage/RECOVERY_REQUIRED.webp';

import gsap from 'gsap';

type Props = {
    onJoined: () => void;
};

const SHARD_COUNT = 16;
const FULLSCREEN_SHARD_COUNT = 14;

// Timeline reveal (ms sejak mount):
// - GLITCH_AT  : logo & starLogo baru mulai glitch/error (delay dulu ~3 detik)
// - EDGE_AT    : edge-stripe atas & bawah muncul di posisi
// - CHAIN_AT   : 4 rantai pojok meluncur masuk dari luar layar
// - TEXT_AT    : DATA / CorruPTED / RECOVERY REQUIRED jatuh ke posisi
const GLITCH_AT = 2000;
const EDGE_AT = GLITCH_AT + 3000;
const CHAIN_AT = EDGE_AT + 1000;
const TEXT_AT = CHAIN_AT + 1400;

/** Confetti merah di belakang tiap gambar glitch. Sama persis di semua tempat, jadi cukup didefinisikan sekali. */
function FullscreenShards() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: FULLSCREEN_SHARD_COUNT }, (_, i) => (
                <div key={i} className={`b-fullscreen-shard b-fs-${i + 1}`} />
            ))}
        </div>
    );
}

type GlitchImageProps = {
    src: string;
    alt?: string;
    width: number;
    height: number;
    routeClass?: string;
    shardSize?: number;
};

/** Satu gambar glitch: 16 salinan shard + layer merah + layer dasar + noise, semua meloncat-loncat di dalam box yang teleport. */
function GlitchImage({
    src,
    alt = '',
    width,
    height,
    routeClass = '',
    shardSize,
}: GlitchImageProps) {
    return (
        <section className="flex items-center justify-center gap-6">
            <FullscreenShards />
            <div
                className={`logo-position-jump ${routeClass} -rotate-9 absolute overflow-hidden`}
                style={{ width, height }}
            >
                {Array.from({ length: SHARD_COUNT }, (_, i) => (
                    <img
                        key={i}
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className={`glitch-layer b-glitch-shard b-shard-${i + 1} object-contain ${shardSize ? '' : 'h-full w-full'}`}
                        style={
                            shardSize
                                ? { width: shardSize, height: shardSize }
                                : undefined
                        }
                    />
                ))}
                <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="glitch-layer b-glitch-r h-full w-full object-contain"
                />
                <img
                    src={src}
                    alt={alt}
                    className="glitch-layer b-glitch-base h-full w-full object-contain"
                />
                <div className="b-glitch-noise absolute inset-0" />
            </div>
        </section>
    );
}

// Rute teleport tiap bintang + shrink shard opsional
const STAR_ROUTES: Array<{ routeClass: string; shardSize?: number }> = [
    { routeClass: 'star-route-1' },
    { routeClass: 'star-route-2' },
    { routeClass: 'star-route-3', shardSize: 100 },
    { routeClass: 'star-route-4', shardSize: 200 },
    { routeClass: 'star-route-5', shardSize: 300 },
];

type CornerConfig = {
    src: string;
    sizeClass: string;
    positionClass: string;
    originClass: string;
    flipClass: string;
    hiddenTranslateClass: string;
    revealedTranslateClass: string;
    delayClass: string;
};

const CORNERS: CornerConfig[] = [
    {
        // kiri-atas — masuk dari kiri layar
        src: cornerBR,
        sizeClass: 'w-[60%]',
        positionClass: '-left-64 -rotate-6',
        originClass: 'origin-top',
        flipClass: '',
        hiddenTranslateClass: '-translate-x-[160%]',
        revealedTranslateClass: 'translate-x-0',
        delayClass: 'delay-[0ms]',
    },
    {
        // kanan-atas — masuk dari kanan layar
        src: cornerTR,
        sizeClass: 'w-[42%]',
        positionClass: 'z-[100] -right-36 -top-36',
        originClass: '',
        flipClass: '',
        hiddenTranslateClass: 'translate-x-[160%]',
        revealedTranslateClass: 'translate-x-0',
        delayClass: 'delay-[150ms]',
        // ini ntar dari kanan
    },
    {
        // kiri-bawah — masuk dari bawah layar
        src: cornerBL,
        sizeClass: 'w-[42%]',
        positionClass: '-left-64 -bottom-72',
        originClass: 'origin-left-bottom',
        flipClass: '',
        hiddenTranslateClass: '-translate-x-[160%]',
        revealedTranslateClass: 'translate-x-0',
        delayClass: 'delay-[300ms]',
    },
    {
        // kanan-bawah — masuk dari kanan layar
        src: cornerTL,
        sizeClass: 'w-[42%]',
        positionClass: '-right-64 bottom-80',
        originClass: '',
        flipClass: '',
        hiddenTranslateClass: 'translate-x-[160%]',
        revealedTranslateClass: 'translate-x-0',
        delayClass: 'delay-[450ms]',
        // ini juga dari kanan
    },
];

export default function ErrorGimmick({ onJoined }: Props) {
    const [targetWord, setTargetWord] = useState('');
    const [showGlitch, setShowGlitch] = useState(false);
    const [showEdges, setShowEdges] = useState(false);
    const [showChains, setShowChains] = useState(false);
    const [showText, setShowText] = useState(false);
    const mainRef = useRef(null);

    useEffect(() => {
        getRevealedName()
            .then((name) => setTargetWord(name.toUpperCase()))
            .catch(() => setTargetWord(''));
    }, []);

    useLayoutEffect(() => {
        gsap.set(mainRef.current, { opacity: 0 });
        gsap.to(mainRef.current, { opacity: 1, duration: 1.4 });
    }, []);

    // Timeline staged reveal: edge -> rantai -> judul (DATA / CorruPTED / RECOVERY REQUIRED)
    useEffect(() => {
        const glitchTimer = setTimeout(() => setShowGlitch(true), GLITCH_AT);
        const edgeTimer = setTimeout(() => setShowEdges(true), EDGE_AT);
        const chainTimer = setTimeout(() => setShowChains(true), CHAIN_AT);
        const textTimer = setTimeout(() => setShowText(true), TEXT_AT);
        return () => {
            clearTimeout(glitchTimer);
            clearTimeout(edgeTimer);
            clearTimeout(chainTimer);
            clearTimeout(textTimer);
        };
    }, []);

    return (
        <main
            ref={mainRef}
            className="relative flex min-h-screen items-end justify-end overflow-hidden bg-black text-white"
            style={{
                backgroundImage: `url(${backgroundFinal})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Button
                onClick={onJoined}
                Icon={StartR}
                className="absolute bottom-[20px] right-[20px] z-[10000] w-[14%]"
                iconClassName="w-full h-full block"
            />

            {/* logo & starLogo: glitch/error baru nyala abis GLITCH_AT (delay ~3 detik dulu) */}
            {showGlitch && (
                <>
                    <GlitchImage
                        src={logo}
                        alt="logo"
                        width={800}
                        height={490}
                    />
                    {STAR_ROUTES.map(({ routeClass, shardSize }) => (
                        <GlitchImage
                            key={routeClass}
                            src={starLogo}
                            width={400}
                            height={400}
                            routeClass={routeClass}
                            shardSize={shardSize}
                        />
                    ))}
                </>
            )}

            {/* garis sobekan diagonal atas & bawah — fade + slide tipis, muncul di EDGE_AT */}
            <img
                src={edgeStripeTop}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute right-0 top-0 z-40 w-[70%] transition-all duration-700 ease-out ${
                    showEdges
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-full opacity-0'
                }`}
            />
            <img
                src={edgeStripeBottom}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-0 left-0 z-40 w-[70%] transition-all delay-[100ms] duration-700 ease-out ${
                    showEdges
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-full opacity-0'
                }`}
            />

            {/* 4 rantai pojok — meluncur masuk dari luar layar di CHAIN_AT */}
            {CORNERS.map((c) => (
                <img
                    key={c.positionClass}
                    src={c.src}
                    alt=""
                    aria-hidden="true"
                    className={`pointer-events-none absolute z-50 ${c.sizeClass} ${c.positionClass} ${c.originClass} ${c.flipClass} transition-all ${c.delayClass} duration-700 ease-out ${
                        showChains
                            ? `${c.revealedTranslateClass} opacity-100`
                            : `${c.hiddenTranslateClass} opacity-0`
                    }`}
                />
            ))}

            {/* judul: DATA / CorruPTED / RECOVERY REQUIRED — jatuh dari arah user ke posisi di TEXT_AT */}
            {/* Posisi (left/top/w) masih kira-kira ngikutin referensi JPEG — tinggal edit angkanya di sini kalau belum pas */}
            {showText ? (
                <div className="absolute inset-0 z-[10] bg-[#0A0C0F] opacity-70" />
            ) : (
                <></>
            )}

            <img
                src={dataCard}
                alt="DATA"
                className={`pointer-events-none absolute left-[13%] top-[13%] z-[60] w-[37%] -rotate-2 transition-all delay-[0ms] duration-700 ease-out ${
                    showText ? 'scale-100 opacity-100' : 'scale-[2.6] opacity-0'
                }`}
            />
            <img
                src={corruptedText}
                alt="CorruPTED"
                className={`pointer-events-none absolute left-[27%] top-[20%] z-[60] w-[63%] transition-all delay-[150ms] duration-700 ease-out ${
                    showText ? 'scale-100 opacity-100' : 'scale-[2.6] opacity-0'
                }`}
            />
            <img
                src={recoveryRequiredText}
                alt="RECOVERY REQUIRED"
                className={`pointer-events-none absolute left-[44%] top-[67%] z-[60] w-[37%] transition-all delay-[300ms] duration-700 ease-out ${
                    showText ? 'scale-100 opacity-100' : 'scale-[2.6] opacity-0'
                }`}
            />

            <style>{`
                .glitch-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                @keyframes glitchFlicker {
                    0% { opacity: 1; } 8% { opacity: 0.1; } 16% { opacity: 1; }
                    24% { opacity: 0.3; } 32% { opacity: 1; } 40% { opacity: 0.05; }
                    48% { opacity: 1; } 60% { opacity: 0.4; } 72% { opacity: 1; }
                    84% { opacity: 0.15; } 100% { opacity: 1; }
                }
                @keyframes noiseShift {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(3px); }
                    100% { transform: translateY(-2px); }
                }

                /* logo container: teleports around the page, snap-cut like the rest of the glitch */
                .logo-position-jump {
                    animation: logoPositionJump 6s infinite steps(1);
                }
                @keyframes logoPositionJump {
                    0%   { top: 40%; left: 39%; }
                    10%  { top: 8%;  left: 4%; }
                    20%  { top: 55%; left: 62%; }
                    30%  { top: 12%; left: 58%; }
                    40%  { top: 68%; left: 15%; }
                    50%  { top: 22%; left: 33%; }
                    60%  { top: 45%; left: 5%; }
                    70%  { top: 5%;  left: 45%; }
                    80%  { top: 60%; left: 40%; }
                    90%  { top: 30%; left: 60%; }
                    100% { top: 40%; left: 39%; }
                }

                /* Rute lompatan tiap bintang (snap, discrete jumps) */
                .star-route-1 { animation: starJump1 6s infinite steps(1); }
                .star-route-2 { animation: starJump2 6s infinite steps(1); animation-delay: 0.6s; }
                .star-route-3 { animation: starJump3 6s infinite steps(1); animation-delay: 1.2s; }
                .star-route-4 { animation: starJump4 6s infinite steps(1); animation-delay: 1.8s; }
                .star-route-5 { animation: starJump5 6s infinite steps(1); animation-delay: 2.4s; }

                @keyframes starJump1 {
                    0%   { top: 10%; left: 8%; }
                    20%  { top: 60%; left: 20%; }
                    40%  { top: 30%; left: 55%; }
                    60%  { top: 72%; left: 62%; }
                    80%  { top: 40%; left: 35%; }
                    100% { top: 10%; left: 8%; }
                }
                @keyframes starJump2 {
                    0%   { top: 80%; left: 5%; }
                    20%  { top: 55%; left: 25%; }
                    40%  { top: 25%; left: 48%; }
                    60%  { top: 12%; left: 72%; }
                    80%  { top: 35%; left: 85%; }
                    100% { top: 80%; left: 5%; }
                }
                @keyframes starJump3 {
                    0%   { top: 25%; left: 80%; }
                    20%  { top: 8%; left: 60%; }
                    40%  { top: 45%; left: 40%; }
                    60%  { top: 68%; left: 22%; }
                    80%  { top: 48%; left: 66%; }
                    100% { top: 25%; left: 80%; }
                }
                @keyframes starJump4 {
                    0%   { top: 5%; left: 40%; }
                    20%  { top: 30%; left: 18%; }
                    40%  { top: 60%; left: 42%; }
                    60%  { top: 85%; left: 58%; }
                    80%  { top: 60%; left: 78%; }
                    100% { top: 5%; left: 40%; }
                }
                @keyframes starJump5 {
                    0%   { top: 50%; left: 50%; }
                    20%  { top: 35%; left: 22%; }
                    40%  { top: 18%; left: 46%; }
                    60%  { top: 42%; left: 82%; }
                    80%  { top: 70%; left: 60%; }
                    100% { top: 50%; left: 50%; }
                }

                .b-glitch-base {
                    filter: grayscale(1) sepia(1) saturate(8) hue-rotate(-50deg) brightness(0.8) contrast(2) blur(6px);
                    animation: b-glitchWarpSpin 0.7s infinite steps(1), glitchFlicker 1.1s infinite steps(1);
                }
                .b-glitch-r {
                    filter: grayscale(1) sepia(1) saturate(10) hue-rotate(-55deg) brightness(1.4) contrast(2.5) blur(2px);
                    mix-blend-mode: screen;
                    opacity: 0.9;
                    animation: b-glitchR 0.4s infinite steps(1);
                }

                .b-glitch-shard {
                    filter: grayscale(1) contrast(2.5) brightness(0.6) sepia(1) hue-rotate(-50deg) saturate(9);
                }
                .b-shard-1 { clip-path: polygon(10% 5%, 35% 0%, 28% 30%, 5% 22%); animation: b-shard1 0.5s infinite steps(1); }
                .b-shard-2 { clip-path: polygon(40% 10%, 70% 15%, 65% 45%, 38% 40%); animation: b-shard2 0.4s infinite steps(1); }
                .b-shard-3 { clip-path: polygon(75% 5%, 100% 0%, 95% 35%, 72% 30%); animation: b-shard3 0.35s infinite steps(1); }
                .b-shard-4 { clip-path: polygon(0% 40%, 25% 35%, 30% 65%, 3% 70%); animation: b-shard4 0.55s infinite steps(1); }
                .b-shard-5 { clip-path: polygon(35% 45%, 65% 40%, 60% 75%, 30% 78%); animation: b-shard5 0.3s infinite steps(1); }
                .b-shard-6 { clip-path: polygon(70% 50%, 100% 45%, 98% 80%, 68% 85%); animation: b-shard6 0.42s infinite steps(1); }
                .b-shard-7 { clip-path: polygon(5% 75%, 35% 72%, 30% 100%, 2% 98%); animation: b-shard7 0.38s infinite steps(1); }
                .b-shard-8 { clip-path: polygon(45% 80%, 78% 78%, 72% 100%, 40% 100%); animation: b-shard8 0.48s infinite steps(1); }

                .b-glitch-noise {
                    background-image: repeating-linear-gradient(0deg, rgba(255,0,0,0.1) 0px, rgba(255,0,0,0.1) 1px, transparent 1px, transparent 3px);
                    mix-blend-mode: overlay;
                    animation: noiseShift 0.15s infinite steps(1);
                    pointer-events: none;
                }

                .b-fullscreen-shard {
                    position: absolute;
                    background: linear-gradient(135deg, rgba(180,0,0,0.55), rgba(0,0,0,0.7));
                    mix-blend-mode: multiply;
                    filter: contrast(1.8);
                }
                .b-fs-1 { width: 30vw; height: 25vh; top: 5%; left: 10%; clip-path: polygon(20% 0%, 100% 10%, 80% 100%, 0% 70%); animation: b-fs1 0.6s infinite steps(1); }
                .b-fs-2 { width: 25vw; height: 30vh; top: 15%; left: 60%; clip-path: polygon(0% 20%, 70% 0%, 100% 80%, 30% 100%); animation: b-fs2 0.5s infinite steps(1); }
                .b-fs-3 { width: 35vw; height: 20vh; top: 50%; left: 5%; clip-path: polygon(10% 0%, 90% 15%, 100% 100%, 0% 85%); animation: b-fs3 0.45s infinite steps(1); }
                .b-fs-4 { width: 22vw; height: 28vh; top: 60%; left: 55%; clip-path: polygon(0% 0%, 100% 10%, 85% 100%, 15% 90%); animation: b-fs4 0.55s infinite steps(1); }
                .b-fs-5 { width: 28vw; height: 22vh; top: 0%; left: 35%; clip-path: polygon(30% 0%, 100% 20%, 70% 100%, 0% 80%); animation: b-fs5 0.4s infinite steps(1); }
                .b-fs-6 { width: 20vw; height: 25vh; top: 70%; left: 20%; clip-path: polygon(0% 10%, 80% 0%, 100% 90%, 20% 100%); animation: b-fs6 0.5s infinite steps(1); }
                .b-fs-7 { width: 26vw; height: 18vh; top: 35%; left: 75%; clip-path: polygon(15% 0%, 100% 15%, 85% 100%, 0% 85%); animation: b-fs7 0.38s infinite steps(1); }
                .b-fs-8 { width: 18vw; height: 20vh; top: 25%; left: 25%; clip-path: polygon(0% 30%, 60% 0%, 100% 70%, 40% 100%); animation: b-fs8 0.48s infinite steps(1); }
                .b-fs-9 { width: 32vw; height: 15vh; top: 80%; left: 40%; clip-path: polygon(20% 0%, 100% 20%, 80% 100%, 0% 80%); animation: b-fs9 0.42s infinite steps(1); }
                .b-fs-10 { width: 24vw; height: 24vh; top: 10%; left: 80%; clip-path: polygon(0% 0%, 90% 25%, 100% 100%, 10% 75%); animation: b-fs10 0.52s infinite steps(1); }
                .b-fs-11 { width: 20vw; height: 30vh; top: 45%; left: 40%; clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%); animation: b-fs11 0.36s infinite steps(1); }
                .b-fs-12 { width: 27vw; height: 19vh; top: 65%; left: 75%; clip-path: polygon(0% 20%, 80% 0%, 100% 80%, 20% 100%); animation: b-fs12 0.46s infinite steps(1); }
                .b-fs-13 { width: 19vw; height: 26vh; top: 5%; left: 55%; clip-path: polygon(30% 0%, 100% 30%, 70% 100%, 0% 70%); animation: b-fs13 0.44s infinite steps(1); }
                .b-fs-14 { width: 30vw; height: 17vh; top: 88%; left: 5%; clip-path: polygon(0% 10%, 90% 0%, 100% 100%, 10% 90%); animation: b-fs14 0.5s infinite steps(1); }

                @keyframes b-glitchWarpSpin {
                    0% { transform: rotate(0deg) scale(1) skew(0deg,0deg); }
                    15% { transform: rotate(25deg) scale(1.05) skew(3deg,-2deg); }
                    30% { transform: rotate(-40deg) scale(0.95) skew(-4deg,2deg); }
                    45% { transform: rotate(60deg) scale(1.08) skew(2deg,-3deg); }
                    60% { transform: rotate(-20deg) scale(0.9) skew(-2deg,1deg); }
                    75% { transform: rotate(45deg) scale(1.03) skew(4deg,-1deg); }
                    90% { transform: rotate(-55deg) scale(0.97) skew(-3deg,2deg); }
                    100% { transform: rotate(0deg) scale(1) skew(0deg,0deg); }
                }
                @keyframes b-glitchR {
                    0% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(-40px,12px) rotate(15deg); }
                    50% { transform: translate(30px,-20px) rotate(-20deg); } 75% { transform: translate(-35px,22px) rotate(10deg); } 100% { transform: translate(0,0) rotate(0deg); }
                }

                @keyframes b-shard1 { 0%{transform:translate(0,0) rotate(0deg);} 25%{transform:translate(-45px,20px) rotate(-40deg);} 50%{transform:translate(30px,-35px) rotate(30deg);} 75%{transform:translate(-20px,40px) rotate(-25deg);} 100%{transform:translate(0,0) rotate(0deg);} }
                @keyframes b-shard2 { 0%{transform:translate(0,0) rotate(0deg);} 30%{transform:translate(50px,-15px) rotate(35deg);} 60%{transform:translate(-38px,25px) rotate(-30deg);} 100%{transform:translate(0,0) rotate(0deg);} }
                @keyframes b-shard3 { 0%{transform:translate(0,0) rotate(0deg);} 20%{transform:translate(-30px,-30px) rotate(-45deg);} 55%{transform:translate(42px,18px) rotate(40deg);} 80%{transform:translate(-15px,-25px) rotate(-20deg);} 100%{transform:translate(0,0) rotate(0deg);} }
                @keyframes b-shard4 { 0%{transform:translate(0,0) rotate(0deg);} 35%{transform:translate(35px,30px) rotate(-35deg);} 65%{transform:translate(-48px,-10px) rotate(30deg);} 100%{transform:translate(0,0) rotate(0deg);} }
                @keyframes b-shard5 { 0%{transform:translate(0,0) rotate(0deg);} 25%{transform:translate(-52px,10px) rotate(50deg);} 50%{transform:translate(20px,-40px) rotate(-40deg);} 75%{transform:translate(40px,15px) rotate(25deg);} 100%{transform:translate(0,0) rotate(0deg);} }
                @keyframes b-shard6 { 0%{transform:translate(0,0) rotate(0deg);} 40%{transform:translate(-25px,-35px) rotate(45deg);} 70%{transform:translate(45px,20px) rotate(-35deg);} 100%{transform:translate(0,0) rotate(0deg);} }
                @keyframes b-shard7 { 0%{transform:translate(0,0) rotate(0deg);} 30%{transform:translate(38px,-25px) rotate(-50deg);} 60%{transform:translate(-42px,15px) rotate(35deg);} 100%{transform:translate(0,0) rotate(0deg);} }
                @keyframes b-shard8 { 0%{transform:translate(0,0) rotate(0deg);} 25%{transform:translate(-30px,25px) rotate(40deg);} 55%{transform:translate(48px,-20px) rotate(-30deg);} 80%{transform:translate(-18px,-30px) rotate(20deg);} 100%{transform:translate(0,0) rotate(0deg);} }

                @keyframes b-fs1 { 0%,100%{opacity:0.6; transform:rotate(0deg) scale(1);} 30%{opacity:0.9; transform:rotate(80deg) scale(1.2);} 60%{opacity:0.2; transform:rotate(-60deg) scale(0.8);} }
                @keyframes b-fs2 { 0%,100%{opacity:0.5; transform:rotate(0deg) scale(1);} 25%{opacity:0.85; transform:rotate(-100deg) scale(1.1);} 65%{opacity:0.15; transform:rotate(50deg) scale(0.9);} }
                @keyframes b-fs3 { 0%,100%{opacity:0.7; transform:rotate(0deg) scale(1);} 40%{opacity:0.2; transform:rotate(120deg) scale(0.85);} 70%{opacity:0.9; transform:rotate(-90deg) scale(1.15);} }
                @keyframes b-fs4 { 0%,100%{opacity:0.55; transform:rotate(0deg) scale(1);} 35%{opacity:0.9; transform:rotate(-70deg) scale(1.1);} 75%{opacity:0.1; transform:rotate(140deg) scale(0.8);} }
                @keyframes b-fs5 { 0%,100%{opacity:0.6; transform:rotate(0deg) scale(1);} 20%{opacity:0.2; transform:rotate(90deg) scale(1.2);} 55%{opacity:0.85; transform:rotate(-130deg) scale(0.9);} }
                @keyframes b-fs6 { 0%,100%{opacity:0.5; transform:rotate(0deg) scale(1);} 45%{opacity:0.9; transform:rotate(-45deg) scale(1.05);} 80%{opacity:0.15; transform:rotate(100deg) scale(0.85);} }
                @keyframes b-fs7 { 0%,100%{opacity:0.65; transform:rotate(0deg) scale(1);} 30%{opacity:0.1; transform:rotate(150deg) scale(1.15);} 60%{opacity:0.8; transform:rotate(-80deg) scale(0.95);} }
                @keyframes b-fs8 { 0%,100%{opacity:0.55; transform:rotate(0deg) scale(1);} 25%{opacity:0.85; transform:rotate(60deg) scale(0.9);} 70%{opacity:0.2; transform:rotate(-110deg) scale(1.1);} }
                @keyframes b-fs9 { 0%,100%{opacity:0.6; transform:rotate(0deg) scale(1);} 40%{opacity:0.15; transform:rotate(-140deg) scale(1.2);} 75%{opacity:0.9; transform:rotate(70deg) scale(0.85);} }
                @keyframes b-fs10 { 0%,100%{opacity:0.5; transform:rotate(0deg) scale(1);} 35%{opacity:0.9; transform:rotate(110deg) scale(1.1);} 65%{opacity:0.1; transform:rotate(-60deg) scale(0.9);} }
                @keyframes b-fs11 { 0%,100%{opacity:0.6; transform:rotate(0deg) scale(1);} 20%{opacity:0.85; transform:rotate(-95deg) scale(0.85);} 55%{opacity:0.2; transform:rotate(75deg) scale(1.15);} }
                @keyframes b-fs12 { 0%,100%{opacity:0.55; transform:rotate(0deg) scale(1);} 45%{opacity:0.15; transform:rotate(130deg) scale(1.05);} 80%{opacity:0.9; transform:rotate(-40deg) scale(0.9);} }
                @keyframes b-fs13 { 0%,100%{opacity:0.65; transform:rotate(0deg) scale(1);} 30%{opacity:0.9; transform:rotate(-120deg) scale(1.1);} 65%{opacity:0.2; transform:rotate(85deg) scale(0.85);} }
                @keyframes b-fs14 { 0%,100%{opacity:0.5; transform:rotate(0deg) scale(1);} 40%{opacity:0.2; transform:rotate(65deg) scale(0.9);} 75%{opacity:0.85; transform:rotate(-150deg) scale(1.2);} }
            `}</style>
        </main>
    );
}
