"use client";
import { useState, useEffect } from "react";
import AdminHeader from "@/app/components/AdminHeader";
import DataTable from "react-data-table-component";
import { uri } from "@/constant";
import axios from "axios";
import {  toast } from "react-toastify";
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
  const [updatecliked, setUpdateClicked] = useState(false);
  const [sidebaropen, setSidebarOpen] = useState(false);

  // Credit Modal State
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [selectedBrokerId, setSelectedBrokerId] = useState<string>("");
  const [creditCount, setCreditCount] = useState<string>("");
  const [validityOption, setValidityOption] = useState<string>("2m"); // 2m, 6m, 1y

  const [formdata, setFormdata] = useState({
    broker_id: "",
    brokername: "",
    companyname: "",
    emailid: "",
    mobile1: "",
    mobile2: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreditModal = (broker_id: string) => {
    setSelectedBrokerId(broker_id);
    setCreditCount("");
    setValidityOption("2m");
    setShowCreditModal(true);
  };

  const closeCreditModal = () => {
    setShowCreditModal(false);
    setSelectedBrokerId("");
    setCreditCount("");
  };

  const handleGiveCredit = async () => {
    try {
      const creditsNum = Number(creditCount);
      if (!selectedBrokerId) {
        toast.error("No broker selected");
        return;
      }
      if (isNaN(creditsNum) || creditsNum <= 0) {
        toast.error("Enter a valid number of credits");
        return;
      }

      // Compute validity based on selection
      const validityDate = new Date();
      if (validityOption === "2m") validityDate.setMonth(validityDate.getMonth() + 2);
      else if (validityOption === "6m") validityDate.setMonth(validityDate.getMonth() + 6);
      else if (validityOption === "1y") validityDate.setFullYear(validityDate.getFullYear() + 1);

      const response = await axios.post(`${uri}updatebrokercredits`, {
        broker_id: selectedBrokerId,
        credits: creditsNum,
        validity: validityDate.toISOString(),
      });

      if (response.status === 200) {
        toast.success("Credits updated successfully");
        // Optionally update UI locally with validity date 2 months from now
        setDisplayBrokerslist((prev: any) =>
          prev.map((b: any) =>
            b.broker_id === selectedBrokerId
              ? { ...b, credits: { credits: creditsNum, validity: validityDate } }
              : b
          )
        );
        setBrokerslist((prev: any) =>
          prev.map((b: any) =>
            b.broker_id === selectedBrokerId
              ? { ...b, credits: { credits: creditsNum, validity: validityDate } }
              : b
          )
        );
        closeCreditModal();
      } else {
        toast.error(response.data?.message || "Failed to update credits");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  const removeElement = (id) => {
    const filteredlist = displaybrokerlist.filter(
      (item) => item.broker_id != id
    );

    setDisplayBrokerslist(filteredlist);
    setBrokerslist(filteredlist);
  };

  const HandleDelete = async (id) => {
    try {
      const response = await axios.post(`${uri}deletebroker`, {
        id: id,
      });
      if (response.status != 200) {
        toast.error(response.data.message);
        return;
      }
      if (response.status == 200) {
        toast.success(response.data.message);
        removeElement(response.data.broker_id);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const updateElement = (id) => {
    const filtered = displaybrokerlist.filter((item) => item.broker_id != id);

    setDisplayBrokerslist([...filtered, formdata]);
    setBrokerslist([...filtered, formdata]);
  };

  const UpdateRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${uri}updatebroker`, {
        formdata: formdata,
      });

      if (response.status != 200) {
        toast.error(response.data.message);
        return;
      }
      if (response.status == 200) {
        toast.success(response.data.message);
        updateElement(response.data.broker.broker_id);
        setFormdata({
          broker_id: "",
          brokername: "",
          companyname: "",
          emailid: "",
          mobile1: "",
          mobile2: "",
          address: "",
        });
        setUpdateClicked(false);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  // Fetch Brokers List
  const fetchbrokerslist = async () => {
    try {
      const response = await axios.get(`${uri}getbrokers`);
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

  const CloseIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        width={35}
        fill="#FFF"
        className="ml-auto absolute right-3"
        onClick={() => setUpdateClicked(false)}
      >
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
    );
  };

  useEffect(() => {
    setIsClient(true);
    fetchbrokerslist();
  }, []);

  // Table Columns Definition
  const columns = [
    {
      name: "ID",
      selector: (row) => row.broker_id,
      minWidth: "60px",
      maxWidth: "60px",
    },
    {
      name: "Name",
      selector: (row) => row.brokername,
      sortable: true,
      minWidth: "80px",
      maxWidth: "100px",
    },
    {
      name: "Company",
      selector: (row) => row.companyname,
      minWidth: "60px",
      maxWidth: "100px",
      marginLeft: "0px",
    },
    {
      name: "",
      cell: (row) => (
        <button
          onClick={() => {
            setFormdata(row);
            setUpdateClicked(true);
          }}
        >
          <PenIcon />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      minWidth: "50px",
    },

    {
      name: "",
      cell: (row) => (
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
          onClick={() => openCreditModal(row.broker_id)}
        >
          Give Credit
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      minWidth: "110px",
    },

    {
      name: "",
      cell: (row) => (
        <button onClick={() => HandleDelete(row.broker_id)}>
          <TrashIcon />
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      minWidth: "50px",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-[88vh] mt-[10vh] lg:mt-[12vh] flex">
      <AdminHeader sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`w-full py-[4vh] px-[5%] ${
          sidebaropen ? "lg:ml-[23%]" : "lg:ml-[12%]"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Update / Remove Brokers</h1>
          <span className="text-sm text-gray-500">Manage and edit broker records</span>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-4 overflow-x-auto">
          <input
            type="search"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4 rounded-xl px-4 py-2 w-full sm:max-w-[50%] block ml-auto text-sm sm:text-base"
            placeholder="Search brokers..."
            onChange={(e) => filtersearch(e.target.value)}
          />
          <p className="text-sm font-semibold mb-2">Total Brokers: {displaybrokerlist.length}</p>
          <DataTable
            paginationPerPage={10}
            columns={columns}
            data={displaybrokerlist}
            pagination
            paginationTotalRows={displaybrokerlist.length}
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: "#f87123",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#fff",
                  textAlign: "left",
                  paddingTop: "14px",
                  paddingBottom: "14px",
                },
              },
              headCells: {
                style: {
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "left",
                },
              },
              rows: {
                style: {
                  minHeight: "48px",
                  fontSize: "13px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                },
              },
              cells: {
                style: {
                  padding: "10px",
                  textAlign: "left",
                },
              },
            }}
          />
        </div>
      </div>

      
      {/* // Update Drawer */}
      {updatecliked && (
        <div className="fixed top-[10vh] right-0 h-[90vh] bg-[#FF5D00] w-[70vw] shadow-2xl px-[10%] pb-[4vh] pt-2 z-10 font-semibold">
          <CloseIcon />

          <form
            className="space-y-6 mt-10 text-[#FFF] "
            onSubmit={UpdateRequest}
          >
            <div>
              <h1 className="text-center text-2xl text-[#FFF] font-bold mb-4 ">
                Update Broker
              </h1>
              <label className="w-full" htmlFor="">
                Broker Name
              </label>
              <input
                name="brokername"
                value={formdata.brokername}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-[#FFF] text-white font-light w-full"
              />
            </div>
            <div>
              <label className="" htmlFor="">
                Company Name
              </label>
              <input
                name="companyname"
                value={formdata.companyname}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-[#FFF] text-white font-light w-full"
              />
            </div>
            <div>
              <label className="" htmlFor="">
                Email ID
              </label>
              <input
                name="emailid"
                value={formdata.emailid}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-[#FFF] text-white font-light w-full"
              />
            </div>
            <div>
              <label className="" htmlFor="">
                Primary Mobile
              </label>
              <input
                name="mobile1"
                value={formdata.mobile1}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-[#FFF] text-white font-light w-full"
              />
            </div>
            <div>
              <label className="" htmlFor="">
                Secondary Mobile
              </label>
              <input
                name="mobile2"
                value={formdata.mobile2}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-[#FFF] text-white font-light"
              />
            </div>
            <div>
              <label className="" htmlFor="">
                Secondary Mobile
              </label>
              <input
                name="address"
                value={formdata.address}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-[#FFF] text-white font-light"
              />{" "}
            </div>

            <input
              type="submit"
              value="Update"
              className="px-4 py-2 border-2 border-white rounded-xl"
            />
          </form>
        </div>
      )}

      {/* Credit Modal */}
      {showCreditModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeCreditModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Give Credits</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Broker ID</label>
                <input
                  value={selectedBrokerId}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Number of Credits</label>
                <input
                  type="number"
                  min={1}
                  value={creditCount}
                  onChange={(e) => setCreditCount(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. 199"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Validity</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={validityOption}
                  onChange={(e) => setValidityOption(e.target.value)}
                >
                  <option value="2m">2 Months</option>
                  <option value="6m">6 Months</option>
                  <option value="1y">1 Year</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Expires on: {(() => { const d = new Date(); if (validityOption === "2m") d.setMonth(d.getMonth() + 2); else if (validityOption === "6m") d.setMonth(d.getMonth() + 6); else d.setFullYear(d.getFullYear() + 1); return d.toLocaleDateString(); })()}
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  className="px-4 py-2 rounded border"
                  onClick={closeCreditModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-[#FF5D00] text-white"
                  onClick={handleGiveCredit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
