// src/app/api/blogs/delete/route.js
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Error deleting blog" },
      { status: 500 }
    );
  }
}
