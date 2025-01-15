import { integer, pgTable, varchar, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  password: text(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const sessionsTable = pgTable("sessions", {
  token: uuid("uuid4").defaultRandom().primaryKey(),
  userid: integer().references(() => usersTable.id),
  created_at: timestamp().defaultNow().notNull(), 
  expires_at: timestamp().notNull()
})


export const userSchema = z.object({
  email:z.string().email("Invalid email address"),
  name:z.string(),
  password:z.string()
})