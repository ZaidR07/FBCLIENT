"use client";
import { useState, useEffect } from "react";
import AdminHeader from "@/app/components/AdminHeader";
import DataTable from "react-data-table-component";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className="w-4 h-4 text-red-600 cursor-pointer"
    fill="#af1616"
  >
    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
  </svg>
);

const PenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className="w-4 h-4 text-red-600 cursor-pointer"
    fill="#0f8b1d"
  >
    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
  </svg>
);

const Page = () => {
  const [isClient, setIsClient] = useState(false);
  const [brokerslist, setBrokerslist] = useState([]);
  const [displaybrokerlist, setDisplayBrokerslist] = useState([]);
  const [sidebaropen, setSidebarOpen] = useState(false);

  const removeElement = (id) => {
    const filteredlist = displaybrokerlist.filter(
      (item) => item.property_id !== id
    );
    setDisplayBrokerslist(filteredlist);
    setBrokerslist(filteredlist);
  };

  const HandleDelete = async (id) => {
    try {
      const response = await axiosInstance.post('/api/deleteproperties', {
        id: id,
      });
      if (response.status != 200) {
        toast.error(response.data.message);
        return;
      }
      if (response.status == 200) {
        toast.success(response.data.message);
        removeElement(response.data.id);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  // Fetch Brokers List
  const fetchbrokerslist = async () => {
    try {
      const response = await axiosInstance.get('/api/getproperties');
      setBrokerslist(response.data.payload);
      setDisplayBrokerslist(response.data.payload);
    } catch (error) {
      console.error("Error fetching brokers list:", error);
    }
  };

  // Search Filter
  const filtersearch = (data) => {
    const searchTerm = data.toLowerCase();
    setDisplayBrokerslist(
      brokerslist.filter((item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm)
        )
      )
    );
  };

  useEffect(() => {
    setIsClient(true);
    fetchbrokerslist();
  }, []);

  // Table Columns Definition
  const columns = [
    // {
    //   name: "",
    //   cell: (row) => (
    //     <button onClick={() => HandleDelete(row.property_id)}>
    //       <PenIcon />
    //     </button>
    //   ),
    //   ignoreRowClick: true,
    //   button: true,
    //   minWidth: "20px",
    // },

    {
      name: "",
      cell: (row) => (
        <button onClick={() => HandleDelete(row.property_id)}>
          <TrashIcon />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      minWidth: "40px",
    },
    { name: "Society", selector: (row) => row.Societyname },
    {
      name: "Area",
      selector: (row) => `${row.area} ${row.areaUnit}`,
      sortable: true,
    },
    { name: "Bedrooms", selector: (row) => row.bedrooms },
    { name: "Floor No.", selector: (row) => row.floor },
    { name: "Total Floor", selector: (row) => row.buildingfloors },
    { name: "Type", selector: (row) => row.type },

    { name: "Price", selector: (row) => row.price },
    { name: "Listed By", selector: (row) => row.listedby },
  ];

  return (
    <div className="flex bg-gray-100 min-h-[88vh] lg:mt-[12vh]">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
      <div
        className={` w-full px-[5%] py-[5vh] mt-[10vh] lg:mt-0 ${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        }`}
      >
        <input
          type="search"
          className="border border-[#FF5D00] mb-[3vh] rounded-xl px-3 py-1 w-full sm:max-w-[50%] block mx-auto text-sm sm:text-base"
          placeholder="Search..."
          onChange={(e) => filtersearch(e.target.value)}
        />

        <DataTable
          paginationPerPage={10}
          columns={columns}
          data={displaybrokerlist}
          pagination
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "#f87123",
                fontWeight: "bold",
                fontSize: "14px",
                textAlign: "left",
                padding: "15px",
              },
            },
            headCells: {
              style: {
                padding: "0px", // ✅ Removes padding from head row cells
                textAlign: "left",
              },
            },

            rows: {
              style: {
                minHeight: "40px",
                fontSize: "12px",
                padding: "5px",
              },
            },
            cells: {
              style: {
                padding: "8px",
                textAlign: "left",
              },
            },
          }}
        />
      </div>

     
    </div>
  );
};

export default Page;
