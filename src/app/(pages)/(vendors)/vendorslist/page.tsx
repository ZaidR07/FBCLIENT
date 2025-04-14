"use client";

import Header from "@/app/components/Header";
import { useState, useCallback, useEffect } from "react";
import { uri } from "@/constant";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const dummyVendors = [
  // Category 1: Home Interior
  {
    id: 101,
    vendorrname: "Interior Expert",
    companyname: "HomeStylers Co.",
    image: "/images/interior1.jpg",
    categoryId: "1",
  },
  {
    id: 102,
    vendorrname: "Design Diva",
    companyname: "Elite Interiors",
    image: "/images/interior2.jpg",
    categoryId: "1",
  },
  {
    id: 103,
    vendorrname: "Space Saver",
    companyname: "Minimal Home",
    image: "/images/interior3.jpg",
    categoryId: "1",
  },
  {
    id: 104,
    vendorrname: "Crafty Decor",
    companyname: "Aesthetic Nest",
    image: "/images/interior4.jpg",
    categoryId: "1",
  },

  // Category 2: Plumbing
  {
    id: 201,
    vendorrname: "Plumb Boss",
    companyname: "QuickFix Plumbing",
    image: "/images/plumbing1.jpg",
    categoryId: "2",
  },
  {
    id: 202,
    vendorrname: "Leak Stopper",
    companyname: "PipePro Services",
    image: "/images/plumbing2.jpg",
    categoryId: "2",
  },
  {
    id: 203,
    vendorrname: "Flow Master",
    companyname: "AquaFix",
    image: "/images/plumbing3.jpg",
    categoryId: "2",
  },
  {
    id: 204,
    vendorrname: "Drain Doctor",
    companyname: "ClearLine Solutions",
    image: "/images/plumbing4.jpg",
    categoryId: "2",
  },

  // Category 3: Electric
  {
    id: 301,
    vendorrname: "Electric Wizard",
    companyname: "BrightSpark",
    image: "/images/electric1.jpg",
    categoryId: "3",
  },
  {
    id: 302,
    vendorrname: "Volt King",
    companyname: "SafeWatt Solutions",
    image: "/images/electric2.jpg",
    categoryId: "3",
  },
  {
    id: 303,
    vendorrname: "Current Pro",
    companyname: "ShockSafe",
    image: "/images/electric3.jpg",
    categoryId: "3",
  },
  {
    id: 304,
    vendorrname: "Circuit Fixer",
    companyname: "ElectroCare",
    image: "/images/electric4.jpg",
    categoryId: "3",
  },

  // Category 4: Broadband
  {
    id: 401,
    vendorrname: "NetGenius",
    companyname: "SpeedConnect",
    image: "/images/broadband1.jpg",
    categoryId: "4",
  },
  {
    id: 402,
    vendorrname: "WiFi Warden",
    companyname: "UltraNet",
    image: "/images/broadband2.jpg",
    categoryId: "4",
  },
  {
    id: 403,
    vendorrname: "Signal Champ",
    companyname: "FiberWay",
    image: "/images/broadband3.jpg",
    categoryId: "4",
  },
  {
    id: 404,
    vendorrname: "BroadBand Guru",
    companyname: "PingFast",
    image: "/images/broadband4.jpg",
    categoryId: "4",
  },

  // Category 5: Pest Control
  {
    id: 501,
    vendorrname: "Bug Buster",
    companyname: "NoPests Co.",
    image: "/images/pest1.jpg",
    categoryId: "5",
  },
  {
    id: 502,
    vendorrname: "Pest Ninja",
    companyname: "SafeHouse Services",
    image: "/images/pest2.jpg",
    categoryId: "5",
  },
  {
    id: 503,
    vendorrname: "Termite Terminator",
    companyname: "BugAway",
    image: "/images/pest3.jpg",
    categoryId: "5",
  },
  {
    id: 504,
    vendorrname: "Critter Cleaner",
    companyname: "EcoDefense",
    image: "/images/pest4.jpg",
    categoryId: "5",
  },

  // Category 6: Water Suppliers
  {
    id: 601,
    vendorrname: "Water Man",
    companyname: "PureDrops",
    image: "/images/water1.jpg",
    categoryId: "6",
  },
  {
    id: 602,
    vendorrname: "Hydro Buddy",
    companyname: "CleanFlow",
    image: "/images/water2.jpg",
    categoryId: "6",
  },
  {
    id: 603,
    vendorrname: "Aqua Cart",
    companyname: "Watertank.in",
    image: "/images/water3.jpg",
    categoryId: "6",
  },
  {
    id: 604,
    vendorrname: "FreshFlow",
    companyname: "BlueBarrel",
    image: "/images/water4.jpg",
    categoryId: "6",
  },
];

const Page = () => {
  const [vendorlist, setVendorlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get("id");

  const loaddata = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${uri}getvendors`);
      const data = response.data.payload;
      setVendorlist(data)
    } catch (error) {
      console.error("Error loading vendors", error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

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
        <button className="w-[23%] lg:w-[12%] bg-[#ff5d00] py-2 text-white rounded-lg">
          Search
        </button>
      </section>
      <section className="w-full px-[5%] mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="text-center py-4">
            <span className="animate-spin inline-block w-6 h-6 border-4 border-t-transparent border-orange-500 rounded-full"></span>
          </div>
        ) : vendorlist.length > 0 ? (
          vendorlist.map((item, index) => (
            <div
              key={index}
              className="w-full py-4 bg-[#fff] shadow-md px-4 rounded-md "
            >
              <div className="gap-1 flex w-[100%] flex-col items-center">
                <img
                  src={item.image}
                  className="w-[100px] h-[100px] rounded-full ring-2 object-cover"
                  alt="vendor"
                />
                <span className="text-lg">{item.vendorrname}</span>
                <span className="text-sm text-gray-400">
                  {item.companyname}
                </span>
                <button
                  onClick={() => router.push(`/singlevendor?id=${item.id}`)}
                  className="text-white bg-[#FF5D00] px-4 py-1 rounded-md"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No vendors found</div>
        )}
      </section>
    </div>
  );
};

export default Page;
