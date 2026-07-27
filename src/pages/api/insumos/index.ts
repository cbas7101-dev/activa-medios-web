import { db } from "../../../db";
import { insumos } from "../../../db/schema";
import type { APIRoute } from "astro";
import { like, or, eq, sql, and } from "drizzle-orm";

export const GET: APIRoute = async ({ url }) => {
  const search = url.searchParams.get("q") || "";
  const categoria = url.searchParams.get("categoria") || "";

  const conditions = [];
  if (search) {
    conditions.push(
      or(
        like(insumos.nombre, `%${search}%`),
        like(insumos.proveedor, `%${search}%`)
      )
    );
  }
  if (categoria) {
    conditions.push(eq(insumos.categoria, categoria));
  }

  const query = db.select().from(insumos);
  const result = conditions.length > 0
    ? await query.where(and(...conditions)).orderBy(sql`nombre asc`)
    : await query.orderBy(sql`nombre asc`);

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { nombre, categoria, unidadMedida, stockActual, stockMinimo, imagenUrl, proveedor } = body;

  if (!nombre || !categoria || !unidadMedida) {
    return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const [result] = await db
    .insert(insumos)
    .values({
      nombre,
      categoria,
      unidadMedida,
      stockActual: stockActual ?? 0,
      stockMinimo: stockMinimo ?? 0,
      imagenUrl,
      proveedor,
    })
    .returning();

  return new Response(JSON.stringify(result), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
};
