'use client';

import { motion } from 'framer-motion';
import { CloudUpload, Download, Server } from 'lucide-react';

const steps = [
    {
        description: 'Select files or drag them in.',
        icon: CloudUpload,
        title: 'Upload',
    },
    {
        description: 'We encrypt and store instantly.',
        icon: Server,
        title: 'Secure',
    },
    {
        description: 'Download anytime, anywhere.',
        icon: Download,
        title: 'Retrieve',
    },
];

const HowItWorks = () => {
    return (
        <section
            className='py-24 bg-background relative overflow-hidden'
            id='working'
        >
            <div className='container mx-auto px-6'>
                <motion.div
                    className='text-center mb-16'
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <h2 className='text-4xl md:text-5xl font-bold tracking-tight-custom text-foreground mb-4'>
                        How it works
                    </h2>
                    <p className='text-lg text-muted-foreground'>
                        Three simple steps to file freedom.
                    </p>
                </motion.div>

                <div className='relative max-w-4xl mx-auto'>
                    {/* Animated dashed connector line */}
                    <svg
                        className='absolute top-12 left-0 right-0 w-full h-8 hidden md:block'
                        preserveAspectRatio='none'
                    >
                        <line
                            className='animated-dash'
                            stroke='hsl(var(--border))'
                            strokeDasharray='8 8'
                            strokeWidth='2'
                            x1='16.66%'
                            x2='83.33%'
                            y1='50%'
                            y2='50%'
                        />
                    </svg>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10'>
                        {steps.map((step, index) => (
                            <motion.div
                                className='flex flex-col items-center text-center'
                                initial={{ opacity: 0, y: 20 }}
                                key={step.title}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <motion.div
                                    className='w-24 h-24 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-6 transition-colors hover:border-gray-300'
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <step.icon
                                        className='w-10 h-10 text-foreground'
                                        strokeWidth={1.5}
                                    />
                                </motion.div>
                                <h3 className='text-xl font-semibold text-foreground mb-2'>
                                    {step.title}
                                </h3>
                                <p className='text-muted-foreground'>
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
