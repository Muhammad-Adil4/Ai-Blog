"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Trash2 } from "lucide-react";

const CommentsTable = ({ comment, toggleCommentHandler, deleteCommentHandler }) => {
  const { blogId, createdAt, name, message, _id, isApproved } = comment;
  const blogDate = new Date(createdAt);

  return (
    <tr className="border-b border-gray-200 text-xs sm:text-sm hover:bg-gray-50">
      {/* Blog Info */}
      <td className="px-3 py-3 sm:px-6 sm:py-4 break-words max-w-[250px]">
        <p>
          <span className="font-medium text-gray-700">Blog:</span> {blogId?.title}
        </p>
        <p>
          <span className="font-medium text-gray-700">Name:</span> {name}
        </p>
        <p className="text-gray-600 italic">“{message}”</p>
      </td>

      {/* Date */}
      <td className="px-3 py-3 sm:px-6 sm:py-4 max-sm:hidden whitespace-nowrap text-gray-500">
        {blogDate.toDateString()}
      </td>

      {/* Actions */}
      <td className="px-3 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-3">
          {isApproved ? (
            <button
              onClick={() => toggleCommentHandler(_id)}
              className="flex items-center gap-1 text-green-600 hover:text-green-700 transition"
              title="Click to mark Not Approved"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="hidden sm:inline">Approved</span>
            </button>
          ) : (
            <button
              onClick={() => toggleCommentHandler(_id)}
              className="flex items-center gap-1 text-orange-500 hover:text-orange-600 transition"
              title="Click to Approve"
            >
              <XCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Not Approved</span>
            </button>
          )}

          <button
            onClick={() => deleteCommentHandler(_id)}
            className="text-red-500 hover:text-red-600 transition"
            title="Delete Comment"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentsTable;
