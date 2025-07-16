"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const HeartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      className="mr-2 cursor-pointer"
      viewBox="0 0 512 512"
    >
      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
    </svg>
  );
};

const SettingsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      className="mr-2 cursor-pointer"
      viewBox="0 0 512 512"
    >
      <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
    </svg>
  );
};

const AngleDown = ({ setDropOpen }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      className="ml-2 cursor-pointer text-white lg:text-[#ff5d00]" // Apply Tailwind text color
      viewBox="0 0 448 512"
      onClick={() => setDropOpen((prev) => !prev)}
      fill="currentColor" // Ensures color changes with Tailwind classes
    >
      <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
    </svg>
  );
};

const Separateemail = (user) => {
  const emailMatch = user.match(/^(.+?)(\.[0-9]+)?$/);

  return emailMatch ? emailMatch[1] : user;
};

const ExtendedProfile = ({ dropopen, router, user }) => {
  const email = Separateemail(user);
  
  const handleLogout = () => {
    Cookies.remove("user");
    window.location.reload(); // This will force a full page reload
    // Alternatively, you could use router.refresh() for Next.js 13+ but it might not clear all states
  };

  return (
    <>
      {dropopen && (
        <div className="absolute top-[8vh] left-2 md:left-4 lg:left-6 xl:left-8 bg-[#fff] shadow-lg rounded-lg px-6 py-4 z-[999]">
          <ul className="space-y-2">
            <li
              className="flex cursor-pointer text-lg text-center hover:text-gray-500"
              onClick={() => router.push(`/wishlist?email=${email}`)}
            >
              <HeartIcon />
              Wishlist
            </li>
            <li className="flex cursor-pointer text-lg text-center hover:text-gray-500">
              <SettingsIcon />
              Settings
            </li>
          </ul>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-md w-full mt-4"
            onClick={handleLogout}
          >
            <span className="text-nowrap">Log Out</span>
          </button>
        </div>
      )}
    </>
  );
};

const Profile = ({ user }) => {
  const [dropopen, setDropOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative flex items-center">
      <div
        onClick={() => setDropOpen(true)}
        className="bg-[#fff] lg:bg-[#ff5d00] flex justify-center items-center cursor-pointer text-white lg:font-semibold rounded-full w-9 h-9 lg:w-12 lg:h-12"
      >
        <span className="text-[#ff5d00] lg:text-[#fff] text-3xl">
          {typeof user === "string" && user.length > 0 ? user[0] : "U"}
        </span>
      </div>
      <AngleDown setDropOpen={setDropOpen} />
      <ExtendedProfile dropopen={dropopen} router={router} user={user} />
    </div>
  );
};

export default Profile;
