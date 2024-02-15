import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const devices = sqliteTable("device", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ip: text("ip").unique(),
  type: int("type").notNull()
});

export const insertDeviceSchema = createInsertSchema(devices);
export const selectDeviceSchema = createSelectSchema(devices);

export type InsertDevice = typeof devices.$inferInsert;
export type SelectDevice = typeof devices.$inferSelect;
