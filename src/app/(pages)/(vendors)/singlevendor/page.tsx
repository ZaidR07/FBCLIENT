"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/app/components/Header";
import axiosInstance from "@/lib/axios";

const Page = () => {
  const params = useSearchParams();
  const id = params.get("id") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    const fetchVendor = async () => {
      if (!id) {
        setError("Missing vendor id");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await axiosInstance.get('/api/getsinglevendor', { params: { id } });
        setVendor(res.data.payload);
        setError("");
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to load vendor");
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id]);

  return (
    <div className="bg-[#fef6f0] min-h-[100vh] mt-[8vh] lg:mt-[15vh]">
      <Header />
      <div className="px-[5%] py-6">
        {loading ? (
          <div className="w-full py-12 grid place-content-center">
            <span className="animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full" />
          </div>
        ) : error ? (
          <div className="w-full py-10 text-center text-red-600 text-lg">{error}</div>
        ) : vendor ? (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center">
              <img 
                src={vendor.image || "/default-vendor.png"} 
                alt={vendor.vendorname} 
                className="w-32 h-32 rounded-full object-cover ring-4 ring-orange-200" 
              />
              <h1 className="text-2xl font-bold mt-4">{vendor.vendorname}</h1>
              <p className="text-gray-500">{vendor.companyname}</p>
              <div className="mt-4 w-full grid grid-cols-2 gap-3">
                <a 
                  href={`tel:${vendor.mobile1}`} 
                  className="bg-[#FF5D00] text-white rounded-lg py-2 text-sm"
                >
                  Call
                </a>
                <a 
                  href={`https://wa.me/${vendor.mobile1}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-green-500 text-white rounded-lg py-2 text-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Vendor Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border">
                  <span className="text-xs text-gray-500">Vendor ID</span>
                  <p className="text-lg">{vendor.vendor_id}</p>
                </div>
                <div className="p-4 rounded-xl border">
                  <span className="text-xs text-gray-500">Category</span>
                  <p className="text-lg">{vendor.category}</p>
                </div>
                <div className="p-4 rounded-xl border">
                  <span className="text-xs text-gray-500">Email</span>
                  <p className="text-lg break-all">{vendor.emailid}</p>
                </div>
                <div className="p-4 rounded-xl border">
                  <span className="text-xs text-gray-500">Mobile 1</span>
                  <p className="text-lg">{vendor.mobile1}</p>
                </div>
                {vendor.mobile2 && (
                  <div className="p-4 rounded-xl border">
                    <span className="text-xs text-gray-500">Mobile 2</span>
                    <p className="text-lg">{vendor.mobile2}</p>
                  </div>
                )}
                <div className="p-4 rounded-xl border md:col-span-2">
                  <span className="text-xs text-gray-500">Address</span>
                  <p className="text-lg">{vendor.address}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a 
                  href={`mailto:${vendor.emailid}`} 
                  className="px-4 py-2 rounded-lg border text-[#FF5D00] border-[#FF5D00]"
                >
                  Email
                </a>
                <a 
                  href={`/vendorslist`} 
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Back to list
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
