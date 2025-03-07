"use client";

import Header from "@/app/components/Header";
import { useState, useCallback, useEffect } from "react";
import { uri } from "@/constant";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [location, setLocation] = useState("");
  const [brokerlist, setBrokerlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const loaddata = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${uri}getbrokers`);
      if (response.data.payload.length > 0) {
        setBrokerlist(response.data.payload);
      } else {
        setBrokerlist([]); // Ensure empty array if no data
      }
    } catch (error) {
      console.error("Error loading brokers", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loaddata();
  }, [loaddata]);

  return (
    <div className="bg-[#fef6f0] min-h-[100vh] mt-[8vh] lg:mt-[15vh]">
      <Header />
      <section className="pt-[2vh] px-[5%] h-[8vh] rounded-lg flex gap-[2%]">
        <input
          className="w-[75%] lg:w-[86%] h-full shadow-lg rounded-lg  border-2 px-4"
          type="search"
          placeholder="Search Location"
        />
        <button className="w-[23%] lg:w-[12%] bg-[#ff5d00] py-2 text-white rounded-lg "> Search</button>
      </section>
      <section className="w-full px-[5%] mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="text-center py-4">
            <span className="animate-spin inline-block w-6 h-6 border-4 border-t-transparent border-orange-500 rounded-full"></span>
          </div>
        ) : brokerlist.length > 0 ? (
          brokerlist.map((item, index) => (
            <div
              key={index}
              className="w-full py-4 bg-[#fff] shadow-md px-4 rounded-md "
            >
              {/* Profile Section  */}
              <div className="gap-1 flex w-[100%]  flex-col items-center">
                <img
                  src={item.image}
                  className="w-[100px] h-[100px] rounded-full ring-2"
                  alt="broker-image"
                />
                <span className="text-lg">{item.brokername}</span>
                <span className="text-sm text-gray-400">
                  {item.companyname}
                </span>
                <button
                  onClick={() =>
                    //@ts-ignore
                    router.push(`/singlebroker?id=${brokerId}`)
                  }
                  className="text-white bg-[#FF5D00] px-4 py-1 rounded-md"
                >
                  Contact
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No brokers found</div>
        )}
      </section>
    </div>
  );
};

export default Page;
