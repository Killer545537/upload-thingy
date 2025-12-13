import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';
import PasswordResetEmail from '@/components/emails/password-reset';
import WelcomeEmail from '@/components/emails/welcome';
import { db } from '@/db/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await resend.emails.send({
                        from: 'UploadThingy <onboarding@resend.dev>',
                        react: WelcomeEmail({ name: user.name }),
                        subject: 'Welcome to UploadThingy!',
                        to: user.email,
                    });
                },
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'UploadThingy <password@resend.dev>',
                react: PasswordResetEmail({ name: user.name, resetUrl: url }),
                subject: 'Reset your password',
                to: user.email,
            });
        },
    },
    plugins: [nextCookies()],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});
