import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST() {
  try {
    const headers = {
      "Set-Cookie": cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false, 
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        expires: new Date(0),
        path: "/",
      }),
    };

    return NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
