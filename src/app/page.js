import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/NewsLetter";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default page;
