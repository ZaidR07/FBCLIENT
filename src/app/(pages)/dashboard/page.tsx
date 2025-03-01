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
    <div className=" bg-gray-200 min-h-[88vh] lg:mt-[12vh] flex">
      <AdminHeader />
      <div className="grid grid-cols-2 gap-4 w-full  pt-[15vh] pb-6 px-[5%]">
        <div className="h-40 rounded-xl bg-white shadow-lg flex flex-col justify-around items-center">
          <span className="text-7xl text-[#FF5D00]">{numbers.brokers}</span>
          <span className="text-[#FF5D00] text-2xl">Brokers</span>
        </div>
        <div className="h-40 rounded-xl bg-white shadow-lg flex flex-col justify-around items-center">
          <span className="text-7xl text-[#FF5D00]">{numbers.properties}</span>
          <span className="text-[#FF5D00] text-2xl">Properties</span>
        </div>
        <div className="h-40 rounded-xl bg-white shadow-lg flex flex-col justify-around items-center">
          <span className="text-7xl text-[#FF5D00]">{numbers.users}</span>
          <span className="text-[#FF5D00] text-2xl">Users</span>
        </div>
        <div className="h-40 rounded-xl bg-white shadow-lg flex flex-col justify-around items-center">
          <span className="text-7xl text-[#FF5D00]">{numbers.users}</span>
          <span className="text-[#FF5D00] text-2xl">Users</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
