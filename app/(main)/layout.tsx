import type { Metadata } from 'next';
import { MainLayoutClient } from '@/components/main/main-layout-client';

export const metadata: Metadata = {
    description: 'Manage your files and uploads',
    title: 'Dashboard | UploadThingy',
};

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayoutClient>{children}</MainLayoutClient>;
}
