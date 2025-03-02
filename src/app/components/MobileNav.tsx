"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navigationbar from "./Navigationbar";
import { useRouter } from "next/navigation";


const HamIcon = ({ opennav }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      fill="#130535ca"
      viewBox="0 0 512 512"
      className="cursor-pointer"
      animate={{ scale: [0.8, 1.1, 0.8] }} // Enlarges and shrinks
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} // Smooth looping
      onClick={opennav} // Pass function to update state
    >
      <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
    </motion.svg>
  );
};

const CloseIcon = ({ closenav }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width={30}
      fill="#130535ca"
      onClick={closenav}
      className="cursor-pointer"
      animate={{ scale: [0.8, 1.1, 0.8] }} // Enlarges and shrinks
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} // Smooth looping
    >
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </motion.svg>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Initialize router


  return (
    <>
      {/* Navbar with higher z-index */}
      <nav className="fixed top-0 left-0 w-full h-[8vh] px-4 lg:hidden flex items-center justify-between bg-white shadow-md z-50">
        <Image src="/Fb_logo.jpg" width={60} height={60} alt="logo" onClick={() => router.push("/") }/>
        {isOpen ? (
          <CloseIcon closenav={() => setIsOpen(false)} />
        ) : (
          <HamIcon opennav={() => setIsOpen(true)} />
        )}
      </nav>

      {/* Navigationbar with lower z-index */}
      <Navigationbar isOpen={isOpen} />
    </>
  );
};

export default MobileNav;
