"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/components/Header";
import { CheckCircle, Download, ArrowRight, Home, AlertCircle, Package } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const brokerId = searchParams.get("broker_id");
  const password = searchParams.get("password");
  const [countdown, setCountdown] = useState(30); // Increased to 30 seconds
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!orderId || !brokerId || !password) {
      toast.error("Missing payment information. Redirecting...");
      setTimeout(() => router.push("/plans"), 2000);
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/plans");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderId, brokerId, password, router]);

  const handleDownloadCredentials = () => {
    const content = `LISTY4U BROKER CREDENTIALS\n\n` +
      `Broker ID: ${brokerId}\n` +
      `Password: ${password}\n\n` +
      `Order ID: ${orderId}\n` +
      `Date: ${new Date().toLocaleString()}\n\n` +
      `IMPORTANT: Please keep these credentials safe.\n` +
      `You will need them to login to your broker account.\n\n` +
      `Login URL: ${window.location.origin}/broker/login\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Listy4u_Broker_${brokerId}_Credentials.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    setSaved(true);
    toast.success("Credentials saved successfully!");
  };

  if (!orderId || !brokerId || !password) {
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
      <div className="mt-[8vh] lg:mt-[10vh] py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
                <div className="relative bg-green-500 rounded-full p-6">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your subscription has been activated successfully.
            </p>

            {/* Broker Credentials - IMPORTANT */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 mb-6 border-2 border-green-300">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-6 h-6 text-green-700" />
                <h2 className="text-lg font-bold text-green-900">Your Broker Credentials</h2>
              </div>
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="mb-3">
                  <label className="text-sm font-semibold text-gray-600">Broker ID</label>
                  <p className="text-2xl font-mono font-bold text-[#FF5D00] select-all">
                    {brokerId}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Password</label>
                  <p className="text-2xl font-mono font-bold text-[#FF5D00] select-all">
                    {password}
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
                <p className="text-sm font-semibold text-yellow-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>IMPORTANT: Write down or save these credentials immediately! You will need them to login.</span>
                </p>
              </div>
              <button
                onClick={handleDownloadCredentials}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2 ${
                  saved
                    ? 'bg-green-600 text-white'
                    : 'bg-[#FF5D00] hover:bg-orange-600 text-white'
                }`}
              >
                <Download className="w-5 h-5" />
                {saved ? 'Credentials Saved!' : 'Save Credentials to File'}
              </button>
            </div>

            {/* Order Details */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 mb-8 border border-orange-200">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">Order ID</h2>
              <p className="text-xl font-mono font-bold text-[#FF5D00] break-all">
                {orderId}
              </p>
            </div>

            {/* What's Next */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-[#FF5D00]" />
                What's Next?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Your broker account has been created successfully</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Your credits have been added to your account</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use your Broker ID and Password to login</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Save your credentials file for future reference</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/broker/login")}
                className="flex items-center justify-center gap-2 bg-[#FF5D00] hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
              >
                <Home className="w-5 h-5" />
                Login to Broker Panel
              </button>
              <button
                onClick={() => router.push("/plans")}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#FF5D00] font-semibold py-3 px-8 rounded-xl transition duration-300 border-2 border-[#FF5D00]"
              >
                <Package className="w-5 h-5" />
                View Plans
              </button>
            </div>

            {/* Auto Redirect Notice */}
            <p className="text-sm text-gray-500 mt-8">
              Redirecting to plans page in {countdown} seconds...
            </p>
          </div>

          {/* Support Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Need help?{" "}
              <Link href="/contact" className="text-[#FF5D00] hover:underline font-semibold">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
