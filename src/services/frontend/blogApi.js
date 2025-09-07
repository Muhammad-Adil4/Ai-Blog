import axios from "axios";

// Axios instance with credentials enabled
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // cookies/session ke liye zaruri
});

export const getAllBlogs = async () => {
  const res = await api.get("/blogs/all");
  return res.data;
};

export const createBlog = async (data) => {
  const res = await api.post("/blogs/create", data);
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs`,id);
  return res.data;
};

// AI generated blog fetch
export const aiblog = async (data) => {
  const res = await api.post(`/blogs/ai-blog`,data);
  return res.data;
};
