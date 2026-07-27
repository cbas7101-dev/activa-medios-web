import { db } from "../../../db";
import { publicaciones } from "../../../db/schema";
import type { APIRoute } from "astro";
import { like, or, eq, sql, desc, and } from "drizzle-orm";

export const GET: APIRoute = async ({ url }) => {
  const estado = url.searchParams.get("estado") || "";
  const submarca = url.searchParams.get("submarca") || "";
  const search = url.searchParams.get("q") || "";

  const conditions = [];
  if (estado) conditions.push(eq(publicaciones.estado, estado));
  if (submarca) conditions.push(eq(publicaciones.submarca, submarca));
  if (search) conditions.push(like(publicaciones.titulo, `%${search}%`));

  const query = db.select().from(publicaciones);
  const result = conditions.length > 0
    ? await query.where(and(...conditions)).orderBy(desc(publicaciones.createdAt))
    : await query.orderBy(desc(publicaciones.createdAt));

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { titulo, contenido, imagenUrl, plataformas, fechaPublicacion, estado, submarca } = body;

  if (!titulo) {
    return new Response(JSON.stringify({ error: "El título es requerido" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const [result] = await db
    .insert(publicaciones)
    .values({
      titulo,
      contenido,
      imagenUrl,
      plataformas: plataformas || [],
      fechaPublicacion: fechaPublicacion ? new Date(fechaPublicacion) : null,
      estado: estado || "borrador",
      submarca: submarca || "aktiva-cursos",
    })
    .returning();

  return new Response(JSON.stringify(result), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
};
