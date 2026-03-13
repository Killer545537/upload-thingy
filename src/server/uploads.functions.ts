import { createServerFn } from '@tanstack/react-start';
import { authMiddleware } from './auth';
import { getUploadsByUserId } from './uploads.server';

export const getUploads = createServerFn({ method: 'GET' })
    .middleware([authMiddleware])
    .handler(async ({ context }) => {
        return getUploadsByUserId(context.session.user.id);
    });
