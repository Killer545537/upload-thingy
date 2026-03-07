import { createFileRoute, Outlet } from '@tanstack/react-router';
import AuthCard from '#/components/auth/auth-card';
import BackToHome from '#/components/auth/back-to-home';

export const Route = createFileRoute('/_auth')({
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
