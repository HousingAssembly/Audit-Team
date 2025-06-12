import { useEffect, useState } from "react";

export default function Account() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEmail(parsedUser.email);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-palette-dashboard">
      <div className="text-zinc-700 font-bold text-4xl mb-8 mt-[120px] text-center uppercase tracking-wide">Account Details</div>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-zinc-400 px-8 py-8">
          <form className="space-y-6">
            <div>
              <label className="text-[18px] block text-zinc-700 font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className="w-full border border-zinc-300 rounded-md px-4 py-2 text-[18px] text-zinc-700 focus:ring-2 focus:ring-red-800 outline-none transition"
                value={email}
                readOnly
              />
            </div>
            <div>
              <label className="text-[18px] block text-zinc-700 font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border border-zinc-300 rounded-md px-4 py-2 text-[18px] text-zinc-700 focus:ring-2 focus:ring-red-800 outline-none transition"
                placeholder="***************"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-2 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition text-base mx-auto"
              style={{ minWidth: 0, width: "auto" }}
            >
              <img src="/save-changes.png" alt="Save Changes Icon" className="h-5 w-auto object-contain pr-1" />
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
