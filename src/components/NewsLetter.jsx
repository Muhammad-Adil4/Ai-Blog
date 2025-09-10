
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center w-full py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-3xl sm:text-4xl font-bold text-gray-900"
      >
        Never Miss a Blog!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-base sm:text-lg text-gray-600 mt-3 max-w-2xl mx-auto"
      >
        Subscribe to get the latest blogs, tech updates, and exclusive news delivered to your inbox.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-lg max-w-md sm:max-w-lg mt-6 mx-auto flex flex-col sm:flex-row items-center gap-2 p-2 shadow-sm"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 outline-none px-4 py-2.5 rounded-lg sm:rounded-l-lg text-sm sm:text-base w-full focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your email"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-indigo-600 px-6 py-2.5 text-sm sm:text-base rounded-lg sm:rounded-r-lg text-white w-full sm:w-auto font-medium hover:bg-indigo-700 transition"
        >
          Subscribe
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default NewsLetter;
