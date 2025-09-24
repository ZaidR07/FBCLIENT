"use client";
import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
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

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#FF5D00]">Terms and Conditions</h1>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-orange-50 border-l-4 border-[#FF5D00] p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">Payment Terms & Security</h2>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">Secure Payments</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              All payments made through our platform are completely secure. We use trusted and verified payment methods to ensure your financial information is protected. Your payment details are never shared with third parties, and all transactions are encrypted for maximum safety.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">Payment Methods</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              We accept payments via UPI, credit/debit cards, net banking, and trusted payment gateways. You can choose the method most convenient for you.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">Transaction Confirmation</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              After each payment, you will receive a confirmation receipt via email or WhatsApp. Please keep it for your records.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">Refund & Cancellation</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Refunds or cancellations, if applicable, will be handled according to our refund policy. You will be informed of the process and timeline at the time of request.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">Customer Responsibility</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Customers are advised to ensure payment details are entered correctly. We are not responsible for errors caused by incorrect information during the transaction.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF5D00]">Privacy & Data Protection</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Your financial information is handled with the highest level of confidentiality and is never shared with unauthorized parties. We comply with all applicable data protection regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
