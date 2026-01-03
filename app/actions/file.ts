'use server';

import { and, desc, eq, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/db';
import { files } from '@/db/schema/files';
import { auth } from '@/lib/auth';

export const getUserFiles = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await import('next/headers').then((h) => h.headers()),
        });

        if (!session?.user?.id) {
            return {
                error: 'User not authenticated',
                files: [],
                success: false,
            };
        }

        const userFiles = await db
            .select()
            .from(files)
            .where(
                and(eq(files.userId, session.user.id), isNull(files.deletedAt)),
            )
            .orderBy(desc(files.createdAt));

        return { files: userFiles, success: true };
    } catch (error) {
        console.error('Error fetching user files:', error);
        return { error: 'Failed to fetch files', files: [], success: false };
    }
};

export const deleteFile = async (fileId: string) => {
    try {
        const session = await auth.api.getSession({
            headers: await import('next/headers').then((h) => h.headers()),
        });

        if (!session?.user?.id) {
            return { error: 'User not authenticated', success: false };
        }

        // Soft delete by setting deletedAt timestamp
        await db
            .update(files)
            .set({
                deletedAt: new Date(),
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(files.id, fileId),
                    eq(files.userId, session.user.id),
                    isNull(files.deletedAt),
                ),
            );

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Error deleting file:', error);
        return { error: 'Failed to delete file', success: false };
    }
};

export const toggleFileStarred = async (fileId: string, starred: boolean) => {
    try {
        const session = await auth.api.getSession({
            headers: await import('next/headers').then((h) => h.headers()),
        });

        if (!session?.user?.id) {
            return { error: 'User not authenticated', success: false };
        }

        await db
            .update(files)
            .set({
                starred,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(files.id, fileId),
                    eq(files.userId, session.user.id),
                    isNull(files.deletedAt),
                ),
            );

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Error updating file starred status:', error);
        return { error: 'Failed to update file', success: false };
    }
};

export const updateFileName = async (fileId: string, newName: string) => {
    try {
        const session = await auth.api.getSession({
            headers: await import('next/headers').then((h) => h.headers()),
        });

        if (!session?.user?.id) {
            return { error: 'User not authenticated', success: false };
        }

        if (!newName.trim()) {
            return { error: 'File name cannot be empty', success: false };
        }

        await db
            .update(files)
            .set({
                originalName: newName.trim(),
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(files.id, fileId),
                    eq(files.userId, session.user.id),
                    isNull(files.deletedAt),
                ),
            );

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Error updating file name:', error);
        return { error: 'Failed to update file name', success: false };
    }
};

export const getFileById = async (fileId: string) => {
    try {
        const session = await auth.api.getSession({
            headers: await import('next/headers').then((h) => h.headers()),
        });

        if (!session?.user?.id) {
            return {
                error: 'User not authenticated',
                file: null,
                success: false,
            };
        }

        const file = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.id, fileId),
                    eq(files.userId, session.user.id),
                    isNull(files.deletedAt),
                ),
            )
            .limit(1);

        if (!file || file.length === 0) {
            return { error: 'File not found', file: null, success: false };
        }

        return { file: file[0], success: true };
    } catch (error) {
        console.error('Error fetching file:', error);
        return { error: 'Failed to fetch file', file: null, success: false };
    }
};

export const getSession = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await import('next/headers').then((h) => h.headers()),
        });

        return { session, success: true };
    } catch (error) {
        console.error('Error fetching session:', error);
        return { session: null, success: false };
    }
};
