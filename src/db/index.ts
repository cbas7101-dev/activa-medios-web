import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL ?? import.meta.env?.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL no está configurada. " +
    "En local: agrégala al archivo .env. " +
    "En Vercel: configúrala como variable de entorno desde el dashboard de Vercel."
  );
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
