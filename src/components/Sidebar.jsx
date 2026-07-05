import React, { useState } from "react";

import {
  Home,
  FileText,
  Users,
  ChevronDown,
  Shield,
  Volume2,
  Tent,
  Trees,
  Zap,
  Search,
  Menu,
  Plus,
  List,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [gatePassOpen, setGatePassOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [lostOpen, setLostOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [sewadarOpen, setSewadarOpen] = useState(false);

  const menuClass = () => {
    return `
      flex items-center gap-3 p-3 rounded-xl
      hover:bg-indigo-600
      transition-all duration-300
      cursor-pointer
    `;
  };

  return (
    <div
      className={`bg-slate-950 text-white min-h-screen border-r border-white/10 transition-all duration-300 ${
        open ? "w-72" : "w-24"
      } relative`}
    >
      {/* Top */}
      <div className="p-4">
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between mb-10">
          {open && (
            <h1 className="text-2xl font-bold text-indigo-500">Sewa Panel</h1>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="bg-white/10 p-2 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Home */}
        <div onClick={() => navigate("/home")} className={menuClass()}>
          <Home size={20} />
          {open && <span>Home</span>}
        </div>

        {/* Department */}
        <div className="mt-3">
          <div
            onClick={() => setDepartmentOpen(!departmentOpen)}
            className={`${menuClass()} justify-between`}
          >
            <div
              className="flex items-center gap-3"
              // onClick={() => navigate("/department")}
            >
              <Users size={20} />
              {open && <span>Department</span>}
            </div>

            {open && <ChevronDown size={18} />}
          </div>

          {/* Department Submenu */}
          {departmentOpen && open && (
            <div className="ml-6 mt-3 space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400">
                <Shield size={16} />
                <span>Security</span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400">
                <Volume2 size={16} />
                <span>Sound</span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400">
                <Tent size={16} />
                <span>Pandal</span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400">
                <Trees size={16} />
                <span>Horticulture</span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400">
                <Zap size={16} />
                <span>Electric</span>
              </div>
            </div>
          )}
        </div>
        
        {/* GatePass Dropdown */}
        <div className="mt-3">
          {/* Main */}
          <div
            onClick={() => setGatePassOpen(!gatePassOpen)}
            className={`${menuClass()} justify-between`}
          >
            <div
              className="flex items-center gap-3"
              onClick={() => navigate("/create-gatepass")}
            >
              <FileText size={20} />
              {open && <span>GatePass</span>}
            </div>

            {open && <ChevronDown size={18} />}
          </div>

          {/* Submenu */}
          {gatePassOpen && open && (
            <div className="ml-6 mt-3 space-y-3 text-sm text-gray-300">
              {/* All GatePass */}
              <div
                onClick={() => navigate("/gatepass")}
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-400"
              >
                <span>📋</span>
                <span>All GatePass</span>
              </div>

              {/* Create GatePass */}
              <div
                onClick={() => navigate("/create-gatepass")}
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-400"
              >
                <span>➕</span>
                <span>Create GatePass</span>
              </div>
            </div>
          )}
        </div>

        {/* Sewa Samiti */}
        <div
          // onClick={() => navigate("/samiti")}
          className={`${menuClass()} mt-3`}
        >
          <Users size={20} />
          {open && <span>Sewa Samiti</span>}
        </div>

        {/* Sewadar Dropdown */}
        <div className="mt-3">
          {/* Main */}
          <div
            onClick={() => setSewadarOpen(!sewadarOpen)}
            className={`${menuClass()} justify-between`}
          >
            <div
              className="flex items-center gap-3"
              onClick={() => navigate("/add-sewadar")}
            >
              <Users size={20} />
              {open && <span>Sewadar</span>}
            </div>

            {open && <ChevronDown size={18} />}
          </div>

          {/* Sewadar Submenu */}
          {sewadarOpen && open && (
            <div className="ml-6 mt-3 space-y-3 text-sm text-gray-300">
              {/* Add Sewadar */}
              <div
                onClick={() => navigate("/add-sewadar")}
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-400"
              >
                <Plus size={16} />
                <span>Add Sewadar</span>
              </div>
              {/* All Sewadar */}
              <div
                onClick={() => navigate("/sewadar")}
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-400"
              >
                <List size={16} />
                <span>All Sewadar</span>
              </div>
            </div>
          )}
        </div>

        {/* Lost & Found */}
        {/* Lost & Found Dropdown */}
        <div className="mt-3">
          {/* Main */}
          <div
            onClick={() => setLostOpen(!lostOpen)}
            className={`${menuClass()} justify-between`}
          >
            <div className="flex items-center gap-3">
              <Search size={20} />
              {open && <span>Lost & Found</span>}
            </div>

            {open && <ChevronDown size={18} />}
          </div>

          {/* Submenu */}
          {lostOpen && open && (
            <div className="ml-6 mt-3 space-y-3 text-sm text-gray-300">
              {/* All Entries */}
              <div
                onClick={() => navigate("/lostfound")}
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-400"
              >
                <span>📋</span>
                <span>All Entries</span>
              </div>

              {/* Create Entry */}
              <div
                onClick={() => navigate("/create-lostfound")}
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-400"
              >
                <span>➕</span>
                <span>Create Entry</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Dots */}
      <div className="absolute bottom-5 left-0 w-full px-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>

          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
    </div>
  );
}
