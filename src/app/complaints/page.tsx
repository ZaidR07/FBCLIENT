"use client";
import { useState, useEffect } from "react";
import { AlertCircle, Trash2, RefreshCw, Calendar, User, Mail, Phone, CheckCircle, Clock, XCircle } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";

interface Complaint {
  complaint_id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "pending" | "in-progress" | "resolved" | "closed";
  resolved: boolean;
  createdAt: string;
  updatedAt: string;
}

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebaropen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "resolved">("all");

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/getcomplaints");
      
      if (response.data.payload) {
        setComplaints(response.data.payload);
      }
    } catch (error: any) {
      console.error("Error fetching complaints:", error);
      toast.error(error.response?.data?.message || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update complaint status
  const handleStatusUpdate = async (complaint_id: number, status: string) => {
    try {
      const response = await axiosInstance.post("/api/updatecomplaintstatus", {
        complaint_id,
        status,
      });

      if (response.status === 200) {
        toast.success(`Complaint marked as ${status}!`);
        fetchComplaints(); // Refresh the list
      }
    } catch (error: any) {
      console.error("Error updating complaint status:", error);
      toast.error(error.response?.data?.message || "Failed to update complaint status");
    }
  };

  // Delete complaint
  const handleDelete = async (complaint_id: number) => {
    if (!confirm("Are you sure you want to delete this complaint?")) {
      return;
    }

    try {
      const response = await axiosInstance.post("/api/deletecomplaint", {
        complaint_id,
      });

      if (response.status === 200) {
        toast.success("Complaint deleted successfully!");
        fetchComplaints(); // Refresh the list
      }
    } catch (error: any) {
      console.error("Error deleting complaint:", error);
      toast.error(error.response?.data?.message || "Failed to delete complaint");
    }
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

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "in-progress":
        return <AlertCircle size={16} />;
      case "resolved":
        return <CheckCircle size={16} />;
      case "closed":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  // Filter complaints
  const filteredComplaints = complaints.filter((complaint) => {
    if (filter === "all") return true;
    return complaint.status === filter;
  });

  const pendingCount = complaints.filter((c) => c.status === "pending").length;
  const inProgressCount = complaints.filter((c) => c.status === "in-progress").length;
  const resolvedCount = complaints.filter((c) => c.status === "resolved" || c.status === "closed").length;

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
            Complaints Management
          </h1>
          <p className="text-gray-600">
            Review and manage customer complaints
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Complaints</p>
                <p className="text-3xl font-bold text-gray-800">{complaints.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <AlertCircle className="text-blue-600" size={24} />
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
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-gray-800">{inProgressCount}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <AlertCircle className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Resolved</p>
                <p className="text-3xl font-bold text-gray-800">{resolvedCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All ({complaints.length})
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
            <button
              onClick={() => setFilter("in-progress")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === "in-progress"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              In Progress ({inProgressCount})
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === "resolved"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>

          <button
            onClick={fetchComplaints}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* Complaints List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No complaints found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.complaint_id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl font-bold text-gray-800">
                            {complaint.subject}
                          </h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${getStatusColor(complaint.status)}`}>
                            {getStatusIcon(complaint.status)}
                            {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                          </span>
                        </div>
                        
                        {/* Contact Info */}
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User size={16} />
                            {complaint.name}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={16} />
                            {complaint.email}
                          </div>
                          {complaint.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone size={16} />
                              {complaint.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={16} />
                            {formatDate(complaint.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {complaint.message}
                      </p>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex lg:flex-col gap-2">
                    {complaint.status === "pending" && (
                      <button
                        onClick={() => handleStatusUpdate(complaint.complaint_id, "in-progress")}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition whitespace-nowrap"
                      >
                        <AlertCircle size={18} />
                        In Progress
                      </button>
                    )}

                    {(complaint.status === "pending" || complaint.status === "in-progress") && (
                      <button
                        onClick={() => handleStatusUpdate(complaint.complaint_id, "resolved")}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition whitespace-nowrap"
                      >
                        <CheckCircle size={18} />
                        Resolve
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(complaint.complaint_id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition whitespace-nowrap"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Complaint ID */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Complaint ID: #{complaint.complaint_id}
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

export default ComplaintsPage;
