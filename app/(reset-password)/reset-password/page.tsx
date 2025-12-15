'use client';

import { Suspense } from 'react';
import ResetPasswordForm from '@/components/password-reset/reset-password';

const Page = () => (
    <Suspense fallback={<div />}>
        <ResetPasswordForm />
    </Suspense>
);

export default Page;
