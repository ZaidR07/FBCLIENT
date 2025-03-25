"use client";

import Header from "@/app/components/Header";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { uri } from "@/constant";

const Page = () => {
  const searchParams = useSearchParams(); // Get URL parameters
  const email = searchParams.get("email"); // Extract email from URL

  const [loading, setLoading] = useState(true);
  const [propertylist, setPropertylist] = useState([]);

  const loaddata = useCallback(async () => {
    if (!email) return;

    try {
      setLoading(true);
      const response = await axios.get(`${uri}getwishlist`, {
        params: { email: email },
      });

      setPropertylist(response.data.payload.length > 0 ? response.data.payload : []);
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    loaddata();
  }, [loaddata]);

  return (
    <div className="bg-gray-100 mt-[8vh] lg:mt-[14vh] lg:pt-[5vh] min-h-screen">
      <Header />
      {loading ? (
        <div>Loading...</div>
      ) : propertylist?.length > 0 ? (
        propertylist.map((item, index) => (
          <div key={index}>{item.property_id}</div>
        ))
      ) : (
        <div>Nothing Found</div>
      )}
    </div>
  );
};

export default Page;
