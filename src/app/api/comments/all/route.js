import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const comments = await Comment.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Fetched all comments successfully",
      comments,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Error fetching comments" },
      { status: 500 }
    );
  }
}
