import React, { useState } from "react";

export default function SignUpForm({ closeModal, openLoginSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleOpenLogin = (e) => {
    e.preventDefault();
    openLoginSignUp();
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  let hasError = false;
  setEmailError("");
  setPasswordError("");
  setConfirmPasswordError("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    setEmailError("Email is required.");
    hasError = true;
  } 
  else if (!emailRegex.test(email)) {
    setEmailError("Invalid email format.");
    hasError = true;
  } 
  else if (!email.endsWith("@housingassembly.za")) {
    setEmailError("Invalid email format.");
    hasError = true;
  }

  if (!password) {
    setPasswordError("Password is required.");
    hasError = true;
  }

  if (!confirmPassword) {
    setConfirmPasswordError("Please confirm your password.");
    hasError = true;
  } 
  else if (password !== confirmPassword) {
    setConfirmPasswordError("Passwords do not match.");
    hasError = true;
  }

  if (hasError) return;

  const res = await fetch("http://localhost:5001/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Sign up successful!");
    closeModal();
  } else {
    setEmailError(data.error || "Sign up failed.");
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-3xl mt-[110px] flex flex-col py-6 px-6">
        <div className="flex flex-row justify-center items-end ml-24">
          <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto" />
          <div className="px-2 text-4xl font-medium">
            <span className="text-palette-red font-['Chelsea_Market']">H</span><span className="font-['Chelsea_Market']">ouse</span>
            <span className="text-palette-red font-['Chelsea_Market']">A</span><span className="font-['Chelsea_Market']">udit</span>
          </div>
          <div className="flex ml-24 mb-auto">
            <button type="button" onClick={handleClose}>
              <img src="x.png" alt="X" className="object-contain h-6 w-auto" />
            </button>
          </div>
        </div>

        <div className="flex justify-center pb-7 text-xl text-palette-text font-bold">
          Decent Housing For All
        </div>
        <div className="text-center text-3xl mt-4 mb-2 font-bold">CREATE AN ACCOUNT</div>

        <div className="flex flex-col space-y-8 py-4">
          {/* Email */}
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-center border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]">
              <img src="/profile-red.png" alt="Profile Icon" className="ml-4 h-5 w-auto object-contain" />
              <input
                className="px-4 py-2 w-full outline-none rounded-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && (
              <div className="text-sm text-red-600 mt-1 ml-4">{emailError}</div>
            )}
          </div>

          {/* PW field */}
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-center border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]">
              <img src="/lock.png" alt="Lock Icon" className="ml-4 h-5 w-auto object-contain" />
              <input
                className="px-4 py-2 w-full outline-none rounded-full"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <div className="text-sm text-red-600 mt-1 ml-4">{passwordError}</div>
            )}
          </div>

          {/* Confirm PW */}
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-center border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]">
              <img src="/lock.png" alt="Lock Icon" className="ml-4 h-5 w-auto object-contain" />
              <input
                className="px-4 py-2 w-full outline-none rounded-full"
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {confirmPasswordError && (
              <div className="text-sm text-red-600 mt-1 ml-4">{confirmPasswordError}</div>
            )}
          </div>

          <button className="py-2 w-full bg-red-800 text-white text-xl font-bold rounded-full" type="submit">
            SIGN UP
          </button>
        </div>

        <div className="text-center font-bold text-[13px] mt-12">
          ALREADY HAVE AN ACCOUNT?{" "}
          <button className="text-palette-red" onClick={handleOpenLogin}>
            LOGIN
          </button>
        </div>
      </div>
    </form>
  );
}
