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

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-zinc-600">Loading...</p>
        ) : pendingUsers.length === 0 ? (
          <p className="text-zinc-600">No pending users to review.</p>
        ) : (
          pendingUsers.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center border p-4 rounded-md shadow-sm"
            >
              <span className="text-lg text-zinc-800">{user.email}</span>
              <div className="space-x-2">
                <button
                  onClick={() => approveUser(user._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => denyUser(user._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Deny
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
