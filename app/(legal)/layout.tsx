import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '@/components/landing/navbar';

export const metadata: Metadata = {
    description:
        'The simplest way to upload, secure, and retrieve your digital assets.',
    title: {
        default: 'UploadThingy',
        template: '%s | UploadThingy',
    },
};

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='min-h-screen bg-background'>
            <Navbar />
            {children}
        </div>
    );
};

export default MainLayout;
