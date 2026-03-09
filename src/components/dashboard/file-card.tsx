import { motion } from 'framer-motion';
import {
    Download,
    FileArchive,
    File as FileIconFallback,
    FileText,
    Image,
    Link,
    Pencil,
    Star,
    Trash2,
} from 'lucide-react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuPortal,
    ContextMenuTrigger,
} from '#/components/ui/context-menu';
import { cn } from '#/lib/utils';

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
    id: fileId,
    originalName: fileName,
    mimeType: fileExtension = '',
    sizeInBytes: fileSize,
    starred,
    onDelete,
    onRename,
    onDownload,
    onCopyLink,
}: any) {
    const ext = fileExtension?.toLowerCase() ?? '';
    const extColorClass = extensionColors[ext] || extensionColors.default;
    const Icon = getFileIcon(fileExtension);

    const menuItems = [
        {
            action: () => onDownload?.(fileId),
            danger: false,
            icon: Download,
            label: 'Download',
        },
        {
            action: () => onRename?.(fileId),
            danger: false,
            icon: Pencil,
            label: 'Rename',
        },
        {
            action: () => onCopyLink?.(fileId),
            danger: false,
            icon: Link,
            label: 'Copy Link',
        },
        {
            action: () => onDelete?.(fileId),
            danger: true,
            icon: Trash2,
            label: 'Delete',
        },
    ] as const;

    return (
        <ContextMenu>
            <ContextMenuTrigger
                render={({ ref, ...triggerProps }) => (
                    <motion.div
                        ref={ref as React.Ref<HTMLDivElement>}
                        onContextMenu={triggerProps.onContextMenu}
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
                            )}
                            whileHover={{ y: -2 }}
                        >
                            <div className='w-full h-full flex flex-col'>
                                <div className='flex-1 flex items-center justify-center bg-gray-50 relative overflow-hidden'>
                                    <Icon
                                        className='w-12 h-12 text-gray-300'
                                        strokeWidth={1.5}
                                    />
                                </div>

                                <div className='p-3 border-t border-border'>
                                    <div className='flex items-center gap-2'>
                                        {starred && (
                                            <Star
                                                className='w-4 h-4 text-yellow-400 shrink-0'
                                                strokeWidth={1.5}
                                            />
                                        )}
                                        <p className='text-sm font-medium text-foreground truncate flex-1'>
                                            {fileName}
                                        </p>
                                        <span
                                            className={cn(
                                                'px-1.5 py-0.5 text-[10px] font-medium uppercase rounded',
                                                extColorClass,
                                            )}
                                        >
                                            {fileExtension}
                                        </span>
                                    </div>
                                    <p className='text-xs font-mono text-muted-foreground mt-1'>
                                        {fileSize}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            />

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
