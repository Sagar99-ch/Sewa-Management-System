import React from "react";

const SewadarSection = ({ sewadarData }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-indigo-400 mb-5">Sewadar Data</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sewadarData.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/10 rounded-3xl p-5"
          >
            <h3 className="text-xl font-semibold">{item.name}</h3>

            <p className="text-gray-400 mt-2">{item.mobile}</p>

            <p className="text-indigo-400 mt-2">{item.sewa}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SewadarSection;
