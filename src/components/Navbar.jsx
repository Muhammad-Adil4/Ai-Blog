"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { assets } from "../../public/assets/assets";

const Navbar = () => {
  const router = useRouter();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-50 w-full top-0 backdrop-blur-lg bg-white/80 shadow-sm flex justify-between items-center py-3 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="relative h-12 w-24 sm:h-14 sm:w-28 md:h-16 md:w-32"
      >
        <Image
          onClick={() => router.push("/")}
          src={assets.logo}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
          alt="logo"
          className="object-contain cursor-pointer"
          priority
        />
      </motion.div>

      {/* Login Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/admin/dashboard")}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium hover:bg-indigo-700 transition-colors"
      >
        Login
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;
