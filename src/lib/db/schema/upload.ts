import { relations, sql } from 'drizzle-orm';
import {
    boolean,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const uploads = pgTable(
    'upload',
    {
        id: uuid().default(sql`pg_catalog.gen_random_uuid()`).primaryKey(),
        userId: uuid()
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        // S3 info
        key: text().notNull().unique(),
        bucket: text().notNull(),
        // File info
        fileName: text().notNull(),
        fileSize: integer().notNull(),
        mimeType: text().notNull(),
        // Features
        isStarred: boolean().notNull().default(false),
        // Soft delete
        deletedAt: timestamp(), // null = active, set = in trash
        purgeAt: timestamp(), // deletedAt + 30 days for easy querying
        isPurged: boolean().notNull().default(false), // S3 object automatically deleted
        // Timestamps
        createdAt: timestamp().notNull().defaultNow(),
        updatedAt: timestamp()
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    (table) => [
        index('upload_userId_idx').on(table.userId),
        index('upload_purgeAt_idx').on(table.purgeAt),
    ],
);

export const uploadRelations = relations(uploads, ({ one }) => ({
    user: one(user, {
        fields: [uploads.userId],
        references: [user.id],
    }),
}));
