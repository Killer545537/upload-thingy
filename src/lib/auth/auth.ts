import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import PasswordResetEmail from '#/components/emails/password-reset';
import WelcomeEmail from '#/components/emails/welcome';
import { env } from '#/config/env';
import { db } from '#/lib/db';
import { resend } from '#/lib/emails/resend';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'UploadThingy <password@resend.dev>',
                to: user.email,
                subject: 'Reset your password for UploadThingy',
                react: PasswordResetEmail({name: user.name, resetUrl: url})
            })
        },
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await resend.emails.send({
                        from: 'UploadThingy <onboarding@resend.dev>',
                        to: user.email,
                        subject: 'Welcome to UploadThingy',
                        react: WelcomeEmail({ name: user.name }),
                    });
                },
            },
        },
    },
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
    },
    plugins: [tanstackStartCookies()],
});
