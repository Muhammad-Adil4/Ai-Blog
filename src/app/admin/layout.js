
"use client";

import {
  LayoutDashboard,
  PlusSquare,
  ListOrdered,
  MessageSquareText,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { assets } from "../../../public/assets/assets";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { adminlogout } from "@/services/frontend/adminApi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Sidebar links
export const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Add Blog", href: "/admin/add-blog", icon: PlusSquare },
  { label: "Blog List", href: "/admin/blog-list", icon: ListOrdered },
  { label: "Comments", href: "/admin/comment", icon: MessageSquareText },
];

const Layout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await adminlogout();
      if (response.success) {
        toast.success(response.message);
        router.push("/admin/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    return <>{children}</>;
  }

  return (
    <>
      {/* Top Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-10 w-28 sm:h-12 sm:w-32"
            >
              <Image
                onClick={() => router.push("/")}
                src={assets.logo}
                alt="logo"
                fill
                className="object-contain cursor-pointer"
                priority
              />
            </motion.div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition"
          >
            Logout
          </motion.button>
        </div>
      </motion.header>

      {/* Main Wrapper */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar Desktop */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block w-64 bg-white border-r border-gray-200 p-4 shadow-sm"
        >
          <nav className="space-y-2">
            {adminNav.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-indigo-600 text-white font-medium shadow-sm"
                        : "text-gray-700 hover:bg-indigo-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </motion.aside>

        {/* Sidebar Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-4"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                  <X className="w-6 h-6" />
                </motion.button>
                <nav className="mt-10 space-y-2">
                  {adminNav.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                            isActive
                              ? "bg-indigo-600 text-white font-medium shadow-sm"
                              : "text-gray-700 hover:bg-indigo-50"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </>
  );
};

export default Layout;