import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthCard from '@/components/auth/auth-card';
import BackToHome from '@/components/auth/back-to-home';
import DitherBackground from '@/components/auth/dither-background';

export const metadata: Metadata = {
    description:
        'Authenticate to access your UploadThingy account and manage your digital assets securely.',
    title: {
        default: 'Authenticate | UploadThingy',
        template: '%s | UploadThingy',
    },
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen relative flex items-center justify-center p-4 overflow-hidden'>
            <Suspense
                fallback={<div className='absolute inset-0 hero-gradient' />}
            >
                <DitherBackground />
            </Suspense>
            <BackToHome />
            <AuthCard>{children}</AuthCard>
        </div>
    );
};

export default MainLayout;
