"use client";

import { useEffect, useState } from "react";
import BlogTableItems from "@/components/admin/BlogTableItems";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getAllBlogs, deleteBlog, toggleBlog } from "@/services/frontend/blogApi";

const ListBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      if (res.success) {
        setBlogs(res.blogs);
      } else {
        toast.error(res.message || "Failed to fetch blogs");
      }
    } catch (error) {
      toast.error(error?.message || "Error while fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete blog
  const handleDeleteBlog = async (id) => {
    try {
      const response = await deleteBlog(id);
      if (response.success) {
        toast.success(response.message);
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error?.message || "Error while deleting blog");
    }
  };

  // ✅ Toggle blog publish/draft
  const handleToggleBlog = async (id) => {
    try {
      const response = await toggleBlog(id);
      if (response.success) {
        toast.success(response.message);
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === id ? { ...b, isPublished: !b.isPublished } : b
          )
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error?.message || "Error while toggling blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-4 sm:p-6 lg:p-10 bg-gray-50"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4"
      >
        All Blogs
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative max-w-4xl shadow rounded-lg bg-white"
      >
        <div className="max-h-[500px] overflow-y-auto overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-gray-600">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-4">#</th>
                <th scope="col" className="px-6 py-4">Blogs Title</th>
                <th scope="col" className="px-6 py-4 max-sm:hidden">Date</th>
                <th scope="col" className="px-6 py-4 max-sm:hidden">Status</th>
                <th scope="col" className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {blogs?.length > 0 ? (
                  blogs.map((blog, index) => (
                    <BlogTableItems
                      key={blog._id || index}
                      blogs={blog}
                      index={index + 1}
                      handleDeleteBlog={handleDeleteBlog}
                      handleToggleBlog={handleToggleBlog}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No blogs found.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ListBlogsPage;
