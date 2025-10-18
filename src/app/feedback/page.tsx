"use client";
import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    message: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter your feedback message");
      return;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Feedback message must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/api/addfeedback", {
        name: formData.name.trim(),
        rating: formData.rating,
        message: formData.message.trim(),
      });

      if (response.status === 200) {
        setIsSuccess(true);
        toast.success(response.data.message || "Thank you for your feedback!");
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            rating: 0,
            message: "",
          });
          setIsSuccess(false);
        }, 3000);
      }
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-20 lg:pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              We Value Your Feedback
            </h1>
            <p className="text-gray-600 text-base lg:text-lg">
              Share your experience with us and help us improve our services
            </p>
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 border border-orange-100">
            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Thank You!
                </h2>
                <p className="text-gray-600">
                  Your feedback has been submitted successfully.
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Rating Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Rate Your Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                        disabled={isSubmitting}
                      >
                        <Star
                          size={40}
                          className={
                            star <= (hoveredRating || formData.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-300 text-gray-300"
                          }
                        />
                      </button>
                    ))}
                    {formData.rating > 0 && (
                      <span className="ml-3 text-lg font-semibold text-gray-700">
                        {formData.rating} / 5
                      </span>
                    )}
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your Feedback <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your experience..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                    disabled={isSubmitting}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 10 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Your feedback helps us provide better service to all our customers.
              <br />
              All reviews are moderated before being published.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackPage;
