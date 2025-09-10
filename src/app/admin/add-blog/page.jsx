"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Image as ImageIcon, Sparkles } from "lucide-react";
import { aiblog, createBlog } from "@/services/frontend/blogApi";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const BlogCategories = ["Technology", "Startup", "Lifestyle", "Finance"];

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // AI Generator states
  const [aiTitle, setAiTitle] = useState("");
  const [aiCategory, setAiCategory] = useState("");
  const [aiContent, setAiContent] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  // Submit loading state
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!title || !content || !category || !image) {
      toast.error("Please fill all fields and upload an image");
      return;
    }

    setSubmitting(true);

    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("title", title);
      formdata.append("content", content);
      formdata.append("category", category);

      const response = await createBlog(formdata);

      if (response.success) {
        toast.success(response.message || "Blog created");
        setTitle("");
        setCategory("");
        setContent("");
        setImage(null);
        setPreview(null);
      } else {
        toast.error(response.message || "Failed to create blog");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const handleGenerateAi = async () => {
    if (!aiTitle || !aiCategory) {
      toast.error("⚠️ Please enter a title and select a category for AI generation.");
      return;
    }

    setLoadingAi(true);
    try {
      const obj = { aiTitle, aiCategory, aiContent };
      const response = await aiblog(obj);

      if (response.success) {
        toast.success(response.message || "AI content generated");
        setTitle(aiTitle);
        setCategory(aiCategory);
        setContent(response.aiblog || aiContent);
      } else {
        toast.error(response.message || "AI generation failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong while generating AI blog");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {/* ===== Left Side: Form ===== */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-indigo-600" />
          Add New Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-2xl p-6 space-y-5"
        >
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={submitting}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={submitting}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
            >
              <option value="">Select category...</option>
              {BlogCategories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Content
            </label>
            <textarea
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={submitting}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-64 overflow-y-auto resize-none disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-500" />
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
              disabled={submitting}
              className="w-full border rounded-lg px-3 py-2 disabled:opacity-60"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-48 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className={`w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 ${submitting ? "cursor-not-allowed opacity-80" : ""}`}
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span className="font-medium">Creating blog…</span>
              </>
            ) : (
              <span className="font-medium">Add Blog</span>
            )}
          </button>
        </form>
      </div>

      {/* ===== Right Side: AI Generator ===== */}
      <div className="lg:w-96 bg-white shadow rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          AI Blog Generator
        </h2>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Blog Title</label>
          <input
            type="text"
            placeholder="Enter a blog title for AI..."
            value={aiTitle}
            onChange={(e) => setAiTitle(e.target.value)}
            disabled={loadingAi || submitting}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${loadingAi || submitting ? "opacity-70" : ""}`}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Category</label>
          <select
            value={aiCategory}
            onChange={(e) => setAiCategory(e.target.value)}
            disabled={loadingAi || submitting}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${loadingAi || submitting ? "opacity-70" : ""}`}
          >
            <option value="">Select category...</option>
            {BlogCategories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* ===== AI Content Input ===== */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">AI Content / Context</label>
          <textarea
            placeholder="Enter content ideas or keywords for AI..."
            value={aiContent}
            onChange={(e) => setAiContent(e.target.value)}
            disabled={loadingAi || submitting}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 h-24 resize-none ${loadingAi || submitting ? "opacity-70" : ""}`}
          />
        </div>

        <button
          onClick={handleGenerateAi}
          disabled={loadingAi || submitting}
          aria-busy={loadingAi}
          className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${loadingAi || submitting ? "cursor-not-allowed opacity-75" : ""}`}
        >
          {loadingAi ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span className="font-medium">Generating AI blog...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Generate Blog Content</span>
            </>
          )}
        </button>

        {content && (
          <div className="mt-4">
            <label className="block text-gray-700 mb-1 font-medium">AI Preview</label>
            <div className="h-96 border rounded-lg p-3 overflow-y-auto text-gray-700 bg-gray-50">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlogPage;
