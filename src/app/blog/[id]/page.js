"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllBlogs } from "@/services/frontend/blogApi";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Comment Card Component
const CommentCard = ({ name, message, createdAt }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
        {name?.[0]?.toUpperCase() || "U"}
      </div>
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
    <p className="text-gray-600 leading-relaxed">{message}</p>
  </motion.div>
);

export default function BlogPage() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await getAllBlogs();
        if (response.success) {
          const blog = response.blogs.find((b) => b._id === id);
          if (blog) {
            setBlogData(blog);
          } else {
            toast.error("Blog not found");
          }
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error("Name and comment are required");
      return;
    }

    setComments((prev) => [
      ...prev,
      { ...formData, createdAt: new Date().toISOString() },
    ]);
    toast.success("Comment added successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-xl font-medium">Blog not found 😢</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen mt-20">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {blogData.title}
          </h1>
          {blogData.category && (
            <p className="mt-3 text-sm sm:text-base text-gray-500 uppercase tracking-wide">
              {blogData.category}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-400">
            Published on{" "}
            {new Date(blogData.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Blog Main Image */}
        {blogData.image && (
          <div className="mb-12">
            <Image
              src={blogData.image}
              alt={blogData.title}
              width={1200}
              height={600}
              loading="lazy"
              className="rounded-2xl object-cover w-full max-h-[600px] shadow-lg"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-700 mb-16">
          <ReactMarkdown>{blogData.content}</ReactMarkdown>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>
          <AnimatePresence>
            <div className="space-y-6">
              {comments
                .slice()
                .reverse()
                .map((item, index) => (
                  <CommentCard key={index} {...item} />
                ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Add Comment Form */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Leave a Comment
          </h2>
          <form onSubmit={submitForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleForm}
                type="text"
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleForm}
                type="email"
                placeholder="Your Email (optional)"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleForm}
              placeholder="Your comment..."
              rows={5}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto"
            >
              Post Comment
            </button>
          </form>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}