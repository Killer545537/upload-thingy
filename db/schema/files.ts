import {
    boolean,
    index,
    pgTable,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';
import { user } from '@/db/schema/auth-schema';

export const files = pgTable(
    'files',
    {
        createdAt: timestamp().defaultNow().notNull(),

        deletedAt: timestamp(),
        id: uuid().defaultRandom().primaryKey(),

        /// UploadThing storage key
        key: text().notNull().unique(),
        mimeType: text().notNull(),

        originalName: text().notNull(),
        sizeInBytes: text().notNull(),

        starred: boolean().notNull().default(false),
        updatedAt: timestamp()
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        /// Resolved file URL
        url: text().notNull(),

        userId: text()
            .references(() => user.id, { onDelete: 'cascade' })
            .notNull(),
    },
    (table) => [
        index('files_user_active_idx').on(table.userId, table.deletedAt),
    ],
);
