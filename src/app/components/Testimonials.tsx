"use client";
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

interface Testimonial {
  feedback_id: number;
  name: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
}

const Testimonials = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/api/getfeedbacks");
        
        if (response.data.payload && response.data.payload.length > 0) {
          setTestimonials(response.data.payload);
        } else {
          setTestimonials([]);
        }
      } catch (err: any) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials");
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-change testimonials every 5 seconds
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentIndex, testimonials.length]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const getVisibleTestimonials = () => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const next = (currentIndex + 1) % testimonials.length;
    return [prev, currentIndex, next];
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 justify-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={20}
            className={
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  const visibleIndices = getVisibleTestimonials();

  // Show loading state
  if (loading) {
    return (
      <div className="w-full bg-gradient-to-b from-[#fef6f0] to-white py-12 lg:py-16">
        <div className="text-center mb-8 lg:mb-12 px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">
            Real experiences from real customers
          </p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Show empty state if no testimonials
  if (testimonials.length === 0) {
    return (
      <div className="w-full bg-gradient-to-b from-[#fef6f0] to-white py-12 lg:py-16">
        <div className="text-center mb-8 lg:mb-12 px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">
            Real experiences from real customers
          </p>
        </div>
        <div className="max-w-2xl mx-auto text-center px-4">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-6">
            No testimonials available yet. Be the first to share your experience!
          </p>
          <button
            onClick={() => router.push("/feedback")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
          >
            Share Your Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-[#fef6f0] to-white py-12 lg:py-16">
      {/* Header */}
      <div className="text-center mb-8 lg:mb-12 px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-base lg:text-lg mb-4">
          Real experiences from real customers
        </p>
        <button
          onClick={() => router.push("/feedback")}
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-300"
        >
          Share Your Feedback
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="relative h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 lg:left-4 z-20 bg-white hover:bg-gray-100 text-orange-500 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 lg:right-4 z-20 bg-white hover:bg-gray-100 text-orange-500 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Testimonial Cards */}
          <div className="flex items-center justify-center gap-4 lg:gap-6 w-full">
            {visibleIndices.map((index, position) => {
              const testimonial = testimonials[index];
              const isCenter = position === 1;
              const isLeft = position === 0;
              const isRight = position === 2;

              return (
                <div
                  key={`${testimonial.feedback_id}-${position}`}
                  className={`
                    transition-all duration-500 ease-in-out
                    ${isCenter 
                      ? "w-full max-w-md lg:max-w-lg scale-100 opacity-100 z-10" 
                      : "hidden lg:block w-full max-w-xs scale-90 opacity-40 blur-sm"
                    }
                    ${isLeft ? "lg:-translate-x-4" : ""}
                    ${isRight ? "lg:translate-x-4" : ""}
                    ${isAnimating ? "animate-slide" : ""}
                  `}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-orange-100 h-[320px] lg:h-[350px] flex flex-col justify-between">
                    {/* Stars */}
                    <div className="mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Message */}
                    <div className="flex-1 mb-6">
                      <p className="text-gray-700 text-base lg:text-lg leading-relaxed text-center italic">
                        "{testimonial.message}"
                      </p>
                    </div>

                    {/* Customer Info */}
                    <div className="text-center border-t border-gray-200 pt-4">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
                        {testimonial.name.charAt(0)}
                      </div>
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? "w-8 bg-orange-500" 
                  : "w-2 bg-gray-300 hover:bg-gray-400"
                }
              `}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
