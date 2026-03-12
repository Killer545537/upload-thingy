import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export default function ResetCard({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            animate='visible'
            className='relative z-10 w-full max-w-md'
            initial='hidden'
            variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 0.5,
                        ease: 'easeOut',
                        staggerChildren: 0.1,
                    },
                },
            }}
        >
            <div className='bento-card bg-card/95 backdrop-blur-xl p-8 shadow-2xl'>
                <motion.div
                    className='text-center mb-8'
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                    <Link className='inline-block' to='/'>
                        <h1 className='text-2xl font-bold tracking-tighter-custom text-foreground'>
                            UploadThingy
                        </h1>
                    </Link>
                    <p className='text-muted-foreground mt-2 text-sm'>
                        No worries! Just give us your email
                    </p>
                </motion.div>
                {children}
            </div>
        </motion.div>
    );
}
