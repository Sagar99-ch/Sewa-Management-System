import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Moon, Building2, Package, Search } from "lucide-react";

const DashboardCards = ({
  activeSection,
  setActiveSection,
  sewadarData,
  nightSewa,
  gatePasses,
  lostFound,
}) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
      <div
        onClick={() => navigate("/Sewadar")}
        className={`cursor-pointer rounded-3xl p-6 shadow-xl transition-all duration-300 ${
          activeSection === "sewadar"
            ? "bg-indigo-700 scale-105"
            : "bg-gradient-to-br from-indigo-600 to-indigo-800"
        }`}
      >
        <div className="flex items-center justify-between">
          <Users size={40} />
          <span className="text-4xl font-bold">{sewadarData.length}</span>
        </div>

        <h2 className="mt-5 text-xl font-semibold">Total Sewadar</h2>
      </div>

      <div
        onClick={() => setActiveSection("night")}
        className={`cursor-pointer rounded-3xl p-6 shadow-xl transition-all duration-300 ${
          activeSection === "night"
            ? "bg-indigo-700 scale-105"
            : "bg-gradient-to-br from-slate-800 to-black"
        }`}
      >
        <div className="flex items-center justify-between">
          <Moon size={40} />
          <span className="text-4xl font-bold">{nightSewa.length}</span>
        </div>

        <h2 className="mt-5 text-xl font-semibold">Night Sewa</h2>
      </div>

      <div
        onClick={() => setActiveSection("department")}
        className={`cursor-pointer rounded-3xl p-6 shadow-xl transition-all duration-300 ${
          activeSection === "department"
            ? "bg-indigo-700 scale-105"
            : "bg-gradient-to-br from-emerald-600 to-emerald-800"
        }`}
      >
        <div className="flex items-center justify-between">
          <Building2 size={40} />
          <span className="text-4xl font-bold">5</span>
        </div>

        <h2 className="mt-5 text-xl font-semibold">Departments</h2>
      </div>

      <div
        onClick={() => navigate("/gatepass")}
        className={`cursor-pointer rounded-3xl p-6 shadow-xl transition-all duration-300 ${
          activeSection === "gatepass"
            ? "bg-indigo-700 scale-105"
            : "bg-gradient-to-br from-yellow-500 to-orange-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <Package size={40} />
          <span className="text-4xl font-bold">{gatePasses.length}</span>
        </div>

        <h2 className="mt-5 text-xl font-semibold">GatePass</h2>
      </div>

      <div
        onClick={() => setActiveSection("lostfound")}
        className={`cursor-pointer rounded-3xl p-6 shadow-xl transition-all duration-300 ${
          activeSection === "lostfound"
            ? "bg-indigo-700 scale-105"
            : "bg-gradient-to-br from-red-500 to-pink-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <Search size={40} />
          <span className="text-4xl font-bold">{lostFound.length}</span>
        </div>

        <h2 className="mt-5 text-xl font-semibold">Lost & Found</h2>
      </div>
    </div>
  );
};

export default DashboardCards;
