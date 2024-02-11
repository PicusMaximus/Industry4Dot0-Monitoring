import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const events = sqliteTable("event", {
  id: int("id").primaryKey({ autoIncrement: true }),
  message: text("message").notNull(),
});

export const insertEventSchema = createInsertSchema(events);
export const selectEventSchema = createSelectSchema(events);

export type InsertEvent = typeof events.$inferInsert;
export type SelectEvent = typeof events.$inferSelect;
