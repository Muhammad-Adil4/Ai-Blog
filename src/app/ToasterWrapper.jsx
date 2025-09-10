"use client"; // This makes it a client component
import { Toaster } from "react-hot-toast";

export default function ToasterWrapper() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: { background: "#333", color: "#fff", fontSize: "14px" },
      }}
    />
  );
}
