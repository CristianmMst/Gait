import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./app/auth/actions/verifySession";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register", "/"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);
  const isPublic = publicRoutes.includes(path);

  const session = await verifySession();

  if (isProtected && !session?.id) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublic && session?.id) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
