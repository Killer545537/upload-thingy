'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import {
    deleteFile,
    getFileById,
    getUserFiles,
    toggleFileStarred,
    updateFileName,
} from '@/app/actions/file';
import type { FileCardType } from '@/app/types/file';
import FileCardGrid from './file-card-grid';

const Dashboard = () => {
    const [files, setFiles] = useState<FileCardType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = useCallback((newFiles: File[]) => {
        console.log('Uploading files:', newFiles);
        // TODO: Implement file upload logic
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            const result = await deleteFile(id);

            if (result.success) {
                // Remove file from local state for immediate UI update
                setFiles((prev) => prev.filter((file) => file.id !== id));
            } else {
                setError(result.error || 'Failed to delete file');
            }
        } catch (err) {
            setError('An error occurred while deleting the file');
            console.error('Error deleting file:', err);
        }
    }, []);

    const handleRename = useCallback(
        async (id: string) => {
            const file = files.find((f) => f.id === id);
            if (!file) return;

            const newName = prompt('Enter new file name:', file.originalName);
            if (!newName || newName.trim() === file.originalName) return;

            try {
                const result = await updateFileName(id, newName.trim());

                if (result.success) {
                    // Update file name in local state for immediate UI update
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === id
                                ? { ...f, originalName: newName.trim() }
                                : f,
                        ),
                    );
                } else {
                    setError(result.error || 'Failed to rename file');
                }
            } catch (err) {
                setError('An error occurred while renaming the file');
                console.error('Error renaming file:', err);
            }
        },
        [files],
    );

    const handleDownload = useCallback(async (id: string) => {
        try {
            const result = await getFileById(id);

            if (result.success && result.file) {
                // Open the file URL in a new tab to trigger download
                window.open(result.file.url, '_blank');
            } else {
                setError(result.error || 'Failed to download file');
            }
        } catch (err) {
            setError('An error occurred while downloading the file');
            console.error('Error downloading file:', err);
        }
    }, []);

    const handleCopyLink = useCallback(async (id: string) => {
        try {
            const result = await getFileById(id);

            if (result.success && result.file) {
                await navigator.clipboard.writeText(result.file.url);
                // You could add a toast notification here
                console.log('Link copied to clipboard');
            } else {
                setError(result.error || 'Failed to copy file link');
            }
        } catch (err) {
            setError('An error occurred while copying the file link');
            console.error('Error copying link:', err);
        }
    }, []);

    const _handleStarToggle = useCallback(
        async (id: string) => {
            const file = files.find((f) => f.id === id);
            if (!file) return;

            try {
                const result = await toggleFileStarred(id, !file.starred);

                if (result.success) {
                    // Update starred status in local state for immediate UI update
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === id ? { ...f, starred: !f.starred } : f,
                        ),
                    );
                } else {
                    setError(result.error || 'Failed to update file');
                }
            } catch (err) {
                setError('An error occurred while updating the file');
                console.error('Error updating file:', err);
            }
        },
        [files],
    );

    // Load files on component mount
    useEffect(() => {
        const loadFiles = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getUserFiles();

                if (result.success) {
                    // Transform database files to FileCardType format
                    const transformedFiles: FileCardType[] = result.files.map(
                        (file) => ({
                            id: file.id,
                            mimeType: file.mimeType,
                            onCopyLink: handleCopyLink,
                            onDelete: handleDelete,
                            onDownload: handleDownload,
                            onRename: handleRename,
                            originalName: file.originalName,
                            sizeInBytes: file.sizeInBytes,
                            starred: file.starred,
                        }),
                    );

                    setFiles(transformedFiles);
                } else {
                    setError(result.error || 'Failed to load files');
                }
            } catch (err) {
                setError('An error occurred while loading files');
                console.error('Error loading files:', err);
            } finally {
                setLoading(false);
            }
        };

        loadFiles();
    }, [handleCopyLink, handleDelete, handleDownload, handleRename]);

    if (loading) {
        return (
            <main className='p-6'>
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-6'
                    initial={{ opacity: 0, y: 10 }}
                >
                    <h1 className='text-2xl font-semibold text-foreground tracking-tight'>
                        All Files
                    </h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        Loading your files...
                    </p>
                </motion.div>
                <div className='flex items-center justify-center py-20'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                </div>
            </main>
        );
    }

    return (
        <main className='p-6'>
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                className='mb-6'
                initial={{ opacity: 0, y: 10 }}
            >
                <h1 className='text-2xl font-semibold text-foreground tracking-tight'>
                    All Files
                </h1>
                <p className='text-sm text-muted-foreground mt-1'>
                    {files.length} {files.length === 1 ? 'file' : 'files'} in
                    your library
                </p>
            </motion.div>

            {error && (
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-4 p-4 bg-red-50 border border-red-200 rounded-lg'
                    initial={{ opacity: 0, y: -10 }}
                >
                    <p className='text-sm text-red-600'>{error}</p>
                    <button
                        className='text-xs text-red-500 hover:text-red-700 mt-1'
                        onClick={() => setError(null)}
                        type='button'
                    >
                        Dismiss
                    </button>
                </motion.div>
            )}

            <FileCardGrid
                files={files}
                onCopyLink={handleCopyLink}
                onDelete={handleDelete}
                onDownload={handleDownload}
                onRename={handleRename}
                onUpload={handleUpload}
            />
        </main>
    );
};

export default Dashboard;
