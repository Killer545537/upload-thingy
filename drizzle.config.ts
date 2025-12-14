import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
    casing: 'snake_case',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    dialect: 'postgresql',
    migrations: {
        schema: 'public',
        table: '__drizzle_migrations',
    },
    out: './migrations',
    schema: './db/schema',
    strict: true,
    verbose: true,
});
