import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "../database/database";

export default defineNitroPlugin(async () => {
  await migrate(db, {
    migrationsFolder: "./server/database/migrations",
  });
});
