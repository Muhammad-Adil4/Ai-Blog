"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

export default function BlogCard({ blog }) {
  const router = useRouter();
  const { _id, title, description, image, category, content, createdAt } = blog || {};
  const [formattedDate, setFormattedDate] = useState("");

  // Format date
  useEffect(() => {
    if (createdAt) {
      setFormattedDate(
        new Date(createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    }
  }, [createdAt]);

  // Truncate description
  const truncateWords = (text, wordLimit = 20) => {
    if (!text) return "No description available";
    const words = text.split(/\s+/);
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  if (!_id) return null;

  // Hover animation variants
  const containerVariants = {
    hover: {
      boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    tap: { scale: 0.97, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.article
      variants={containerVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={() => router.push(`/blog/${_id}`)}
      className="rounded-lg overflow-hidden bg-white shadow-sm transition-all cursor-pointer flex flex-col h-full min-h-[400px]"
      aria-label={`Read blog: ${title || "Untitled"}`}
    >
      {/* Image */}
      <motion.div
        className="relative w-full aspect-[4/3] bg-gray-200 flex-shrink-0"
        variants={imageVariants}
      >
        {image ? (
          <Image
            src={image}
            alt={title || "Blog image"}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">{title?.[0] || "B"}</span>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div className="p-4 flex flex-col flex-1 gap-2" variants={contentVariants}>
        <span className="inline-block bg-indigo-100 text-indigo-600 text-xs px-2.5 py-1 rounded-full w-max">
          {category || "General"}
        </span>

        <h3 className="text-gray-900 font-semibold text-lg line-clamp-2">
          {title || "Untitled Blog"}
        </h3>

        <div className="flex-1">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="text-gray-600 text-sm line-clamp-3">{children}</p>
              ),
            }}
          >
            {truncateWords(description || content, 20)}
          </ReactMarkdown>
        </div>

        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
          <span>{formattedDate || "Unknown date"}</span>
          <span className="font-medium text-indigo-600 hover:underline">Read →</span>
        </div>
      </motion.div>
    </motion.article>
  );
}
