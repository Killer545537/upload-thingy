import { useForm } from '@tanstack/react-form-start';
import { useMutation } from '@tanstack/react-query';
import { type } from 'arktype';
import { gooeyToast } from 'goey-toast';
import { Mail } from 'lucide-react';
import { Button } from '#/components/ui/button';
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '#/components/ui/field';
import { Input } from '#/components/ui/input';
import { authClient } from '#/lib/auth/client';

const forgotPasswordSchema = type({
    email: type('string.email').configure({
        message: 'Please enter a valid email address',
    }),
});

type ForgotPasswordData = typeof forgotPasswordSchema.infer;

export default function ForgotPasswordForm() {
    const forgotPasswordMutation = useMutation({
        mutationFn: async ({ email }: ForgotPasswordData) => {
            const { error } = await authClient.requestPasswordReset({
                email,
                redirectTo: '/reset-password',
            });

            if (error) {
                throw new Error(
                    error.message || 'Failed to send password reset email.',
                );
            }
        },
        onSuccess: () => {
            gooeyToast.success('Password reset email sent! Check your inbox.');
        },
        onError: (error) => {
            gooeyToast.error(error.message);
        },
    });

    const form = useForm({
        defaultValues: {
            email: '',
        } as ForgotPasswordData,
        validators: {
            onSubmit: forgotPasswordSchema,
        },
        onSubmit: async ({ value }) => {
            forgotPasswordMutation.mutate(value);
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
            <form.Field name='email'>
                {(field) => (
                    <Field data-invalid={field.state.meta.errors.length > 0}>
                        <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                        <FieldContent>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type='email'
                                    className='pl-10 h-12 bg-secondary/50 border-border focus:border-foreground transition-colors'
                                    placeholder='you@example.com'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
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
                disabled={forgotPasswordMutation.isPending}
            >
                {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
            </Button>
        </form>
    );
}
