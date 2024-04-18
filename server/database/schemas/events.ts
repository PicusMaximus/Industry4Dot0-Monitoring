import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { devices } from "./devices";
import { jobs } from "./jobs";

export const events = sqliteTable("events", {
  id: int("id").primaryKey({ autoIncrement: true }),
  deviceId: text("deviceId")
    .notNull()
    .references(() => devices.id),
  timestamp: int("timestamp", { mode: "timestamp_ms" }).notNull(),
  level: text("type", { enum: ["info", "warning", "error", "debug"] }).notNull(),
  message: text("message", { length: 100 }),
  jobId: text("jobId").references(() => jobs.id),
  status: text("status", { enum: ["job-gestartet", "job-beendet", "wartung-gestartet", "wartung-beendet"] }),
});

export const insertEventSchema = createInsertSchema(events, {
  timestamp: (schema) => z.coerce.date(schema.timestamp),
});

export type InsertEvent = typeof events.$inferInsert;
export type SelectEvent = typeof events.$inferSelect;
