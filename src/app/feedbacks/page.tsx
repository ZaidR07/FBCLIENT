"use client";
import { useState, useEffect } from "react";
import { Star, CheckCircle, XCircle, Trash2, RefreshCw, Calendar, User } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";

interface Feedback {
  feedback_id: number;
  name: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
}

const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebaropen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/getallfeedbacks");
      
      if (response.data.payload) {
        setFeedbacks(response.data.payload);
      }
    } catch (error: any) {
      console.error("Error fetching feedbacks:", error);
      toast.error(error.response?.data?.message || "Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Approve feedback
  const handleApprove = async (feedback_id: number) => {
    try {
      const response = await axiosInstance.post("/api/approvefeedback", {
        feedback_id,
      });

      if (response.status === 200) {
        toast.success("Feedback approved successfully!");
        fetchFeedbacks(); // Refresh the list
      }
    } catch (error: any) {
      console.error("Error approving feedback:", error);
      toast.error(error.response?.data?.message || "Failed to approve feedback");
    }
  };

  // Delete feedback
  const handleDelete = async (feedback_id: number) => {
    if (!confirm("Are you sure you want to delete this feedback?")) {
      return;
    }

    try {
      const response = await axiosInstance.post("/api/deletefeedback", {
        feedback_id,
      });

      if (response.status === 200) {
        toast.success("Feedback deleted successfully!");
        fetchFeedbacks(); // Refresh the list
      }
    } catch (error: any) {
      console.error("Error deleting feedback:", error);
      toast.error(error.response?.data?.message || "Failed to delete feedback");
    }
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (filter === "approved") return feedback.approved;
    if (filter === "pending") return !feedback.approved;
    return true;
  });

  const approvedCount = feedbacks.filter((f) => f.approved).length;
  const pendingCount = feedbacks.filter((f) => !f.approved).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        } transition-all duration-500 pt-[12vh] px-4 lg:px-8 pb-8`}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Feedback Management
          </h1>
          <p className="text-gray-600">
            Review and manage customer feedbacks
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Feedbacks</p>
                <p className="text-3xl font-bold text-gray-800">{feedbacks.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-3xl font-bold text-gray-800">{approvedCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-gray-800">{pendingCount}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <XCircle className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All ({feedbacks.length})
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === "approved"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Approved ({approvedCount})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === "pending"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Pending ({pendingCount})
            </button>
          </div>

          <button
            onClick={fetchFeedbacks}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* Feedbacks List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No feedbacks found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => (
              <div
                key={feedback.feedback_id}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  feedback.approved ? "border-green-500" : "border-orange-500"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">
                            {feedback.name}
                          </h3>
                          {feedback.approved ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Approved
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={16} />
                          {formatDate(feedback.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-3">
                      {renderStars(feedback.rating)}
                    </div>

                    {/* Message */}
                    <p className="text-gray-700 leading-relaxed">
                      {feedback.message}
                    </p>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex lg:flex-col gap-2">
                    {!feedback.approved && (
                      <button
                        onClick={() => handleApprove(feedback.feedback_id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
                      >
                        <CheckCircle size={18} />
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(feedback.feedback_id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Feedback ID */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Feedback ID: #{feedback.feedback_id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbacksPage;
