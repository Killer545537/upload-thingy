import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/dashboard')({
    component: DashboardPage,
});

function DashboardPage() {
    return (
        <div className='container mx-auto px-6 py-8'>
            <h1 className='text-3xl font-bold tracking-tight text-foreground mb-6'>
                Dashboard
            </h1>
            <p className='text-muted-foreground'>
                Welcome to your dashboard. You are authenticated.
            </p>
        </div>
    );
}
