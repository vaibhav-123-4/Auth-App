import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");

    // If the request is for the login or signup page and the user is already authenticated, redirect to profile
    if ((request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup") && token) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // If the request is for a protected route and no token is present, redirect to login
    if (
        (request.nextUrl.pathname.startsWith("/profile") || request.nextUrl.pathname.startsWith("/api/users")) &&
        !token
    ) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/profile',
    '/signup',
  ]
};