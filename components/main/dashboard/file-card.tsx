'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    Download,
    FileArchive,
    File as FileIconFallback,
    FileText,
    Image,
    Link,
    Pencil,
    Trash2,
} from 'lucide-react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuPortal,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn } from '@/lib/utils';

type FileStatus = 'uploaded' | 'uploading' | 'error' | 'processing';

interface FileCardProps {
    id: string;
    name: string;
    extension?: string;
    size: string;
    status?: FileStatus;
    onDelete?: (id: string) => void;
    onRename?: (id: string) => void;
    onDownload?: (id: string) => void;
    onCopyLink?: (id: string) => void;
}

const extensionColors: Record<string, string> = {
    default: 'bg-gray-100 text-gray-600',
    doc: 'bg-blue-100 text-blue-600',
    docx: 'bg-blue-100 text-blue-600',
    jpeg: 'bg-purple-100 text-purple-600',
    jpg: 'bg-purple-100 text-purple-600',
    pdf: 'bg-red-100 text-red-600',
    png: 'bg-purple-100 text-purple-600',
    xls: 'bg-green-100 text-green-600',
    xlsx: 'bg-green-100 text-green-600',
    zip: 'bg-yellow-100 text-yellow-600',
} as const;

const getFileIcon = (extension?: string) => {
    const ext = (extension ?? '').toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return Image;
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) return FileText;
    if (['zip', 'rar', '7z'].includes(ext)) return FileArchive;
    return FileIconFallback;
};

export default function FileCard({
    id,
    name,
    extension = '',
    size,
    status = 'uploaded',
    onDelete,
    onRename,
    onDownload,
    onCopyLink,
}: FileCardProps) {
    const ext = extension?.toLowerCase() ?? '';
    const extColorClass = extensionColors[ext] || extensionColors.default;
    const Icon = getFileIcon(extension);

    const menuItems = [
        {
            action: () => onDownload?.(id),
            danger: false,
            icon: Download,
            label: 'Download',
        },
        {
            action: () => onRename?.(id),
            danger: false,
            icon: Pencil,
            label: 'Rename',
        },
        {
            action: () => onCopyLink?.(id),
            danger: false,
            icon: Link,
            label: 'Copy Link',
        },
        {
            action: () => onDelete?.(id),
            danger: true,
            icon: Trash2,
            label: 'Delete',
        },
    ] as const;

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className='relative group'
                    exit={{ opacity: 0, scale: 0.98 }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    transition={{ damping: 30, stiffness: 400, type: 'spring' }}
                >
                    <motion.div
                        className={cn(
                            'aspect-square bg-background border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-200',
                            'hover:border-gray-400 hover:shadow-md',
                            status === 'uploading' && 'pointer-events-none',
                        )}
                        whileHover={{ y: -2 }}
                    >
                        <div className='w-full h-full flex flex-col'>
                            <div className='flex-1 flex items-center justify-center bg-gray-50 relative overflow-hidden'>
                                <Icon
                                    className='w-12 h-12 text-gray-300'
                                    strokeWidth={1.5}
                                />
                                <AnimatePresence>
                                    {status === 'uploaded' && (
                                        <motion.div
                                            animate={{ opacity: [0, 0.8, 0] }}
                                            className='absolute inset-0 bg-white pointer-events-none'
                                            exit={{ opacity: 0 }}
                                            initial={{ opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className='p-3 border-t border-border'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-sm font-medium text-foreground truncate flex-1'>
                                        {name}
                                    </p>
                                    <span
                                        className={cn(
                                            'px-1.5 py-0.5 text-[10px] font-medium uppercase rounded',
                                            extColorClass,
                                        )}
                                    >
                                        {extension}
                                    </span>
                                </div>
                                <p className='text-xs font-mono text-muted-foreground mt-1'>
                                    {size}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </ContextMenuTrigger>

            <ContextMenuPortal>
                <ContextMenuContent className='w-44'>
                    {menuItems.map(
                        ({ action, icon: ItemIcon, label, danger }) => {
                            return (
                                <ContextMenuItem
                                    className={cn(
                                        'flex items-center gap-2 px-3 py-2 text-sm',
                                        'text-foreground',
                                        danger ? 'group' : '',
                                    )}
                                    key={label}
                                    onSelect={action}
                                >
                                    <ItemIcon
                                        className={cn(
                                            'w-4 h-4 transition-colors',
                                            danger
                                                ? 'text-gray-500 group-hover:text-destructive'
                                                : 'text-gray-500',
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            'transition-colors',
                                            danger
                                                ? 'group-hover:text-destructive'
                                                : '',
                                        )}
                                    >
                                        {label}
                                    </span>
                                </ContextMenuItem>
                            );
                        },
                    )}
                </ContextMenuContent>
            </ContextMenuPortal>
        </ContextMenu>
    );
}
