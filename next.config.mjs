/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com",   // existing
      "res.cloudinary.com",    // Cloudinary images ke liye add kiya
    ],
  },
};

export default nextConfig;
