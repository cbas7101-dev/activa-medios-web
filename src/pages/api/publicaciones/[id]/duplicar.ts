import { db } from "../../../../db";
import { publicaciones } from "../../../../db/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });

  const [original] = await db.select().from(publicaciones).where(eq(publicaciones.id, id));
  if (!original) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404 });

  const [duplicate] = await db
    .insert(publicaciones)
    .values({
      titulo: `${original.titulo} (copia)`,
      contenido: original.contenido,
      imagenUrl: original.imagenUrl,
      plataformas: original.plataformas,
      submarca: original.submarca,
      estado: "borrador",
    })
    .returning();

  return new Response(JSON.stringify(duplicate), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
};
