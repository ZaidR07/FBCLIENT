import { MedalIcon } from "lucide-react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { uri } from "@/constant";

const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32", "#4b4a4a", "#4b4a4a"]; // Gold, Silver, Bronze, Black for 4th & 5th

const FeaturedBrokers = () => {
  const [brokerlist, setBrokerlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loaddata = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${uri}getbrokers`);

      if (response.data.payload.length > 0) {
        setBrokerlist(response.data.payload.slice(0, 5)); // Only top 5 brokers
      } else {
        setBrokerlist([]); // Ensure empty array if no data
      }
    } catch (error) {
      setError("Failed to load brokers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loaddata();
  }, [loaddata]);

  return (
    <div className="w-full bg-[#fef6f0] pb-6">
      {/* Header */}
      <div className="mt-[2vh] py-6 mx-2 text-xl px-[3%] shadow-inner rounded-2xl flex items-center">
        <MedalIcon className="text-[#f3701f]" size={50} strokeWidth={2} />
        <div className="ml-4">
          <h1 className="font-semibold text-xl">Featured Brokers</h1>
          <span className="text-sm text-gray-600">
            Brokers who are doing great in service.
          </span>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center mt-4 text-gray-500">Loading brokers...</p>
      ) : error ? (
        <p className="text-center mt-4 text-red-500">{error}</p>
      ) : brokerlist.length > 0 ? (
        <div className=" flex flex-col gap-4 px-4 ">
          {brokerlist.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white  rounded-lg flex items-center border shadow-md shadow-[#fa9c66]"
            >
              <MedalIcon
                className="mr-4"
                size={40}
                strokeWidth={2}
                color={medalColors[index] || "#A9A9A9"} // Default to dark gray if index > 4
              />
              <span className="text-lg font-medium">{item.brokername}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-500">No featured brokers available.</p>
      )}
    </div>
  );
};

export default FeaturedBrokers;
