import React from "react";

import { PhoneCall } from "lucide-react";

const NightSewaSection = ({ nightSewa }) => {
  const handleCall = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-indigo-400 mb-5">
        Night Sewa Sewadar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {nightSewa.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/10 rounded-3xl p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>

                <p className="text-gray-400 mt-1">{item.sewa}</p>
              </div>

              <button
                onClick={() => handleCall(item.mobile)}
                className="bg-emerald-600 hover:bg-emerald-700 p-3 rounded-xl"
              >
                <PhoneCall size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NightSewaSection;
