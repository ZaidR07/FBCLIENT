import React from "react";
import Image from "next/image";
import { AngleDown } from "../Icons";
import { useRouter } from "next/navigation";

const DesktopNav = () => {
  const router = useRouter(); // Initialize router

  return (
    <nav className="relative hidden w-full h-full lg:flex gap-20  justify-between items-center pl-28 pr-16">
      <ul className="flex gap-16 text-xl">
        <li
          className="flex gap-2 cursor-pointer"
          onClick={() => router.push("/buyproperties?view=Sale")}
        >
          <span>Buy</span>
          {/* <AngleDown width={12} /> */}
        </li>

        <li
          className="flex gap-2 cursor-pointer"
          onClick={() => router.push("/buyproperties?view=Rent")}
        >
          <span>Rent</span>
          {/* <AngleDown width={12} /> */}
        </li>
        <li
          className="flex gap-2 cursor-pointer"
          onClick={() => router.push("/buyproperties?view=PG")}
        >
          <span>PG</span>
          {/* <AngleDown width={12} /> */}
        </li>
        <li
          className="cursor-pointer"
          onClick={() => router.push("/brokerslist")}
        >
          Find an Agent
        </li>
      </ul>
      <div className="flex gap-16 items-center">
        <ul className="flex gap-16 text-xl">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer" onClick={() => router.push("/about")}>
            About us
          </li>
          <li
            className="cursor-pointer"
            onClick={() => router.push("/contact")}
          >
            Help
          </li>
        </ul>
        <button className="text-lg text-white px-6 py-2 bg-[#FF5D00] rounded-md">
          Sign up
        </button>
      </div>

      <Image
        src="/Fb_logo.jpg"
        width={90}
        height={90}
        alt="logo"
        className="absolute left-[48%]"
      />
    </nav>
  );
};

export default DesktopNav;
