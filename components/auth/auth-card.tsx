'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GoogleAuthButton from '@/components/auth/google-auth-button';

const AuthCard = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isSignup = pathname?.includes('/signup');
    const isLogin = pathname?.includes('/login');

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
                    <Link className='inline-block' href='/'>
                        <h1 className='text-2xl font-bold tracking-tighter-custom text-foreground'>
                            UploadThingy
                        </h1>
                    </Link>
                    <p className='text-muted-foreground mt-2 text-sm'>
                        {isSignup ? 'Create Your Account' : 'Welcome Back'}
                    </p>
                </motion.div>
                <GoogleAuthButton />
                {/* Divider */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className='relative my-6'
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-border' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                        <span className='bg-card px-2 text-muted-foreground'>
                            or continue with email
                        </span>
                    </div>
                </motion.div>
                {children}
                {/* Toggle Auth Mode */}
                <motion.div
                    className='mt-6 text-center'
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                    <p className='text-sm text-muted-foreground'>
                        {isLogin
                            ? "Don't have an account?"
                            : 'Already have an account?'}{' '}
                        <Link
                            className='text-foreground font-medium hover:underline underline-offset-4 transition-all'
                            href={isLogin ? '/signup' : '/login'}
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </Link>
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AuthCard;
