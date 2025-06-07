import { useState, useEffect, useRef } from 'react';

export default function ViewAuditGuest({ closeModal, openViewAudit }) {
  const [idNumber, setIdNumber] = useState('');
  const [surname, setSurname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });

  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateOfBirth = `${dob.year}-${dob.month.padStart(2, '0')}-${dob.day.padStart(2, '0')}`;

    try {
      const res = await fetch(`http://localhost:5001/api/audits/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_number: idNumber,
          surname,
          first_name: firstName,
          date_of_birth: dateOfBirth,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        openViewAudit(data);
      } else {
        alert(data.message || "Audit not found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Something went wrong.");
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-auto"
      onClick={handleOutsideClick}
    >
      <form
        onSubmit={handleSubmit}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-3xl flex flex-col items-center py-4 px-7 mt-[40px] sm:mt-[45px] overflow-y-auto w-[450px] sm:w-[650px] relative">
          <div className="flex flex-row justify-center items-end mt-[5px]">
            <div className="mb-[6px] sm:mb-0">
              <img src="logo.png" alt="Logo" className="object-contain h-10 sm:h-16 w-auto" />
            </div>
            <div className="px-2 text-[25px] sm:text-4xl font-medium">
              <span className="ml-[-8px] text-palette-red font-['Chelsea_Market']">H</span><span className="font-['Chelsea_Market']">ouse</span>
              <span className="text-palette-red font-['Chelsea_Market']">A</span><span className="font-['Chelsea_Market']">udit</span>
            </div>
          </div>

          <div className="absolute top-4 right-4 hover:scale-105">
            <button type="button" onClick={closeModal}>
              <img src="x.png" alt="Close" className="object-contain h-5 sm:h-6 w-auto" />
            </button>
          </div>

          <div className="flex justify-center pb-7 text-[15px] sm:text-xl text-palette-text font-bold mt-[-4px] sm:mt-[-2px]">
            Decent Housing For All
          </div>
          <div className="text-center text-[18px] sm:text-[25px] mt-[-3px] mb-[10px] font-bold">ENTER PERSONAL INFORMATION</div>

          {/* ID Number */}
          <div className="flex flex-col space-y-1 py-3 items-left w-full">
            <div className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">ID Number</div>
            <div className="flex flex-row space-x-2 border-[1.5px] border-red-800 rounded-full shadow-md sm:h-[40px] h-[35px] w-full">
              <input
                className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]"
                placeholder="Enter ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Surname */}
          <div className="flex flex-col space-y-1 py-3 items-left w-full">
            <div className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">Surname</div>
            <div className="flex flex-row space-x-2 border-[1.5px] border-red-800 rounded-full shadow-md sm:h-[40px] h-[35px] w-full">
              <input
                className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]"
                placeholder="Enter Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
          </div>

          {/* First Name */}
          <div className="flex flex-col space-y-1 py-3 items-left w-full">
            <div className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">First Name</div>
            <div className="flex flex-row space-x-2 border-[1.5px] border-red-800 rounded-full shadow-md sm:h-[40px] h-[35px] w-full">
              <input
                className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-row w-full">
            <div className="flex flex-col space-y-1 py-3 items-left w-full mb-4">
              <div className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">Date of Birth</div>
              <div className="flex flex-row items-center w-full space-x-2">
                <div className="flex w-1/4 border-[1.5px] border-red-800 rounded-full shadow-md sm:h-[40px] h-[35px]">
                  <input
                    className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]"
                    placeholder="Day"
                    value={dob.day}
                    onChange={(e) => setDob({ ...dob, day: e.target.value })}
                  />
                </div>
                <div className="flex w-2/4 border-[1.5px] border-red-800 rounded-full shadow-md sm:h-[40px] h-[35px]">
                  <input
                    className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]"
                    placeholder="Month"
                    value={dob.month}
                    onChange={(e) => setDob({ ...dob, month: e.target.value })}
                  />
                </div>
                <div className="flex w-1/4 border-[1.5px] border-red-800 rounded-full shadow-md sm:h-[40px] h-[35px]">
                  <input
                    className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]"
                    placeholder="Year"
                    value={dob.year}
                    onChange={(e) => setDob({ ...dob, year: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="py-2 w-full bg-red-800 text-white text-[16px] sm:text-[19px] font-bold rounded-full my-4 h-[35px] sm:h-[40px] hover:bg-red-900 mt-[15px] sm:mt-[20px] mb-[8px] sm:mb-[12px]"
          >
            <div className="mt-[-3px]">
              VIEW AUDIT
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
