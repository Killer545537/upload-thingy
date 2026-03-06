import { useSuspenseQuery } from '@tanstack/react-query';
import { createAuthClient } from 'better-auth/react';
import { env } from '#/config/env';
import { authQueries } from '#/queries/auth';

export const authClient = createAuthClient({
    baseURL: env.BETTER_AUTH_URL,
});

export const useAuthentication = () => {
    const { data: userSession } = useSuspenseQuery(authQueries.user());

    return { userSession, isAuthenticated: !!userSession };
};
