
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { assets, dashboard_data } from "../../../../public/assets/assets";
import BlogTableItems from "@/components/admin/BlogTableItems";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.15,
      ease: "easeOut",
    },
  },
};

const statsCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      console.log("Fetching dashboard data:", dashboard_data); // Debug log
      if (!dashboard_data || !dashboard_data.recentBlogs || !Array.isArray(dashboard_data.recentBlogs)) {
        throw new Error("Invalid or missing recentBlogs data");
      }
      // Validate each blog object
      const validBlogs = dashboard_data.recentBlogs.filter(
        (blog) => blog && blog._id && blog.title && blog.createdAt
      );
      if (validBlogs.length === 0) {
        throw new Error("No valid blog data found");
      }
      setDashboardData({ ...dashboard_data, recentBlogs: validBlogs });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to load dashboard data");
      // Fallback data to ensure table renders
      setDashboardData({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: [
         
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // Debug log after setting data
    console.log("Dashboard data set:", dashboardData);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 p-4 sm:p-6 lg:p-10 bg-gray-50"
    >
      {/* Stats Cards */}
      <motion.div variants={containerVariants} className="flex flex-wrap gap-4">
        {[
          { icon: assets.dashboard_icon_1, value: dashboardData.blogs, label: "Blogs" },
          { icon: assets.dashboard_icon_2, value: dashboardData.comments, label: "Comments" },
          { icon: assets.dashboard_icon_3, value: dashboardData.drafts, label: "Drafts" },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={statsCardVariants}
            whileHover="hover"
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm cursor-pointer min-w-[200px]"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 150 }}
            >
              <Image src={item.icon} alt={item.label} width={40} height={40} />
            </motion.div>
            <div>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                className="text-xl font-semibold text-gray-900"
              >
                {item.value}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                className="text-gray-500 text-sm"
              >
                {item.label}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Blogs Table */}
      <motion.div variants={tableVariants} className="mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-3 text-gray-900"
        >
          <Image src={assets.dashboard_icon_4} alt="Latest" width={24} height={24} />
          <p className="text-lg font-semibold">Latest Blogs</p>
        </motion.div>
        <motion.div
          variants={tableVariants}
          className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white mt-4"
        >
          <table className="w-full text-sm text-gray-600">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">#</th>
                <th scope="col" className="px-6 py-4">Blogs Title</th>
                <th scope="col" className="px-6 py-4 max-sm:hidden">Date</th>
                <th scope="col" className="px-6 py-4 max-sm:hidden">Status</th>
                <th scope="col" className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={tableVariants}>
              <AnimatePresence>
                {dashboardData.recentBlogs.length > 0 ? (
                  dashboardData.recentBlogs.map((blog, index) => (
                    <BlogTableItems
                      key={blog._id || `blog-${index}`}
                      blogs={blog}
                      index={index + 1}
                    />
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <td colSpan="5" className="py-6 text-gray-500">
                      No recent blogs found.
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
