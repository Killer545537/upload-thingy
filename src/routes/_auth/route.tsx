import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AuthCard from '#/components/auth/auth-card';
import BackToHome from '#/components/auth/back-to-home';
import { seo } from '#/lib/utils';
import { getUserSession } from '#/server/auth';

export const Route = createFileRoute('/_auth')({
    head: () => ({
        meta: [
            ...seo({
                title: 'Authentication - Upload Thingy',
                description:
                    'Login or register to access your uploads and settings.',
            }),
        ],
    }),
    beforeLoad: async () => {
        const session = await getUserSession();

        // If user is already logged in, redirect to dashboard
        if (session) {
            throw redirect({
                to: '/dashboard',
            });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className='min-h-screen relative flex items-center justify-center p-4 overflow-hidden'>
            <BackToHome />
            <AuthCard>
                <Outlet />
            </AuthCard>
        </div>
    );
}
