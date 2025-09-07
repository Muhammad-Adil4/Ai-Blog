import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id; // user id from JWT
    } catch {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category") || "All";
    const file = formData.get("image");

    if (!title || !content || !file) {
      return NextResponse.json({ success: false, message: "Title, content and image required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "blogs" }, (err, result) => (err ? reject(err) : resolve(result)));
      streamifier.createReadStream(buffer).pipe(stream);
    });

    const newBlog = await Blog.create({
      title,
      content,
      category,
      author: userId, // automatically assign logged-in user
      image: uploadResult.secure_url,
    });

    return NextResponse.json({ success: true, message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    console.error("Blog create error:", err);
    return NextResponse.json({ success: false, message: err.message || "Something went wrong" }, { status: 500 });
  }
}
