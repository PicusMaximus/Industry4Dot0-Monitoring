import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const devices = sqliteTable("devices", {
  id: text("id").primaryKey(),
  name: text("name", { length: 20 }).notNull(),
  ip: text("ip").unique(),
  type: text("type", { enum: ["sps", "dobot"] }).notNull(),
});

export const insertDeviceSchema = createInsertSchema(devices, {
  id: (schema) => schema.id.uuid(),
  ip: (schema) => schema.ip.ip(),
  type: (schema) =>
    z
      .string()
      .transform((value) => value.toLowerCase())
      .pipe(schema.type),
});

export type InsertDevice = typeof devices.$inferInsert;
export type SelectDevice = typeof devices.$inferSelect;
