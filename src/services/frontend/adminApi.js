import axios from "axios";

// Axios instance with credentials enabled
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // cookies/session ke liye zaruri
});

export const adminLogin = async (data) => {
  const res = await api.post("/admin/login", data);
  console.log(res.data);
  return res.data;
};

export const adminSignup = async (data) => {
  const res = await api.post("/admin/signup", data);
  return res.data;
};

export const adminlogout = async () => {
  const res = await api.post("/admin/logout");
  return res.data;
};
