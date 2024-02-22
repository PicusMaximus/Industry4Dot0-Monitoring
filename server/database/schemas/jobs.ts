import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { devices } from "./devices";

export const jobs = sqliteTable("jobs", {
  id: text("id").primaryKey(),
  name: text("name", { length: 20 }).notNull(),
  deviceId: text("device_id")
    .notNull()
    .references(() => devices.id),
});

export const insertJobSchema = createInsertSchema(jobs, {
  id: (schema) => schema.id.uuid(),
});

export type InsertJob = typeof jobs.$inferInsert;
export type SelectJob = typeof jobs.$inferSelect;
