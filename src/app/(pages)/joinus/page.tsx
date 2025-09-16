"use client";
import React from "react";
import {
  CustomCard,
  CustomCardContent,
  CustomCardHeader,
} from "@/app/components/ui/CustomCard";
import { JoinUsForm } from "@/app/components/JoinUsForm";
import { Image } from "lucide-react";
import Header from "@/app/components/Header";

const JoinUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-white to-[#f6f7f9]">
      <Header />
      <div className="w-full mt-[8vh] lg:mt-[10vh] max-w-6xl grid md:grid-cols-2 gap-10 items-start">
        <div className="hidden md:flex flex-col items-center space-y-6">
          <div className="relative w-[82%] aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#FF6A1A] to-[#FF8C47] p-8 flex items-center justify-center shadow-lg">
            <Image size={120} className="text-white/95" />
            <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/25 backdrop-blur-sm">
              <h2 className="text-white text-xl font-semibold text-center tracking-tight">
                Join Our Community
              </h2>
            </div>
          </div>
          <div className="space-y-5 text-center w-[82%]">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Why onboard with us?</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900">Exclusive Leads</h3>
                <p className="text-sm text-gray-600 mt-1">Access verified property buyer & seller leads</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900">Marketing Support</h3>
                <p className="text-sm text-gray-600 mt-1">Photos, videos and multi-platform ad campaigns</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900">WhatsApp Community</h3>
                <p className="text-sm text-gray-600 mt-1">Get updates, share listings and close faster</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900">Fast Onboarding</h3>
                <p className="text-sm text-gray-600 mt-1">Get verified and start in under 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        <CustomCard className="w-full max-w-md mx-auto bg-white/95 backdrop-blur rounded-2xl border border-gray-100 shadow-lg">
          <CustomCardHeader>
            <div className="text-center">
              <span className="inline-flex items-center px-3 py-1 mb-2 rounded-full text-xs font-semibold bg-[#FF5D00]/10 text-[#FF5D00]">Partner Onboarding</span>
            </div>
            <h1 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight">
              Partner Onboarding
            </h1>
            <p className="text-sm text-gray-600 text-center mt-2">
              Join as a Broker, Builder or Dealer. Fill in your details to get started.
            </p>
          </CustomCardHeader>
          <CustomCardContent>
            <JoinUsForm />
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700">How onboarding works</h3>
              <ol className="mt-2 space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>Submit your details with role (Broker/Builder/Dealer)</li>
                <li>Our team verifies your information within 24 hours</li>
                <li>Get access to leads, marketing support and community</li>
              </ol>
              <p className="mt-3 text-xs text-gray-500">By continuing, you agree to our terms and privacy policy.</p>
            </div>
          </CustomCardContent>
        </CustomCard>
      </div>
    </div>
  );
};

export default JoinUs;
