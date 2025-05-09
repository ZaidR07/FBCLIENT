"use client";
import { useState, useEffect } from "react";
import AdminHeader from "@/app/components/AdminHeader";
import DataTable from "react-data-table-component";
import { uri } from "@/constant";
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
    const response = await axios.get(`${uri}getvendors`);
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
    <div className="lg:mt-[12vh] lg:flex">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`min-h-[88vh] w-full mt-[10vh] lg:mt-[0vh] px-[5%] py-[5vh] bg-gray-200 ${
          sidebaropen ? "lg:w-[77%]" : "lg:w-[90%]"
        }`}
      >
        <input
          type="search"
          name=""
          id=""
          className="border-2 border-[#FF5D00] mb-[3vh] rounded-2xl px-3 py-1 w-[100%] "
          placeholder="search.."
          onChange={(e) => filtersearch(e.target.value)}
        />
        <DataTable
          paginationPerPage={10}
          columns={columns}
          data={displayvendorslist}
          pagination
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default Page;
