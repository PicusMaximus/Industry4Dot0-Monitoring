import type { Config } from "drizzle-kit";

export default {
  schema: "./server/database/schemas/**/*.ts",
  out: "./server/database/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
