import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;

  if (sessionCookie && pathname == "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!sessionCookie && !(pathname == "/login")) {
    return NextResponse.redirect(
      new URL(`/login?callback_url=${pathname}`, request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/add"],
};
