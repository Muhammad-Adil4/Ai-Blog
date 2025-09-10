
"use client";

import { useEffect, useState } from "react";
import BlogTableItems from "@/components/admin/BlogTableItems";
import { blog_data } from "../../../../public/assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const ListBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // Replace with actual API call when available
      setBlogs(blog_data);
    } catch (error) {
      console.error("Blogs fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-screen bg-gray-50"
      >
        <svg className="animate-spin h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </motion.div>
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
                {blogs?.map((blog, index) => (
                  <BlogTableItems
                    key={blog._id || index}
                    blogs={blog}
                    index={index + 1}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ListBlogsPage;
