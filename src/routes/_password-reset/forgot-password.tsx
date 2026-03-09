import { createFileRoute } from '@tanstack/react-router';
import ForgotPasswordForm from '#/components/password-reset/forgot-password';

export const Route = createFileRoute('/_password-reset/forgot-password')({
    component: RouteComponent,
});

function RouteComponent() {
    return <ForgotPasswordForm />;
}
