import React from "react";

import { Pencil, Trash2, Download, PhoneCall } from "lucide-react";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const GatePassSection = ({ gatePassData }) => {
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(gatePassData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "GatePass");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(fileData, "GatePassData.xlsx");
  };

  const handleCall = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-indigo-400">GatePass Data</h2>

        <button
          onClick={exportExcel}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-xl"
        >
          <Download size={18} />
          Export Excel
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white/10 rounded-3xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4">Sewadar</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Item</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Created By</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {gatePassData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="p-4">{item.sewadar}</td>

                <td className="p-4">{item.mobile}</td>

                <td className="p-4">{item.item}</td>

                <td className="p-4">{item.quantity}</td>

                <td className="p-4">{item.destination}</td>

                <td className="p-4">{item.createdBy}</td>

                <td className="p-4">
                  <div className="flex gap-3">
                    {/* Call */}
                    <button
                      onClick={() => handleCall(item.mobile)}
                      className="bg-emerald-600 p-2 rounded-lg"
                    >
                      <PhoneCall size={18} />
                    </button>

                    {/* Edit */}
                    <button className="bg-blue-600 p-2 rounded-lg">
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}
                    <button className="bg-red-600 p-2 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GatePassSection;
