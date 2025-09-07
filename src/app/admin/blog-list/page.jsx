"use client";

import React, { useEffect, useState } from "react";
import BlogTableItems from "@/components/Admin/BlogTableItems";
import { blog_data } from "../../../../public/assets/assets";

const ListBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setBlogs(blog_data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-12 bg-blue-50/50">
      <h1 className="text-2xl font-semibold mb-4">All Blogs</h1>

      {/* 🔹 Scrollable container */}
      <div className="relative mt-2 max-w-4xl shadow rounded-lg bg-white">
        <div className="max-h-[400px] overflow-y-auto overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-sm text-gray-600 text-left uppercase sticky top-0 bg-white z-10">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                <th scope="col" className="px-2 py-4">Blogs Title</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Date</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                <th scope="col" className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.map((blog, index) => (
                <BlogTableItems
                  key={blog._id || index}
                  blogs={blog}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBlogsPage;
