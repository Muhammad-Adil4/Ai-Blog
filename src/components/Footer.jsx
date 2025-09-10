"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { assets, footer_data } from "../../public/assets/assets";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-indigo-50 p-8 sm:p-12 lg:p-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* Left Side: Logo & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="md:col-span-2"
        >
          <Image
            src={assets.logo}
            alt="logo"
            width={128}
            height={32}
            className="mb-4 w-auto h-auto"
          />

          <p className="text-sm text-gray-600 leading-relaxed max-w-md">
            Your blogging platform to share ideas, stories, and insights with
            the world. Join our community and start writing today.
          </p>
        </motion.div>

        {/* Right Side: Footer Links */}
        {footer_data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="md:col-span-1"
          >
            <h1 className="text-lg font-semibold text-gray-900 mb-3">
              {item.title}
            </h1>
            <ul className="space-y-2">
              {item.links.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  className="text-sm text-gray-600 hover:text-indigo-600 cursor-pointer hover:underline"
                >
                  {link}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Footer;
