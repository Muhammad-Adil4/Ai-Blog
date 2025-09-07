"use client";

import Image from "next/image";
import { assets } from "../../../public/assets/assets";

const BlogTableItems = ({ blogs, index }) => {
  const { title, createdAt, isPublished, _id } = blogs;
  const BlogData = new Date(createdAt);

  const toggleBlog = (id) => {
    console.log("Toggle blog status:", id);
  };

  const deleteBlogByID = (id) => {
    console.log("Delete blog:", id);
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-2 py-4">{index}</td>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogData.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            isPublished
              ? "text-green-700 bg-green-100"
              : "text-orange-700 bg-orange-100"
          }`}
        >
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-sm gap-3">
        <button
          onClick={() => toggleBlog(_id)}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <Image
          onClick={() => deleteBlogByID(_id)}
          src={assets.cross_icon}
          alt="delete"
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          width={32}
          height={32}
        />
      </td>
    </tr>
  );
};

export default BlogTableItems;
