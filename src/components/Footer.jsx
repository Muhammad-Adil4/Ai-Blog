"use client";

import Image from "next/image";
import { assets, footer_data } from "../../public/assets/assets";

const Footer = () => {
  return (
    <div className="bg-[#5044E5]/10 p-10 md:p-10 py-20">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-7xl mx-auto">
        {/* Left Side: Logo & Description (3 columns) */}
        <div className="md:col-span-3">
          <Image src={assets.logo} alt="logo" width={128} height={32} className="mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>

        {/* Right Side: Footer Links (3 columns) */}
        {footer_data.map((item, index) => (
          <div key={index} className="md:col-span-1">
            <h1 className="text-lg font-semibold mb-3">{item.title}</h1>
            <ul className="space-y-2">
              {item.links.map((link, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-600 hover:text-black cursor-pointer hover:underline"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
