import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PROTECTED_ROUTES } from "./lib/constants";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  const isProtectedPath = PROTECTED_ROUTES.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !authToken) {
    // Create the URL for the login page with the redirect parameter
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_to", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/users/:path*"],
};
