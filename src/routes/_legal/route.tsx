import { createFileRoute, Outlet } from '@tanstack/react-router';
import BackToHome from '#/components/auth/back-to-home';
import { seo } from '#/lib/utils';

export const Route = createFileRoute('/_legal')({
    head: () => ({
        meta: [
            ...seo({
                title: 'Legal - Upload Thingy',
                description:
                    'Read the legal information, terms of service, and privacy policy for Upload Thingy.',
            }),
        ],
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className='min-h-screen bg-background'>
            <BackToHome />
            <Outlet />
        </main>
    );
}
