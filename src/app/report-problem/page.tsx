"use client";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ReportProblemPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.subject.trim()) {
      toast.error("Please select or enter a subject");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please describe your problem");
      return;
    }

    if (formData.message.trim().length < 20) {
      toast.error("Problem description must be at least 20 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/api/addcomplaint", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (response.status === 200) {
        setIsSuccess(true);
        toast.success(response.data.message || "Complaint submitted successfully!");
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
          setIsSuccess(false);
        }, 3000);
      }
    } catch (error: any) {
      console.error("Error submitting complaint:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit complaint. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonSubjects = [
    "Technical Issue",
    "Property Listing Problem",
    "Payment Issue",
    "Account Problem",
    "Broker/Agent Complaint",
    "Website Bug",
    "Mobile App Issue",
    "Data Accuracy",
    "Privacy Concern",
    "Other",
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white pt-20 lg:pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              Report a Problem
            </h1>
            <p className="text-gray-600 text-base lg:text-lg">
              We're here to help! Let us know what issue you're facing
            </p>
          </div>

          {/* Complaint Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 border border-red-100">
            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Thank You!
                </h2>
                <p className="text-gray-600">
                  Your complaint has been submitted successfully. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 1234567890"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Problem Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                    disabled={isSubmitting}
                  >
                    <option value="">Select a category</option>
                    {commonSubjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Problem Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe the problem you're experiencing in detail..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none"
                    disabled={isSubmitting}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 20 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Submit Complaint</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Our support team will review your complaint</li>
              <li>• We'll investigate the issue thoroughly</li>
              <li>• You'll receive updates via email</li>
              <li>• We aim to resolve all issues within 24-48 hours</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportProblemPage;
