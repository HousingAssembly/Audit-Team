import { useState, useEffect, useRef } from 'react';
import AuditModal from './ui/AuditModal';

export default function ViewAuditGuest({ closeModal }) {
  const [idNumber, setIdNumber] = useState('');
  const [surname, setSurname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dob, setDob] = useState('');
  const [auditData, setAuditData] = useState(null);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const modalRef = useRef();

  const normalizeInput = (input) => input.trim().toLowerCase();
  const normalizeString = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await fetch(`${import.meta.env.BASE_URL}/api/audits/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_number: normalizeInput(idNumber),
          surname: normalizeString(surname),
          first_name: normalizeString(firstName),
          date_of_birth: normalizeInput(dob),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setAuditData(data);
        setShowAuditModal(true);
      } else {
        alert(data.message || 'Audit not found.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Something went wrong.');
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) closeModal();
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  const renderInputField = (label, value, setValue, placeholder) => (
    <div className="flex flex-col space-y-1 py-3 w-full">
      <label className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">{label}</label>
      <div className="flex border-[1.5px] border-red-800 rounded-full shadow-md sm:h-[40px] h-[35px] w-full">
        <input
          className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );

  const handleDobChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 

    if (value.length > 4) value = value.slice(0, 4) + '/' + value.slice(4); 
    if (value.length > 7) value = value.slice(0, 7) + '/' + value.slice(7);

    setDob(value);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-auto"
        onClick={handleOutsideClick}
      >
        <form
          onSubmit={handleSubmit}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl flex flex-col items-center py-4 px-7 mt-10 overflow-y-auto w-[450px] sm:w-[650px] relative"
        >
          <button type="button" onClick={closeModal} className="absolute top-4 right-4 hover:scale-105">
            <img src="x.png" alt="Close" className="object-contain h-5 sm:h-6 w-auto" />
          </button>

          <div className="flex flex-row justify-center items-end mt-1">
            <img src="logo.png" alt="Logo" className="object-contain h-10 sm:h-16 w-auto" />
            <div className="px-2 text-[25px] sm:text-4xl font-medium">
              <span className="ml-[-8px] text-palette-red font-['Chelsea_Market']">H</span>
              <span className="font-['Chelsea_Market']">ouse</span>
              <span className="text-palette-red font-['Chelsea_Market']">A</span>
              <span className="font-['Chelsea_Market']">udit</span>
            </div>
          </div>

          <p className="text-center text-[15px] sm:text-xl text-palette-text font-bold mt-1 mb-4">
            Decent Housing For All
          </p>

          <h2 className="text-center text-[18px] sm:text-[25px] mb-4 font-bold">ENTER PERSONAL INFORMATION</h2>

          {renderInputField('ID Number', idNumber, setIdNumber, 'Enter ID Number')}
          {renderInputField('Surname', surname, setSurname, 'Enter Surname')}
          {renderInputField('First Name', firstName, setFirstName, 'Enter First Name')}

          <div className="w-full py-3 mb-4">
            <label className="px-5 text-zinc-700 font-bold text-[15px] sm:text-[17px]">Date of Birth</label>
            <div className="flex border-[1.5px] border-red-800 rounded-full shadow-md sm:h-[40px] h-[35px] w-full">
              <input
                className="px-5 py-2 rounded-full w-full outline-none text-[14px] sm:text-[16px]"
                placeholder="YYYY/MM/DD"
                value={dob}
                onChange={handleDobChange}
                maxLength="10"
              />
            </div>
          </div>

          <button
            type="submit"
            className="py-2 w-full bg-red-800 text-white text-[16px] sm:text-[19px] font-bold rounded-full hover:bg-red-900"
          >
            VIEW AUDIT
          </button>
        </form>
      </div>

      {showAuditModal && auditData && (
        <AuditModal audit={auditData} onClose={() => setShowAuditModal(false)} />
      )}
    </>
  );
}
