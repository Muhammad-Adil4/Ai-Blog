// src/app/layout.js
import { Roboto } from "next/font/google";
import "./globals.css";
import ToasterWrapper from "./ToasterWrapper"; // client component

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
        {/* CLIENT-ONLY COMPONENT */}
        <ToasterWrapper />
        {children}
      </body>
    </html>
  );
}
