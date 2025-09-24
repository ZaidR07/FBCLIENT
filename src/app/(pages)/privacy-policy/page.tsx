"use client";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-[#FF5D00] hover:bg-[#E55A00] text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#FF5D00]">Privacy Policy</h1>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-orange-50 border-l-4 border-[#FF5D00] p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">Effective Date: September 24, 2025</h2>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">1. Information We Collect</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              We collect information that you provide when using our website or app:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-base md:text-lg text-gray-700">
              <li>Name, email, phone number</li>
              <li>Property or service preferences</li>
              <li>Messages or inquiries submitted via our portal</li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">2. How We Use Your Information</h2>
            <p className="text-base md:text-lg leading-relaxed mb-4 text-gray-700">
              We use your data to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-gray-700">
              <li>Connect you with property owners, interior designers, and other service providers</li>
              <li>Improve your experience on our website and app</li>
              <li>Send updates, offers, or relevant communications</li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">3. Sharing of Information</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Your information is shared only with service providers or property owners relevant to your inquiry
            </p>
            <p className="text-base md:text-lg leading-relaxed mt-4 text-gray-700">
              We do not sell, rent, or trade your personal data to third parties
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">4. Security Measures</h2>
            <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-gray-700">
              <li>Data is stored securely on protected servers</li>
              <li>Access is limited to authorized personnel only</li>
              <li>We implement industry-standard security practices</li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">5. Cookies & Tracking</h2>
            <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-gray-700">
              <li>Our website may use cookies for analytics and improving user experience</li>
              <li>No personal identification is collected via cookies</li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">6. User Rights</h2>
            <p className="text-base md:text-lg leading-relaxed mb-4 text-gray-700">
              You can request access, correction, or deletion of your personal data
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Contact us at: [Insert Email]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
