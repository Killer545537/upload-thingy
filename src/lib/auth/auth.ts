import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import WelcomeEmail from '#/components/emails/welcome';
import { db } from '#/lib/db';
import { resend } from '#/lib/emails/resend';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await resend.emails.send({
                        from: 'UploadThingy <onboarding@resend.dev>',
                        react: WelcomeEmail({ name: user.name }),
                        subject: 'Welcome to UploadThingy',
                        to: user.email,
                    });
                },
            },
        },
    },
    plugins: [tanstackStartCookies()],
});
