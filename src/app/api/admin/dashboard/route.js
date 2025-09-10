import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();

    const blogsCount = await Blog.countDocuments();
    const draftsCount = await Blog.countDocuments({ isPublished: false });
    const commentsCount = await Comment.countDocuments();

    // Latest 5 blogs
    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("_id title createdAt isPublished");

    return NextResponse.json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        blogs: blogsCount,
        drafts: draftsCount,
        comments: commentsCount,
        recentBlogs,
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
