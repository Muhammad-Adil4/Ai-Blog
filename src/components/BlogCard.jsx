"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const BlogCard = ({ blog }) => {
  const { title, description, image, category, _id } = blog;
 const router = useRouter();
  // Remove HTML tags from description
const plainTextDescription = (description || "").replace(/<[^>]+>/g, "");


  return (
    <div onClick={()=> router.push(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow-lg hover:scale-100 hover:shadow-[#5044E5]/25 duration-300 cursor-pointer group bg-gray-100 hover:bg-gray-300 hover:shadow-xl"
    >
      <div className="relative w-full h-60">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
      </div>

      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-[#5044E5]/20 rounded-full text-[#5044E5] text-xs">
        {category}
      </span>

      <div className="p-6">
        <h1 className="text-gray-900 font-medium mb-2">{title}</h1>
        <p className="mb-3 text-xs text-gray-600">
          {plainTextDescription.slice(0, 100)}...
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
