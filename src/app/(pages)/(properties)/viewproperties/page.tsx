"use client";
import { useState, useEffect } from "react";
import AdminHeader from "@/app/components/AdminHeader";
import DataTable from "react-data-table-component";
import axios from "axios";

const columns = [
  { name: "Society Name", selector: (row) => row.Societyname, width: "150px" },
  {
    name: "Area",
    selector: (row) => `${row.area} ${row.areaunits}`,
    sortable: true,
  },
  { name: "Bedrooms", selector: (row) => row.bedrooms, width: "100px" },
  { name: "Floor No.", selector: (row) => row.floor },
  { name: "Total Floor", selector: (row) => row.buildingfloors },
  { name: "Property Type", selector: (row) => row.type },

  { name: "Price", selector: (row) => row.price },
  { name: "Listed By", selector: (row) => row.listedby },
];

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#f87123",
      fontWeight: "bold",
      color: "#fff",
      borderRadius: "0.5rem 0.5rem 0 0",
    },
  },
  headCells: {
    style: {
      paddingTop: "14px",
      paddingBottom: "14px",
      fontSize: "0.9rem",
    },
  },
  rows: {
    style: { minHeight: "56px", fontSize: "0.95rem" },
  },
  cells: {
    style: { paddingTop: "12px", paddingBottom: "12px" },
  },
};

const Page = () => {
  const [isClient, setIsClient] = useState(false);
  const [brokerslist, setBrokerslist] = useState([]);
  const [displaybrokerlist, setDisplayBrokerslist] = useState([]);
  const [sidebaropen, setSidebarOpen] = useState(false);

  const fetchbrokerslist = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}/getproperties`);
    setDisplayBrokerslist(response.data.payload);
    setBrokerslist(response.data.payload);
  };

  const filtersearch = (data) => {
    if (data) {
      const searchTerm = data.toLowerCase();
      setDisplayBrokerslist(
        displaybrokerlist.filter((item) =>
          Object.values(item).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm)
          )
        )
      );
      return;
    }
    setDisplayBrokerslist(brokerslist);
  };

  useEffect(() => {
    setIsClient(true);
    fetchbrokerslist();
  }, []);

  if (!isClient) return null; // Avoids rendering until hydration completes

  return (
    <div className="lg:flex lg:mt-[12vh] bg-gray-100 min-h-[88vh]">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`w-full  px-[5%] py-[4vh] ${sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"} `}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">View Properties</h1>
          <span className="text-sm text-gray-500">Manage properties</span>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <input
            type="search"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4 rounded-xl px-4 py-2 w-full"
            placeholder="Search properties by any field..."
            onChange={(e) => filtersearch(e.target.value)}
          />
          <div className="overflow-x-auto">
            <DataTable
              paginationPerPage={10}
              columns={columns}
              data={displaybrokerlist}
              pagination
              customStyles={customStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
