import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { FileQuestion, Home } from 'lucide-react';
import { Button } from '#/components/ui/button';

export default function NotFound() {
    return (
        <main className='min-h-screen bg-background relative overflow-hidden flex items-center justify-center'>
            {/* Dot pattern overlay */}
            <div className='absolute inset-0 dot-pattern opacity-[0.03]' />

            {/* Hero gradient background */}
            <div className='absolute inset-0 hero-gradient' />

            <div className='container mx-auto px-6 relative z-10'>
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center max-w-2xl mx-auto'
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    {/* Icon */}
                    <motion.div
                        animate={{ opacity: 1, scale: 1 }}
                        className='flex justify-center mb-8'
                        initial={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className='w-24 h-24 rounded-3xl bg-secondary border border-border flex items-center justify-center'>
                            <FileQuestion className='w-12 h-12 text-muted-foreground' />
                        </div>
                    </motion.div>

                    {/* 404 Text */}
                    <motion.div
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <h1 className='text-8xl md:text-9xl font-bold tracking-tight-custom text-foreground mb-4 leading-none'>
                            404
                        </h1>
                        <h2 className='text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4'>
                            Page not found
                        </h2>
                        <p className='text-lg text-muted-foreground max-w-md mx-auto mb-10'>
                            The page you're looking for doesn't exist or has
                            been moved to another location.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className='flex flex-col sm:flex-row gap-3 justify-center items-center'
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Link to='/'>
                            <Button className='h-12 px-6 rounded-lg font-medium group w-full sm:w-auto'>
                                <Home className='mr-2 h-4 w-4' />
                                Back to Home
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative shadow */}
            <div className='absolute bottom-1/4 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-foreground/5 blur-3xl rounded-full pointer-events-none' />
        </main>
    );
}
