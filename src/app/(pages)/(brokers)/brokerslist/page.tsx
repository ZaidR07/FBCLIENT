"use client";

import Header from "@/app/components/Header";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [location, setLocation] = useState("");
  const [brokerlist, setBrokerlist] = useState([]);

  const [filteredBrokers, setFilteredBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const searchplaceholders = [
    "Search by pincode ...",
    "Search by location ...",
    "Search by Broker Name ...",
  ];

  const router = useRouter();

  const loaddata = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}/getbrokers`);
      if (response.data.payload.length > 0) {
        setBrokerlist(response.data.payload);
        setFilteredBrokers(response.data.payload);
      } else {
        setBrokerlist([]);
        setFilteredBrokers([]);
      }
    } catch (error) {
      console.error("Error loading brokers", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loaddata();
  }, [loaddata]);

  // Jaro-Winkler Similarity function
  const jaroWinkler = (s1, s2) => {
    const m = [...s1].filter((c) => s2.includes(c)).length;
    if (m === 0) return 0;

    const transpositions =
      [...s1].reduce((acc, c, i) => acc + (c !== s2[i] ? 1 : 0), 0) / 2;
    const prefixLength = Math.min(
      4,
      [...s1].findIndex((c, i) => c !== s2[i]) + 1
    );

    const jaro = (m / s1.length + m / s2.length + (m - transpositions) / m) / 3;
    return jaro + prefixLength * 0.1 * (1 - jaro);
  };

  // Check if similarity score is 70% or more
  const isSimilar = (input, target) => {
    if (!input || !target) return false;
    input = input.toLowerCase();
    target = target.toLowerCase();
    const similarity = jaroWinkler(input, target) * 100; // Convert to percentage
    return similarity >= 70;
  };

  // Cycle placeholder every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchplaceholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const keyword = location.toLowerCase().trim();
    if (!keyword) {
      setFilteredBrokers(brokerlist);
      return;
    }

    const filtered = brokerlist.filter((broker) => {
      return (
        broker.pincode?.toString().includes(keyword) ||
        isSimilar(keyword, broker.location) ||
        isSimilar(keyword, broker.brokername)
      );
    });

    setFilteredBrokers(filtered);
  };

  return (
    <div className="bg-[#fef6f0] min-h-[100vh] mt-[8vh] lg:mt-[15vh]">
      <Header />
      <section className="pt-[2vh] px-[5%] h-[8vh] rounded-lg flex gap-[2%]">
        <input
          className="w-[75%] lg:w-[86%] h-full shadow-lg rounded-lg border-2 px-4"
          type="search"
          placeholder={searchplaceholders[placeholderIndex]}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="w-[36%] lg:w-[18%] bg-[#ff5d00] py-2 text-white rounded-lg"
        >
          Search
        </button>
        <button
          onClick={() => {
            setLocation("");
            setFilteredBrokers(brokerlist);
          }}
          className="w-[36%] lg:w-[18%] bg-blue-500 text-white py-2 rounded-lg"
        >
          Reset
        </button>
      </section>
      <section className="w-full px-[5%] mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="text-center py-4">
            <span className="animate-spin inline-block w-6 h-6 border-4 border-t-transparent border-orange-500 rounded-full"></span>
          </div>
        ) : filteredBrokers.length > 0 ? (
          filteredBrokers.map((item, index) => (
            <div
              key={index}
              className="w-full py-4 bg-[#fff] shadow-md px-4 rounded-md "
            >
              <div className="gap-1 flex w-[100%] flex-col items-center">
                <img
                  src={item.image}
                  className="w-[100px] h-[100px] rounded-full ring-2"
                  alt="broker-image"
                />
                <span className="text-lg">{item.brokername}</span>
                <span className="text-sm text-gray-400">
                  {item.companyname}
                </span>
                <button
                  onClick={() =>
                    router.push(`/singlebroker?id=${item.brokerId}`)
                  }
                  className="text-white bg-[#FF5D00] px-4 py-1 rounded-md"
                >
                  Contact
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No brokers found</div>
        )}
      </section>
    </div>
  );
};

export default Page;
