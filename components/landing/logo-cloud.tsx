'use client';

import { motion } from 'framer-motion';

const logos = [
    { name: 'Stripe', width: 80 },
    { name: 'Vercel', width: 90 },
    { name: 'Linear', width: 80 },
    { name: 'Notion', width: 90 },
    { name: 'Figma', width: 70 },
    { name: 'Slack', width: 80 },
];

const LogoCloud = () => (
    <section className='py-16 border-b border-border relative overflow-hidden'>
        {/* Fade gradient overlay */}
        <div className='absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10' />
        <div className='absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10' />

        <div className='container mx-auto px-6'>
            <motion.p
                className='text-center text-sm text-muted-foreground mb-10'
                initial={{ opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1 }}
            >
                Trusted by teams at
            </motion.p>

            <div className='flex items-center justify-center gap-12 md:gap-20 flex-wrap'>
                {logos.map((logo, index) => (
                    <motion.div
                        className='transition-opacity duration-300'
                        initial={{ opacity: 0, y: 10 }}
                        key={logo.name}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ opacity: 1 }}
                        whileInView={{ opacity: 0.4, y: 0 }}
                    >
                        <span
                            className='text-xl md:text-2xl font-bold tracking-tight text-foreground'
                            style={{ width: logo.width }}
                        >
                            {logo.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Gradient divider */}
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-border to-transparent' />
    </section>
);

export default LogoCloud;
