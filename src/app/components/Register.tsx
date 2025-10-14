"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { X } from "lucide-react";

const Register = ({ registeropen, setRegisterOpen }) => {
  const [operation, setOperation] = useState("Register");
  const [timer, setTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
    usertype: 1,
  });

  const [loginformdata, setLoginFormdata] = useState({
    email: "",
    otp: "",
    usertype: 1,
  });

  const [loginotpgenerated, setloginOtpGenerated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const LoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Format timer to MM:SS
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Countdown for 2 minutes
  useEffect(() => {
    if (timer <= 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URI}/Registeruser`,
        { payload: formdata },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setRegisterOpen(false);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setIsSubmitting(false);
      setFormdata({ name: "", email: "", mobile: "", usertype: 1 });
    }
  };

  const HandlLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URI}/login`,
        { payload: loginformdata },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      Cookies.set("user", `${loginformdata.email}^${loginformdata.usertype}`);
      setRegisterOpen(false);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setIsLoggingIn(false);
      setLoginFormdata({ email: "", otp: "", usertype: 1 });
      setTimer(0);
      setloginOtpGenerated(false);
    }
  };

  const SendLoginOtp = async (e) => {
    e.preventDefault();
    setIsSendingOtp(true);

    try {
      const sendOtpResponse = await axios.post(`${process.env.NEXT_PUBLIC_APP_URI}/sendloginotp`, {
        email: loginformdata.email,
        usertype: loginformdata.usertype,
      });

      setloginOtpGenerated(true);
      setTimer(120);
      toast.success(sendOtpResponse.data.message);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
      console.error("Error:", error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
  );

  return (
    <>
      <AnimatePresence>
        {registeropen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "5%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed z-[8888888888888888888] top-[18vh] lg:w-[35%] w-[80%] left-[10%] lg:left-[32.5%] bg-white shadow-lg p-5 rounded-lg"
          >
            <h2 className="text-xl text-center font-semibold">
              <span
                className="cursor-pointer hover:text-[#f3701f] transition-colors"
                onClick={() => {
                  setOperation("Register");
                  setTimer(0);
                  setloginOtpGenerated(false);
                }}
              >
                {operation}
              </span>
            </h2>

            <button
              className="absolute right-4 top-4 text-3xl"
              onClick={() => setRegisterOpen(false)}
            >
              <X />
            </button>

            {operation == "Register" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mt-4 flex justify-center gap-6 p-2 bg-gray-50 rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="usertype"
                      checked={formdata.usertype == 1}
                      value={1}
                      onChange={handleChange}
                      className="text-[#f3701f] focus:ring-[#f3701f]"
                    />
                    <span className="text-gray-700 font-medium">User</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="usertype"
                      checked={formdata.usertype == 2}
                      value={2}
                      onChange={handleChange}
                      className="text-[#f3701f] focus:ring-[#f3701f]"
                    />
                    <span className="text-gray-700 font-medium">Owner</span>
                  </label>
                </div>

                <input
                  name="name"
                  type="text"
                  value={formdata.name}
                  placeholder="Enter Name"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3701f] focus:border-transparent"
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={formdata.email}
                  placeholder="Enter Email"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3701f] focus:border-transparent"
                  onChange={handleChange}
                  required
                />
                <input
                  name="mobile"
                  type="text"
                  value={formdata.mobile}
                  placeholder="Enter Mobile"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3701f] focus:border-transparent"
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#f3701f] hover:bg-[#e5601a] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner />
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>

                <p className="text-center text-gray-600 mt-2">
                  Already have an account?{" "}
                  <span
                    className="text-[#f3701f] font-medium cursor-pointer hover:underline"
                    onClick={() => {
                      setOperation("Login");
                      setTimer(0);
                      setloginOtpGenerated(false);
                    }}
                  >
                    Log in
                  </span>
                </p>
              </form>
            ) : (
              <form className="space-y-4">
                {/* Timer display */}

                <div className="mt-4 flex justify-center gap-6 p-2 bg-gray-50 rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="usertype"
                      checked={loginformdata.usertype == 1}
                      value={1}
                      onChange={LoginChange}
                      className="text-[#f3701f] focus:ring-[#f3701f]"
                    />
                    <span className="text-gray-700 font-medium">User</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="usertype"
                      checked={loginformdata.usertype == 2}
                      value={2}
                      onChange={LoginChange}
                      className="text-[#f3701f] focus:ring-[#f3701f]"
                    />
                    <span className="text-gray-700 font-medium">Owner</span>
                  </label>
                </div>

                <input
                  name="email"
                  type="email"
                  value={loginformdata.email}
                  placeholder="Enter Email"
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3701f] focus:border-transparent"
                  onChange={LoginChange}
                  required
                />

                <div className="flex gap-2">
                  <input
                    disabled={!loginotpgenerated}
                    name="otp"
                    type="text"
                    value={loginformdata.otp}
                    placeholder={
                      loginotpgenerated ? "Enter OTP" : "Request OTP first"
                    }
                    className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f3701f] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    onChange={LoginChange}
                    required
                  />
                  <button
                    type="button"
                    disabled={timer > 0 || isSendingOtp || !loginformdata.email}
                    className="px-4 py-3 bg-[#f3701f] hover:bg-[#e5601a] text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
                    onClick={SendLoginOtp}
                  >
                    {isSendingOtp ? (
                      <>
                        <LoadingSpinner />
                        Sending...
                      </>
                    ) : timer > 0 ? (
                      formatTimer(timer)
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>

                {timer > 0 && (
                  <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-700 font-medium">
                      OTP expires in {formatTimer(timer)}
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  disabled={
                    !loginotpgenerated || isLoggingIn || !loginformdata.otp
                  }
                  className="w-full bg-[#f3701f] hover:bg-[#e5601a] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={HandlLogin}
                >
                  {isLoggingIn ? (
                    <>
                      <LoadingSpinner />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                <p className="text-center text-gray-600 mt-2">
                  Don't have an account?{" "}
                  <span
                    className="text-[#f3701f] font-medium cursor-pointer hover:underline"
                    onClick={() => {
                      setOperation("Register");
                      setTimer(0);
                      setloginOtpGenerated(false);
                    }}
                  >
                    Register
                  </span>
                </p>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Register;
