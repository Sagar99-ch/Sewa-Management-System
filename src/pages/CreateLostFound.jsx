import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSewa } from "../context/SewaContext";
import { supabase } from "../lib/supabase";

import {
  Phone,
  Calendar,
  MapPin,
  FileText,
  Camera,
  PhoneCall,
  User,
  Package,
} from "lucide-react";

export default function CreateLostFound() {
  const navigate = useNavigate();
  const { addLostFound } = useSewa();

  const [formData, setFormData] = useState({
    item: "",
    person: "",
    mobile: "",
    date: "",
    location: "",
    description: "",
    type: "Lost",

  });
  const handleSave = async () => {
    if (!formData.item || !formData.person || !formData.mobile) {
      alert("Please fill required fields");
      return;
    }

   const { error } = await supabase
  .from("lost_found")
  .insert([
    {
      item_name: formData.item,
      person_name: formData.person,
      mobile: formData.mobile,
      location: formData.location,
      description: formData.description,
      category: formData.type,
      date: formData.date,
      status: "Active",
    },
  ]);
    if (error) {
      console.log(error);
      alert("Failed to Save Entry");
      return;
    }

    await addLostFound();

    alert("Entry Saved Successfully");

    navigate("/lostfound");
  };

  const handleCall = () => {
    if (formData.mobile) {
      window.location.href = `tel:${formData.mobile}`;
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-pink-400">
          Create Lost & Found Entry
        </h1>

        <p className="text-gray-400 mt-2">Register lost and found items</p>
      </div>

      <div className="bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Package size={18} />
              Item Name
            </label>

            <input
              type="text"
              value={formData.item}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  item: e.target.value,
                })
              }
              placeholder="Enter item name"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <User size={18} />
              Person Name
            </label>

            <input
              type="text"
              value={formData.person}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  person: e.target.value,
                })
              }
              placeholder="Enter person name"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />
          </div>

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
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Calendar size={18} />
              Date
            </label>

            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <MapPin size={18} />
              Location
            </label>

            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              placeholder="Enter location"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <FileText size={18} />
              Type
            </label>

            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                })
              }
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none"
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <FileText size={18} />
              Description
            </label>

            <textarea
              rows="5"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Enter item description"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Camera size={18} />
              Upload Photo
            </label>

            <input
              type="file"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          <button
            onClick={handleSave}
            className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Save Entry
          </button>

          <button
            onClick={handleCall}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <PhoneCall size={18} />
            Call Person
          </button>
        </div>
      </div>
    </div>
  );
}
