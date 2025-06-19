import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// don't lock it

export default function Account() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEmail(parsedUser.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/update-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setNewPassword("");
        setShowModal(true); // 🎉 Show modal
      } else {
        setError(data.error || "Failed to update password.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // ✅ Redirect to login page (首页)
  };

  return (
    <div className="flex flex-col items-center justify-center bg-palette-dashboard">
      <div className="text-zinc-700 font-bold text-4xl mb-8 mt-[120px] text-center uppercase">
        Account Details
      </div>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-zinc-400 px-8 py-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="text-[18px] block text-zinc-700 font-semibold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                className="w-full border border-zinc-300 rounded-md px-4 py-2 text-[18px] text-zinc-700 bg-zinc-100"
                value={email}
                readOnly
              />
            </div>
            <div>
              <label
                className="text-[18px] block text-zinc-700 font-semibold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border border-zinc-300 rounded-md px-4 py-2 text-[18px] text-zinc-700 focus:ring-2 focus:ring-red-800 outline-none transition"
                placeholder="Enter new password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-700 font-semibold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-2 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition text-base mx-auto"
            >
              <img
                src="/save-changes.png"
                alt="Save Changes Icon"
                className="h-5 w-auto object-contain pr-1"
              />
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 text-center space-y-4 max-w-sm">
            <div className="text-green-700 font-bold text-xl">
              Password Updated Successfully!
            </div>
            <button
              onClick={handleCloseModal}
              className="bg-red-800 text-white px-5 py-2 rounded-md hover:bg-red-900 font-semibold"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
