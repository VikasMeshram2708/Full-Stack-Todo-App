import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = cookies().get("todoAuth")?.value;

  // If the Path is "Login" and has the token he/she shouldn't redirect to HOME.
  if (path === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If the Path is "Signup" and has the token he/she shouldn't redirect to LOGIN.
  if (path === "/signup" && token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If the Path is "Todos" and don't have the token he/she shouldn't visit the Todos page.
  if (path === "/todos" && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // return NextResponse.next();
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/todos", "/login", "/signup"],
};
