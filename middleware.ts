import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/error"];

export default auth((req) => {
  if (PUBLIC_ADMIN_PATHS.includes(req.nextUrl.pathname)) return;
  if (!req.auth) {
    return Response.redirect(new URL("/admin/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
