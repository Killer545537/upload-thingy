import { createServerFn } from '@tanstack/react-start';
import { type } from 'arktype';
import { getUploadsByUserId } from './uploads.server';

export const getUploads = createServerFn({ method: 'GET' })
    .inputValidator(type({ userId: 'string.uuid.v4' }))
    .handler(async ({ data }) => {
        return getUploadsByUserId(data.userId);
    });
