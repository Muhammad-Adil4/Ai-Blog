"use client";
import { Star } from "lucide-react";
import { useState } from "react";
import { blog_data } from "../../public/assets/assets";
import BlogCard from "./BlogCard";
let Blogcatgegory = ["All", "Technology", "Startup", "Lifestyle", "Finance"];
const Hero = () => {
  const [menu, setmenu] = useState("All");
  return (
    <div className="text-center flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 mt-10 sm:mt-16 md:mt-20 lg:mt-30 min-h-[60vh] ">
      {/* Badge */}
      <h1 className="flex items-center bg-[#5044E5]/20  px-3 sm:px-4 md:px-5 text-[#5044E5] py-1 rounded-full gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
        New: AI feature integrated
        <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-[18px] md:w-[18px]" />
      </h1>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-600 mt-4 sm:mt-6 md:mt-8">
        Your own <span className="text-[#5044E5]">blogging</span>
        <br />
        platform.
      </h1>

      {/* Description */}
      <p className="mt-3 sm:mt-4 md:mt-5 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl">
        This is your space to think out loud, to share what matters, and to
        write without filters. Whether it’s one word or a thousand, your story
        starts right here.
      </p>

      {/* Search Bar */}
      <div className="flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4 sm:mt-5 md:mt-6 border border-gray-400 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search blogs"
          className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#5044E5]/50"
          aria-label="Search blogs"
        />
        <button
          className="bg-[#5044E5] text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium hover:bg-[#4037b8] transition-colors"
          aria-label="Search"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-5 my-10 relative">
        {Blogcatgegory.map((items, index) => (
          <button
            key={index}
            onClick={() => setmenu(items)}
            className={`rounded-xl p-2 text-xs transition-colors duration-300 ${
              menu === items
                ? "bg-[#5044E5] text-white" // Active color + text
                : "bg-[#5044E5]/20  text-gray-800 hover:bg-[#5044E5]/50 " // Inactive color + text + hover
            }`}
          >
            {items}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-24 mx-8 sm:mx-16 xl:mx-10">
        {blog_data
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default Hero;
