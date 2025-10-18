"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PriceCard } from "@/app/components/PriceCard";
import { PricingTabs } from "@/app/components/PricingTabs";
import Head from "next/head";
import Header from "@/app/components/Header";

const pricingData = {
  standard: {
    months: {
      2: {
        price: 199,
        credits: 199,
        features: [
          "Photo and video content",
          "Google + Facebook + Instagram Ads",
          "WhatsApp group access",
          "Priority support",
        ],
      },
      6: {
        price: 499,
        credits: 499,
        features: [
          "Photo and video content",
          "Google + Facebook + Instagram Ads",
          "WhatsApp group access",
          "Priority support",
        ],
      },
      12: {
        price: 999,
        credits: 999,
        features: [
          "Photo and video content",
          "Google + Facebook + Instagram Ads",
          "WhatsApp group access",
          "Priority support",
        ],
      },
    },
  },
  premium: {
    months: {
      2: {
        price: 299,
        credits: 299,
        features: [
          "Premium photo and video content",
          "Advanced Google + Facebook + Instagram Ads",
          "Premium WhatsApp group access",
          "Extended support",
          
        ],
      },
      6: {
        price: 599,
        credits: 599,
        features: [
          "Premium photo and video content",
          "Advanced Google + Facebook + Instagram Ads",
          "Premium WhatsApp group access",
          "Extended support",
          
        ],
      },
      12: {
        price: 999,
        credits: 999,
        features: [
          "Premium photo and video content",
          "Advanced Google + Facebook + Instagram Ads",
          "Premium WhatsApp group access",
          "Extended support",
          
        ],
      },
    },
  },
} as const;

const Page = () => {
  const [currentTier, setCurrentTier] = useState("standard");
  const params = useSearchParams();
  const who = (params.get("who") || "").toLowerCase();
  const isBroker = who === "broker";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fff4e6]">
      <Header />
      <div className="mt-[8vh] lg:mt-[10vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
              {isBroker ? "Broker Subscription Plans" : "Choose Your Plan"}
            </h1>
            <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              {isBroker
                ? "Flexible plans tailored for real estate brokers. Get credits and visibility to close more deals."
                : "Select the perfect subscription plan for your needs. Switch between tiers to find the best match for your business."}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <PricingTabs onTabChange={setCurrentTier} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mt-8">
            {Object.entries(pricingData[currentTier as keyof typeof pricingData].months).map(
              ([months, data]) => (
                <PriceCard
                  key={`${currentTier}-${months}`}
                  title={`${currentTier === "standard" ? "Standard" : "Premium"} - ${months} Months`}
                  price={data.price}
                  features={data.features}
                  credits={data.credits}
                  tier={currentTier}
                  type={isBroker ? "dealer" : "builder"}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
