"use client";
import { motion } from "framer-motion";
// import axios from "axios";

const Navigationbar = ({ isOpen }) => {
  return (
    <motion.nav
      initial={{ y: "100%" }} // Initially off-screen
      animate={{ y: isOpen ? "0%" : "100%" }} // Show/hide based on `isOpen`
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-[100vw] fixed bottom-0 h-[80vh] bg-[#FF5D00] shadow-2xl"
    >
      
    </motion.nav>
  );
};

export default Navigationbar;
