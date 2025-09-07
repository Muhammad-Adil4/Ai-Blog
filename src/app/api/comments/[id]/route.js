import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Comment ID is required" },
        { status: 400 }
      );
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    await Comment.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Error deleting comment" },
      { status: 500 }
    );
  }
}
