import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSewa } from "../context/SewaContext";
import { supabase } from "../lib/supabase";

import { User, Phone, MapPin, Building2, PhoneCall } from "lucide-react";

export default function AddSewadar() {
  const navigate = useNavigate();
  const { addSewadar } = useSewa();
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    department: "",
    sewaDay: "",
    sewaTime: "",
  });

  const handleCall = () => {
    if (formData.mobile) {
      window.location.href = `tel:${formData.mobile}`;
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.mobile) {
      alert("Please enter Name and Mobile Number");
      return;
    }

    const { error } = await supabase.from("sewadars").insert([
      {
        name: formData.name,

        mobile: formData.mobile,
        department: formData.department,

        seva_type: "Daily Sewa",

        daily_attendance: 0,
        night_attendance: 0,

        sewa_day: formData.sewaDay,
        sewa_time: formData.sewaTime,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Failed to Save Sewadar");
      return;
    }

    await addSewadar();

    alert("Sewadar Added Successfully");

    navigate("/sewadar");
  };
  return (
    <div className="min-h-screen text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-400">Add Sewadar</h1>

        <p className="text-gray-400 mt-2">Add new sewadar details</p>
      </div>

      {/* Form */}
      <div className="bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <User size={18} />
              Sewadar Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder="Enter sewadar name"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Phone size={18} />
              Mobile Number
            </label>

            <input
              type="text"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobile: e.target.value,
                })
              }
              placeholder="Enter mobile number"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <MapPin size={18} />
              Address
            </label>

            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              placeholder="Enter address"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Department */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Building2 size={18} />
              Department
            </label>

            <select
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value,
                })
              }
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            >
              <option>Security</option>
              <option>Sound</option>
              <option>Pandal</option>
              <option>Horticulture</option>
              <option>Electric</option>
            </select>
          </div>

          {/* Sewa Type */}

          {/* Day */}
          <div>
            <label className="text-gray-300 mb-2 block">Select Sewa Day</label>

            <select
              value={formData.sewaDay}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sewaDay: e.target.value,
                })
              }
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="text-gray-300 mb-2 block">Sewa Time</label>

            <input
              type="time"
              value={formData.sewaTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sewaTime: e.target.value,
                })
              }
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-10">
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold"
          >
            Save Sewadar
          </button>

          <button
            onClick={handleCall}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl font-semibold"
          >
            <PhoneCall size={18} />
            Call Sewadar
          </button>
        </div>
      </div>
    </div>
  );
}
