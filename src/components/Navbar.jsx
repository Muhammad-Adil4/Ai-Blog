"use client";

import Image from "next/image";
import React from "react";
import { assets } from "../../public/assets/assets";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="fixed z-50 w-full top-0 backdrop-blur-2xl flex justify-between items-center py-2 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
      {/* Responsive Logo */}
      <div className="relative h-12 w-24 sm:h-14 sm:w-28 md:h-16 md:w-32 lg:h-20 lg:w-36 xl:h-[72px] xl:w-[144px]">
        <Image
          onClick={() => router.push("/")}
          src={assets.logo}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
          alt="logo"
          className="object-contain cursor-pointer"
          priority
        />
      </div>

      {/* Responsive Button */}
      <button
        onClick={() => router.push("/admin/dashboard")}
        className="flex items-center gap-1 sm:gap-2 justify-center cursor-pointer border border-gray-400 bg-[#5044E5] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-1.5 sm:py-2 md:py-2.5 rounded-3xl text-sm sm:text-base md:text-lg font-medium hover:bg-[#4037b8] transition-colors"
      >
        Login
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </button>
    </div>
  );
};

export default Navbar;
