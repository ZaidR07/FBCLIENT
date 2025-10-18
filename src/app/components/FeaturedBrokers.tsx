import { MedalIcon } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useState, useEffect, useCallback } from "react";
const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32", "#4b4a4a", "#4b4a4a"]; // Gold, Silver, Bronze, Black for 4th & 5th

const FeaturedBrokers = () => {
  const [brokerlist, setBrokerlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initials = (name?: string) => {
    if (!name) return "B";
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase()).join("") || "B";
  };

  const svgAvatarDataUrl = (name?: string) => {
    const text = initials(name);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>
      <rect width='100%' height='100%' rx='64' ry='64' fill='#f3f4f6'/>
      <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='48' fill='#374151'>${text}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const loaddata = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get('/api/getbrokers');

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
    <div className="w-full bg-[#fef6f0] pb-6 ">
      {/* Header */}
      <div className="mt-[2vh] py-6 lg:pt-12 mx-2 text-xl px-[3%] shadow-inner rounded-2xl flex items-center">
        <MedalIcon
          className="text-[rgb(243,112,31)]"
          size={50}
          strokeWidth={2}
        />
        <div className="ml-4">
          <h1 className="font-semibold text-xl lg:text-2xl">Featured Brokers</h1>
          <span className="text-sm lg:text-base text-gray-600">
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
        <div className="w-full px-4 lg:px-8 lg:pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {brokerlist.map((item, index) => (
            <div
              key={index}
              className="relative p-5 bg-white rounded-2xl border border-orange-200 shadow-md shadow-[#fa9c66]/30 hover:shadow-lg hover:-translate-y-0.5 transition flex flex-col items-center justify-center gap-3 h-56 max-w-full"
            >
              {/* Medal badge */}
              <div className="absolute -top-3 -left-3 bg-white rounded-full shadow-sm">
                <MedalIcon
                  size={36}
                  strokeWidth={2}
                  color={medalColors[index] || "#A9A9A9"}
                />
              </div>

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-gray-200 bg-white flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src={item?.image ? item.image : svgAvatarDataUrl(item.brokername)}
                  alt={item?.brokername ? `${item.brokername} photo` : "broker photo"}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.onerror = null;
                    img.src = svgAvatarDataUrl(item.brokername);
                  }}
                />
              </div>

              {/* Text */}
              <div className="text-center px-2 w-full">
                <span className="text-base font-medium block truncate leading-tight">
                  {item.brokername}
                </span>
                <span className="text-sm text-gray-500 font-medium block truncate leading-tight">
                  {item.companyname || "Na"}
                </span>
              </div>
            </div>
          ))}
          </div>
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-500">
          No featured brokers available.
        </p>
      )}
    </div>
  );
};

export default FeaturedBrokers;
