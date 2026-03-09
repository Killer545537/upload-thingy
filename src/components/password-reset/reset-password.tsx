import { useForm } from '@tanstack/react-form-start';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { type } from 'arktype';
import { gooeyToast } from 'goey-toast';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '#/components/ui/button';
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '#/components/ui/field';
import { Input } from '#/components/ui/input';
import { authClient } from '#/lib/auth/client';

const resetPasswordSchema = type({
    password: type('string >= 6').configure({
        message: 'Password must be at least 6 characters long',
    }),
    confirmPassword: type('string >= 6').configure({
        message: 'Please confirm your password',
    }),
}).narrow((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        return ctx.reject({
            expected: 'passwords to match',
            path: ['confirmPassword'],
        });
    }
    return true;
});

type ResetPasswordData = typeof resetPasswordSchema.infer;

interface ResetPasswordFormProps {
    token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const resetPasswordMutation = useMutation({
        mutationFn: async ({ password }: ResetPasswordData) => {
            const { error } = await authClient.resetPassword({
                newPassword: password,
                token,
            });

            if (error) {
                throw new Error(error.message || 'Failed to reset password.');
            }
        },
        onSuccess: () => {
            gooeyToast.success('Password reset successfully!');
            navigate({ to: '/login' });
        },
        onError: (error) => {
            gooeyToast.error(error.message);
        },
    });

    const form = useForm({
        defaultValues: {
            password: '',
            confirmPassword: '',
        } as ResetPasswordData,
        validators: {
            onSubmit: resetPasswordSchema,
        },
        onSubmit: async ({ value }) => {
            resetPasswordMutation.mutate(value);
        },
    });

    return (
        <form
            className='space-y-4'
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <form.Field name='password'>
                {(field) => (
                    <Field data-invalid={field.state.meta.errors.length > 0}>
                        <FieldLabel htmlFor={field.name}>
                            New Password
                        </FieldLabel>
                        <FieldContent>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type={showPassword ? 'text' : 'password'}
                                    className='pl-10 pr-10 h-12 bg-secondary/50 border-border focus:border-foreground transition-colors'
                                    placeholder='••••••••'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className='w-4 h-4' />
                                    ) : (
                                        <Eye className='w-4 h-4' />
                                    )}
                                </button>
                            </div>
                            <FieldError errors={field.state.meta.errors} />
                        </FieldContent>
                    </Field>
                )}
            </form.Field>

            <form.Field name='confirmPassword'>
                {(field) => (
                    <Field data-invalid={field.state.meta.errors.length > 0}>
                        <FieldLabel htmlFor={field.name}>
                            Confirm Password
                        </FieldLabel>
                        <FieldContent>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    className='pl-10 pr-10 h-12 bg-secondary/50 border-border focus:border-foreground transition-colors'
                                    placeholder='••••••••'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className='w-4 h-4' />
                                    ) : (
                                        <Eye className='w-4 h-4' />
                                    )}
                                </button>
                            </div>
                            <FieldError errors={field.state.meta.errors} />
                        </FieldContent>
                    </Field>
                )}
            </form.Field>

            <Button
                type='submit'
                size='lg'
                className='w-full h-12 mt-6'
                disabled={resetPasswordMutation.isPending}
            >
                {resetPasswordMutation.isPending
                    ? 'Resetting...'
                    : 'Reset Password'}
            </Button>
        </form>
    );
}
