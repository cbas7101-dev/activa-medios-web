import { db } from "../../../db";
import { movimientosStock, insumos } from "../../../db/schema";
import type { APIRoute } from "astro";
import { eq, desc, sql } from "drizzle-orm";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { insumoId, cantidad, tipo, usuario, motivo } = body;

  if (!insumoId || cantidad === undefined || !tipo || !usuario) {
    return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const [movimiento] = await db
    .insert(movimientosStock)
    .values({ insumoId, cantidad, tipo, usuario, motivo })
    .returning();

  const stockDelta =
    tipo === "compra" ? cantidad : -Math.abs(cantidad);

  await db
    .update(insumos)
    .set({
      stockActual: sql`${insumos.stockActual} + ${stockDelta}`,
      updatedAt: new Date(),
    })
    .where(eq(insumos.id, insumoId));

  return new Response(JSON.stringify(movimiento), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
};
