import { createFileRoute, Outlet } from '@tanstack/react-router';
import BackToHome from '#/components/auth/back-to-home';
import ResetCard from '#/components/password-reset/reset-card';

export const Route = createFileRoute('/_password-reset')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className='min-h-screen relative flex items-center justify-center p-4 overflow-hidden'>
            <BackToHome />
            <ResetCard>
                <Outlet />
            </ResetCard>
        </main>
    );
}
