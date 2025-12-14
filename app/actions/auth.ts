'use server';

import { auth } from '@/lib/auth';

export const loginUser = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        return { message: 'Logged in successfully', success: true };
    } catch (e) {
        const error = e as Error;
        return {
            message: error.message || 'An error occurred during login',
            success: false,
        };
    }
};
