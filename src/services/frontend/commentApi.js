import axios from "axios";

// Axios instance with credentials enabled
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // cookies/session ke liye zaruri
});

export const getAllComments = async (blogId) => {
  const res = await api.get(`/comments/all`);
  return res.data;
};

export const createComment = async (blogId, data) => {
  const res = await api.post(`/comments/create`, data);
  return res.data;
};

export const deleteComment = async (id) => {
  const res = await api.delete(`/comments/`,id);
  return res.data;
};

export const toggleIsApproved = async (id) => {
  const res = await api.patch(`/comments/toggle`,id);
  return res.data;
};
