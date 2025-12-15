import type { Metadata } from 'next';
import { Suspense } from 'react';
import BackToHome from '@/components/auth/back-to-home';
import DitherBackground from '@/components/auth/dither-background';
import ResetCard from '@/components/password-reset/reset-card';

export const metadata: Metadata = {
    description:
        'Reset your UploadThingy password securely and regain access to your account with our easy-to-use password reset feature.',
    title: {
        default: 'Reset Password | UploadThingy',
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
            <ResetCard>{children}</ResetCard>
        </div>
    );
};

export default MainLayout;
