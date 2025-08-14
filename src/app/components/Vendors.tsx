"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const vendorData = [
  { id: 1, emoji: "🛋️", label: "Home Interior" },
  { id: 2, image: "/kitchen.png", label: "Modular Kitchen" },
  { id: 3, emoji: "🚿", label: "Plumbing" },
  { id: 4, emoji: "💡", label: "Electric" },
  { id: 5, emoji: "🛜", label: "Broadband" },
  { id: 6, emoji: "🪳", label: "Pest Control" },
  { id: 7, emoji: "🛠️", label: "Hardwares" },
  { id: 8, emoji: "🛏️", label: "Furniture" },
  { id: 9, image: "/painter.png", label: "Painter" },
  { id: 10, image: "/carpenter.png", label: "Carpenter" },
  { id: 11, image: "/maid.png", label: "HouseKeeping / Maid" },
  { id: 12, image: "/deep.png", label: "Deep Cleaners" },
  { id: 13, image: "/ac.png", label: "AC Services", sublabel: "Ac Service, Repair , Installation and more" },
  { id: 14, image: "/legal.png", label: "Legal Works", sublabel: "(Sale / Purchase, Rental Agreement etc)" },
];

const Vendors = () => {
  const router = useRouter();
  const [emojiswidth, setEmojisWidth] = useState(40); // default width

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1400) setEmojisWidth(100);
      else if (width > 1020) setEmojisWidth(80);
      else if (width > 780) setEmojisWidth(70);
      else if (width > 500) setEmojisWidth(60);
      else setEmojisWidth(40);
    };

    handleResize(); // initial call
    window.addEventListener("resize", handleResize); // update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="px-[5%] bg-[#fef0f9] shadow-inner py-6 md:py-10 lg:py-14 2xl:py-16">
      <h1 className="text-center text-lg md:text-xl lg:text-3xl 2xl:text-4xl">
        Everything for Your HouseHold Needs 🏡
      </h1>
      <div className="grid mt-2 lg:mt-6 xl:mt-8 grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {vendorData.map((vendor) => (
          <div
            key={vendor.id}
            onClick={() => router.push(`/vendorslist?id=${vendor.id}`)}
            className="flex flex-col gap-2 p-6 justify-center items-center border lg:py-16 hover:scale-105 cursor-pointer bg-[#fadcef] rounded-lg"
          >
            {vendor.emoji ? (
              <p className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl">
                {vendor.emoji}
              </p>
            ) : (
              <Image
                src={vendor.image}
                width={emojiswidth}
                height={emojiswidth}
                alt={vendor.label}
              />
            )}

            <p className="text-xl text-center">{vendor.label}</p>
            {vendor.sublabel && <p className="text-center text-sm">{vendor.sublabel}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendors;
