"use client";

import axios from "axios";
import { uri } from "@/constant";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from "react-countup";

const PropertiesIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      {...props}
    >
      <path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z" />
    </svg>
  );
};

const UsersIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      {...props}
    >
      <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
    </svg>
  );
};

const BrokerIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      {...props}
      
    >
      <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8 512 128l-.7 0-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48 0 224 28.2 0 91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16L0 352c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-224-80 0zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128l0 224c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-208c0-8.8-7.2-16-16-16l-80 0zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z" />
    </svg>
  );
};

const NumberBar = () => {
  const [data, setData] = useState({
    users: 3000,
    properties: 1500,
    brokers: 167,
  });

  const [ iconwidth , setIconwidth ] = useState(32)


  const loaddata = async () => {
    try {
      const response = await axios.get(`${uri}getdashboardnumbers`);
      if (response.status === 200) {
        setData({
          properties: Math.max(response.data.data.properties, 1500),
          users: 3000,
          brokers: 167,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);


  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setIconwidth(32); // Mobile
      } else if (width < 1024) {
        setIconwidth(40); // Tablet
      } else {
        setIconwidth(70); // Large screens
      }
    };

    updateHeight(); // Set initial height
    window.addEventListener("resize", updateHeight); // Update on resize

    return () => window.removeEventListener("resize", updateHeight);
  }, []);


  return (
    <div className="w-full my-[8vh] lg:my-[10vh] py-[4vh] lg:py-[10vh] bg-[#FF5D00]">
      <ToastContainer
        position="top-center"
        style={{ top: "0vh", zIndex: 9999999999999 }}
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="flex w-full h-full items-center justify-around lg:justify-evenly">
        <div>
          <div className="flex gap-2 items-center">
            <PropertiesIcon width = {iconwidth * 0.9} fill = {"#fff"}/>
            <span className="text-2xl lg:text-5xl text-white">
              <CountUp
                start={0}
                end={data.properties}
                duration={10}
                separator=","
              />
            </span>
          </div>
          <br />
          <span className="text-white text-sm lg:text-2xl">Listed Properties</span>
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <BrokerIcon width = {iconwidth * 1.4} fill = {"#fff"} />
            <span className="text-2xl lg:text-5xl text-white">
              <CountUp
                start={0}
                end={data.brokers}
                duration={10}
                separator=","
              />
            </span>
          </div>
          <br />
          <span className="text-white text-sm lg:text-2xl">Active Brokers</span>
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <UsersIcon width = {iconwidth * 1.1} fill = {"#fff"} />
            <span className="text-2xl lg:text-5xl text-white">
              <CountUp start={0} end={data.users} duration={10} separator="," />
            </span>
          </div>
          <br />

          <span className="text-white ml-4 lg:ml-8 text-sm lg:text-2xl"> Happy Users </span>
        </div>
      </div>
    </div>
  );
};

export default NumberBar;
