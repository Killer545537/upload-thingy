import { useForm } from '@tanstack/react-form-start';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { type } from 'arktype';
import { gooeyToast } from 'goey-toast';
import { Lock, Mail } from 'lucide-react';
import { Button } from '#/components/ui/button';
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from '#/components/ui/field';
import { Input } from '#/components/ui/input';
import { authClient } from '#/lib/auth/client';
import { authQueries } from '#/queries/auth';

const loginSchema = type({
    email: type('string.email').configure({
        message: 'Please enter a valid email address',
    }),
    password: type('string >= 6').configure({
        message: 'Password must be at least 6 characters long',
    }),
});

type LoginData = typeof loginSchema.infer;

export default function LoginForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: async ({ email, password }: LoginData) => {
            const { error, data } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                throw new Error(
                    error.message || 'An unknown error occurred during login.',
                );
            }

            return data;
        },
        onSuccess: (data) => {
            // Invalidate auth queries to refetch user session
            queryClient.invalidateQueries({ queryKey: authQueries.all });
            gooeyToast.success(`Hey, ${data.user.name}!`);
            navigate({ to: '/dashboard' });
        },
        onError: (error) => {
            gooeyToast.error(error.message);
        },
    });

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        } as LoginData,
        validators: {
            onSubmit: loginSchema,
        },
        onSubmit: async ({ value }) => {
            loginMutation.mutate(value);
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
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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

            <form.Field name='password'>
                {(field) => (
                    <Field data-invalid={field.state.meta.errors.length > 0}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <FieldContent>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type='password'
                                    className='pl-10 h-12 bg-secondary/50 border-border focus:border-foreground transition-colors'
                                    placeholder='••••••••'
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
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    );
}
