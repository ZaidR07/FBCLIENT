"use client";
import { useState, useEffect } from "react";
import AdminHeader from "@/app/components/AdminHeader";
import DataTable from "react-data-table-component";
import axios from "axios";

const columns = [
  { name: "", cell: (row) => <img src={row.photo} alt="" />, width: "90px" },
  { name: "Vendor ID", selector: (row) => row.vendor_id, width: "90px" },
  {
    name: "Name",
    selector: (row) => row.vendorname,
    sortable: true,
    width: "150px",
  },
  { name: "Company Name", selector: (row) => row.companyname },
  { name: "Email ID", selector: (row) => row.emailid, width: "250px" }, // Correct syntax
  { name: "Primary Mobile", selector: (row) => row.mobile1 },
  { name: "Secondary Mobile", selector: (row) => row.mobile2 },
  { name: "Address", selector: (row) => row.address, width: "300px" }, // Example width
];

const customStyles = {
  headRow: {
    style: { backgroundColor: "#f87123", fontWeight: "bold" },
  },
  rows: {
    style: { minHeight: "48px" },
  },
};

const Page = () => {
  const [isClient, setIsClient] = useState(false);
  const [vendorslist, setVendorslist] = useState([]);
  const [displayvendorslist, setDisplayVendorslist] = useState([]);
  const [sidebaropen, setSidebarOpen] = useState(false);

  const fetchbrokerslist = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}/getvendors`);
    setDisplayVendorslist(response.data.payload);
    setVendorslist(response.data.payload);
  };

  const filtersearch = (data) => {
    if (data) {
      const searchTerm = data.toLowerCase();
      setDisplayVendorslist(
        displayvendorslist.filter((item) =>
          Object.values(item).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm)
          )
        )
      );
      return;
    }
    setDisplayVendorslist(vendorslist);
  };

  useEffect(() => {
    setIsClient(true);
    fetchbrokerslist();
  }, []);

  if (!isClient) return null; // Avoids rendering until hydration completes

  return (
    <div className="lg:mt-[12vh] lg:flex bg-gray-100 min-h-[88vh]">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`w-full mt-[10vh] lg:mt-[0vh] px-[5%] py-[4vh] ${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">View Vendors</h1>
          <span className="text-sm text-gray-500">Manage vendors</span>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <input
            type="search"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4 rounded-xl px-4 py-2 w-full"
            placeholder="Search vendors by any field..."
            onChange={(e) => filtersearch(e.target.value)}
          />
          <div className="overflow-x-auto">
            <DataTable
              paginationPerPage={10}
              columns={columns}
              data={displayvendorslist}
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
