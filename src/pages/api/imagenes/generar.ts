import { db } from "../../../db";
import { imagenesGeneradas } from "../../../db/schema";
import type { APIRoute } from "astro";
import OpenAI from "openai";
import { put } from "@vercel/blob";
import { desc } from "drizzle-orm";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const FORMATOS: Record<string, { width: number; height: number; label: string }> = {
  "instagram-feed": { width: 1080, height: 1350, label: "Instagram Feed (4:5)" },
  "stories": { width: 1080, height: 1920, label: "Stories / Reels (9:16)" },
  "cuadrado": { width: 1080, height: 1080, label: "Cuadrado (1:1)" },
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { prompt, plataforma, estilo, relacionadoTipo, relacionadoId } = body;

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt requerido" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const formato = FORMATOS[plataforma] || FORMATOS["instagram-feed"];

  const brandPrompt = `Create a professional advertisement image for "Activa Medios" (Ecuadorian signage and advertising company). 
Style: ${estilo || "modern, sleek, metallic chrome and electric blue color palette, liquid glass aesthetic"}. 
Use the brand colors: metallic chrome (#C0C0C0), electric blue (#0066FF), dark backgrounds.
The image should be ${formato.width}×${formato.height} pixels (${formato.label}).
Include the Activa Medios logo subtly placed.
Main subject: ${prompt}`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: brandPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) throw new Error("No image generated");

    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.arrayBuffer();

    const filename = `generated/${Date.now()}-${plataforma}.png`;
    const blob = await put(filename, imageBlob, {
      access: "public",
      contentType: "image/png",
    });

    const [saved] = await db
      .insert(imagenesGeneradas)
      .values({
        prompt,
        plataforma,
        estilo: estilo || null,
        formato: plataforma,
        imagenUrl: blob.url,
        relacionadoTipo: relacionadoTipo || null,
        relacionadoId: relacionadoId || null,
      })
      .returning();

    return new Response(
      JSON.stringify({
        ...saved,
        formatosDisponibles: Object.entries(FORMATOS).map(([key, f]) => ({
          plataforma: key,
          label: f.label,
        })),
      }),
      { status: 201, headers: { "content-type": "application/json" } }
    );
  } catch (err: any) {
    console.error("AI generation error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Error generando imagen" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
};
