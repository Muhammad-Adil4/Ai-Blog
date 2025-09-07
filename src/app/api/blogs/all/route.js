import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Blogs fetched successfully",
      blogs, 
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error while fetching blogs",
      },
      { status: 500 }
    );
  }
}
