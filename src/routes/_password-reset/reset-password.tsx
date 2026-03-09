import { createFileRoute, redirect } from '@tanstack/react-router';
import { type } from 'arktype';
import ResetPasswordForm from '#/components/password-reset/reset-password';

const searchSchema = type({
    token: 'string',
});

export const Route = createFileRoute('/_password-reset/reset-password')({
    validateSearch: searchSchema,
    beforeLoad: async ({ search }) => {
        if (!search.token) {
            throw redirect({
                to: '/forgot-password',
            });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { token } = Route.useSearch();
    return <ResetPasswordForm token={token} />;
}
