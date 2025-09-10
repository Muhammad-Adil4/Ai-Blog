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

// 🔹 Sidebar links
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

  // 🔹 Logout
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

  // 🔹 Agar login/signup page hai → full screen, layout skip
  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    return <>{children}</>;
  }

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 md:p-2 md:px-5">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            <Image
              onClick={() => router.push("/")}
              src={assets.logo}
              alt="logo"
              height={120}
              width={120}
              className="cursor-pointer w-[100px] sm:w-[140px]"
            />
          </div>

          <button
            onClick={handleLogout}
            className="bg-[#5044E5] hover:bg-[#3e34b3] transition text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Wrapper */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 p-4">
          <nav className="space-y-1">
            {adminNav.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-[#5044E5] text-white font-medium shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Sidebar Mobile */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition ${
            sidebarOpen ? "visible" : "invisible"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setSidebarOpen(false)}
          />

          <aside
            className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="mt-10 space-y-1">
              {adminNav.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-[#5044E5] text-white font-medium shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </>
  );
};

export default Layout;
