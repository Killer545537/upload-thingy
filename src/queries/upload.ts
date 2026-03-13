import { queryOptions } from '@tanstack/react-query';
import { getUploads } from '#/server/uploads.functions';

export const uploadsQueryOptions = queryOptions({
    queryKey: ['uploads'],
    queryFn: getUploads,
});
