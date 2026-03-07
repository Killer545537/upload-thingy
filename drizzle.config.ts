import { env } from '#/config/env';
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
    casing: 'snake_case',
    dbCredentials: {
        url: env.DATABASE_URL!,
    },
    dialect: 'postgresql',
    migrations: {
        schema: 'public',
        table: '__drizzle_migrations',
    },
    out: './migrations',
    schema: './src/lib/db/schema',
    strict: true,
    verbose: true,
});
