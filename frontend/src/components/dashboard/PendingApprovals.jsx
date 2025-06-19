import React, { useEffect, useState } from "react";

export default function PendingApprovals() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');

  const Refresh = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

const res = await fetch(`/api/users/pending`, {
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

const res = await fetch(`/api/users/approve/${userId}`, {
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

const res = await fetch(`/api/users/deny/${userId}`, {
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
    <div className="px-7 py-7 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Pending Approvals</div>
      <div className="text-zinc-700/80 text-xl font-bold py-2">
        Review and approve new admin account requests.
      </div>
      <div className="flex items-center justify-center min-h-[60vh] bg-palette-dashboard">
  <div className="w-full max-w-xl">
    <div className="bg-white rounded-2xl border border-zinc-400 px-8 py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center w-full border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50">
          <img src="/search.png" alt="Search Icon" className="h-4 w-4 object-contain opacity-60 mr-2"/>
          <input
  className="w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400"
  placeholder="Search by email"
  value={searchEmail}
  onChange={(e) => setSearchEmail(e.target.value)}
/>

        </div>
      </div>
      <div className="space-y-4 mb-6">
        {loading ? (
          <p className="text-zinc-700/75 font-bold text-center">Loading...</p>
        ) : pendingUsers.length === 0 ? (
          <p className="text-zinc-700/75 font-bold text-center">No pending users to review.</p>
        ) : (
pendingUsers
  .filter(user => user.email.toLowerCase().includes(searchEmail.toLowerCase()))
  .map((user) => (
            <div key={user._id} className="flex items-center justify-between border border-zinc-200 rounded-lg px-4 py-3 bg-zinc-50 shadow-sm">
              <span className="text-base text-zinc-800 font-medium truncate">{user.email}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => approveUser(user._id)}
                  className="px-4 py-1 rounded-full bg-green-200 text-green-900 font-semibold hover:bg-green-300 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => denyUser(user._id)}
                  className="px-4 py-1 rounded-full bg-red-200 text-red-900 font-semibold hover:bg-red-300 transition"
                >
                  Deny
                </button>
              </div>
            </div>
          ))
        )}
      </div>
<p className="text-sm text-zinc-600 font-medium text-center">
  Showing {pendingUsers.length} pending admin request{pendingUsers.length !== 1 ? 's' : ''}
</p>
    </div>
  </div>
</div>
    </div>
  );
}
