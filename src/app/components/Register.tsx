"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { uri } from "@/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ registeropen, setRegisterOpen }) => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value, // Correct binding
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${uri}Registeruser`,
        { payload: formdata },
        { withCredentials: true } // Ensures cookies are stored
      );

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      setRegisterOpen(false);
    } catch (error) {
      toast.error("Something Went Wrong! Please try again later");
    } finally {
      setRegisterOpen(false);
      setFormdata({ name: "", email: "", mobile: "" });
    }
  };

  return (
    <AnimatePresence>
      {registeropen && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "5%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed top-[40vh] lg:w-[35%] w-[70%] left-[15%] lg:left-[32.5%] bg-white shadow-lg p-5 rounded-lg"
        >
          <h2 className="text-xl text-center font-semibold">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              value={formdata.name}
              placeholder="Enter Name"
              className="w-full border p-2 lg:px-4 mt-2 rounded"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              value={formdata.email}
              placeholder="Enter Email"
              className="w-full border p-2 lg:px-4 mt-2 rounded"
              onChange={handleChange}
              required
            />
            <input
              name="mobile"
              type="text"
              value={formdata.mobile}
              placeholder="Enter Mobile"
              className="w-full border p-2 lg:px-4 mt-2 rounded"
              onChange={handleChange}
              required
            />
            <button className="w-full bg-[#f3701f] text-white py-2 mt-4 rounded">
              Submit
            </button>
          </form>
          <button 
            className="w-full mt-2 text-gray-600 underline"
            onClick={() => setRegisterOpen(false)}
          >
            Close
          </button>
        </motion.div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ top: "0vh", zIndex: 999999999999 }}
      />
    </AnimatePresence>
  );
};


export default Register;
