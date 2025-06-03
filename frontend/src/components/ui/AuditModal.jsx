import React from 'react';

export default function AuditModal({ audit, onClose }) {
  if (!audit) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-3xl p-6 relative">
        <h2 className="text-2xl font-bold text-zinc-700 mb-4">
          Audit: {audit.registration_number}
        </h2>
        <div className="max-h-[60vh] overflow-y-auto text-sm text-zinc-700 whitespace-pre-wrap">
          {JSON.stringify(audit, null, 2)}
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-700 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}
