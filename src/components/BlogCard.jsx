
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function BlogCard({ blog }) {
  const router = useRouter();
  const { _id, title, description, image, category, content, createdAt } = blog || {};

  // Log blog data for debugging
  console.log("BlogCard data:", { _id, title, description, image, category, content, createdAt });

  // Truncate function for 15 words
  const truncateWords = (text, wordLimit = 15) => {
    if (!text) return "No description available";
    const words = text.split(/\s+/);
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // Prevent rendering if _id is missing
  if (!_id) {
    console.warn("BlogCard: Missing _id, skipping render");
    return null;
  }

  return (
    <motion.article
      whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/blog/${_id}`)}
      className="rounded-lg overflow-hidden bg-white shadow-sm transition-all cursor-pointer flex flex-col h-full min-h-[400px]"
      aria-label={`Read blog: ${title || "Untitled"}`}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-gray-200 flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt={title || "Blog image"}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">{title?.[0] || "B"}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="inline-block bg-indigo-100 text-indigo-600 text-xs px-2.5 py-1 rounded-full w-max">
          {category || "General"}
        </span>

        <h3 className="text-gray-900 font-semibold text-lg line-clamp-2">
          {title || "Untitled"}
        </h3>

        <div className="flex-1">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="text-gray-600 text-sm line-clamp-3">{children}</p>
              ),
            }}
          >
            {truncateWords(description || content || "No description available", 15)}
          </ReactMarkdown>
        </div>

        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
          <span>
            {createdAt
              ? new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Unknown date"}
          </span>
          <span className="font-medium text-indigo-600 hover:underline">Read →</span>
        </div>
      </div>
    </motion.article>
  );
};