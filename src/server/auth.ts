import { createMiddleware, createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { auth } from '#/lib/auth/auth';

export const getUserSession = createServerFn({ method: 'GET' }).handler(
    async () => {
        const request = getRequest();

        if (!request?.headers) return null;

        const userSession = await auth.api.getSession({
            headers: request.headers,
        });

        if (!userSession) return null;

        return { user: userSession.user, session: userSession.session };
    },
);

export const authMiddleware = createMiddleware({ type: 'function' }).server(
    async ({ next }) => {
        const session = await getUserSession();

        if (!session?.user) {
            throw new Error('Unauthorized');
        }

        return next({ context: { session } });
    },
);
