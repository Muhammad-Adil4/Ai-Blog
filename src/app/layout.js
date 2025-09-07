import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "My Next App",
  description: "Using Roboto font",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: "#333", color: "#fff", fontSize: "14px" },
          }}
        />
        {children}
      </body>
    </html>
  );
}
