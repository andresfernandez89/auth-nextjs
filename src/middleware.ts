import * as jose from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = cookies().get("session");
  if (
    !cookie &&
    request.nextUrl.pathname !== "/signin" &&
    request.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (cookie) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;
    try {
      await jose.jwtVerify(jwt, secret, {});
      return;
    } catch (error) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
