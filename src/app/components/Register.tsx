"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { uri } from "@/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ registeropen , setRegisterOpen }) => {
  const [formdata , setFormdata ] = useState({
    name : "",
    email : "",
    mobile : ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value, // Correct syntax
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${uri}Registeruser`,{
        payload : formdata
      })

      if(response.status == 200){
        
        
        toast.success(response.data.message)
      }
      else{
        toast.error(response.data.message)

      }

      setRegisterOpen(false)
    } catch (error) {
      toast.error("Something Went Wrong! Please try again later")
      
    } finally {
      setRegisterOpen(false); // Ensure modal closes even if there's an error
      setFormdata(
        {
          name : "",
          email : "",
          mobile : ""
        }
      )
    }
    
    
  }
  
  return (
    <AnimatePresence>
      {registeropen && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }} // Start below the screen, invisible
          animate={{ y: "5%", opacity: 1 }} // Animate to normal position
          exit={{ y: "100%", opacity: 0 }} // Slide back down on exit
          transition={{ type: "spring", stiffness: 100, damping: 15 }} // Smooth spring effect
          className="fixed top-[40vh] w-[70%] left-[15%] bg-white shadow-lg p-5 rounded-lg"
        >
          <h2 className="text-xl font-semibold">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              name = "name"

              type="text"
              placeholder={formdata.name || "Enter Name"}
              className="w-full border p-2 mt-2 rounded"
              onChange={handleChange}
              required
            />
            <input
              name = "email"
              type="email"
              placeholder={formdata.email || "Enter Email"}
              className="w-full border p-2 mt-2 rounded"
              onChange={handleChange}
              required

            />
            <input
              type="text"
              placeholder={formdata.mobile || "Enter Mobile"}
              className="w-full border p-2 mt-2 rounded"
              onChange={handleChange}
              required

            />
            <button className="w-full bg-[#f3701f] text-white py-2 mt-4 rounded">
              Submit
            </button>
          </form>
        </motion.div>
      )}
       <ToastContainer
        position="bottom-center"
        style={{ top: "0vh", zIndex: 999999999999 }}
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </AnimatePresence>
  );
};

export default Register;
