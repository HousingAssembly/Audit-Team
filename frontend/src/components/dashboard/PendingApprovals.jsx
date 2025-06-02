import React, { useEffect, useState } from "react";

export default function PendingApprovals() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const Refresh = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5001/api/users/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched pending users:", data);
      setPendingUsers(data);
    } catch (err) {
      console.error("Failed to fetch pending users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Refresh();
  }, []);

  const approveUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5001/api/users/approve/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });

      if (res.ok) {
        Refresh();
      } else {
        console.error("Approve failed with status", res.status);
      }
    } catch (err) {
      console.error("Failed to approve user:", err);
    }
  };

  const denyUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5001/api/users/deny/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });

      if (res.ok) {
        Refresh();
      } else {
        console.error("Deny failed with status", res.status);
      }
    } catch (err) {
      console.error("Failed to deny user:", err);
    }
  };

  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Pending Approvals</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Review and approve new admin account requests.
      </div>
      <div className="mt-6 flex w-full justify-center">
        <div className="space-y-4 w-1/2">
          <div>
            <div className="px-6 py-8 flex flex-col">
              <div className="py-8">
                <div className="flex flex-col space-y-2 p-6 bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex flex-row space-x-4">
                    <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-full bg-white items-center px-2">
                      <img src="/search.png" alt="Search Icon" className="h-4 w-auto object-contain"/>
                      <input className="py-2 px-2 w-full outline-none" placeholder="Search by email"/>
                    </div>
                  </div>
                  {loading ? (
                    <p className="text-zinc-700/75 font-bold">Loading...</p>
                  ) : pendingUsers.length === 0 ? (
                    <p className="text-zinc-700/75 font-bold">No pending users to review.</p>
                  ) : (
                    pendingUsers.map((user, index) => (
                      <div key={user._id} className={`flex flex-col rounded-lg bg-white ${index !== pendingUsers.length - 1 ? 'mb-4' : ''}`}>
                        <div className="flex justify-between items-center border p-4 w-full rounded-md shadow-sm">
                          <span className="text-lg text-zinc-800 w-3/5 overflow-hidden truncate">{user.email}</span>
                          <div className="space-x-2 ml-auto">
                            <button
                              onClick={() => approveUser(user._id)}
                              className="text-lime-900 px-4 py-1 bg-green-200 rounded-full"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => denyUser(user._id)}
                              className="text-red-900 px-4 py-1 bg-red-200 rounded-full"
                            >
                              Deny
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div className="flex flex-row space-x-4">
                    <div className="mr-auto text-zinc-700/60 font-bold">Showing {pendingUsers.length} out of {pendingUsers.length} audits</div>
                    <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-zinc-700/60 bg-white items-center py-2 px-4 font-bold">Previous</div>
                    <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-black bg-white items-center py-2 px-5 font-bold">1</div>
                    <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-zinc-700/60 bg-white items-center py-2 px-4 font-bold">Next</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
