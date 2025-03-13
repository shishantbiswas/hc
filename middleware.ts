import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    }
  );

  if (session && pathname == "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && !(pathname == "/login")) {
    return NextResponse.redirect(
      new URL(`/login?callback_url=${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/add", "/login"],
};
