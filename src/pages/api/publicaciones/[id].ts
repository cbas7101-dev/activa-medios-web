import { db } from "../../../db";
import { publicaciones } from "../../../db/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });

  const [result] = await db.select().from(publicaciones).where(eq(publicaciones.id, id));
  if (!result) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404 });

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });

  const body = await request.json();
  const updateData: Record<string, any> = { ...body, updatedAt: new Date() };

  if (body.fechaPublicacion) {
    updateData.fechaPublicacion = new Date(body.fechaPublicacion);
  }

  const [result] = await db
    .update(publicaciones)
    .set(updateData)
    .where(eq(publicaciones.id, id))
    .returning();

  if (!result) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404 });

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });

  const [result] = await db.delete(publicaciones).where(eq(publicaciones.id, id)).returning();
  if (!result) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404 });

  return new Response(JSON.stringify({ success: true }), {
    headers: { "content-type": "application/json" },
  });
};
