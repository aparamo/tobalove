import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  ...(process.env.DATABASE_URL_UNPOOLED && {
    datasource: {
      url: process.env.DATABASE_URL_UNPOOLED,
    },
  }),
});
