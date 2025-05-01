import { TYPE_USERS } from "./app/shared/enums/user";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./app/(auth)/actions/verifySession";

const protectedRoutes = ["/", "/dashboard"];

const adminRoutes = ["/admin", "/admin/signup_distributor"];

const publicRoutes = ["/login", "/signup", "/admin/login"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = publicRoutes.includes(path);
  const isProtected = protectedRoutes.includes(path);
  const isAdminRoute =
    path !== "/admin/login" &&
    adminRoutes.some((route) => path.startsWith(route));

  const session = await verifySession();

  if ((isProtected || isAdminRoute) && !session?.id) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isAdminRoute && session?.type !== TYPE_USERS.ADMIN) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPublic && session?.id) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
