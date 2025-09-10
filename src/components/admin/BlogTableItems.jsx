"use client";

import Image from "next/image";
import { assets } from "../../../public/assets/assets";
import { motion } from "framer-motion";

// Animation variants for table row
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
  hover: {
    backgroundColor: "rgba(99, 102, 241, 0.1)", // Subtle indigo tint
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// Animation variants for table cells
const cellVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Animation variants for buttons and icons
const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#eef2ff", // indigo-50
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 15, // Subtle rotation for delete icon
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 },
  },
};

const BlogTableItems = ({ blogs, index, handleDeleteBlog, handleToggleBlog }) => {
  // Fallback values for missing data
  const {
    title = "Untitled",
    createdAt = new Date().toISOString(),
    isPublished = false,
    _id = `fallback-${index}`,
  } = blogs || {};

  const BlogData = new Date(createdAt);
  const dateString =
    BlogData instanceof Date && !isNaN(BlogData)
      ? BlogData.toDateString()
      : "Invalid Date";

  return (
    <motion.tr
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      className="border-y border-gray-200"
    >
      <motion.td
        variants={cellVariants}
        custom={0}
        className="px-6 py-4 text-gray-600"
      >
        {index}
      </motion.td>
      <motion.td
        variants={cellVariants}
        custom={1}
        className="px-6 py-4 text-gray-900 font-medium"
      >
        {title}
      </motion.td>
      <motion.td
        variants={cellVariants}
        custom={2}
        className="px-6 py-4 max-sm:hidden text-gray-600"
      >
        {dateString}
      </motion.td>
      <motion.td
        variants={cellVariants}
        custom={3}
        className="px-6 py-4 max-sm:hidden"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            isPublished
              ? "text-green-700 bg-green-100"
              : "text-orange-700 bg-orange-100"
          }`}
        >
          {isPublished ? "Published" : "Unpublished"}
        </motion.span>
      </motion.td>
      <motion.td
        variants={cellVariants}
        custom={4}
        className="px-6 py-4 flex text-sm gap-3"
      >
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleToggleBlog(_id)}
          className="border border-gray-300 px-3 py-1 rounded-lg text-gray-700"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </motion.button>
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleDeleteBlog(_id)}
        >
          <Image
            src={assets.cross_icon}
            alt="delete"
            className="w-6 h-6 cursor-pointer"
            width={24}
            height={24}
          />
        </motion.div>
      </motion.td>
    </motion.tr>
  );
};

export default BlogTableItems;
