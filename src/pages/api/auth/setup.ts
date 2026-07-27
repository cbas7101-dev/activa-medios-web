import type { APIRoute } from "astro";
import { auth } from "../../../lib/auth";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { email, password, name } = body;

  if (!email || !password || !name) {
    return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const { data, error } = await auth.api.signUpEmail({
      body: { email, password, name },
    });

    if (error) throw new Error(error.message || "Error al crear usuario");

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
};
