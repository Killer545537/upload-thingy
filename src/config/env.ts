import arkenv from 'arkenv';

export const env = arkenv({
    // Better Auth
    BETTER_AUTH_SECRET: 'string',
    BETTER_AUTH_URL: 'string',
    // Database
    DATABASE_URL: 'string.url',
    // Resend
    RESEND_API_KEY: 'string',
    // Google
    GOOGLE_CLIENT_ID: 'string',
    GOOGLE_CLIENT_SECRET: 'string',
});
