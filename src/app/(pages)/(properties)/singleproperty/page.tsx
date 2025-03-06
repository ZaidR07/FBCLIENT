"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import { uri } from "@/constant";
import axios from "axios";

const PropertyDetails = () => {
  const searchParams = useSearchParams();
  const property_id = searchParams.get("id");
  const router = useRouter();

  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);

  const loaddata = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${uri}getspecificproperty`, {
        params: { property_id },
      });

      if (response.data.payload) {
        setProperty(response.data.payload);
      } else {
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

  return (
    <div>
      {/* Back Button */}
      <nav
        className="w-full h-[8vh] shadow-lg flex items-center gap-2 px-3 cursor-pointer"
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
      ) : property.length > 0 ? (
        <div>
          <h2>{property[0].propertyname}</h2>
          <p>Price: {property[0].price}</p>
        </div>
      ) : (
        <p>No property details found.</p>
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
