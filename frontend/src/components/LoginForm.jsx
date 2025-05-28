import React, { useState } from "react";

function LoginForm({ onLogin, closeModal, openLoginSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 403 && data.error === "Account not approved yet.") {
      alert("Your account is pending admin approval.");
    } else if (res.ok) {
      onLogin(data.token, data.user); // Pass both token and user
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleOpenSignUp = (e) => {
    e.preventDefault();
    openLoginSignUp();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-3xl mt-12 flex flex-col py-6 px-6">
        <div className="flex flex-row justify-center items-end ml-24">
          <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto" />
          <div className="px-2 text-4xl font-medium">
            <span className="text-palette-red">H</span>ouse <span className="text-palette-red">A</span>udit
          </div>
          <div className="flex ml-24 mb-auto">
            <button onClick={handleClose}>
              <img src="x.png" alt="X" className="object-contain h-6 w-auto" />
            </button>
          </div>
        </div>
        <div className="flex justify-center py-4 text-xl text-palette-text font-medium">
          Decent Housing For All
        </div>
        <div className="text-center text-3xl mt-4 mb-2 font-medium">LOGIN</div>

        <div className="flex flex-col space-y-8 py-4">
          <div className="flex flex-row space-x-2 items-center border border-red-800 rounded-full shadow">
            <img src="/profile-red.png" alt="Profile Icon" className="ml-4 h-5 w-auto object-contain" />
            <input
              className="px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="flex flex-row space-x-2 items-center border border-red-800 rounded-full shadow">
            <img src="/lock.png" alt="Lock Icon" className="ml-4 h-5 w-auto object-contain" />
            <input
              className="px-4 py-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button
            className="py-2 w-full bg-red-800 text-white text-2xl font-medium rounded-full"
            type="submit"
          >
            Login
          </button>
        </div>

        <div className="text-center font-medium text-sm mt-12">
          DON'T HAVE AN ACCOUNT?{" "}
          <button onClick={handleOpenSignUp} className="text-palette-red">
            SIGN UP
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
