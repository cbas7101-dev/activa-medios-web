import { defineMiddleware } from "astro:middleware";
import { auth } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, locals, redirect } = context;

  if (!url.pathname.startsWith("/admin")) {
    return next();
  }

  if (url.pathname === "/admin/login") {
    return next();
  }

  if (url.pathname.startsWith("/api/auth")) {
    return next();
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return redirect("/admin/login");
  }

  locals.user = session.user;
  return next();
});
