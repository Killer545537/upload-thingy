'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Types
interface Dot {
    x: number;
    y: number;
    size: number;
    opacity: number;
    delay: number;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

// Constants
const DITHER_CONFIG = {
    ANIMATION_DELAY_MULTIPLIER: 0.01,
    ANIMATION_DURATION: 0.5,
    BASE_OPACITY_MIN: 0.03,
    BASE_OPACITY_RANGE: 0.07,
    BASE_SIZE_MIN: 1,
    BASE_SIZE_RANGE: 2,
    DITHER_THRESHOLD: 0.7,
    GRID_SIZE: 16,
} as const;

const PARTICLE_CONFIG = {
    COUNT: 20,
    DELAY_MAX: 5,
    DURATION_MIN: 10,
    DURATION_RANGE: 20,
    OPACITY_MAX: 0.15,
    OPACITY_MIN: 0.05,
    SIZE_MIN: 2,
    SIZE_RANGE: 4,
    X_RANGE: 10,
    Y_RANGE: 20,
} as const;

const RADIAL_GLOW_CONFIG = {
    DURATION: 8,
    OPACITY_MAX: 0.5,
    OPACITY_MIN: 0.3,
    SCALE_MAX: 1.1,
    SCALE_MIN: 1,
    SIZE: 800,
} as const;

const GRID_CONFIG = {
    OPACITY: 0.02,
    SIZE: 40,
    STROKE_WIDTH: 1,
} as const;

// Helper functions
const generateDots = (): Dot[] => {
    const dotsArray: Dot[] = [];
    const {
        GRID_SIZE,
        BASE_OPACITY_MIN,
        BASE_OPACITY_RANGE,
        BASE_SIZE_MIN,
        BASE_SIZE_RANGE,
        DITHER_THRESHOLD,
        ANIMATION_DELAY_MULTIPLIER,
    } = DITHER_CONFIG;

    const cols = Math.ceil(100 / (GRID_SIZE / 8));
    const rows = Math.ceil(100 / (GRID_SIZE / 8));

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const baseOpacity =
                BASE_OPACITY_MIN + Math.random() * BASE_OPACITY_RANGE;
            const baseSize = BASE_SIZE_MIN + Math.random() * BASE_SIZE_RANGE;
            const isDithered =
                (i + j) % 2 === 0 || Math.random() > DITHER_THRESHOLD;

            if (isDithered) {
                dotsArray.push({
                    delay: (i + j) * ANIMATION_DELAY_MULTIPLIER,
                    opacity: baseOpacity,
                    size: baseSize,
                    x: (i / cols) * 100,
                    y: (j / rows) * 100,
                });
            }
        }
    }

    return dotsArray;
};

const generateParticles = (): Particle[] => {
    const {
        COUNT,
        SIZE_MIN,
        SIZE_RANGE,
        DURATION_MIN,
        DURATION_RANGE,
        DELAY_MAX,
    } = PARTICLE_CONFIG;

    return Array.from({ length: COUNT }, (_, i) => ({
        delay: Math.random() * DELAY_MAX,
        duration: DURATION_MIN + Math.random() * DURATION_RANGE,
        id: i,
        size: SIZE_MIN + Math.random() * SIZE_RANGE,
        x: Math.random() * 100,
        y: Math.random() * 100,
    }));
};

// SVG Data URL for noise texture
const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E`;

/**
 * DitherBackground component
 *
 * Renders an animated background with dithered dots, floating particles,
 * noise overlay, radial glow, and grid lines for visual depth and texture.
 */
const DitherBackground = () => {
    const [dots, setDots] = useState<Dot[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setDots(generateDots());
        setParticles(generateParticles());
    }, []);

    return (
        <div className='absolute inset-0 overflow-hidden'>
            {/* Base gradient */}
            <div className='absolute inset-0 hero-gradient' />

            {/* Dither pattern */}
            <svg aria-hidden='true' className='absolute inset-0 w-full h-full'>
                <defs>
                    <radialGradient
                        cx='50%'
                        cy='50%'
                        id='ditherGradient'
                        r='70%'
                    >
                        <stop
                            offset='0%'
                            stopColor='hsl(var(--foreground))'
                            stopOpacity='0.03'
                        />
                        <stop
                            offset='100%'
                            stopColor='hsl(var(--foreground))'
                            stopOpacity='0'
                        />
                    </radialGradient>
                </defs>

                {dots.map((dot, index) => (
                    <motion.circle
                        animate={{
                            opacity: dot.opacity,
                            scale: 1,
                        }}
                        cx={`${dot.x}%`}
                        cy={`${dot.y}%`}
                        fill='hsl(var(--foreground))'
                        initial={{ opacity: 0, scale: 0 }}
                        key={`dot-${index}`}
                        r={dot.size}
                        transition={{
                            delay: dot.delay,
                            duration: DITHER_CONFIG.ANIMATION_DURATION,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </svg>

            {/* Animated floating particles */}
            {particles.map((particle) => (
                <motion.div
                    animate={{
                        opacity: [
                            PARTICLE_CONFIG.OPACITY_MIN,
                            PARTICLE_CONFIG.OPACITY_MAX,
                            PARTICLE_CONFIG.OPACITY_MIN,
                        ],
                        x: [
                            -PARTICLE_CONFIG.X_RANGE,
                            PARTICLE_CONFIG.X_RANGE,
                            -PARTICLE_CONFIG.X_RANGE,
                        ],
                        y: [
                            -PARTICLE_CONFIG.Y_RANGE,
                            PARTICLE_CONFIG.Y_RANGE,
                            -PARTICLE_CONFIG.Y_RANGE,
                        ],
                    }}
                    className='absolute rounded-full bg-foreground/10'
                    key={`particle-${particle.id}`}
                    style={{
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                    }}
                    transition={{
                        delay: particle.delay,
                        duration: particle.duration,
                        ease: 'easeInOut',
                        repeat: Infinity,
                    }}
                />
            ))}

            {/* Noise overlay */}
            <div
                aria-hidden='true'
                className='absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none'
                style={{
                    backgroundImage: `url("${NOISE_SVG}")`,
                }}
            />

            {/* Radial glow */}
            <motion.div
                animate={{
                    opacity: [
                        RADIAL_GLOW_CONFIG.OPACITY_MIN,
                        RADIAL_GLOW_CONFIG.OPACITY_MAX,
                        RADIAL_GLOW_CONFIG.OPACITY_MIN,
                    ],
                    scale: [
                        RADIAL_GLOW_CONFIG.SCALE_MIN,
                        RADIAL_GLOW_CONFIG.SCALE_MAX,
                        RADIAL_GLOW_CONFIG.SCALE_MIN,
                    ],
                }}
                aria-hidden='true'
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full'
                style={{
                    background:
                        'radial-gradient(circle, hsl(var(--gray-200) / 0.3) 0%, transparent 70%)',
                    height: RADIAL_GLOW_CONFIG.SIZE,
                    width: RADIAL_GLOW_CONFIG.SIZE,
                }}
                transition={{
                    duration: RADIAL_GLOW_CONFIG.DURATION,
                    ease: 'easeInOut',
                    repeat: Infinity,
                }}
            />

            {/* Grid lines */}
            <svg
                aria-hidden='true'
                className='absolute inset-0 w-full h-full'
                style={{ opacity: GRID_CONFIG.OPACITY }}
            >
                <defs>
                    <pattern
                        height={GRID_CONFIG.SIZE}
                        id='grid'
                        patternUnits='userSpaceOnUse'
                        width={GRID_CONFIG.SIZE}
                    >
                        <path
                            d={`M ${GRID_CONFIG.SIZE} 0 L 0 0 0 ${GRID_CONFIG.SIZE}`}
                            fill='none'
                            stroke='hsl(var(--foreground))'
                            strokeWidth={GRID_CONFIG.STROKE_WIDTH}
                        />
                    </pattern>
                </defs>
                <rect fill='url(#grid)' height='100%' width='100%' />
            </svg>
        </div>
    );
};

export default DitherBackground;
