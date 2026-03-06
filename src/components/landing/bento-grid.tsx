'use client';

import { motion } from 'framer-motion';
import { Check, FileUp, Grid3X3, Lock, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const BentoGrid = () => (
    <section className='py-24 bg-secondary/30 relative' id='features'>
        <div className='absolute inset-0 dot-pattern opacity-[0.02]' />

        <div className='container mx-auto px-6 relative z-10'>
            <motion.div
                className='text-center mb-16'
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                <h2 className='text-4xl md:text-5xl font-bold tracking-tight-custom text-foreground mb-4'>
                    Built for simplicity
                </h2>
                <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                    Everything you need. Nothing you don't.
                </p>
            </motion.div>

            {/* Bento Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                {/* Upload Experience - Large Card */}
                <motion.div
                    className='md:col-span-2 bento-card'
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <UploadCard />
                </motion.div>

                {/* Security Card */}
                <motion.div
                    className='bento-card'
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <SecurityCard />
                </motion.div>

                {/* Speed Card */}
                <motion.div
                    className='bento-card'
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <SpeedCard />
                </motion.div>

                {/* Archive Card - Large */}
                <motion.div
                    className='md:col-span-2 bento-card'
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <ArchiveCard />
                </motion.div>
            </div>
        </div>
    </section>
);

const UploadCard = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsUploading(true);
            setProgress(0);
            setIsComplete(false);

            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setIsComplete(true);
                        setTimeout(() => {
                            setIsUploading(false);
                            setProgress(0);
                            setIsComplete(false);
                        }, 2000);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 80);
        }, 6000);

        // Trigger first animation
        setTimeout(() => {
            setIsUploading(true);
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setIsComplete(true);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 80);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='h-full flex flex-col'>
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-xl bg-foreground flex items-center justify-center'>
                    <FileUp className='w-5 h-5 text-primary-foreground' />
                </div>
                <div>
                    <h3 className='font-semibold text-foreground'>
                        The Upload Experience
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                        Drag, drop, done. Support for 50+ formats.
                    </p>
                </div>
            </div>

            {/* Upload Zone Animation */}
            <div className='flex-1 border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden bg-secondary/30'>
                <motion.div
                    animate={{
                        scale: isComplete ? 0.9 : 1,
                        y: isUploading ? [0, 10, 0] : 0,
                    }}
                    className='relative'
                    transition={{ duration: 0.5 }}
                >
                    {/* File icon */}
                    <div className='w-16 h-20 bg-card border border-border rounded-lg flex items-center justify-center relative shadow-sm'>
                        <span className='text-xs font-medium text-muted-foreground'>
                            .PDF
                        </span>
                        {/* Corner fold */}
                        <div
                            className='absolute top-0 right-0 w-4 h-4 bg-border'
                            style={{
                                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                            }}
                        />
                    </div>

                    {/* Checkmark overlay */}
                    {isComplete && (
                        <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            className='absolute -top-2 -right-2 w-6 h-6 bg-foreground rounded-full flex items-center justify-center'
                            initial={{ opacity: 0, scale: 0 }}
                        >
                            <Check className='w-3 h-3 text-primary-foreground' />
                        </motion.div>
                    )}
                </motion.div>

                <p className='text-sm text-muted-foreground mt-4'>
                    presentation_final.pdf
                </p>

                {/* Progress bar */}
                {isUploading && (
                    <div className='w-full max-w-xs mt-4'>
                        <div className='h-1.5 bg-border rounded-full overflow-hidden'>
                            <motion.div
                                animate={{ width: `${progress}%` }}
                                className='h-full bg-foreground rounded-full'
                                initial={{ width: 0 }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <p className='text-xs text-muted-foreground mt-2 text-center'>
                            {progress}%
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SecurityCard = () => (
    <div className='h-full flex flex-col'>
        <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-xl bg-foreground flex items-center justify-center'>
                <Lock className='w-5 h-5 text-primary-foreground' />
            </div>
            <h3 className='font-semibold text-foreground'>Security First</h3>
        </div>

        {/* 3D Lock Visual */}
        <div className='flex-1 flex items-center justify-center'>
            <div className='relative'>
                {/* Lock body */}
                <motion.div
                    animate={{ rotateY: [0, 10, -10, 0] }}
                    className='w-20 h-24 relative'
                    style={{ transformStyle: 'preserve-3d' }}
                    transition={{
                        duration: 4,
                        ease: 'easeInOut',
                        repeat: Infinity,
                    }}
                >
                    {/* Lock shackle */}
                    <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 border-4 border-foreground rounded-t-full' />
                    {/* Lock body */}
                    <div className='absolute bottom-0 w-full h-16 bg-foreground rounded-lg flex items-center justify-center'>
                        <div className='w-3 h-5 bg-primary-foreground rounded-full' />
                    </div>
                </motion.div>
            </div>
        </div>

        <p className='text-sm text-muted-foreground mt-4'>
            AES-256 Encryption standard.
        </p>
    </div>
);

const SpeedCard = () => {
    const [speed, setSpeed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed(Math.random() * 40 + 60);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='h-full flex flex-col'>
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-xl bg-foreground flex items-center justify-center'>
                    <Zap className='w-5 h-5 text-primary-foreground' />
                </div>
                <h3 className='font-semibold text-foreground'>
                    Lightning Fast
                </h3>
            </div>

            {/* Speed Gauge */}
            <div className='flex-1 flex items-center justify-center'>
                <div className='relative w-32 h-32'>
                    {/* Gauge background */}
                    <svg
                        className='w-full h-full transform -rotate-90'
                        viewBox='0 0 100 100'
                    >
                        <circle
                            cx='50'
                            cy='50'
                            fill='none'
                            r='40'
                            stroke='hsl(var(--border))'
                            strokeDasharray='188.5'
                            strokeDashoffset='62.8'
                            strokeLinecap='round'
                            strokeWidth='8'
                        />
                        <motion.circle
                            cx='50'
                            cy='50'
                            fill='none'
                            r='40'
                            stroke='hsl(var(--foreground))'
                            strokeDasharray='188.5'
                            strokeDashoffset={188.5 - (speed / 100) * 125.7}
                            strokeLinecap='round'
                            strokeWidth='8'
                            transition={{ duration: 0.1 }}
                        />
                    </svg>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <span className='text-2xl font-bold text-foreground'>
                            {Math.round(speed)}
                        </span>
                        <span className='text-xs text-muted-foreground ml-1'>
                            Mbps
                        </span>
                    </div>
                </div>
            </div>

            <p className='text-sm text-muted-foreground mt-4'>
                Optimized edge network for lightning uploads.
            </p>
        </div>
    );
};

const ArchiveCard = () => {
    const files = [
        { name: 'vacation.jpg', type: 'image' },
        { name: 'contract.pdf', type: 'doc' },
        { name: 'profile.png', type: 'image' },
        { name: 'backup.zip', type: 'archive' },
        { name: 'invoice.pdf', type: 'doc' },
        { name: 'banner.svg', type: 'image' },
    ];

    return (
        <div className='h-full flex flex-col'>
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-xl bg-foreground flex items-center justify-center'>
                    <Grid3X3 className='w-5 h-5 text-primary-foreground' />
                </div>
                <div>
                    <h3 className='font-semibold text-foreground'>
                        The Archive
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                        Your digital library, beautifully organized.
                    </p>
                </div>
            </div>

            {/* File Grid Preview */}
            <div className='flex-1 grid grid-cols-3 gap-3'>
                {files.map((file, index) => (
                    <motion.div
                        className='aspect-square bg-secondary rounded-lg flex flex-col items-center justify-center p-2 cursor-pointer transition-colors hover:bg-gray-200'
                        initial={{ opacity: 0, scale: 0.9 }}
                        key={index}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                    >
                        <div className='w-8 h-8 rounded bg-card border border-border flex items-center justify-center mb-2'>
                            <span className='text-[10px] text-muted-foreground uppercase'>
                                {file.type === 'image'
                                    ? 'IMG'
                                    : file.type === 'doc'
                                      ? 'PDF'
                                      : 'ZIP'}
                            </span>
                        </div>
                        <p className='text-[10px] text-muted-foreground truncate w-full text-center'>
                            {file.name}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BentoGrid;
