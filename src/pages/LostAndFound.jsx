import React, { useState } from "react";
import { useSewa } from "../context/SewaContext";
import { PhoneCall, Edit, Trash2, Download, Eye } from "lucide-react";
import { exportToExcel } from "../utils/exportToExcel";
import { supabase } from "../lib/supabase";
export default function LostFound() {
  const { lostFound, deleteLostFound, updateLostFound } = useSewa();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const lostData = lostFound;

  // Call Function
  const handleCall = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };
  const handleView = (item) => {
    setSelectedEntry(item);
    setEditMode(false);
  };

  const handleEdit = (item, index) => {
    setSelectedEntry({
      ...item,
      _index: index,
    });

    setEditMode(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Delete this entry?")) {
      deleteLostFound(id);
    }
  };
  const handleSave = async () => {
    const { error } = await supabase
      .from("lost_found")
      .update({
        item_name: selectedEntry.item,
        person_name: selectedEntry.person,
        mobile: selectedEntry.mobile,
        location: selectedEntry.location,
        description: selectedEntry.description,
        category: selectedEntry.type,
        date: selectedEntry.date,
      })
      .eq("id", selectedEntry.id);

    if (error) {
      console.log(error);
      alert("Failed to Update Entry");
      return;
    }

    await updateLostFound();

    alert("Entry Updated Successfully");

    setSelectedEntry(null);
    setEditMode(false);
  };
  // Excel Export
  const handleExport = () => {
    const formattedData = lostData.map((item, index) => ({
      ID: `LF-${index + 1}`,
      Item: item.item,
      Person: item.person,
      Mobile: item.mobile,
      Location: item.location,
      Type: item.type,
      Date: item.date,
      Status: "Active",
    }));

    exportToExcel(formattedData, "Lost_Found_Records", "LostFound");
  };

  return (
    <div className="min-h-screen text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-pink-400">Lost & Found</h1>

        <p className="text-gray-400 mt-2">All lost and found records</p>
      </div>

      {/* Table */}
      <div className="bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-pink-400">
              Lost & Found Records
            </h2>

            <p className="text-sm text-gray-400 mt-1">Registered entries</p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Total */}
            <div className="bg-pink-600 px-4 py-2 rounded-xl text-sm">
              Total: {lostData.length}
            </div>

            {/* Export */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              <Download size={16} />
              Export Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            {/* Head */}
            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="px-6 py-4">ID</th>

                <th className="px-6 py-4">Item</th>

                <th className="px-6 py-4">Person</th>

                <th className="px-6 py-4">Mobile</th>

                <th className="px-6 py-4">Location</th>

                <th className="px-6 py-4">Type</th>

                <th className="px-6 py-4">Date</th>

                <th className="px-6 py-4">Status</th>

                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {lostData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  {/* ID */}
                  <td className="px-6 py-4 font-semibold">LF-{index + 1}</td>

                  {/* Item */}
                  <td className="px-6 py-4">{item.item}</td>

                  {/* Person */}
                  <td className="px-6 py-4">{item.person}</td>

                  {/* Mobile */}
                  <td className="px-6 py-4">{item.mobile}</td>

                  {/* Location */}
                  <td className="px-6 py-4">{item.location}</td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs ${
                        item.type === "Lost" ? "bg-red-600" : "bg-emerald-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">{item.date}</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="bg-emerald-600 px-3 py-1 rounded-lg text-xs">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleView(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => handleCall(item.mobile)}
                      className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded-lg"
                    >
                      <PhoneCall size={16} />
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-3xl p-6 w-full max-w-3xl">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold text-pink-400">
                {editMode ? "Edit Entry" : "Lost & Found Details"}
              </h2>

              <button
                onClick={() => {
                  setSelectedEntry(null);
                  setEditMode(false);
                }}
                className="bg-red-600 px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-pink-300 mb-2">Person Name</label>
                <input
                  value={selectedEntry.person || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedEntry({
                      ...selectedEntry,
                      person: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="block text-pink-300 mb-2">
                  Mobile Number
                </label>
                <input
                  value={selectedEntry.mobile || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedEntry({
                      ...selectedEntry,
                      mobile: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="block text-pink-300 mb-2">Location</label>
                <input
                  value={selectedEntry.location || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedEntry({
                      ...selectedEntry,
                      location: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="block text-pink-300 mb-2">Date</label>
                <input
                  value={selectedEntry.date || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedEntry({
                      ...selectedEntry,
                      date: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="block text-pink-300 mb-2">Type</label>
                <input
                  value={selectedEntry.type || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedEntry({
                      ...selectedEntry,
                      type: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="block text-pink-300 mb-2">Status</label>
                <div className="bg-slate-800 p-3 rounded-xl">Active</div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-pink-300 mb-2">Description</label>

                <textarea
                  value={selectedEntry.description || ""}
                  readOnly={!editMode}
                  onChange={(e) =>
                    setSelectedEntry({
                      ...selectedEntry,
                      description: e.target.value,
                    })
                  }
                  rows="4"
                  className="bg-slate-800 p-3 rounded-xl w-full"
                />
              </div>
            </div>

            {editMode && (
              <button
                onClick={handleSave}
                className="mt-6 bg-pink-500 px-6 py-3 rounded-xl"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
