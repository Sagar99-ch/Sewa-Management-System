import React from "react";

import { Shield, Volume2, Tent, Trees, Zap } from "lucide-react";

const DepartmentSection = () => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-indigo-400 mb-5">Departments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <div className="bg-white/10 rounded-3xl p-6 text-center hover:bg-indigo-600 transition">
          <Shield className="mx-auto mb-3" size={35} />
          <h3>Security</h3>
        </div>

        <div className="bg-white/10 rounded-3xl p-6 text-center hover:bg-indigo-600 transition">
          <Volume2 className="mx-auto mb-3" size={35} />
          <h3>Sound</h3>
        </div>

        <div className="bg-white/10 rounded-3xl p-6 text-center hover:bg-indigo-600 transition">
          <Tent className="mx-auto mb-3" size={35} />
          <h3>Pandal</h3>
        </div>

        <div className="bg-white/10 rounded-3xl p-6 text-center hover:bg-indigo-600 transition">
          <Trees className="mx-auto mb-3" size={35} />
          <h3>Horticulture</h3>
        </div>

        <div className="bg-white/10 rounded-3xl p-6 text-center hover:bg-indigo-600 transition">
          <Zap className="mx-auto mb-3" size={35} />
          <h3>Electric</h3>
        </div>
      </div>
    </div>
  );
};

export default DepartmentSection;
