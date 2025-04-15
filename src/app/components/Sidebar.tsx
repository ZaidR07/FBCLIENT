"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { uri } from "@/constant";
import Cookies from "js-cookie";
import Profile from "./Profile";
import Register from "./Register";

const CloseIcon = ({ setOpenSidebar }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      fill="#130535ca"
      width={25}
      className="ml-auto mt-2 -mr-4"
      onClick={() => setOpenSidebar(false)}
    >
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
  );
};

const CircleIcon = ({ width }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 512 512">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const HelpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      fill="#130535ca"
      width={12}
    >
      <path d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
    </svg>
  );
};

const PhoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="#130535ca"
      width={25}
      className="self-start"
    >
      <path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z" />
    </svg>
  );
};
const AboutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="#130535ca"
      width={20}
      className="self-start"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
    </svg>
  );
};

const ChevronRightIcon = ({ width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      fill="#130535ca"
      width={width}
    >
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
};

const Sidebar = ({ opensidebar, setOpenSidebar }) => {
  const [locationlist, setLocationlist] = useState([]);
  const [propertytypelist, setPropertytypelist] = useState([]);
  const [firstorder, setFirstOrder] = useState();
  const [secondorder, setSecondOrder] = useState();
  const [registeropen, setRegisterOpen] = useState(false);

  const loaddata = useCallback(async () => {
    try {
      const response = await axios.get(`${uri}getspecificvariable`, {
        params: { category: "propertytypelist" },
      });

      const response2 = await axios.get(`${uri}getspecificvariable`, {
        params: { category: "locationlist" },
      });

      if (response.data.payload.length > 0) {
        setPropertytypelist(response.data.payload);
      } else {
        setPropertytypelist([]);
      }

      if (response2.data.payload.length > 0) {
        setLocationlist(response2.data.payload);
      } else {
        setLocationlist([]);
      }
    } catch (error) {
    } finally {
    }
  }, []);

  useEffect(() => {
    loaddata();
  }, [loaddata]);

  const [user, setUser] = useState(null); // State for user

  const userCookie = Cookies.get("user"); // Using js-cookie

  const getUserCookie = () => {
    if (userCookie) {
      try {
        setUser(JSON.parse(decodeURIComponent(userCookie))); // Parse JSON safely
      } catch {
        setUser(userCookie); // Fallback if not JSON
      }
    }
  };

  // Extract user from cookies
  useEffect(() => {
    getUserCookie();
  }, [userCookie]);

  const navlist1 = [
    {
      nav: "For Owners",

      subnav: [
        { label: "Post Property", uri: "postproperty?who=buildbroker" },
        { label: "View / Edit Post", uri: "singlepost?who=buildbroker" },
      ],
      order: 1,
    },
    {
      nav: "For Buyers",
      subnav: [
        {
          label: "Residential",
          category: 1,
          supersubnav: [...propertytypelist],
          order: 2.1,
        },
        {
          label: "Commercial",
          category: 2,
          supersubnav: [...propertytypelist],
          order: 2.2,
        },
        {
          label: "Plots /  Land",
          category: 3,
          supersubnav: [...propertytypelist],
          order: 2.3,
        },
        {
          label: "Trending Areas",
          category: 4,
          supersubnav: [...locationlist],
          order: 2.4,
        },
      ],
      order: 2,
    },
    {
      nav: "For Tenants",
      subnav: [
        {
          label: "Residential",
          category: 1,
          supersubnav: [...propertytypelist],
          order: 2.1,
        },
        {
          label: "Commercial",
          category: 2,
          supersubnav: [...propertytypelist],
          order: 2.2,
        },
        {
          label: "Plots /  Land",
          category: 3,
          supersubnav: [...propertytypelist],
          order: 2.3,
        },
        {
          label: "Trending Areas",
          category: 4,
          supersubnav: [...locationlist],
          order: 2.4,
        },
      ],
      order: 3,
    },
    {
      nav: "For Builders / Dealers",
      subnav: [
        {
          label: "Post Properties",
          category: 1,
          uri: "postproperties?who=buildbroker",
        },
        {
          label: "Subscription Plans",
          category: 2,
          uri: "subscription?who=buildbroker",
        },
      ],
      order: 4,
    },
  ];

  return (
    <>
    <Register registeropen={registeropen} setRegisterOpen={setRegisterOpen} />

    <div
      className={`absolute w-[24%] h-screen px-[2%] bg-white right-0 top-[14vh] z-50 transition-transform duration-300 ${
        opensidebar ? "translate-x-0" : "translate-x-[100%]"
      } overflow-y-scroll shadow-2xl rounded-l-2xl`}
    >
      <CloseIcon setOpenSidebar={setOpenSidebar} />
      {user ? (
        <Profile user={user} />
      ) : (
        <button
          className="text-lg text-white px-4 py-1.5 my-4 bg-[#FF5D00] rounded-md w-full"
          onClick={() => setRegisterOpen(true)}
        >
          Sign&nbsp;up
        </button>
      )}

      {navlist1.map((item, index) => (
        <div key={index}>
          <li
            className="list-none flex gap-3 text-lg cursor-pointer p-2 hover:bg-orange-100"
            onClick={() => {
              // @ts-ignore

              setFirstOrder(item.order);
              setSecondOrder(null); // Reset nested state
            }}
          >
            <ChevronRightIcon width={15} />
            {item.nav}
          </li>

          {firstorder === item.order && (
            <div className="pl-6">
              {item.subnav.map((subnav, subIndex) => {
                const hasSupersubnav =
                  Array.isArray(subnav.supersubnav) &&
                  subnav.supersubnav.length > 0;

                return (
                  <div key={subIndex}>
                    <li
                      className={`flex items-center gap-2 ml-4 mb-2 cursor-pointer hover:text-[#ff5d00] `}
                      onClick={() => {
                        hasSupersubnav && setSecondOrder(subnav.order);
                      }}
                    >
                      {hasSupersubnav ? (
                        <ChevronRightIcon width={12} />
                      ) : (
                        <CircleIcon width={6} />
                      )}
                      {hasSupersubnav ? (
                        subnav.label
                      ) : (
                        <a
                          href={`${subnav.uri}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full"
                        >
                          {subnav.label}
                        </a>
                      )}
                    </li>

                    {secondorder === subnav.order && hasSupersubnav && (
                      <div className="ml-12">
                        {subnav.supersubnav.map((supersubnav, superIndex) => (
                          <a
                            href={`/buyproperties?type=${
                              supersubnav.name || supersubnav
                            }&view=Sale`}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={superIndex}
                            className="mb-2 cursor-pointer text-sm hover:text-[#ff5d00] flex gap-2"
                          >
                            <CircleIcon width={6} />
                            {typeof supersubnav === "string"
                              ? supersubnav
                              : supersubnav.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Separation div  */}
      <div className="w-full mx-[2%] bg-[#130535ca] h-[0.5px] my-[5vh]"></div>

      <div className="flex flex-col gap-2 text-lg ml-2">
        <div className="flex gap-2">
          <AboutIcon />
          <a href="">About Us</a>
        </div>
        <div className="flex gap-2">
          <HelpIcon />
          <a href="" className="ml-2">
            {" "}
            Help
          </a>
        </div>
      </div>

      <div className="w-full mx-[2%] bg-[#130535ca] h-[0.5px] my-[5vh]"></div>

      <div className="flex flex-col gap-2 text-lg ml-2">
        <div className="flex gap-2 ">
          <PhoneIcon />
          <div className="flex flex-col self-start">
            <a href="tel ">+91 6839765478</a>
            <a href="">+91 8639765478</a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
