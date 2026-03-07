import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getUserSession } from '#/server/auth';

export const Route = createFileRoute('/_main')({
    beforeLoad: async () => {
        const session = await getUserSession();

        if (!session) {
            throw redirect({
                to: '/',
            });
        }

        return { user: session.user, session: session.session };
    },
    component: DashboardLayout,
});

function DashboardLayout() {
    return (
        <div className='min-h-screen bg-background'>
            <Outlet />
        </div>
    );
}
