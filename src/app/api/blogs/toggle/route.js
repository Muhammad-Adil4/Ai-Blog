import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required" },
        { status: 400 }
      );
    }

    // blog find karo
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // toggle value
    blog.isPublished = !blog.isPublished;
    await blog.save();

    return NextResponse.json({
      success: true,
      message: `Blog ${blog.isPublished ? "published" : "unpublished"} successfully`,
      data: blog,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Error toggling blog status" },
      { status: 500 }
    );
  }
}
