import React from "react";

const SamitiSection = () => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-indigo-400 mb-5">
        Sewa Samiti Members
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white/10 rounded-3xl p-5">
          <h3 className="text-xl font-semibold">Mahesh Kumar</h3>

          <p className="text-gray-400 mt-2">Head Coordinator</p>
        </div>

        <div className="bg-white/10 rounded-3xl p-5">
          <h3 className="text-xl font-semibold">Rajveer Singh</h3>

          <p className="text-gray-400 mt-2">Event Manager</p>
        </div>

        <div className="bg-white/10 rounded-3xl p-5">
          <h3 className="text-xl font-semibold">Suresh Sharma</h3>

          <p className="text-gray-400 mt-2">Sewa Incharge</p>
        </div>
      </div>
    </div>
  );
};

export default SamitiSection;
