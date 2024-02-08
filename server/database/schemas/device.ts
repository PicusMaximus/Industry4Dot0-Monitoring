import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const devices = sqliteTable('device', {
    id: integer('id').primaryKey(),
    name: text('name'),
    ip: text('ip')
});