import { useSuspenseQuery } from '@tanstack/react-query';
import { createAuthClient } from 'better-auth/react';
import { authQueries } from '#/queries/auth';

export const authClient = createAuthClient();

export const useAuthentication = () => {
    const { data: userSession } = useSuspenseQuery(authQueries.user());

    return { userSession, isAuthenticated: !!userSession };
};
