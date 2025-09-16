"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Suspense , useRef } from "react";
import { uri } from "@/constant";
import axios from "axios";
import { HomeIcon, RulerIcon, RupeeIcon } from "@/app/Icons";
import { priceconverter } from "@/utils/priceconverter";
import Cookies from "js-cookie";

import DesktopNav from "@/app/components/DesktopNav";
import MobileNav from "@/app/components/MobileNav";
import { AngleLeft, AngleRight } from "@/app/Icons";

const WhatsAppIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      fill="#00c749"
      viewBox="0 0 448 512"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
};

const PhoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      fill="#2563eb"
      viewBox="0 0 512 512"
    >
      <path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z" />
    </svg>
  );
};

const PropertyCard = ({ property, router }) => (
  <div
    onClick={() => router.push(`singleproperty?id=${property.property_id}`)}
    className="bg-transparent min-w-[40%] max-w-[40%] xl:min-w-[25%] xl:max-w-[25%] px-2 py-2 relative rounded-lg border-t-[1px] border-[#fa9c66] shadow-md shadow-[#fa9c66] cursor-pointer"
  >
    <div className="relative">
      <img
        src={property.images?.length > 0 ? property.images[0] : "/rent.png"}
        alt="Property"
        className="rounded-lg w-full lg:h-[40vh] h-[110px] object-cover"
      />
      <div className="absolute bottom-2 left-3 rounded-lg p-1 text-sm bg-orange-100 text-[#FF5D00]">
        {priceconverter(property.price)}
      </div>
    </div>
    <span className="text-xs">{property.bedrooms}</span>{" "}
    <span className="text-xs">{property.type}</span>{" "}
    <span className="text-xs text-wrap">{property.floor} Floor</span>
    <br />
    <span className="text-xs block">
      {property.Societyname?.length > 18
        ? property.Societyname.substring(0, 18) + "..."
        : property.Societyname || "N/A"}
    </span>
    <span className="text-xs block">{property.location}</span>
  </div>
);

const PropertyDetails = () => {
  const searchParams = useSearchParams();
  const property_id = searchParams.get("id");
  const [poster, setPoster] = useState({
    brokername: "",
    mobile1: "",
  });
  const router = useRouter();


  const [property, setProperty] = useState({
    images: [],
    highlights: [],
    price: "",
    areaunits: "",
    area: "",
    bedrooms: "",
    Societyname: "",
    floor: "",
    buildingfloors: "",
    location: "",
    address: "",
    facing: "",
    propertyage: "",
    constructionstatus: "",
    furnishing: "",
    amenities: [],
    postedbytype: 0,
    postedby_id: 0,
  });
  const [loading, setLoading] = useState(true);
  const [imageViewer, setImageViewer] = useState({ open: false, index: 0 });
  const [propertieslist, setPropertieslist] = useState([
    {
      Societyname: "",
      floor: "",
      bedrooms: "",
      area: "",
      areaunits: "",
      buildingfloors: "",
      address: "",
      amenities: [], // array of strings
      facing: "",
      propertyage: "",
      balconies: "",
      bathrooms: "",
      price: "",
      postedby: "",
      type: "",
      constructionstatus: "",
      furnishing: "",
      highlights: [], // array of strings
      location: "",
      line: "",
      for: "",
      property_id: null, // or 0 if you prefer default numeric
      active: false,
      images: [], // array of image URLs or objects
      postedby_id: null,
      postedbytype: null,
    },
  ]);

  const user = Cookies.get("user");

  const Separateemail = (user) => {
    if (!user) return null;
    
    // Split the cookie value by '^' to extract email
    const userData = user.split('^');
    if (userData.length > 0) {
      const emailMatch = userData[0].match(/^(.+?)(\.[0-9]+)?$/);
      return emailMatch ? emailMatch[1] : userData[0];
    }
    
    // Fallback to original regex method
    const emailMatch = user.match(/^(.+?)(\.[0-9]+)?$/);
    return emailMatch ? emailMatch[1] : user;
  };
  


  const colours = ["#CCEFEA", "#E3FBDA", "#FFEFCB"];

  // Ref to track if data has been loaded
  const hasLoaded = useRef(false);

  const loaddata = useCallback(async () => {
    // Prevent double execution
    if (hasLoaded.current) {
      console.log("loaddata: Already loaded, skipping");
      return;
    }
    
    console.log("loaddata: Starting data load for property_id:", property_id);
    
    try {
      setLoading(true);
      const response = await axios.get(`${uri}getspecificproperty`, {
        params: { property_id },
      });

      if (response.data.payload) {
        const propertyData = response.data.payload[0];
        setProperty(propertyData);
        
        console.log("loaddata: Property data loaded, generating lead for:", { 
          broker_id: propertyData.postedby, 
          property_id: propertyData.property_id 
        });

        const userEmail = Separateemail(user);
        
        // Only generate lead if we have valid user data and property_id
        if (userEmail && propertyData.postedby && propertyData.property_id) {
          try {
            console.log("loaddata: Calling generatelead API with:", { 
              broker_id: propertyData.postedby, 
              email: userEmail, 
              property_id: propertyData.property_id 
            });
            
            const response = await axios.post(`${uri}generatelead`, {
              broker_id: propertyData.postedby,
              email: userEmail,
              property_id: propertyData.property_id,
            });
            
            if (response.status === 200) {
              console.log("Lead generated successfully");
            } else if (response.status === 400) {
              console.log("Lead already exists or invalid data");
            }
          } catch (leadError) {
            console.error("Error generating lead:", leadError);
          }
        } else {
          console.log("Missing required data for lead generation");
        }

        const postedbyresponse = await axios.get(`${uri}getposterdata`, {
          params: { id: propertyData.postedby },
        });

        if (postedbyresponse.data.payload) {
          setPoster(postedbyresponse.data.payload); // Store poster info
        }

        const brokerpropertiesresponse = await axios.get(
          `${uri}getbrokerproperties`,
          {
            params: { id: propertyData.postedby },
          }
        );

        if (brokerpropertiesresponse.data.payload) {
          setPropertieslist(brokerpropertiesresponse.data.payload);
        }
      } else {
        //@ts-ignore
        setProperty([]);
      }
      
      // Mark as loaded
      hasLoaded.current = true;
      console.log("loaddata: Completed loading for property_id:", property_id);
    } catch (error) {
      console.error("Error loading property data", error);
    } finally {
      setLoading(false);
    }
  }, [property_id, user]);

  useEffect(() => {
    // Reset the loaded flag when property_id changes
    hasLoaded.current = false;
    console.log("useEffect: property_id changed to:", property_id);
    loaddata();
    
    // Cleanup function to reset the flag when component unmounts
    return () => {
      hasLoaded.current = false;
    };
  }, [loaddata, property_id]);

  // Open Image Viewer
  const openImageViewer = (index) => {
    setImageViewer({ open: true, index });
  };

  // Close Image Viewer
  const closeImageViewer = () => {
    setImageViewer({ open: false, index: 0 });
  };

  // Navigate Images
  const nextImage = () => {
    setImageViewer((prev) => ({
      ...prev,
      index: (prev.index + 1) % property.images.length,
    }));
  };

  const prevImage = () => {
    setImageViewer((prev) => ({
      ...prev,
      index: (prev.index - 1 + property.images.length) % property.images.length,
    }));
  };

  // Ensure the grid always has 4 images by filling missing slots
  const images = property.images ? [...property.images] : [];
  while (images.length < 4) {
    images.push("/missing_image.jpg");
  }

  const [windowwidth, setWindowWidth] = useState(0);

  const propRef = useRef(null);

  useEffect(() => {
    // This code only runs on the client side
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="bg-[#fff] min-h-screen">
      {/* Back Button
      <nav
        className="bg-[#f9ede4] w-full h-[8vh] shadow-lg flex items-center gap-2 px-3 cursor-pointer"
        onClick={() => router.back()}
      >
        <span className="text-3xl font-extrabold text-[#f97316]">&larr;</span>
        <span className="text-[#f97316] text-2xl mt-2">Back</span>
      </nav> */}

      {/* Loading Spinner */}
      <DesktopNav />
      <MobileNav />
      {loading ? (
        <div className="flex mt-[20vh] justify-center items-center py-6">
          <span className="animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full"></span>
        </div>
      ) : property ? (
        <div>
          <div className="mx-[4%] mt-[10vh] lg:mt-[8vh]  rounded-md">
            <div className="grid gap-2 grid-cols-4 min-h-[20vh]">
              {/* First Image (Large) */}
              <div
                className="col-span-2  cursor-pointer"
                onClick={() => openImageViewer(0)}
              >
                <img
                  className="object-cover w-full h-full rounded-md"
                  src={images[0]}
                  alt="Property Image 1"
                />
              </div>

              {/* Second Image */}
              <div
                className="cursor-pointer"
                onClick={() => openImageViewer(1)}
              >
                <img
                  className="object-cover w-full h-full rounded-md"
                  src={images[1]}
                  alt="Property Image 2"
                />
              </div>

              {/* Third & Fourth Images (Horizontal Side-by-Side) */}
              <div className="col-span-1 flex flex-col gap-2">
                <div
                  className="cursor-pointer h-1/2"
                  onClick={() => openImageViewer(2)}
                >
                  <img
                    className="object-cover w-full h-full rounded-md"
                    src={images[2]}
                    alt="Property Image 3"
                  />
                </div>
                <div
                  className="cursor-pointer h-1/2"
                  onClick={() => openImageViewer(3)}
                >
                  <img
                    className="object-cover w-full h-full rounded-md"
                    src={images[3]}
                    alt="Property Image 4"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[5vh] px-[5%]">
            <div className="flex gap-2 flex-wrap">
              {property.highlights?.map((item, index) => (
                <li
                  key={index}
                  className="list-none inline-block px-2 md:p-4 lg:p-5 2xl:p-6 py-2 rounded-md mb-2 text-gray-800 text-sm"
                  style={{ backgroundColor: colours[index % colours.length] }}
                >
                  {item}
                </li>
              ))}
            </div>

            <div className="flex justify-center lg:w-[80%] gap-6 mt-2 bg-[#ff5d00] text-white px-4 md:px-6 md:py-5 lg:px-[1%] lg:py-[2vh] py-3 rounded-xl">
              <div className="flex flex-1 gap-2 lg:border lg:border-[#fff] lg:p-8 lg:rounded-lg">
                <RupeeIcon width={windowwidth < 800 ? 15 : 20} fill="#FFF" />
                <span className="text-base md:text-2xl lg:text-3xl 2xl:text-4xl">
                  {priceconverter(property.price)}
                </span>
              </div>
              <div className="flex flex-1 gap-2 lg:border lg:border-[#fff] lg:p-8 lg:rounded-lg">
                <RulerIcon width={windowwidth < 800 ? 20 : 30} fill="#FFF" />
                <span className="text-base md:text-2xl lg:text-3xl 2xl:text-4xl">
                  {`${property.area} ${property.areaunits}`}
                </span>
              </div>
              <div className="flex flex-1 gap-2 lg:border lg:border-[#fff] lg:p-8 lg:rounded-lg">
                <HomeIcon width={windowwidth < 800 ? 20 : 30} fill="#FFF" />
                <span className="text-base md:text-2xl lg:text-3xl 2xl:text-4xl">
                  {property.bedrooms}
                </span>
              </div>
            </div>

            {/* Description  */}
            <div className="mt-5 bg-[#faeee8] rounded-lg p-4">
              <h1 className="text-xl">Description :</h1>
              <li>
                Society Name &nbsp; -{" "}
                <span className="text-gray-400">
                  {" "}
                  &nbsp; {property.Societyname}
                </span>
              </li>
              <li>
                Floor &nbsp; -{" "}
                <span className="text-gray-400">
                  {" "}
                  &nbsp; {property.floor}{" "}
                  <span className="align-super text-sm">th</span>{" "}
                </span>
              </li>
              <li>
                Total Floors &nbsp; -{" "}
                <span className="text-gray-400">
                  {" "}
                  &nbsp; {property.buildingfloors}
                </span>
              </li>
              <li>
                Location &nbsp; -{" "}
                <span className="text-gray-400">
                  {" "}
                  &nbsp; {property.location}
                </span>
              </li>
              <li>
                Address &nbsp; -{" "}
                <span className="text-gray-400">
                  {" "}
                  &nbsp; {property.address}
                </span>
              </li>
              <li>
                Facing &nbsp; -{" "}
                <span className="text-gray-400"> &nbsp; {property.facing}</span>
              </li>
              <li>
                Property Age &nbsp; -{" "}
                <span className="text-gray-400">
                  {" "}
                  &nbsp; {property.propertyage}
                </span>
              </li>
              <li>
                Status &nbsp; -{" "}
                <span className="text-gray-400">
                  {" "}
                  &nbsp; {property.constructionstatus}
                </span>
              </li>
              <li>
                Furnishing &nbsp; -{" "}
                <span className="text-gray-400">
                  {" "}
                  &nbsp; {property.furnishing}
                </span>
              </li>
              <li>
                Amenities &nbsp; -{" "}
                <span className="text-gray-400">
                  &nbsp;
                  {property.amenities?.length > 0 ? (
                    property.amenities.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index !== property.amenities.length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    <span>NA</span>
                  )}
                </span>
              </li>
            </div>
            <div className="w-full lg:w-[40%] flex mt-[5vh] gap-[5%]">
              <button className="w-full px-[2.5%] text-sm text-wrap md:text-base lg:text-lg xl:text-xl text-blue-600 bg-blue-200 py-5 md:py-6 lg:py-8  rounded-md">
                {windowwidth < 500 ? (
                  <a
                    className="flex items-center justify-center gap-2"
                    href={`tel:${poster?.mobile1 || ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PhoneIcon />
                    {`${poster?.brokername || "Unknown"}  `}
                  </a>
                ) : (
                  <span className="flex gap-4 justify-center items-center">
                    <PhoneIcon />
                    {poster?.mobile1}
                  </span>
                )}
              </button>

              <button className="w-full text-sm text-wrap md:text-base lg:text-lg xl:text-xl   text-[#00c749] px-[2.5%] bg-green-200  rounded-md">
                <a
                  href={`https://wa.me/${poster?.mobile1 || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-center"
                >
                  <WhatsAppIcon />
                  {`${poster?.brokername || "Unknown"}  `}
                </a>
              </button>
            </div>
            <div className="mt-[5vh] lg:mt-[8vh]">
              <h1 className="text-center text-xl md:text-2xl lg:text-3xl">
                More Properties from {poster?.brokername}
              </h1>
              <div className="relative mt-5">
                <button
                  onClick={() => scrollLeft(propRef)}
                  className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md"
                >
                  <AngleLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div
                  ref={propRef}
                  className="overflow-x-auto whitespace-nowrap flex gap-3 lg:gap-8 pb-2 scrollbar-hide"
                >
                  {propertieslist.map((property, index) => (
                    <PropertyCard
                      key={index}
                      property={property}
                      router={router}
                    />
                  ))}
                </div>
                <button
                  onClick={() => scrollRight(propRef)}
                  className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md"
                >
                  <AngleRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No property details found.</p>
      )}

      {/* Image Viewer Modal */}
      {imageViewer.open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeImageViewer}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={closeImageViewer}
          >
            ✖
          </button>
          <button
            className="absolute left-5 text-white text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ◀
          </button>
          <img
            src={images[imageViewer.index]}
            alt="Selected Image"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            className="absolute right-5 text-white text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

// ✅ Wrap in Suspense
const SingleProperty = () => {
  return (
    <Suspense fallback={<div className="text-center py-6">Loading...</div>}>
      <PropertyDetails />
    </Suspense>
  );
};

export default SingleProperty;
