import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt } from "./lib/lib";

export async function middleware(request: NextRequest) {
  const cookie = await decrypt();
  if (
    !cookie &&
    request.nextUrl.pathname !== "/signin" &&
    request.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
