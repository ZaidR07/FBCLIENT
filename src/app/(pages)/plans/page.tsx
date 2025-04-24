"use client"

import { useState } from "react";
import { PriceCard } from "@/app/components/PriceCard";
import { PricingTabs } from "@/app/components/PricingTabs";



const pricingData = {
  standard: {
    builder: {
      price: 29,
      credits: 100,
      features: [
        "Basic project templates",
        "5 team members",
        "Basic support",
        "Project analytics"
      ]
    },
    dealer: {
      price: 49,
      credits: 200,
      features: [
        "Advanced templates",
        "10 team members",
        "Priority support",
        "Advanced analytics"
      ]
    }
  },
  premium: {
    builder: {
      price: 59,
      credits: 250,
      features: [
        "Premium templates",
        "15 team members",
        "24/7 support",
        "Custom analytics",
        "API access"
      ]
    },
    dealer: {
      price: 89,
      credits: 500,
      features: [
        "All premium templates",
        "Unlimited team members",
        "24/7 priority support",
        "Custom analytics dashboard",
        "Advanced API access"
      ]
    }
  },
  gold: {
    builder: {
      price: 99,
      credits: 500,
      features: [
        "All premium features",
        "Unlimited team members",
        "White-label option",
        "Custom development",
        "Dedicated support manager"
      ]
    },
    dealer: {
      price: 149,
      credits: 1000,
      features: [
        "All premium features",
        "White-label solution",
        "Custom development priority",
        "Strategic account manager",
        "Custom integrations"
      ]
    }
  }
};

const Page = () => {
  const [currentTier, setCurrentTier] = useState("standard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fff4e6]">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect subscription plan for your needs. Switch between tiers to find the best match for your business.
          </p>
        </div>

        <PricingTabs onTabChange={setCurrentTier} />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          <PriceCard
            title="Builder Subscription"
            price={pricingData[currentTier as keyof typeof pricingData].builder.price}
            features={pricingData[currentTier as keyof typeof pricingData].builder.features}
            credits={pricingData[currentTier as keyof typeof pricingData].builder.credits}
            tier={currentTier}
            type="builder"
          />
          <PriceCard
            title="Dealer Subscription"
            price={pricingData[currentTier as keyof typeof pricingData].dealer.price}
            features={pricingData[currentTier as keyof typeof pricingData].dealer.features}
            credits={pricingData[currentTier as keyof typeof pricingData].dealer.credits}
            tier={currentTier}
            type="dealer"
          />
        </div>
      </div>
    </div>
  );
};

export default Page