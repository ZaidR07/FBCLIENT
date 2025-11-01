"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/lib/axios";
import { CreditCard, Package, Star, CheckCircle, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PlanData {
  title: string;
  price: number;
  credits: number;
  tier: string;
  type: string;
  months: number;
  features: string[];
}

const Page = () => {
  const router = useRouter();
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    brokername: "",
    companyname: "",
    emailid: "",
    mobile1: "",
    mobile2: "",
  });

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Get plan data from sessionStorage
    const storedPlan = sessionStorage.getItem("selectedPlan");
    if (storedPlan) {
      setPlanData(JSON.parse(storedPlan));
    } else {
      toast.error("No plan selected. Redirecting to plans page...");
      setTimeout(() => router.push("/plans"), 2000);
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.brokername.trim()) {
      toast.error("Broker name is required");
      return false;
    }
    if (!formData.emailid.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailid)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!formData.mobile1.trim()) {
      toast.error("Mobile number is required");
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobile1)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    if (!planData) {
      toast.error("Plan data not found");
      return;
    }

    setIsProcessing(true);

    try {
      // Create order on backend
      const orderResponse = await axiosInstance.post("/api/payment/create-order", {
        amount: planData.price,
        currency: "INR",
        planData: {
          ...planData,
          customerData: formData,
        },
      });

      const { orderId, amount, currency, key } = orderResponse.data;

      // Razorpay options
      const options = {
        key: key, // Razorpay key from backend
        amount: amount,
        currency: currency,
        name: "Listy4u",
        description: `${planData.title} Subscription`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await axiosInstance.post("/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerData: formData,
              planData: planData,
            });

            if (verifyResponse.data.success) {
              const { broker_id, password, orderId: verifiedOrderId } = verifyResponse.data;
              
              toast.success("Payment successful! Your broker account has been created.");
              sessionStorage.removeItem("selectedPlan");
              
              // Redirect to success page with credentials
              setTimeout(() => {
                router.push(
                  `/payment-success?order_id=${verifiedOrderId}&broker_id=${broker_id}&password=${encodeURIComponent(password)}`
                );
              }, 1500);
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (error: any) {
            console.error("Payment verification error:", error);
            toast.error(error?.response?.data?.message || "Payment verification failed");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: formData.brokername,
          email: formData.emailid,
          contact: formData.mobile1,
        },
        theme: {
          color: "#FF5D00",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Payment cancelled. You can retry anytime.");
          },
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on("payment.failed", async function (response: any) {
        console.error("Payment failed:", response.error);
        
        // Log failed payment attempt
        try {
          await axiosInstance.post("/api/payment/failed", {
            orderId: orderId,
            error: response.error,
            customerData: formData,
            planData: planData,
          });
        } catch (err) {
          console.error("Error logging failed payment:", err);
        }

        toast.error(
          `Payment failed: ${response.error.description}. You can retry the payment.`,
          { autoClose: 5000 }
        );
        setIsProcessing(false);
      });

      razorpay.open();
    } catch (error: any) {
      console.error("Payment initiation error:", error);
      toast.error(error?.response?.data?.message || "Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!planData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#fff4e6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5D00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fff4e6]">
      <Header />
      <div className="mt-[8vh] lg:mt-[10vh] py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Complete Your Purchase</h1>
            <p className="text-gray-600">Fill in your details to proceed with payment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#FF5D00]" />
                  Your Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Broker Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="brokername"
                      value={formData.brokername}
                      onChange={handleChange}
                      type="text"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      name="companyname"
                      value={formData.companyname}
                      onChange={handleChange}
                      type="text"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="emailid"
                      value={formData.emailid}
                      onChange={handleChange}
                      type="email"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Mobile Number 1 <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="mobile1"
                      value={formData.mobile1}
                      onChange={handleChange}
                      type="tel"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Mobile Number 2</label>
                    <input
                      name="mobile2"
                      value={formData.mobile2}
                      onChange={handleChange}
                      type="tel"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition"
                      placeholder="Alternate mobile number (optional)"
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#FF5D00]" />
                  Order Summary
                </h2>

                <div className="mb-6 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-center mb-3">
                    {planData.tier === "premium" ? (
                      <Star className="w-10 h-10 text-[#FFD700]" fill="#FFD700" />
                    ) : (
                      <CreditCard className="w-10 h-10 text-[#FF5D00]" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-center mb-2">{planData.title}</h3>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#FF5D00]">₹{planData.price}</p>
                    <p className="text-sm text-gray-600 mt-1">{planData.months} months subscription</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="w-4 h-4 text-[#FF5D00]" />
                    <span className="font-semibold">{planData.credits} Credits</span>
                  </div>
                  {planData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-[#FF5D00]">₹{planData.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    You will receive {planData.credits} credits (1 credit = ₹1)
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-[#FF5D00] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceed to Payment
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Your payment is secured by Razorpay. If payment fails, you can retry up to 3 times.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
