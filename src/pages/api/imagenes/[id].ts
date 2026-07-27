import { db } from "../../../db";
import { imagenesGeneradas } from "../../../db/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });
  }

  await db.delete(imagenesGeneradas).where(eq(imagenesGeneradas.id, id));
  return new Response(JSON.stringify({ success: true }), {
    headers: { "content-type": "application/json" },
  });
};
