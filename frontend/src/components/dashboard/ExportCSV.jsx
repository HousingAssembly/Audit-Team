import { useState } from "react";
import axios from "axios";

export default function ExportCSV() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fileName, setFileName] = useState("");

  const flattenObject = (obj, prefix = "") => {
    const flat = {};
    for (const key in obj) {
      const val = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (val && typeof val === "object" && !Array.isArray(val)) {
        Object.assign(flat, flattenObject(val, newKey));
      } else {
        flat[newKey] = val;
      }
    }
    return flat;
  };

  const downloadCSV = (data, name) => {
    const flattened = data.map((item) => flattenObject(item));
    const headers = Object.keys(flattened[0]);
    const rows = flattened.map((row) =>
      headers.map((key) => JSON.stringify(row[key] ?? "")).join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToCSV = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5001/api/audits", {
        params: { from: startDate, to: endDate },
      });

      const data = response.data;
      if (!data.length) return alert("No data found for selected date range.");

      const safeFileName =
        fileName.trim() || `audit-data-${startDate}-to-${endDate}`;
      downloadCSV(data, safeFileName);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Check your date range and try again.");
    }
  };

  const exportAllToCSV = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/audits");
      const data = response.data;
      if (!data.length) return alert("No audit data found in the database.");
      const safeFileName = fileName.trim() || `audit-data-all`;
      downloadCSV(data, safeFileName);
    } catch (error) {
      console.error("Export all failed:", error);
      alert("Export all failed. Try again.");
    }
  };

  const clearForm = () => {
    setStartDate("");
    setEndDate("");
    setFileName("");
  };

  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Export CSV</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Export housing audit data to a CSV file.
      </div>
      <div className="flex justify-center h-screen">
        <div className="flex flex-col items-center space-y-4 py-12 w-1/2">
          <div className="flex flex-col py-4 bg-white rounded-lg justify-center items-start border border-zinc-700/30 w-full">
            <div className="text-zinc-700 font-bold text-lg px-8">Date Range</div>
            <div className="w-full px-8">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
                    <img src="/calendar.png" alt="Calendar Icon" className="h-6 w-auto object-contain" />
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-zinc-700/60 font-bold border border-zinc-700/30 outline-none rounded-md p-2 pl-10 text-lg my-3 w-full"
                  />
                </div>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
                    <img src="/calendar.png" alt="Calendar Icon" className="h-6 w-auto object-contain" />
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-zinc-700/60 font-bold border border-zinc-700/30 outline-none rounded-md p-2 pl-10 text-lg my-3 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="text-zinc-700 font-bold text-lg px-8">File Name</div>
            <div className="px-8 w-full">
              <input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="text-zinc-700/60 font-bold border border-zinc-700/30 outline-none rounded-md p-2 text-lg my-3 w-full"
                placeholder="Eg: audit-data-from-01-18-09-to-01-25-10"
              />
            </div>

            <div className="w-full px-8 pt-2 flex flex-col gap-3 md:flex-row md:justify-between">
              <button
                onClick={clearForm}
                className="bg-white border border-zinc-700/50 px-8 py-3 text-zinc-700 font-bold rounded-lg"
              >
                Clear
              </button>
              <button
                onClick={exportToCSV}
                className="flex flex-row space-x-4 px-5 py-3 bg-red-800 text-white font-bold rounded-lg"
              >
                <img src="/export-csv.png" alt="Export CSV Icon" className="h-6 w-auto object-contain" />
                <div>Export Data</div>
              </button>
              <button
                onClick={exportAllToCSV}
                className="flex flex-row space-x-4 px-5 py-3 bg-zinc-700 text-white font-bold rounded-lg"
              >
                <img src="/export-csv.png" alt="Export CSV Icon" className="h-6 w-auto object-contain" />
                <div>Export All Data</div>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
