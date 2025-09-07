"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { assets, blog_data } from "../../../../public/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 🧩 Comment Card
const CommentCard = ({ name, message, createdAt }) => (
  <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 relative">
    <div className="flex items-center gap-2 mb-2">
      <Image
        src={assets.user_icon}
        alt="user"
        width={28}
        height={28}
        className="w-7 h-7 rounded-full"
      />
      <p className="font-medium text-gray-800">{name}</p>
      <span className="text-xs text-gray-400 ml-auto">
        {new Date(createdAt).toLocaleDateString()}
      </span>
    </div>
    <p className="text-gray-600 ml-9">{message}</p>
  </div>
);

export default function BlogPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    blogId: id,
    name: "",
    email: "",
    message: "",
  });

  // handle input change
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit form
  const submitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setComments((prev) => [
      ...prev,
      { ...formData, createdAt: new Date().toISOString() },
    ]);

    setFormData({
      blogId: id,
      name: "",
      email: "",
      message: "",
    });
  };

  // fake blog data fetch
  useEffect(() => {
    setData(blog_data.find((item) => item._id === id) || null);
  }, [id]);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Blog not found 😢</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="relative">
        {/* Background */}
        <Image
          src={assets.gradientBackground}
          alt="background"
          fill
          priority
          className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 object-cover"
        />

        {/* Blog Header */}
        <div className="text-center mt-20 sm:mt-28 text-gray-700 px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-2 max-w-4xl mx-auto">
            {data.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {data.subTitle}
          </p>
        </div>

        {/* Blog Content */}
        <div className="mx-auto max-w-5xl mt-8 sm:mt-12 px-4 sm:px-6">
          {/* Image */}
          <div className="flex justify-center mb-6 sm:mb-10">
            <Image
              src={data.image}
              alt={data.title}
              width={1200}
              height={500}
              loading="lazy"
              className="rounded-xl sm:rounded-3xl object-cover w-full max-w-4xl max-h-[350px] sm:max-h-[500px]"
            />
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto">
  <article
    className="
      prose prose-sm sm:prose lg:prose-lg xl:prose-xl
      prose-headings:text-gray-900 
      prose-h1:text-3xl sm:prose-h1:text-4xl
      prose-h2:text-2xl 
      prose-p:text-gray-700 prose-p:leading-relaxed
      prose-img:rounded-xl
      prose-a:text-[#5044E5] prose-a:underline-offset-4 hover:prose-a:text-[#3f3acb]
      prose-blockquote:border-l-[#5044E5] prose-blockquote:pl-4 prose-blockquote:text-gray-600 prose-blockquote:italic
    "
    dangerouslySetInnerHTML={{ __html: data.description }}
  />
</div>


          {/* Comments Section */}
          <div className="mt-16 sm:mt-20 max-w-3xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              Comments ({comments.length})
            </h2>

            <div className="space-y-5">
              {comments
                .slice()
                .reverse()
                .map((item, index) => (
                  <CommentCard key={index} {...item} />
                ))}
            </div>
          </div>

          {/* Add Comment Form */}
          <div className="mt-10 sm:mt-14 max-w-3xl mx-auto">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Add Your Comment
            </h2>
            <form onSubmit={submitForm} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleForm}
                type="text"
                placeholder="Name"
                required
                className="w-full border border-gray-300 p-2 sm:p-3 rounded outline-none focus:border-[#5044E5]"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleForm}
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-2 sm:p-3 rounded outline-none focus:border-[#5044E5]"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleForm}
                placeholder="Your comment..."
                rows={4}
                required
                className="w-full border border-gray-300 p-2 sm:p-3 rounded outline-none focus:border-[#5044E5]"
              />
              <button
                type="submit"
                className="bg-[#5044E5] text-white px-4 sm:px-5 py-2 rounded hover:bg-[#3f3acb] transition w-full sm:w-auto"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Social Sharing */}
          <div className="my-14 sm:my-20 max-w-3xl mx-auto text-center">
            <p className="font-semibold mb-4 text-gray-800">
              Share this article
            </p>
            <div className="flex justify-center gap-4 sm:gap-6">
              <Image
                src={assets.facebook_icon}
                alt="fb"
                width={35}
                height={35}
                className="sm:w-10 sm:h-10"
                loading="lazy"
              />
              <Image
                src={assets.twitter_icon}
                alt="tw"
                width={35}
                height={35}
                className="sm:w-10 sm:h-10"
                loading="lazy"
              />
              <Image
                src={assets.googleplus_icon}
                alt="g+"
                width={35}
                height={35}
                className="sm:w-10 sm:h-10"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
