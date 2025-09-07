import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found, create a new account" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 400 }
      );
    }

    // Generate JWT
    const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set HTTP-only cookie
    const headers = {
      "Set-Cookie": cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      }),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: { email: user.email, name: user.name },
      },
      { status: 200, headers }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
