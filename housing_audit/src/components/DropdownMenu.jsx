import { useState, useEffect, useRef } from 'react';

export default function DropdownMenu({ label = 'Actions', options = [] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOrKey(e) {
      if (
        (e.type === 'click' && menuRef.current && !menuRef.current.contains(e.target)) ||
        (e.type === 'keydown' && e.key === 'Escape')
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClickOrKey);
    document.addEventListener('keydown', handleClickOrKey);
    return () => {
      document.removeEventListener('click', handleClickOrKey);
      document.removeEventListener('keydown', handleClickOrKey);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 rounded-md bg-palette-red px-4 py-2 text-white transition hover:bg-palette-red/90 focus:outline-none focus:ring-2 focus:ring-palette-red/50"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>

      {open && (
        <ul
          className="absolute left-0 mt-2 w-40 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/10 z-50"
          role="menu"
        >
          {options.map((option, index) => (
            <li key={index}>
              <button
                type="button"
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  option.danger ? 'text-red-600' : 'text-black'
                }`}
                role="menuitem"
                onClick={() => {
                  option.onClick?.();
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
