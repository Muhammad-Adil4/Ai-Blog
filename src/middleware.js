export const runtime = "nodejs"; // Add this line at the top
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    console.log(" Skipping middleware for login/signup");
    return NextResponse.next();
  }

  if (!token) {
    console.log("No token found, redirecting to /admin/login");
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || "supersecret");
    console.log("Token verified successfully");
    return NextResponse.next();
  } catch (error) {
    console.error("🔍 Token verification failed:", error.message);
    const res = NextResponse.redirect(new URL("/admin/login", req.url));
    res.cookies.set("token", "", { maxAge: 0 });
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/blogs/:path*"],
};