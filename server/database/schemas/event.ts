import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const events = sqliteTable("events", {
  id: int("id").primaryKey({ autoIncrement: true }),
  deviceId: int("deviceId").notNull(),
  timestamp: int("timestamp", { mode: "timestamp_ms" }).notNull(),
  level: text("type", { enum: ["info", "warning", "error"] }).notNull(),
  message: text("message"),
  jobId: int("jobId"),
  status: text("status", { enum: ["jobStarted", "jobEnded"] }),
});

export const insertEventSchema = createInsertSchema(events);
export const selectEventSchema = createSelectSchema(events);

export type InsertEvent = typeof events.$inferInsert;
export type SelectEvent = typeof events.$inferSelect;
