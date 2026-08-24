import { config } from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "prisma/config";

for (const file of [".env", ".env.local"]) {
  const path = resolve(process.cwd(), file);
  if (existsSync(path)) {
    config({ path });
  }
}

const isGenerate = process.argv.includes("generate");
const databaseUrl = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!isGenerate && !databaseUrl) {
  throw new Error(
    "DATABASE_URL o DATABASE_URL_UNPOOLED deben estar definidas para ejecutar comandos de Prisma que requieren conexión a la base de datos."
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  ...(databaseUrl && {
    datasource: {
      url: databaseUrl,
    },
  }),
});
