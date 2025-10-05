// apps/web/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Adjust this list to whatever should be protected
const isProtected = createRouteMatcher([
  "/dashboard(.*)",
  "/import(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) {
    // In your types, auth() returns a Promise → await it
    const session = await auth();

    // If there's no signed-in user, redirect to sign-in
    if (!session.userId) {
      const signInUrl = new URL("/sign-in", req.url);
      // optional: let Clerk send you back after login
      signInUrl.searchParams.set("redirect_url", req.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    // If your version DOES expose redirectToSignIn, you could do:
    // return session.redirectToSignIn();  // (but we keep the NextResponse redirect for compatibility)
  }

  // Non-protected routes just continue
  return NextResponse.next();
});

// Ensure middleware runs for app routes, not static assets
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};

