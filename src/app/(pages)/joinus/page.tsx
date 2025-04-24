"use client"
import React from 'react';
import { CustomCard  , CustomCardContent , CustomCardHeader } from '@/app/components/ui/CustomCard';
import { JoinUsForm } from '@/app/components/JoinUsForm';
import { Image } from 'lucide-react';

const JoinUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-center space-y-6">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#FF5D00] to-[#FF8C47] p-8 flex items-center justify-center">
            <Image size={120} className="text-white/90" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/20 backdrop-blur-sm">
              <h2 className="text-white text-xl font-medium text-center">Join Our Community</h2>
            </div>
          </div>
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Why Join Us?</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h3 className="font-medium text-gray-800">Innovation</h3>
                <p className="text-sm text-gray-600">Be part of cutting-edge projects</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h3 className="font-medium text-gray-800">Growth</h3>
                <p className="text-sm text-gray-600">Continuous learning & development</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h3 className="font-medium text-gray-800">Culture</h3>
                <p className="text-sm text-gray-600">Inclusive & collaborative environment</p>
              </div>
              <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <h3 className="font-medium text-gray-800">Impact</h3>
                <p className="text-sm text-gray-600">Make a real difference</p>
              </div>
            </div>
          </div>
        </div>
        
        <CustomCard className="w-full max-w-md mx-auto">
          <CustomCardHeader>
            <h1 className="text-2xl font-bold text-center text-gray-800">Join Us</h1>
            <p className="text-sm text-gray-600 text-center mt-2">
              We'd love to hear from you! Fill out the form below to get started.
            </p>
          </CustomCardHeader>
          <CustomCardContent>
            <JoinUsForm />
          </CustomCardContent>
        </CustomCard>
      </div>
    </div>
  );
};

export default JoinUs;