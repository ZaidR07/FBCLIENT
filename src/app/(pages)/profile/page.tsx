"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axios";
import Header from "@/app/components/Header";
import PropertiesNav from "@/app/components/PropertiesNav";
import { toast } from "react-toastify";

interface ProfileData {
  name: string;
  email: string;
  mobile: string;
  whatsapp?: string;
  address?: string;
}

const decodeJwt = (token: string): any | null => {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export default function Page() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "owner" | "broker" | null>(null);
  const [email, setEmail] = useState<string>("");
  const [data, setData] = useState<ProfileData>({ name: "", email: "", mobile: "", whatsapp: "", address: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    // Determine role and email from cookies
    const brokerToken = Cookies.get("broker");
    if (brokerToken) {
      setRole("broker");
      setLoading(false);
      return;
    }

    const userToken = Cookies.get("user");
    const ownerToken = Cookies.get("owner");
    const token = userToken || ownerToken || "";
    const decoded = token ? decodeJwt(token) : null;

    if (decoded?.email && decoded?.role) {
      setRole(decoded.role === "owner" ? "owner" : "user");
      setEmail(decoded.email);
    } else {
      setRole(null);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email || !role || role === "broker") return;
      try {
        const res = await axiosInstance.get("/api/getprofile", { params: { email, role } });
        const payload = res.data?.payload || {};
        setData({
          name: payload.name || "",
          email: payload.email || email,
          mobile: payload.mobile || "",
          whatsapp: payload.whatsapp || "",
          address: payload.address || "",
        });
      } catch (e: any) {
        toast.error(e?.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [email, role]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!role || role === "broker" || !email) return;
    setSaving(true);
    try {
      const res = await axiosInstance.post("/api/updateprofile", {
        role,
        email,
        data: {
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          whatsapp: data.whatsapp,
          address: data.address,
        },
      });
      toast.success(res.data?.message || "Profile updated");
      // If email changed, update state email to the new one for subsequent fetches
      if (data.email && data.email !== email) setEmail(data.email);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const isDealer = role === "broker";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="hidden lg:block">
        <PropertiesNav />
      </div>

      <div className="max-w-6xl mx-auto mt-[10vh] lg:mt-[16vh] p-4">
        {isDealer ? (
          <div className="bg-white rounded-xl p-6 shadow">Coming soon for Dealers.</div>
        ) : loading ? (
          <div className="bg-white rounded-xl p-6 shadow">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#FF5D00] to-[#FF8A00] flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-14 h-14 text-white" fill="currentColor">
                  <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-800">{data.name || "Your Name"}</div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                  {role === "owner" ? (
                    <>
                      Property Owner
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-blue-500" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Standard User
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-green-500" fill="currentColor">
                        <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                      </svg>
                    </>
                  )}
                </div>
              </div>
              {role !== "owner" && (
                <div className="w-full pt-2">
                  <button
                    type="button"
                    className="w-full border-2 border-dashed border-[#FF5D00] rounded-lg py-3 text-[#FF5D00] hover:bg-[#FF5D00] hover:text-white transition-all duration-200 font-medium"
                    onClick={() => router.push('/userplan')}
                  >
                    🚀 Upgrade to Premium
                  </button>
                </div>
              )}
            </div>

            {/* Right: Profile Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-[#FF5D00]" fill="currentColor">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 21H5V3H13V9H19V21Z" />
                </svg>
                <div className="text-2xl font-bold text-gray-800">Profile Information</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-2">Full Name</span>
                  <input
                    className="border-2 border-gray-200 focus:border-[#FF5D00] outline-none py-3 px-4 rounded-lg transition-colors"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your full name"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-2">Email Address</span>
                  <input
                    className="border-2 border-gray-200 focus:border-[#FF5D00] outline-none py-3 px-4 rounded-lg transition-colors"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-2">Mobile Number</span>
                  <input
                    className="border-2 border-gray-200 focus:border-[#FF5D00] outline-none py-3 px-4 rounded-lg transition-colors"
                    name="mobile"
                    value={data.mobile}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Enter your mobile number"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 mb-2">WhatsApp Number</span>
                  <input
                    className="border-2 border-gray-200 focus:border-[#FF5D00] outline-none py-3 px-4 rounded-lg transition-colors"
                    name="whatsapp"
                    value={data.whatsapp || ""}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Enter your WhatsApp number"
                  />
                </label>

                <label className="flex flex-col md:col-span-2">
                  <span className="text-sm font-medium text-gray-700 mb-2">Address</span>
                  <textarea
                    className="border-2 border-gray-200 focus:border-[#FF5D00] outline-none p-4 rounded-lg min-h-[120px] resize-none transition-colors"
                    name="address"
                    value={data.address || ""}
                    onChange={(e) => setData((prev)=>({ ...prev, address: e.target.value }))}
                    placeholder="Enter your complete address"
                  />
                </label>
              </div>

              <div className="flex justify-center md:justify-end mt-8">
                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="bg-gradient-to-r from-[#FF5D00] to-[#FF8A00] text-white px-10 py-3 rounded-lg font-semibold disabled:opacity-60 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  {saving ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
