import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import type { Upload } from '#/lib/db/schema';
import FileCard from './file-card';

interface FileGridProps {
    uploads: Upload[];
}

export default function FileGrid({ uploads }: FileGridProps) {
    return (
        <div className='space-y-6'>
            {/* File Grid */}
            <LayoutGroup>
                <motion.div
                    className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
                    layout
                >
                    <AnimatePresence mode='popLayout'>
                        {uploads.map((upload) => (
                            <FileCard key={upload.id} upload={upload} onDelete={() => (4)} onCopyLink={() => (4)} onDownload={() => (4)} onRename={() => (4)} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>

            {/* Empty State */}
            {uploads.length === 0 && (
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col items-center justify-center py-20 text-center'
                    initial={{ opacity: 0, y: 20 }}
                >
                    <div className='w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4'>
                        <svg
                            className='w-10 h-10 text-gray-300'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth={1.5}
                            viewBox='0 0 24 24'
                        >
                            <path
                                d='M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                    <p className='text-lg font-medium text-foreground'>
                        No files yet
                    </p>
                    <p className='text-sm text-muted-foreground mt-1'>
                        Drop files here or click to browse
                    </p>
                </motion.div>
            )}
        </div>
    );
}
