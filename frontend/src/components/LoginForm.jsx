import React, { useState, useEffect, useRef } from "react";

export default function LoginModal({ onLogin, closeModal, openLoginSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

      const res = await fetch(`/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 403 && data.error === "Account not approved yet.") {
      alert("Your account is pending admin approval.");
    } else if (res.ok) {
      onLogin(data.token, data.user);
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <form
        onSubmit={handleSubmit}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl mt-[-116px] flex flex-col py-6 px-6"
      >
        <div className="flex flex-row justify-center items-end ml-24">
          <div className="ml-[8px] mb-[1px]">
            <img src="logo.png" alt="Logo" className="object-contain h-16 w-auto" />
          </div>
          <div className="px-2 text-4xl font-medium">
            <span className="ml-[-8px] text-palette-red font-['Chelsea_Market']">H</span><span className="font-['Chelsea_Market']">ouse</span>
            <span className="text-palette-red font-['Chelsea_Market']">A</span><span className="font-['Chelsea_Market']">udit</span>
          </div>
          <div className="flex ml-24 mb-auto hover:scale-105">
            <button type="button" onClick={closeModal}>
              <img src="x.png" alt="X" className="object-contain h-6 w-auto" />
            </button>
          </div>
        </div>

        <div className="flex justify-center pb-7 text-xl text-palette-text font-bold">
          Decent Housing For All
        </div>
        <div className="text-center text-3xl mt-4 mb-2 font-bold">LOGIN</div>

        <div className="flex flex-col space-y-8 py-4">
          <div className="flex flex-row space-x-2 items-center border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]">
            <img src="/profile-red.png" alt="Profile Icon" className="ml-4 h-5 w-auto object-contain" />
            <input
              className="px-4 py-2 w-full outline-none rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="flex flex-row space-x-2 items-center border-[1.5px] border-red-800 rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]">
            <img src="/lock.png" alt="Lock Icon" className="ml-4 h-5 w-auto object-contain" />
            <input
              className="px-4 py-2 w-full outline-none rounded-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            className="py-2 w-full bg-red-800 text-white text-xl font-bold rounded-full hover:bg-red-900 "
            type="submit"
          >
            LOGIN
          </button>
        </div>

        <div className="text-center font-bold text-[13px] mt-12">
          DON'T HAVE AN ACCOUNT?{" "}
          <button onClick={openLoginSignUp} type="button" className="text-palette-red">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
}
