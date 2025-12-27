import type { files } from '@/db/schema/files';

export type File = typeof files.$inferSelect;
