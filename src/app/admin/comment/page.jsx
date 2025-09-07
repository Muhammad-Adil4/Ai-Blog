"use client";

import React, { useEffect, useState } from "react";
import { comments_data } from "../../../../public/assets/assets";
import CommentsTable from "@/components/admin/CommentsTable";
import { CheckCircle2, XCircle, List } from "lucide-react";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  useEffect(() => {
    setComments(comments_data);
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

  return (
    <div className="flex-1 pt-5 px-3 sm:px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 max-w-3xl">
        <h1 className="text-xl sm:text-2xl font-semibold">All Comments</h1>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => setFilter(true)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm shadow ${
              filter === true
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-white text-gray-600"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Approved
          </button>
          <button
            onClick={() => setFilter(false)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm shadow ${
              filter === false
                ? "bg-orange-100 text-orange-600 border border-orange-300"
                : "bg-white text-gray-600"
            }`}
          >
            <XCircle className="w-4 h-4" />
            Not Approved
          </button>
          <button
            onClick={() => setFilter(null)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm shadow ${
              filter === null
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-white text-gray-600"
            }`}
          >
            <List className="w-4 h-4" />
            All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="relative max-w-4xl overflow-x-auto overflow-y-auto shadow rounded-lg bg-white mt-5 max-h-[500px]">
        <table className="w-full text-gray-600 text-xs sm:text-sm">
          <thead className="text-xs sm:text-sm text-gray-700 text-left uppercase sticky top-0 bg-white z-10 border-b">
            <tr>
              <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4">Blog Details</th>
              <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 max-sm:hidden">Date</th>
              <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
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
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsPage;
