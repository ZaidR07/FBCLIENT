"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axios";
import Header from "@/app/components/Header";
import PropertiesNav from "@/app/components/PropertiesNav";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [userInfo, setUserInfo] = useState<{ email: string; role: string; name: string } | null>(null);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Get user info from cookies
    const userToken = Cookies.get("user");
    const ownerToken = Cookies.get("owner");
    const token = userToken || ownerToken || "";
    const decoded = token ? decodeJwt(token) : null;

    if (decoded?.email && decoded?.role) {
      setUserInfo({
        email: decoded.email,
        role: decoded.role === "owner" ? "owner" : "user",
        name: decoded.name || "User"
      });
    } else {
      toast.error("Please login to continue");
      router.push("/");
    }

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [router]);

  const handlePayment = async () => {
    if (!userInfo) {
      toast.error("User information not found. Please login again.");
      return;
    }

    setLoading(true);
    setPaymentStatus("processing");

    try {
      // Create order
      const orderResponse = await axiosInstance.post("/api/create-user-plan-order", {
        amount: 1,
        currency: "INR",
        userInfo
      });

      const { orderId, amount, currency, key } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: key, // Use server-provided key to ensure same env (test/live)
        amount: amount,
        currency: currency,
        name: "Listy4u Premium",
        description: "Premium Plan - 10 Owner Contacts",
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await axiosInstance.post("/api/verify-user-plan-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userInfo
            });

            if (verifyResponse.data.success) {
              setPaymentStatus("success");
              toast.success("Payment successful! Credits added to your account.");
              setTimeout(() => {
                router.push("/profile");
              }, 2000);
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error: any) {
            console.error("Payment verification error:", error);
            setPaymentStatus("failed");
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        theme: {
          color: "#FF5D00"
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus("failed");
            setLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        console.error('Payment failed:', resp?.error);
        setPaymentStatus("failed");
        toast.error(resp?.error?.description || 'Payment failed');
      });
      rzp.open();
    } catch (error: any) {
      console.error("Payment initiation error:", error);
      setPaymentStatus("failed");
      toast.error(error.response?.data?.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus("idle");
    handlePayment();
  };

  const handleBackToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="lg:hidden">
        <Header />
      </div>
      <div className="hidden lg:block">
        <PropertiesNav />
      </div>

      <div className="max-w-md mx-auto mt-[10vh] lg:mt-[16vh] p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Premium Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF5D00] to-[#FF8A00] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Premium Plan</h1>
          <p className="text-gray-600 mb-6">Unlock direct access to property owners</p>

          {/* Benefits */}
          <div className="mb-8">
            <div className="space-y-3">
              <div className="flex items-center text-left">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 text-green-600" fill="currentColor">
                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                </div>
                <span className="text-gray-700">View 10 owner phone numbers</span>
              </div>
              <div className="flex items-center text-left">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 text-green-600" fill="currentColor">
                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                </div>
                <span className="text-gray-700">Priority customer support</span>
              </div>
              <div className="flex items-center text-left">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 text-green-600" fill="currentColor">
                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                </div>
                <span className="text-gray-700">Non Expiring Credit</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-1">One-time payment</div>
            <div className="text-4xl font-bold text-gray-800 mb-1">₹1</div>
            <div className="text-sm text-gray-500">No recurring charges</div>
          </div>

          {/* CTA Button */}
          {paymentStatus === "failed" ? (
            <div className="space-y-3">
              <div className="text-red-600 text-sm mb-3">
                Payment failed. Please try again or go back to profile.
              </div>
              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-gradient-to-r from-[#FF5D00] to-[#FF8A00] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200" 
                  onClick={handleRetry}
                  disabled={loading}
                >
                  Try Again
                </button>
                <button 
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200" 
                  onClick={handleBackToProfile}
                >
                  Back to Profile
                </button>
              </div>
            </div>
          ) : paymentStatus === "success" ? (
            <div className="space-y-3">
              <div className="text-green-600 text-sm mb-3 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                </svg>
                Payment successful! Redirecting...
              </div>
              <button 
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold" 
                disabled
              >
                ✓ Payment Completed
              </button>
            </div>
          ) : (
            <button 
              className="w-full bg-gradient-to-r from-[#FF5D00] to-[#FF8A00] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:transform-none" 
              onClick={handlePayment}
              disabled={loading || !userInfo}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          )}

          <p className="text-xs text-gray-500 mt-4">• Secure payment •</p>
        </div>
      </div>
    </div>
  );
}
