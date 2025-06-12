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
    <div className="px-7 py-7 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Export CSV</div>
      <div className="text-zinc-700/80 text-xl font-bold py-2">
        Export housing audit data to a CSV file.
      </div>
      <div className="flex items-center justify-center bg-palette-dashboard mt-[60px]">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl">
          <div className="flex flex-col bg-white rounded-2xl border border-zinc-400 w-full px-10 py-10">
            <div className="mb-8">
              <div className="text-zinc-700 font-semibold text-lg mb-4">Date Range</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-zinc-600 font-medium mb-2" htmlFor="start-date">Start Date</label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-zinc-300 rounded-md px-4 py-2 text-lg text-zinc-700 focus:ring-2 focus:ring-red-800 outline-none transition w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-zinc-600 font-medium mb-2" htmlFor="end-date">End Date</label>
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-zinc-300 rounded-md px-4 py-2 text-lg text-zinc-700 focus:ring-2 focus:ring-red-800 outline-none transition w-full"
                  />
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label className="text-zinc-700 font-semibold text-lg mb-2 block" htmlFor="file-name">File Name</label>
              <input
                id="file-name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="border border-zinc-300 rounded-md px-4 py-2 text-lg text-zinc-700 font-medium w-full placeholder-zinc-400 placeholder:opacity-60 focus:ring-2 focus:ring-red-800 outline-none transition"
                placeholder="Eg: audit-data-from-01-18-09-to-01-25-10"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <button
                onClick={clearForm}
                className="bg-white border border-zinc-300 px-8 py-3 text-zinc-700 font-bold rounded-lg hover:bg-zinc-50 transition"
              >
                Clear
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition"
              >
                <img src="/export-csv.png" alt="Export CSV Icon" className="h-6 w-auto object-contain" />
                Export Data
              </button>
              <button
                onClick={exportAllToCSV}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-zinc-700 text-white font-bold rounded-lg hover:bg-zinc-800 transition"
              >
                <img src="/export-csv.png" alt="Export CSV Icon" className="h-6 w-auto object-contain" />
                Export All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
