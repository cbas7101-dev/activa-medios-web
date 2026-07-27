import { db } from "../../../../db";
import { movimientosStock, insumos } from "../../../../db/schema";
import type { APIRoute } from "astro";
import { eq, desc } from "drizzle-orm";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "ID de insumo requerido" }), { status: 400 });
  }

  const result = await db
    .select()
    .from(movimientosStock)
    .where(eq(movimientosStock.insumoId, id))
    .orderBy(desc(movimientosStock.createdAt));

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
};
