import { PhoneCall, Eye, Edit, Trash2, Download } from "lucide-react";
import { exportToExcel } from "../utils/exportToExcel";
import { useSewa } from "../context/SewaContext";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function GatePass() {
  const { gatePasses, deleteGatePass, updateGatePass } = useSewa();
  const [search, setSearch] = useState("");
  const [selectedGatePass, setSelectedGatePass] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedYear, setSelectedYear] = useState("All");

  const gatePassData = gatePasses;
  const years = [
    "All",
    ...new Set(
      gatePassData
        .map((item) =>
          item.date ? new Date(item.date).getFullYear().toString() : null
        )
        .filter(Boolean)
    ),
  ];
  const filteredGatePasses = gatePassData.filter((item) => {
    const searchMatch = `${item.serialNo || ""} ${item.from || ""} ${
      item.to || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase());
    const year = item.date && new Date(item.date).getFullYear().toString();
    return searchMatch && (selectedYear === "All" || year === selectedYear);
  });

  // Call Function
  const handleCall = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };
  const handleView = (item) => {
    setSelectedGatePass(item);
    setEditMode(false);
  };

  const handleEdit = (item, index) => {
    setSelectedGatePass({
      ...item,
      _index: index,
    });
    setEditMode(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Delete this GatePass?")) {
      deleteGatePass(id);
    }
  };
  const removeItem = (index) => {
    const updatedItems = selectedGatePass.items.filter((_, i) => i !== index);

    setSelectedGatePass({
      ...selectedGatePass,
      items: updatedItems,
    });
  };
  const handleSave = async () => {
    const { error } = await supabase
      .from("gatepasses")
      .update({
        from_location: selectedGatePass.from,
        to_location: selectedGatePass.to,
        sewadar_name: selectedGatePass.sewadar,
        mobile: selectedGatePass.mobile,
        vehicle_no: selectedGatePass.vehicle,
        created_by: selectedGatePass.createdBy,
        purpose: selectedGatePass.reason,
        items: selectedGatePass.items,
      })
      .eq("id", selectedGatePass.id);

    if (error) {
      console.log(error);
      alert("Failed to Update GatePass");
      return;
    }

    await updateGatePass();

    alert("GatePass Updated Successfully");

    setSelectedGatePass(null);
    setEditMode(false);
  };
  // Excel Export
  const handleExport = () => {
    const formattedData = gatePassData.map((item, index) => ({
      SerialNo: item.serialNo,
      Date: item.date,
      From: item.from,
      To: item.to,
      BadgeNo: item.badgeNo,
      SanctionLetter: item.sanctionLetter,

      Sewadar: item.sewadar,
      Mobile: item.mobile,
      Vehicle: item.vehicle,
      CreatedBy: item.createdBy,

      Items:
        item.items?.map((i) => `${i.name} (${i.quantity})`).join(", ") || "",

      Reason: item.reason,
      Status: item.status,
    }));

    exportToExcel(formattedData, "GatePass_Records", "GatePass");
  };

  return (
    <div className="min-h-screen text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">All GatePass</h1>

        <p className="text-gray-400 mt-2">All material movement records</p>
      </div>

      {/* Date + Time */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Date */}
        <div className="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl">
          <p className="text-gray-400 text-sm">Current Date</p>

          <h3 className="text-lg font-semibold">
            {new Date().toLocaleDateString()}
          </h3>
        </div>

        {/* Time */}
        <div className="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl">
          <p className="text-gray-400 text-sm">Current Time</p>

          <h3 className="text-lg font-semibold">
            {new Date().toLocaleTimeString()}
          </h3>
        </div>

        {/* Total */}
        <div className="bg-yellow-500 px-5 py-3 rounded-2xl">
          <p className="text-yellow-100 text-sm">Total GatePass</p>

          <h3 className="text-lg font-semibold">{gatePassData.length}</h3>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">
              GatePass Records
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Full material movement details
            </p>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-5 py-3 rounded-xl font-semibold transition-all"
          >
            <Download size={18} />
            Export Excel
          </button>
        </div>
        <div className="p-5 border-b border-white/10">
          <div className="flex gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            >
              {years.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by Serial No / From / To"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            {/* Head */}
            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="px-6 py-4">S.No.</th>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4">To</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filteredGatePasses.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  <td className="px-6 py-4 font-semibold text-yellow-300">
                    {item.serialNo}
                  </td>

                  <td className="px-6 py-4">{item.from}</td>

                  <td className="px-6 py-4">{item.to}</td>

                  <td className="px-6 py-4">{item.date}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          (window.location.href = `tel:${item.mobile}`)
                        }
                        className="bg-green-600 hover:bg-green-700 p-3 rounded-xl"
                      >
                        <PhoneCall size={18} />
                      </button>
                      <button
                        onClick={() => handleView(item)}
                        className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => handleEdit(item, index)}
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedGatePass && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">
                {editMode ? "Edit GatePass" : "GatePass Details"}
              </h2>

              <button
                onClick={() => {
                  setSelectedGatePass(null);
                  setEditMode(false);
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-yellow-300 mb-2">From</label>

                <input
                  type="text"
                  value={selectedGatePass.from || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedGatePass({
                      ...selectedGatePass,
                      from: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="block text-yellow-300 mb-2">
                  Mobile Number
                </label>
                <input
                  value={selectedGatePass.mobile || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedGatePass({
                      ...selectedGatePass,
                      mobile: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="block text-yellow-300 mb-2">
                  Vehicle Number
                </label>
                <input
                  value={selectedGatePass.vehicle || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedGatePass({
                      ...selectedGatePass,
                      vehicle: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="block text-yellow-300 mb-2">Created By</label>
                <input
                  value={selectedGatePass.createdBy || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedGatePass({
                      ...selectedGatePass,
                      createdBy: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="block text-yellow-300 mb-2">
                  Serial Number
                </label>
                <div className="bg-slate-800 p-3 rounded-xl">
                  {selectedGatePass.serialNo}
                </div>
              </div>

              <div>
                <label className="block text-yellow-300 mb-2">Badge No</label>
                <div className="bg-slate-800 p-3 rounded-xl">
                  {selectedGatePass.badgeNo}
                </div>
              </div>

              <div>
                <label className="block text-yellow-300 mb-2">
                  Sanction Letter
                </label>
                <div className="bg-slate-800 p-3 rounded-xl">
                  {selectedGatePass.sanctionLetter}
                </div>
              </div>

              <div>
                <label className="block text-yellow-300 mb-2">Date</label>
                <div className="bg-slate-800 p-3 rounded-xl">
                  {selectedGatePass.date}
                </div>
              </div>
              {/* 
              <div>
                <label className="block text-yellow-300 mb-2">Status</label>
                <div className="bg-slate-800 p-3 rounded-xl">
                  {selectedGatePass.status}
                </div>
              </div> */}
            </div>
            <br />
            <br />
            <div className="md:col-span-2">
              <label className="block text-yellow-300 mb-2">
                Purpose / Reason
              </label>

              <div className="bg-slate-800 p-3 rounded-xl min-h-[100px]">
                {selectedGatePass.reason}
              </div>
            </div>
            <br />
            <div className="md:col-span-2">
              <label className="block text-yellow-300 mb-3 text-lg font-semibold">
                Items Details
              </label>

              <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-left">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 w-24">Item No.</th>
                      <th className="px-4 py-3">Item Name</th>
                      <th className="px-4 py-3 w-32 text-center">Qty</th>

                      {editMode && (
                        <th className="px-4 py-3 w-32 text-center">Action</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedGatePass.items || []).map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">{index + 1}</td>

                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={item.name}
                            readOnly={!editMode}
                            onChange={(e) => {
                              const updatedItems = [...selectedGatePass.items];
                              updatedItems[index].name = e.target.value;

                              setSelectedGatePass({
                                ...selectedGatePass,
                                items: updatedItems,
                              });
                            }}
                            className="w-full bg-slate-800 rounded-lg px-3 py-2"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly={!editMode}
                            onChange={(e) => {
                              const updatedItems = [...selectedGatePass.items];
                              updatedItems[index].quantity = e.target.value;

                              setSelectedGatePass({
                                ...selectedGatePass,
                                items: updatedItems,
                              });
                            }}
                            className="w-full bg-slate-800 rounded-lg px-3 py-2"
                          />
                        </td>

                        {editMode && (
                          <td>
                            <button
                              onClick={() => {
                                const updatedItems =
                                  selectedGatePass.items.filter(
                                    (_, i) => i !== index
                                  );

                                setSelectedGatePass({
                                  ...selectedGatePass,
                                  items: updatedItems,
                                });
                              }}
                              className="bg-red-600 px-3 py-2 rounded-lg"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {editMode && (
              <button
                onClick={handleSave}
                className="mt-6 bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-semibold"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}
      {editMode && (
        <button
          onClick={() =>
            setSelectedGatePass({
              ...selectedGatePass,
              items: [
                ...selectedGatePass.items,
                {
                  name: "",
                  quantity: "",
                },
              ],
            })
          }
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl"
        >
          + Add Item
        </button>
      )}
    </div>
  );
}
