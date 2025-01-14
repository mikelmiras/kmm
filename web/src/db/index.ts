import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const URL = `postgres://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/kmm`
console.log("Connecting to database using URL: " + URL)
const pool = new Pool({
  connectionString: URL ,
});
export const db = drizzle({ client: pool });
