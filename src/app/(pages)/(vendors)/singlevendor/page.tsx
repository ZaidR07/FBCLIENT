"use client";
import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/Tabs";
import { Card, CardContent } from "@/app/components/ui/Card";
import { VendorButton } from "@/app/components/ui/VendorButton";
import Header from "@/app/components/Header";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hospital Header */}
      <div className="bg-white shadow-sm mt-[10vh] lg:mt-[15vh]">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                K & K SUPERSPECIALITY HOSPITAL
              </h1>
              <div className="mt-2 flex items-center gap-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  4.1 ★
                </span>
                <span className="text-gray-600">432 Ratings</span>
              </div>
              <div className="mt-2 text-gray-600">
                <p>Nalasopara East, Palghar • 5 Years in Healthcare</p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <span>4 Doctors Available</span>
                <span>•</span>
                <span>"Good facilities" 4 Suggestions</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <VendorButton variant="outline">09972328396</VendorButton>
              <VendorButton variant="outline">Enquire Now</VendorButton>
              <VendorButton variant="outline">WhatsApp</VendorButton>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            {[
              "Overview",
              "Photos",
              "Services",
              "Reviews",
            ].map((tab) => (
              <TabsTrigger
                key={tab.toLowerCase()}
                value={tab.toLowerCase()}
                className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF5D00] data-[state=active]:text-[#FF5D00] text-gray-600"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">About Hospital</h2>
                <p className="text-gray-600">
                  K & K Superspeciality Hospital is a leading healthcare
                  facility providing comprehensive medical services. With
                  state-of-the-art infrastructure and experienced medical
                  professionals, we are committed to delivering exceptional
                  patient care.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Hospital Photos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-video bg-gray-200 rounded-lg"
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Emergency Care",
                    "Cardiology",
                    "Neurology",
                    "Orthopedics",
                    "Pediatrics",
                    "General Surgery",
                  ].map((service) => (
                    <li key={service} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#FF5D00] rounded-full"></div>
                      {service}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          

          
          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Patient Reviews</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "John D.",
                      rating: 5,
                      comment: "Excellent care and facilities",
                    },
                    {
                      name: "Sarah M.",
                      rating: 4,
                      comment: "Very professional staff",
                    },
                    {
                      name: "Robert K.",
                      rating: 4,
                      comment: "Good experience overall",
                    },
                  ].map((review) => (
                    <div key={review.name} className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{review.name}</span>
                        <span className="text-[#FF5D00]">
                          {"★".repeat(review.rating)}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
