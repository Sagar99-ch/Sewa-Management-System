import React, { useState } from "react";
import { useSewa } from "../context/SewaContext";
import DashboardCards from "../components/home/DashboardCards";

import {
  Shield,
  Volume2,
  Tent,
  Trees,
  Zap,
  PhoneCall,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { sewadars, gatePasses, lostFound } = useSewa();
  const sewadarData = sewadars;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const nightSewa = sewadars.filter(
    (item) => item.sewaType === "Night Sewa" && item.sewaDay === today
  );

  const handleCall = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditMode(true);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setEditMode(false);
  };
  const handleDelete = (record) => {
    if (!window.confirm("Delete this record?")) return;

    console.log("Delete:", record);

    alert("Record Deleted");
  };

  return (
    <div className="min-h-screen text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-400">Home Dashboard</h1>

        <p className="text-gray-400 mt-2">Sewa Management Overview</p>
      </div>

      {/* Cards */}
      <DashboardCards
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sewadarData={sewadarData}
        nightSewa={nightSewa}
        gatePasses={gatePasses}
        lostFound={lostFound}
      />

      {/* Night Sewa */}
      {activeSection === "night" && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-400 mb-5">
            {today} Night Sewa
          </h2>
          {nightSewa.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 border border-white/10 rounded-3xl p-5 mb-4"
            >
              <div className="flex items-center justify-between">
                {/* Left */}
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>

                  <p className="text-gray-400 mt-2">{item.mobile}</p>
                </div>

                {/* Right Buttons */}
                <div className="flex gap-3">
                  {/* Call */}
                  <button
                    onClick={() => handleCall(item.mobile)}
                    className="bg-emerald-500 hover:bg-emerald-600 p-3 rounded-xl"
                  >
                    <PhoneCall size={18} />
                  </button>

                  {/* View */}
                  <button
                    onClick={() => handleView(item)}
                    className="bg-sky-500 hover:bg-sky-600 p-3 rounded-xl"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded-xl"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 p-3 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Departments */}
      {activeSection === "department" && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-emerald-400 mb-5">
            Departments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <div className="bg-white/10 rounded-3xl p-6 text-center">
              <Shield className="mx-auto mb-3" size={35} />
              <h3>Security</h3>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 text-center">
              <Volume2 className="mx-auto mb-3" size={35} />
              <h3>Sound</h3>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 text-center">
              <Tent className="mx-auto mb-3" size={35} />
              <h3>Pandal</h3>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 text-center">
              <Trees className="mx-auto mb-3" size={35} />
              <h3>Horticulture</h3>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 text-center">
              <Zap className="mx-auto mb-3" size={35} />
              <h3>Electric</h3>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}

      {selectedRecord && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 w-full max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-indigo-400">
                {editMode ? "Edit Record" : "View Details"}
              </h2>

              <button
                onClick={() => setSelectedRecord(null)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-gray-400">Name</label>

                <input
                  type="text"
                  value={selectedRecord.name}
                  readOnly={!editMode}
                  className="w-full mt-2 bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="text-gray-400">Mobile</label>

                <input
                  type="text"
                  value={selectedRecord.mobile}
                  readOnly={!editMode}
                  className="w-full mt-2 bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-gray-400">Type</label>

                <input
                  type="text"
                  value={selectedRecord.sewa}
                  readOnly={!editMode}
                  className="w-full mt-2 bg-slate-800 border border-white/10 rounded-xl px-4 py-3"
                />
              </div>
            </div>

            {/* Save */}
            {editMode && (
              <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl">
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
