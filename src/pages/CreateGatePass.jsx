import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSewa } from "../context/SewaContext";
import { supabase } from "../lib/supabase";
import {
  Package,
  User,
  Phone,
  MapPin,
  Truck,
  FileText,
  ClipboardSignature,
  Plus,
  Hash,
  Calendar,
  Trash2,
} from "lucide-react";

export default function CreateGatePass() {
  const navigate = useNavigate();
  const { addGatePass } = useSewa();
  const [formData, setFormData] = useState({
    serialNo: "",
    date: new Date().toISOString().split("T")[0],
    sanctionLetter: "",
    from: "Ujjain",
    to: "",
    badgeNo: "",

    items: [
      {
        name: "",
        quantity: "",
      },
    ],

    sewadar: "",
    mobile: "",
    vehicle: "",
    createdBy: "Mainsi Bhadoriya",
    reason: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];

    updatedItems[index][field] = value;

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const addItemRow = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          name: "",
          quantity: "",
        },
      ],
    });
  };
  const removeItemRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };
  const handleSave = async () => {
    if (
      !formData.serialNo ||
      !formData.sewadar ||
      !formData.from ||
      !formData.to ||
      formData.items.length === 0
    ) {
      alert("Please fill required fields");
      return;
    }
    const { data: existingGatePass } = await supabase
      .from("gatepasses")
      .select("id")
      .eq("serial_no", formData.serialNo)
      .maybeSingle();

    if (existingGatePass) {
      alert("⚠ Serial Number already exists");
      return;
    }

    const { error } = await supabase.from("gatepasses").insert([
      {
        serial_no: formData.serialNo,
        gatepass_date: formData.date,

        from_location: formData.from,
        to_location: formData.to,

        badge_no: formData.badgeNo,
        sanction_letter: formData.sanctionLetter,

        sewadar_name: formData.sewadar,
        mobile: formData.mobile,
        vehicle_no: formData.vehicle,

        purpose: formData.reason,

        items: formData.items,

        created_by: formData.createdBy,
        status: "Approved",
      },
    ]);

    if (error) {
      console.log(error);
      alert("Failed to Create GatePass");
      return;
    }

    await addGatePass();

    alert("GatePass Created Successfully");

    navigate("/gatepass");
  };
  return (
    <div className="min-h-screen text-white p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">Create GatePass</h1>

        <p className="text-gray-400 mt-2">Create material movement gatepass</p>
      </div>

      <div className="bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-6xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <MapPin size={18} />
              From
            </label>

            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Material From"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* To */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <MapPin size={18} />
              To
            </label>

            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Material To"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Serial Number */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Hash size={18} />
              Serial Number
            </label>

            <input
              type="text"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              placeholder="Enter Serial Number"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Calendar size={18} />
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Sanction Letter */}
          <div>
            <label className="text-gray-300 mb-2 block">
              Sanction Letter No.
            </label>

            <input
              type="text"
              name="sanctionLetter"
              value={formData.sanctionLetter}
              onChange={handleChange}
              placeholder="Enter sanction letter no."
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Created By */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <ClipboardSignature size={18} />
              Created By
            </label>

            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              placeholder="GatePass creator"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Sewadar */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <User size={18} />
              Sewadar Name
            </label>

            <input
              type="text"
              name="sewadar"
              value={formData.sewadar}
              onChange={handleChange}
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
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Vehicle */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Truck size={18} />
              Vehicle Number
            </label>

            <input
              type="text"
              name="vehicle"
              value={formData.vehicle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vehicle: e.target.value.toUpperCase(),
                })
              }
              placeholder="Enter vehicle number"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
          {/* Badge Number */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Hash size={18} />
              Badge No.
            </label>

            <input
              type="text"
              name="badgeNo"
              value={formData.badgeNo}
              onChange={handleChange}
              placeholder="Enter badge number"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="mt-10">
          <label className="text-xl font-semibold text-gray-200 block mb-5">
            Items Details
          </label>

          {formData.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
            >
              <input
                type="text"
                placeholder={`Item ${index + 1}`}
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
                className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
              />

              {formData.items.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeItemRow(index)}
                  className="bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              ) : (
                <div />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItemRow}
            className="mt-2 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl"
          >
            <Plus size={18} />
            Add Item
          </button>
        </div>
        <br />
        <br />
        {/* Reason */}
        <div>
          <label className="flex items-center gap-2 text-gray-300 mb-2">
            <FileText size={18} />
            Purpose / Reason
          </label>

          <textarea
            rows="4"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter reason"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
          />
        </div>
        {/* Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSave}
            className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-xl font-semibold"
          >
            Create GatePass
          </button>
        </div>
      </div>
    </div>
  );
}
