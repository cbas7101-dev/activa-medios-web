import { db } from "../../../db";
import { imagenesGeneradas } from "../../../db/schema";
import type { APIRoute } from "astro";
import { desc, eq } from "drizzle-orm";

export const GET: APIRoute = async ({ url }) => {
  const limit = Number(url.searchParams.get("limit")) || 50;
  const result = await db
    .select()
    .from(imagenesGeneradas)
    .orderBy(desc(imagenesGeneradas.createdAt))
    .limit(limit);

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });
  }

  await db.delete(imagenesGeneradas).where(eq(imagenesGeneradas.id, id));
  return new Response(JSON.stringify({ success: true }), {
    headers: { "content-type": "application/json" },
  });
};
