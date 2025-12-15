'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { signUpUser } from '@/app/actions/auth';
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

const signUpSchema = z
    .object({
        confirmPassword: z.string().min(6, 'Please confirm your password'),
        email: z.email('Please enter a valid email address'),
        name: z.string().min(2, 'Name must be at least 2 characters long'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SignUpFormData>({
        defaultValues: {
            confirmPassword: '',
            email: '',
            name: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async ({ name, email, password }: SignUpFormData) => {
        setIsLoading(true);
        try {
            const result = await signUpUser(name, email, password);
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
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-foreground'>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                        <Input
                                            className='pl-10 h-12 bg-secondary/50 border-border focus:border-foreground transition-colors'
                                            placeholder='John Doe'
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
                            'Sign Up'
                        )}
                    </Button>
                </form>
            </Form>
        </motion.div>
    );
};

export default SignUpForm;
