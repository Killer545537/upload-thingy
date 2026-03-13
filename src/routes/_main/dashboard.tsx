import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { gooeyToast } from 'goey-toast';
import { LogOut } from 'lucide-react';
import FileGrid from '#/components/dashboard/file-grid';
import { Button } from '#/components/ui/button';
import { authClient } from '#/lib/auth/client';
import { authQueries } from '#/queries/auth';
import { uploadsQueryOptions } from '#/queries/upload';

export const Route = createFileRoute('/_main/dashboard')({
    component: DashboardPage,
    loader: async ({ context }) => await context.queryClient.ensureQueryData(uploadsQueryOptions),
});

function DashboardPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const uploads = Route.useLoaderData();

    const signOutMutation = useMutation({
        mutationFn: async () => {
            const { error } = await authClient.signOut();

            if (error) {
                throw new Error(
                    error.message ||
                        'An unknown error occurred during sign out.',
                );
            }
        },
        onSuccess: () => {
            // Invalidate auth queries to clear user session
            queryClient.invalidateQueries({ queryKey: authQueries.all });
            gooeyToast.success('Signed out successfully');
            navigate({ to: '/' });
        },
        onError: (error) => {
            gooeyToast.error(error.message);
        },
    });

    return (
        <div className='container mx-auto px-6 py-8'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>
                    Dashboard
                </h1>
                <Button
                    variant='outline'
                    onClick={() => signOutMutation.mutate()}
                    disabled={signOutMutation.isPending}
                >
                    <LogOut className='w-4 h-4 mr-2' />
                    {signOutMutation.isPending ? 'Signing out...' : 'Sign Out'}
                </Button>
            </div>
            <p className='text-muted-foreground'>
                Welcome to your dashboard. You are authenticated.
            </p>
            <FileGrid uploads={uploads} />
        </div>
    );
}
