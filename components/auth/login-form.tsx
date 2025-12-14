'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { loginUser } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import GoogleAuthButton from './google-auth-button';

const loginSchema = z.object({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async ({ email, password }: LoginFormData) => {
        setIsLoading(true);
        try {
            const result = await loginUser(email, password);
            if (result.success) {
                toast.success(result.message);
                router.push('/dashboard');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(
                (error as Error)?.message || 'An unexpected error occurred',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <GoogleAuthButton />
            {/* Divider */}
            <motion.div
                className='relative my-6'
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                }}
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
            <AnimatePresence mode='wait'>
                <motion.div
                    key='login'
                    variants={{
                        exit: {
                            opacity: 0,
                            transition: {
                                duration: 0.3,
                                ease: 'easeIn' as const,
                            },
                            x: 20,
                        },
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                            opacity: 1,
                            transition: {
                                duration: 0.4,
                                ease: 'easeOut' as const,
                            },
                            x: 0,
                        },
                    }}
                >
                    <Form {...form}>
                        <form
                            className='space-y-4'
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-foreground'>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                                <Input
                                                    className='pl-10 h-12 bg-secondary/50 border-border focus:border-foreground transition-colors'
                                                    placeholder='you@example.com'
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-foreground'>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                                <Input
                                                    className='pl-10 pr-10 h-12 bg-secondary/50 border-border focus:border-foreground transition-colors'
                                                    placeholder='••••••••'
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    {...field}
                                                />
                                                <button
                                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    type='button'
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className='w-4 h-4' />
                                                    ) : (
                                                        <Eye className='w-4 h-4' />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                className='w-full h-12 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300'
                                disabled={isLoading}
                                type='submit'
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        className='w-5 h-5 border-2 border-background border-t-transparent rounded-full'
                                        transition={{
                                            duration: 1,
                                            ease: 'linear',
                                            repeat: Infinity,
                                        }}
                                    />
                                ) : (
                                    'Log In'
                                )}
                            </Button>
                        </form>
                    </Form>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LoginForm;
