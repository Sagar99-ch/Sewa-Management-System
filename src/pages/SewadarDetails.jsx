// src/pages/SewadarDetails.jsx

import React, { useState } from "react";

import {
  User,
  Phone,
  MapPin,
  Moon,
  Clock,
  CalendarDays,
  Pencil,
  PhoneCall,
  Save,
} from "lucide-react";

export default function SewadarDetails() {
  const [editMode, setEditMode] = useState(false);

  const [data, setData] = useState({
    name: "Sagar Choudhary",
    mobile: "7898028609",
    address: "Balaghat",
    sewaType: "Night Sewa",
    date: "2026-05-07",
    time: "10:00 PM",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Details Updated Successfully");
  };

  const handleCall = () => {
    window.location.href = `tel:${data.mobile}`;
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="bg-white/10 border border-white/10 rounded-3xl p-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-indigo-400">
            Sewadar Details
          </h1>

          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-5 py-3 rounded-xl"
          >
            <Pencil size={18} />
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-gray-400">Name</label>

            {editMode ? (
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full mt-2 bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
              />
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <User size={18} />
                <p>{data.name}</p>
              </div>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="text-gray-400">Mobile</label>

            {editMode ? (
              <input
                type="text"
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
                className="w-full mt-2 bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
              />
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <Phone size={18} />
                <p>{data.mobile}</p>
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-gray-400">Address</label>

            {editMode ? (
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
                className="w-full mt-2 bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
              />
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <MapPin size={18} />
                <p>{data.address}</p>
              </div>
            )}
          </div>

          {/* Sewa Type */}
          <div>
            <label className="text-gray-400">Sewa Type</label>

            {editMode ? (
              <input
                type="text"
                name="sewaType"
                value={data.sewaType}
                onChange={handleChange}
                className="w-full mt-2 bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
              />
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <Moon size={18} />
                <p>{data.sewaType}</p>
              </div>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="text-gray-400">Date</label>

            {editMode ? (
              <input
                type="date"
                name="date"
                value={data.date}
                onChange={handleChange}
                className="w-full mt-2 bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
              />
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <CalendarDays size={18} />
                <p>{data.date}</p>
              </div>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="text-gray-400">Time</label>

            {editMode ? (
              <input
                type="text"
                name="time"
                value={data.time}
                onChange={handleChange}
                className="w-full mt-2 bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
              />
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <Clock size={18} />
                <p>{data.time}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex gap-4 mt-10">
          {/* Call Button */}
          <button
            onClick={handleCall}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-5 py-3 rounded-xl"
          >
            <PhoneCall size={18} />
            Call
          </button>

          {/* Save Button */}
          {editMode && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl"
            >
              <Save size={18} />
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
