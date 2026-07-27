import { db } from "../../../db";
import { insumos } from "../../../db/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });
  }

  const [result] = await db.select().from(insumos).where(eq(insumos.id, id));
  if (!result) {
    return new Response(JSON.stringify({ error: "Insumo no encontrado" }), { status: 404 });
  }

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });
  }

  const body = await request.json();
  const [result] = await db
    .update(insumos)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(insumos.id, id))
    .returning();

  if (!result) {
    return new Response(JSON.stringify({ error: "Insumo no encontrado" }), { status: 404 });
  }

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });
  }

  const [result] = await db.delete(insumos).where(eq(insumos.id, id)).returning();
  if (!result) {
    return new Response(JSON.stringify({ error: "Insumo no encontrado" }), { status: 404 });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "content-type": "application/json" },
  });
};
