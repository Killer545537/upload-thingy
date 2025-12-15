'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
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

const forgotPasswordSchema = z.object({
    email: z.email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ForgotPasswordFormData>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (values: ForgotPasswordFormData) => {
        try {
            setIsSubmitting(true);
            await authClient.requestPasswordReset({
                email: values.email,
                redirectTo: '/reset-password',
            });
            toast.success('Password reset email sent successfully');
        } catch (error) {
            toast.error(
                (error as Error)?.message ||
                    'Failed to send password reset email',
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
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>
                                    Email Address
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
                            'Send Reset Link'
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

export default ForgotPasswordForm;
