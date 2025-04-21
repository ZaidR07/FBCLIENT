"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { uri } from "@/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ registeropen, setRegisterOpen }) => {
  const [operation, setOperation] = useState("Register");
  const [timer, setTimer] = useState(0);
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
      [name]: value, // Correct binding
    }));
  };

  const LoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormdata((prevData) => ({
      ...prevData,
      [name]: value, // Correct binding
    }));
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
      setFormdata({ name: "", email: "", mobile: "", usertype: 1 });
    }
  };

  const HandlLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${uri}login`,
        { payload: loginformdata  },
        { withCredentials: true } // Ensures cookies are stored
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      setRegisterOpen(false);
    } catch (error) {
      setRegisterOpen(false);
      setLoginFormdata({ email: "", otp: "", usertype: 1 });
    }
  };

  const SendLoginOtp = async (e) => {
    e.preventDefault();

    try {
      const sendOtpResponse = await axios.post(`${uri}sendloginotp`, {
        email: loginformdata.email,
        usertype: loginformdata.usertype,
      });

      if (sendOtpResponse.status != 200) {
        toast.error(sendOtpResponse.data.message);
        return;
      }
      setloginOtpGenerated(true);
      setTimer(120);

      toast.success(sendOtpResponse.data.message);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ top: "0vh", zIndex: 999999999999 , maxHeight : "10vh" }}
      />
      <AnimatePresence>
        {registeropen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "5%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed z-[8888888888888888888] top-[30vh] lg:w-[35%] w-[80%] left-[10%] lg:left-[32.5%] bg-white shadow-lg p-5 rounded-lg"
          >
            <h2 className="text-xl text-center font-semibold">
              <span
                className="cursor-pointer"
                onClick={() => setOperation("Register")}
              >
                {operation}
              </span>
            </h2>
            {operation == "Register" ? (
              <form onSubmit={handleSubmit}>
                <div className="mt-4 flex justify-center gap-4">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="usertype"
                      checked={formdata.usertype == 1}
                      value={1}
                      onChange={handleChange}
                    />
                    <span>User</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="usertype"
                      checked={formdata.usertype == 2}
                      value={2}
                      onChange={handleChange}
                    />
                    <span>Owner</span>
                  </div>
                </div>
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
                <p
                  className="cursor-pointer text-center text-[#f3701f] mt-4"
                  onClick={() => setOperation("Login")}
                >
                  Already have an account? Log in
                </p>
              </form>
            ) : (
              <form action="">
                {timer > 0 && <p>{timer}</p>}

                <div className="mt-4 flex justify-center gap-4">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="usertype"
                      checked={loginformdata.usertype == 1}
                      value={1}
                      onChange={LoginChange}
                    />
                    <span>User</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="usertype"
                      checked={loginformdata.usertype == 2}
                      value={2}
                      onChange={LoginChange}
                    />
                    <span>Owner</span>
                  </div>
                </div>

                <input
                  name="email"
                  type="email"
                  value={loginformdata.email}
                  placeholder="Enter Email"
                  className="w-full border p-2 lg:px-4 mt-2 rounded"
                  onChange={LoginChange}
                  required
                />
                <div className="flex gap-2 mt-2">
                  <input
                    disabled={!loginotpgenerated}
                    name="otp"
                    type="text"
                    value={loginformdata.otp}
                    placeholder="Enter OTP"
                    className="w-full border p-2 lg:px-4  rounded"
                    onChange={LoginChange}
                    required
                  />
                  <button
                    disabled={timer > 0}
                    className="w-[40%] bg-[#f3701f] rounded-md text-white py-2"
                    onClick={SendLoginOtp}
                  >
                    Send OTP
                  </button>
                </div>

                <button
                  disabled={!loginotpgenerated}
                  className="w-full bg-[#f3701f] text-white py-2 mt-4 rounded"
                  onClick={ HandlLogin}
                >
                  Submit
                </button>
              </form>
            )}

            <button
              className="w-full mt-2 text-gray-600 underline"
              onClick={() => setRegisterOpen(false)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Register;
