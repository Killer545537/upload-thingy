import type { files } from '@/db/schema/files';

export type File = typeof files.$inferSelect;

export interface FileCardType
    extends Omit<
        File,
        'createdAt' | 'updatedAt' | 'deletedAt' | 'url' | 'userId' | 'key'
    > {
    onDelete?: (id: string) => void;
    onRename?: (id: string) => void;
    onDownload?: (id: string) => void;
    onCopyLink?: (id: string) => void;
}
