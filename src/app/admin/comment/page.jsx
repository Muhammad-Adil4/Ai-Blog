
"use client";

import { useEffect, useState } from "react";
import { comments_data } from "../../../../public/assets/assets";
import CommentsTable from "@/components/admin/CommentsTable";
import { CheckCircle2, XCircle, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call when available
    setComments(comments_data);
    setLoading(false);
  }, []);

  const toggleCommentHandler = (id) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === id
          ? { ...comment, isApproved: !comment.isApproved }
          : comment
      )
    );
  };

  const deleteCommentHandler = (id) => {
    setComments((prev) => prev.filter((comment) => comment._id !== id));
  };

  const filteredComments = comments.filter((c) => {
    if (filter === true) return c.isApproved;
    if (filter === false) return !c.isApproved;
    return true;
  });

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
      {/* Header + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 max-w-4xl"
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">All Comments</h1>
        <div className="flex gap-3">
          {[
            { label: "Approved", value: true, icon: CheckCircle2, color: "green" },
            { label: "Not Approved", value: false, icon: XCircle, color: "orange" },
            { label: "All", value: null, icon: List, color: "blue" },
          ].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(item.value)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                filter === item.value
                  ? `bg-${item.color}-100 text-${item.color}-700 border border-${item.color}-300`
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white mt-5 max-h-[500px]"
      >
        <table className="w-full text-sm text-gray-600">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 sticky top-0 z-10 border-b">
            <tr>
              <th scope="col" className="px-6 py-4">Blog Details</th>
              <th scope="col" className="px-6 py-4 max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredComments.length > 0 ? (
                filteredComments.map((comment, index) => (
                  <CommentsTable
                    key={comment._id || index}
                    comment={comment}
                    toggleCommentHandler={toggleCommentHandler}
                    deleteCommentHandler={deleteCommentHandler}
                  />
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <td colSpan="3" className="py-6 text-gray-500">
                    No comments found.
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default CommentsPage;
