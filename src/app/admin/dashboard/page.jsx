"use client";

import React, { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../../../public/assets/assets";
import Image from "next/image";
import BlogTableItems from "@/components/admin/BlogTableItems";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    // abhi static data use kar rahe ho
    setDashboardData(dashboard_data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []); // ✅ dependency array add kiya

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Stats cards */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <Image src={assets.dashboard_icon_1} alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <Image src={assets.dashboard_icon_2} alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <Image src={assets.dashboard_icon_3} alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* Recent Blogs Table */}
      {dashboardData.recentBlogs && dashboardData.recentBlogs.length > 0 ? (
        <div>
          <div className="flex items-center gap-3 mt-6 text-gray-600">
            <Image
              src={assets.dashboard_icon_4}
              alt="Latest"
              width={24}
              height={24}
            />
            <p>Latest Blogs</p>
          </div>
          <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white">
            <table className="w-full text-sm text-gray-500">
              <thead className="text-sm text-gray-600 text-left uppercase">
                <tr>
                  <th scope="col" className="px-2 py-4 xl:px-6">
                    #
                  </th>
                  <th scope="col" className="px-2 py-4">
                    Blogs Title
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    Date
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    Status
                  </th>
                  <th scope="col" className="px-2 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItems
                    key={blog._id}
                    blogs={blog}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-gray-500">No recent blogs found.</p>
      )}
    </div>
  );
};

export default DashboardPage;
