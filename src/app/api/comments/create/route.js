import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";

export async function POST(req) {
  try {
    await dbConnect();

    const { content, author, blog } = await req.json();

    if (!content || !blog || !author) {
      return NextResponse.json(
        { success: false, message: "content, author, blog are required" },
        { status: 400 }
      );
    }

    const newComment = await Comment.create({
      content,
      blog,
      author,
      isApproved: false,
    });

    return NextResponse.json({
      success: true,
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Error creating comment" },
      { status: 500 }
    );
  }
}
