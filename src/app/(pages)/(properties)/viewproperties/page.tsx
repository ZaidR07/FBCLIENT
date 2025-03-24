"use client";
import { useState, useEffect } from "react";
import AdminHeader from "@/app/components/AdminHeader";
import DataTable from "react-data-table-component";
import { uri } from "@/constant";
import axios from "axios";

const columns = [
    { name: "Society Name", selector: (row) => row.Societyname , width : "150px" },
    { 
      name: "Area", 
      selector: (row) => `${row.area} ${row.areaunits}`, 
      sortable: true 
    },
    { name: "Bedrooms", selector: (row) => row.bedrooms , width : "100px" },
    { name: "Floor No.", selector: (row) => row.floor },
    { name: "Total Floor", selector: (row) => row.buildingfloors },
    { name: "Property Type", selector: (row) => row.type },


    

    { name: "Price", selector: (row) => row.price },
    { name: "Listed By", selector: (row) => row.listedby },
   




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
  const [brokerslist, setBrokerslist] = useState([]);
  const [displaybrokerlist, setDisplayBrokerslist] = useState([]);
  const [sidebaropen, setSidebarOpen] = useState(false);

  const fetchbrokerslist = async () => {
    const response = await axios.get(`${uri}getproperties`);
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
      return
    }
    setDisplayBrokerslist(brokerslist)
  };

  useEffect(() => {
    setIsClient(true);
    fetchbrokerslist();
  }, []);

  if (!isClient) return null; // Avoids rendering until hydration completes

  return (
    <div>
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
      <div className="min-h-screen mt-[10vh] px-[5%] py-[5vh] bg-gray-200">
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
          data={displaybrokerlist}
          pagination
          customStyles={customStyles}
        />
      </div>
      
    </div>
  );
};

export default Page;
