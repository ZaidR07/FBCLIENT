import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HamIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      fill="#130535ca"
      viewBox="0 0 512 512"
      className="cursor-pointer"
      animate={{ scale: [0.8, 1.1, 0.8] }} // Enlarges and shrinks
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} // Smooth looping
    >
      <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
    </motion.svg>
  );
};

const MobileNav = () => {
  return (
    <nav className="w-full h-full px-4 lg:hidden flex items-center justify-between">
      <Image src="/Fb_logo.jpg" width={60} height={60} alt="logo" />
      <HamIcon />
    </nav>
  );
};

export default MobileNav;
