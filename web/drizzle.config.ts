import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const URL = `postgres://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/kmm`

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: URL,
  },
});
