"use client";

import AdminHeader from "@/app/components/AdminHeader";
import { uri } from "@/constant";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [numbers, setNumbers] = useState({
    brokers: 0,
    users: 0,
    properties: 0,
  });

  const [sidebaropen, setSidebarOpen] = useState(false);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${uri}getdashboardnumbers`, {
        withCredentials: true,
      });

      setNumbers(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="bg-gray-100 min-h-[88vh] w-full lg:mt-[12vh] flex overflow-x-hidden">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`w-full pt-[14vh] pb-10 px-[5%] ${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <span className="text-sm text-gray-500">Overview</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg p-5 flex items-center">
            <div className="bg-white/20 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45 48C80.1 304 0 384.1 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 384.1 367.9 304 269 304H179z"/></svg>
            </div>
            <div>
              <div className="text-4xl font-extrabold leading-tight">{numbers.brokers}</div>
              <div className="text-white/90">Brokers</div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white text-gray-800 shadow-lg p-5 flex items-center">
            <div className="bg-orange-100 rounded-full p-3 mr-4 text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-8 h-8"><path fill="currentColor" d="M541 229.16l-61.05-50.88V56a24 24 0 0 0-24-24H392a24 24 0 0 0-24 24v24.6L299.6 34a32 32 0 0 0-41.2 0L35 229.16a16 16 0 1 0 20.5 24.68L96 227.28V456a24 24 0 0 0 24 24h104a24 24 0 0 0 24-24V344h80v112a24 24 0 0 0 24 24h104a24 24 0 0 0 24-24V227.28l40.5 26.56A16 16 0 1 0 541 229.16z"/></svg>
            </div>
            <div>
              <div className="text-4xl font-extrabold leading-tight">{numbers.properties}</div>
              <div className="text-gray-500">Properties</div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white text-gray-800 shadow-lg p-5 flex items-center">
            <div className="bg-orange-100 rounded-full p-3 mr-4 text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8 h-8"><path fill="currentColor" d="M96 128a64 64 0 1 1 128 0A64 64 0 1 1 96 128zM0 466.7C0 378.8 71.6 307.2 159.5 307.2h.9c19.5 0 38.3 3.7 55.6 10.5c-13.4 17.7-21.6 39.8-21.6 63.7V512H32c-17.7 0-32-14.3-32-32V466.7zM480 256a80 80 0 1 0 0-160 80 80 0 1 0 0 160zM384 512V381.3c0-57.4 46.6-104 104-104h.6c57.8 .3 103.4 47.4 103.4 105.2V480c0 17.7-14.3 32-32 32H384z"/></svg>
            </div>
            <div>
              <div className="text-4xl font-extrabold leading-tight">{numbers.users}</div>
              <div className="text-gray-500">Users</div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white text-gray-800 shadow-lg p-5 flex items-center">
            <div className="bg-orange-100 rounded-full p-3 mr-4 text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8"><path fill="currentColor" d="M480 160H320V96c0-17.7-14.3-32-32-32H64C46.3 64 32 78.3 32 96V416c0 17.7 14.3 32 32 32H288c17.7 0 32-14.3 32-32V352H480c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z"/></svg>
            </div>
            <div>
              <div className="text-4xl font-extrabold leading-tight">{numbers.users}</div>
              <div className="text-gray-500">Active Sessions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
