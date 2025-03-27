"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import { uri } from "@/constant";
import axios from "axios";
import { HomeIcon, RulerIcon, RupeeIcon } from "@/app/Icons";
import { priceconverter } from "@/utils/priceconverter";

const PropertyDetails = () => {
  const searchParams = useSearchParams();
  const property_id = searchParams.get("id");
  const router = useRouter();

  const [property, setProperty] = useState({
    images : [],
    highlights : [],
    price : "",
    areaunits : "",
    area : "",
    bedrooms : "",
    Societyname : "",
    floor : "",
    buildingfloors : "",
    location : "",
    address : "",
    facing : "",
    propertyage : "",
    constructionstatus : "",
    furnishing : "",
    amenities : []



    
  });
  const [loading, setLoading] = useState(true);
  const [imageViewer, setImageViewer] = useState({ open: false, index: 0 });

  const colours = ["#CCEFEA", "#E3FBDA", "#FFEFCB"];

  const loaddata = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${uri}getspecificproperty`, {
        params: { property_id },
      });

      if (response.data.payload) {
        setProperty(response.data.payload[0]);
      } else {
        // @ts-ignore
        setProperty([]);
      }
    } catch (error) {
      console.error("Error loading property data", error);
    } finally {
      setLoading(false);
    }
  }, [property_id]);

  useEffect(() => {
    loaddata();
  }, [loaddata]);

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

  useEffect(() => {
    // This code only runs on the client side
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#fff] min-h-screen">
      {/* Back Button */}
      <nav
        className="bg-[#f9ede4] w-full h-[8vh] shadow-lg flex items-center gap-2 px-3 cursor-pointer"
        onClick={() => router.back()}
      >
        <span className="text-3xl font-extrabold text-[#f97316]">&larr;</span>
        <span className="text-[#f97316] text-2xl mt-2">Back</span>
      </nav>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <span className="animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full"></span>
        </div>
      ) : property ? (
        <div className="mx-[4%] my-[4vh] min-h-[70vh] rounded-md">
          <div className="grid gap-2 grid-cols-4 h-[20vh]">
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
            <div className="cursor-pointer" onClick={() => openImageViewer(1)}>
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
          <div className="mt-[5vh]">
            <div className="flex gap-2 flex-wrap">
              {property.highlights?.map((item, index) => (
                <li
                  key={index}
                  className="list-none inline-block px-2 py-2 rounded-md mb-2 text-gray-800 text-sm"
                  style={{ backgroundColor: colours[index % colours.length] }}
                >
                  {item}
                </li>
              ))}
            </div>
            <div className="flex gap-6 mt-2">
              <div className="flex gap-2">
                <RupeeIcon width={windowwidth < 800 ? 15 : 20} fill="#FF5D00" />
                <span className="text-xl">
                  {priceconverter(property.price)}
                </span>
              </div>
              <div className="flex gap-2">
                <RulerIcon width={windowwidth < 800 ? 20 : 20} fill="#FF5D00" />
                <span className="text-xl">
                  {`${property.area} ${property.areaunits}`}
                </span>
              </div>
              <div className="flex gap-2">
                <HomeIcon width={windowwidth < 800 ? 20 : 20} fill="#FF5D00" />
                <span className="text-xl">{property.bedrooms}</span>
              </div>
            </div>

            {/* Description  */}
            <div className="mt-5">
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
