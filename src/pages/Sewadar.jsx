// src/pages/Sewadar.jsx
import React, { useState } from "react";
import { useSewa } from "../context/SewaContext";
import { exportToExcel } from "../utils/exportToExcel";
// import { supabase } from "../supabase";
import { supabase } from "../lib/supabase";

import {
  PhoneCall,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Download,
  Eye,
} from "lucide-react";

export default function Sewadar() {
  // Filter State
  const [filterType, setFilterType] = useState("All");
  const [selectedSewadar, setSelectedSewadar] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  // Sewadar Data
  const { sewadars, deleteSewadar, updateSewadar } = useSewa();

  // Filter Data
  const filteredSewadars =
    filterType === "All"
      ? sewadars
      : sewadars.filter((item) => item.sewaType === filterType);

  // Call
  const handleCall = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };
  const handleView = (item) => {
    setSelectedSewadar(item);
    setEditMode(false);
  };

  const handleEdit = (item) => {
    setSelectedSewadar(item);
    setEditMode(true);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("sewadars")
      .update({
        name: selectedSewadar.name,
        mobile: selectedSewadar.mobile,
        department: selectedSewadar.department,
        seva_type: selectedSewadar.sewaType,
        sewa_day: selectedSewadar.sewaDay,
        sewa_time: selectedSewadar.sewaTime,
      })
      .eq("id", selectedSewadar.id);

    if (error) {
      console.log(error);
      alert("Failed to update sewadar");
      return;
    }

    alert("Sewadar Updated Successfully");

    window.location.reload();
  };

  const markPresent = async (mobile) => {
    const index = sewadars.findIndex((item) => item.mobile === mobile);

    if (index === -1) return;

    const person = sewadars[index];

    const now = new Date();
    const today = now.toLocaleDateString();

    const alreadyMarked = (person.attendanceHistory || []).some(
      (record) => record.date === today
    );
    console.log("PERSON:", person);
    console.log("ID:", person.id);
    console.log("CURRENT DAILY:", person.dailyAttendance);

    if (alreadyMarked) {
      setMessage("⚠️ Today's attendance already marked");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      return;
    }

    const attendanceRecord = {
      date: today,
      day: now.toLocaleDateString("en-US", {
        weekday: "long",
      }),
      time: now.toLocaleTimeString(),
    };

    const { data, error } = await supabase
      .from("sewadars")
      .update({
        daily_attendance: (person.dailyAttendance || 0) + 1,
        attendance_history: [
          ...(person.attendanceHistory || []),
          attendanceRecord,
        ],
      })
      .eq("id", person.id)
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    setMessage("✅ Attendance Marked");

    setTimeout(() => {
      setMessage("");
    }, 2000);

    window.location.reload();
  };

  const markAbsent = async (mobile) => {
    const index = sewadars.findIndex((item) => item.mobile === mobile);

    if (index === -1) return;

    const person = sewadars[index];

    const today = new Date().toLocaleDateString();

    const updatedHistory = (person.attendanceHistory || []).filter(
      (record) => record.date !== today
    );

    if (updatedHistory.length === (person.attendanceHistory || []).length) {
      setMessage("⚠️ Today's attendance not found");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      return;
    }

    updateSewadar(index, {
      ...person,

      daily_attendance: Math.max((person.dailyAttendance || 0) - 1, 0),

      attendanceHistory: updatedHistory,
    });

    await supabase
      .from("sewadars")
      .update({
        daily_attendance: Math.max((person.totalAttendance || 0) - 1, 0),
        attendance_history: updatedHistory,
      })
      .eq("mobile", mobile);

    setMessage("❌ Today's attendance removed");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  // Stats
  const totalSewadar = filteredSewadars.length;

  // Export Excel
  const handleExport = () => {
    const formattedData = filteredSewadars.map((item, index) => {
      return {
        ID: `SD-${index + 1}`,
        Name: item.name,
        Mobile: item.mobile,
        Department: item.department,

        DailyAttendance: item.dailyAttendance || 0,

        NightAttendance: item.nightAttendance || 0,
      };
    });

    exportToExcel(formattedData, "Sewadar_Records", "Sewadar");
  };

  // 👇 YAHAN
  const exportAttendanceHistory = (sewadar) => {
    const formattedData = (sewadar.attendanceHistory || []).map((record) => ({
      Name: sewadar.name,
      Date: record.date,
      Day: record.day,
      Time: record.time,
    }));

    exportToExcel(formattedData, `${sewadar.name}_Attendance`, "Attendance");
  };
  return (
    <>
      {message && (
        <div className="fixed top-5 right-5 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          {message}
        </div>
      )}

      <div className="min-h-screen text-white p-6">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-indigo-400">
              Sewadar Records
            </h2>

            <p className="text-gray-400 mt-1">Attendance Tracking</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold">
              Total: {filteredSewadars.length}
            </div>

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
            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Type</th>

                <th className="px-6 py-4 text-center">Daily Attendance</th>

                <th className="px-6 py-4 text-center">Night Attendance</th>

                <th className="px-6 py-4 text-center">Mark</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSewadars.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-300"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>

                        <p className="text-xs text-gray-400 mt-1">
                          {item.mobile}
                        </p>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4">{item.department}</td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg text-xs bg-emerald-600">
                        Daily Sewa
                      </span>
                    </td>

                    {/* Daily Attendance */}
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-emerald-400 text-lg">
                        {item.dailyAttendance || 0}
                      </span>
                    </td>

                    {/* Night Attendance */}
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-indigo-400 text-lg">
                        {item.nightAttendance || 0}
                      </span>
                    </td>

                    {/* Mark */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => markPresent(item.mobile)}
                          className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded-lg"
                        >
                          <CheckCircle size={18} />
                        </button>

                        <button
                          onClick={() => markAbsent(item.mobile)}
                          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleCall(item.mobile)}
                          className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded-lg"
                        >
                          <PhoneCall size={16} />
                        </button>

                        <button
                          onClick={() => handleView(item)}
                          className="bg-sky-600 hover:bg-sky-700 p-2 rounded-lg"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm("Delete this Sewadar?")) {
                              deleteSewadar(item.id);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {selectedSewadar && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-3xl p-6 w-full max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-indigo-400">
                  {editMode ? "Edit Sewadar" : "Sewadar Details"}
                </h2>

                <div className="flex gap-3">
                  <button
                    onClick={() => exportAttendanceHistory(selectedSewadar)}
                    className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl flex items-center gap-2"
                  >
                    <Download size={16} />
                    Export Attendance
                  </button>

                  <button
                    onClick={() => setSelectedSewadar(null)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-indigo-300 mb-2">
                    Sewadar Name
                  </label>
                  <input
                    value={selectedSewadar.name || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      setSelectedSewadar({
                        ...selectedSewadar,
                        name: e.target.value,
                      })
                    }
                    className="bg-slate-800 p-3 rounded-xl w-full"
                  />
                </div>

                <div>
                  <label className="block text-indigo-300 mb-2">
                    Mobile Number
                  </label>
                  <input
                    value={selectedSewadar.mobile || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      setSelectedSewadar({
                        ...selectedSewadar,
                        mobile: e.target.value,
                      })
                    }
                    className="bg-slate-800 p-3 rounded-xl w-full"
                  />
                </div>

                <div>
                  <label className="block text-indigo-300 mb-2">
                    Department
                  </label>
                  <input
                    value={selectedSewadar.department || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      setSelectedSewadar({
                        ...selectedSewadar,
                        department: e.target.value,
                      })
                    }
                    className="bg-slate-800 p-3 rounded-xl w-full"
                  />
                </div>

                <div>
                  <label className="block text-indigo-300 mb-2">
                    Sewa Type
                  </label>
                  <input
                    value={selectedSewadar.sewaType || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      setSelectedSewadar({
                        ...selectedSewadar,
                        sewaType: e.target.value,
                      })
                    }
                    className="bg-slate-800 p-3 rounded-xl w-full"
                  />
                </div>

                <div>
                  <label className="block text-indigo-300 mb-2">
                    Select Day
                  </label>
                  <input
                    value={selectedSewadar.sewaDay || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      setSelectedSewadar({
                        ...selectedSewadar,
                        sewaDay: e.target.value,
                      })
                    }
                    className="bg-slate-800 p-3 rounded-xl w-full"
                  />
                </div>

                <div>
                  <label className="block text-indigo-300 mb-2">
                    Sewa Time
                  </label>
                  <input
                    value={selectedSewadar.sewaTime || ""}
                    readOnly={!editMode}
                    onChange={(e) =>
                      setSelectedSewadar({
                        ...selectedSewadar,
                        sewaTime: e.target.value,
                      })
                    }
                    className="bg-slate-800 p-3 rounded-xl w-full"
                  />
                </div>
                {editMode && (
                  <button
                    onClick={handleSave}
                    className="mt-6 bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-semibold"
                  >
                    Save Changes
                  </button>
                )}

                <div className="md:col-span-2">
                  <label className="block text-indigo-300 mb-3 text-lg font-semibold">
                    Attendance History
                  </label>

                  <div className="bg-slate-800 rounded-xl p-4 max-h-72 overflow-y-auto">
                    {selectedSewadar.attendanceHistory?.length ? (
                      selectedSewadar.attendanceHistory
                        .slice()
                        .reverse()
                        .map((record, index) => (
                          <div
                            key={index}
                            className="border-b border-slate-700 py-3"
                          >
                            <div className="font-medium">{record.date}</div>

                            <div className="text-sm text-indigo-300">
                              {record.day}
                            </div>

                            <div className="text-sm text-emerald-400">
                              {record.time}
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-400">No Attendance History</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
