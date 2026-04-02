import { defineConfig } from "prisma/config";

// Em Prisma 7, variáveis de ambiente são carregadas automaticamente pelo CLI
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
