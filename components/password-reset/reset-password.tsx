'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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
import { authClient } from '@/lib/auth-client';

const resetPasswordSchema = z
    .object({
        confirmPassword: z.string().min(6, 'Please confirm your password'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ResetPasswordFormData>({
        defaultValues: {
            confirmPassword: '',
            password: '',
        },
        resolver: zodResolver(resetPasswordSchema),
    });

    useEffect(() => {
        const tokenParam = searchParams?.get('token');
        if (!tokenParam) {
            toast.error('Invalid or missing password reset token');
            router.push('/forgot-password');
        } else {
            setToken(tokenParam);
        }
    }, [searchParams, router]);

    const onSubmit = async (values: ResetPasswordFormData) => {
        if (!token) {
            toast.error('Invalid or missing password reset token');
            return;
        }

        try {
            setIsSubmitting(true);
            const { error } = await authClient.resetPassword({
                newPassword: values.password,
                token: token ?? '',
            });

            if (!error) {
                toast.success('Password reset successfully');
                router.push('/login');
            } else {
                toast.error(error.message || 'Failed to reset password');
            }
        } catch (error) {
            toast.error(
                (error as Error)?.message || 'Failed to reset password',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <Form {...form}>
                <form
                    className='space-y-4'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>
                                    New Password
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
                                                setShowPassword(!showPassword)
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

                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                        <Input
                                            className='pl-10 pr-10 h-12 bg-secondary/50 border-border focus:border-foreground transition-colors'
                                            placeholder='••••••••'
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...field}
                                        />
                                        <button
                                            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword,
                                                )
                                            }
                                            type='button'
                                        >
                                            {showConfirmPassword ? (
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
                        disabled={isSubmitting}
                        type='submit'
                    >
                        {isSubmitting ? (
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
                            'Reset Password'
                        )}
                    </Button>
                </form>
            </Form>

            <div className='mt-6 text-center'>
                <Link
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                    href='/login'
                >
                    Back to Login
                </Link>
            </div>
        </motion.div>
    );
};

export default ResetPasswordForm;
