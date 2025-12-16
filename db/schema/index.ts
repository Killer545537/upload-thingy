import { account, session, user, verification } from '@/db/schema/auth-schema';
import { files } from '@/db/schema/files';

export const schema = {
    account,
    files,
    session,
    user,
    verification,
};
