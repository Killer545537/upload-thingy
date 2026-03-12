import { eq } from 'drizzle-orm';
import { db } from '#/lib/db';
import { uploads } from '#/lib/db/schema';

export async function getUploadsByUserId(userId: string) {
    return db.query.uploads.findMany({
        where: eq(uploads.userId, userId),
    });
}
