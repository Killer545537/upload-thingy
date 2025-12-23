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

export const signUpUser = async (
    name: string,
    email: string,
    password: string,
) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                name,
                password,
            },
        });

        return { message: 'Account created successfully', success: true };
    } catch (e) {
        const error = e as Error;
        return {
            message: error.message || 'An error occurred during signup',
            success: false,
        };
    }
};

export const logoutUser = async () => {
    try {
        await auth.api.signOut();
        return { message: 'Logged out successfully', success: true };
    } catch (e) {
        const error = e as Error;
        return {
            message: error.message || 'An error occurred during logout',
            success: false,
        };
    }
};
