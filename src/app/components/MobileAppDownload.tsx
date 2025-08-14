"use client";
import React from "react";

const MobileAppDownload = () => {
  return (
    <div id="mobile-app" className="my-8 md:my-12 lg:my-16 px-[5%] bg-yellow-50 py-8 md:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-gray-900">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
              Download FBRentals Mobile App
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8 opacity-90">
              and never miss out on any update
            </p>
            
            {/* Features List */}
            <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF5D00]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-base lg:text-lg">Get to know about newly posted properties as soon as they are posted</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF5D00]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-base lg:text-lg">Manage your properties with ease and get instant alerts about responses</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content - Mobile App Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-64 h-96 lg:w-80 lg:h-[480px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-[#FF5D00] h-12 flex items-center justify-between px-4 text-white text-sm">
                    <span className="font-semibold">FBRentals</span>
                    <div className="flex items-center gap-1">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Find Your Dream Property</h3>
                      <p className="text-sm text-gray-600">Browse thousands of properties</p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-500">Search location...</span>
                    </div>
                    
                    {/* Property Cards */}
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                        <div className="text-sm font-semibold">₹25,000/month</div>
                        <div className="text-xs text-gray-600">2BHK Apartment</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                        <div className="text-sm font-semibold">₹35,000/month</div>
                        <div className="text-xs text-gray-600">3BHK Villa</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF5D00]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppDownload;
