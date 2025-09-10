
"use client";

import { CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const CommentsTable = ({ comment, toggleCommentHandler, deleteCommentHandler }) => {
  const { blogId, createdAt, name, message, _id, isApproved } = comment;
  const blogDate = new Date(createdAt);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-gray-200 text-sm hover:bg-gray-50"
    >
      <td className="px-6 py-4 break-words max-w-[250px]">
        <p>
          <span className="font-medium text-gray-700">Blog:</span> {blogId?.title || "Unknown"}
        </p>
        <p>
          <span className="font-medium text-gray-700">Name:</span> {name || "Anonymous"}
        </p>
        <p className="text-gray-600 italic">“{message}”</p>
      </td>
      <td className="px-6 py-4 max-sm:hidden whitespace-nowrap text-gray-500">
        {blogDate.toDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleCommentHandler(_id)}
            className={`flex items-center gap-1 ${isApproved ? "text-green-600 hover:text-green-700" : "text-orange-500 hover:text-orange-600"} transition`}
            title={isApproved ? "Mark Not Approved" : "Approve"}
          >
            {isApproved ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="hidden sm:inline">{isApproved ? "Approved" : "Not Approved"}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => deleteCommentHandler(_id)}
            className="text-red-500 hover:text-red-600 transition"
            title="Delete Comment"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
};

export default CommentsTable;
