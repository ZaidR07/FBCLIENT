import React from "react";
import { useRouter } from "next/navigation";

const vendorData = [
  { id: 1, emoji: "🛋️", label: "Home Interior" },
  { id: 2, emoji: "🚿", label: "Plumbing" },
  { id: 3, emoji: "💡", label: "Electric" },
  { id: 4, emoji: "🛜", label: "Broadband" },
  { id: 5, emoji: "🪳", label: "Pest Control" },
  { id: 6, emoji: "🛢️", label: "Water Suppliers" },
];

const Vendors = () => {
  const router = useRouter();

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
            <p className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl">{vendor.emoji}</p>
            <p>{vendor.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendors;
