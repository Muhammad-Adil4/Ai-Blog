
"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./BlogCard";
import { getAllBlogs } from "@/services/frontend/blogApi";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const BlogCategory = ["All", "Technology", "Startup", "Lifestyle", "Finance"];

const Hero = () => {
  const [blogData, setBlogData] = useState([]);
  const [menu, setMenu] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await getAllBlogs();
        if (response.success) {
          toast.success(response.message);
          setBlogData(response.blogs || []);
          console.log("Fetched blogs:", response.blogs); // Debug: Log fetched data
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Combined filtering: category + search
  const filteredBlogs = blogData
    .filter((blog) => (menu === "All" ? true : blog.category === menu))
    .filter((blog) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        (blog.title && blog.title.toLowerCase().includes(q)) ||
        (blog.description && blog.description.toLowerCase().includes(q)) ||
        (blog.content && blog.content.toLowerCase().includes(q))
      );
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 min-h-screen bg-gray-50"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-center bg-indigo-100 px-4 py-1.5 rounded-full gap-2 text-sm text-indigo-600"
      >
        New: AI feature integrated
        <Star className="h-4 w-4" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-6"
      >
        Your <span className="text-indigo-600">Blogging</span> Platform
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-4 max-w-2xl text-gray-600 text-base sm:text-lg md:text-xl"
      >
        Share your thoughts, stories, and ideas with the world. Your voice matters, and it starts here.
      </motion.p>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex w-full max-w-md mt-6 border border-gray-300 rounded-lg overflow-hidden shadow-sm"
      >
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => toast.success("Search triggered!")}
          className="bg-indigo-600 text-white px-6 py-2.5 text-sm sm:text-base font-medium hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-3 my-10"
      >
        {BlogCategory.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => setMenu(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              menu === item
                ? "bg-indigo-600 text-white"
                : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
            }`}
          >
            {item}
          </motion.button>
        ))}
      </motion.div>

      {/* Blog Grid */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto w-full"
        >
          {filteredBlogs.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-600 text-lg"
            >
              No blogs found.
            </motion.p>
          ) : (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="h-full"
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;
