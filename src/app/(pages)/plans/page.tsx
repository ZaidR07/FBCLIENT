"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fff4e6]">
      <Header />
      <div className="container mt-[8vh] lg:mt-[10vh] mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect subscription plan for your needs. Switch between
            tiers to find the best match for your business.
          </p>
        </div>

        <PricingTabs onTabChange={setCurrentTier} />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
          {Object.entries(pricingData[currentTier as keyof typeof pricingData].months).map(
            ([months, data]) => (
              <PriceCard
                key={`${currentTier}-${months}`}
                title={`${currentTier === "standard" ? "Standard" : "Premium"} - ${months} Months`}
                price={data.price}
                features={data.features}
                credits={data.credits}
                tier={currentTier}
                type={currentTier === "premium" ? "dealer" : "builder"}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
