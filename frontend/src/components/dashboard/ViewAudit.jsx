import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import AuditModal from '../ui/AuditModal';

const DeleteConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative flex flex-col items-center"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <svg className="w-10 h-10 text-red-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-zinc-800 mb-2 text-center">Delete Audit?</h2>
      <p className="text-zinc-600 mb-6 text-center">
        Are you sure you want to delete this audit?
        <br />
        <span className="text-red-700 font-semibold">This action cannot be undone.</span>
      </p>
      <div className="flex justify-end gap-3 w-full">
        <button
          className="bg-white border border-zinc-400 hover:bg-zinc-100 transition text-zinc-700 px-4 py-2 rounded-lg font-medium"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-red-800 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-900 transition shadow"
          onClick={onConfirm}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
);

const Users = ({ id, name, region, priority, period, status, isLast, onView, onDelete }) => {
  return (
    <div className={`flex flex-row space-x-4 py-4 px-6 ${isLast ? '' : 'border-b border-zinc-300'} text-zinc-700 font-bold items-center`}>
      <div className="w-1/3 truncate">{id}</div>
      <div className="w-1/3 truncate">{name}</div>
      <div className="w-1/3 truncate">{region}</div>
      <div className="w-1/3 truncate">{priority}</div>
      <div className="w-1/4 truncate">{period}</div>
      <div className="w-1/6 flex  justify-left">
        {status === 'Active' ? (
          <span className="bg-green-200 text-green-900 font-semibold rounded-full px-4 py-1 hover:bg-green-300 transition">
            Active
          </span>
        ) : (
          <span className="bg-red-200 text-red-900 font-semibold rounded-full px-4 py-1 hover:bg-red-300 transition">
            Inactive
          </span>
        )}
      </div>
      <div className="w-1/6 flex space-x-6">
        <button
        onClick={onView}
        className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition"
      >
        View
      </button>

        <button onClick={onDelete} className="text-palette-red hover:text-red-900 cursor-pointer">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default function ViewAudit() {
  const [audits, setAudits] = useState([]);
  const [searchIdOrName, setSearchIdOrName] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
  const [searchPriority, setSearchPriority] = useState('');
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [auditToDelete, setAuditToDelete] = useState(null);

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5001/api/audits', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAudits(data);
      } catch (err) {
        console.error('Failed to fetch audits:', err);
      }
    };

    fetchAudits();
  }, []);

  const filteredAudits = audits.filter((audit) => {
    const id = audit.registration_number || '';
    const name = `${audit.applicant?.first_name || ''} ${audit.applicant?.surname || ''}`;
    const region = audit.address?.suburb || '';
    const priority = Object.entries(audit.special_circumstances || {})
      .filter(([_, value]) => value === true)
      .map(([key]) => key.replace(/_/g, ' '))
      .join(', ') || 'None';
    return (
      (id + name).toLowerCase().includes(searchIdOrName.toLowerCase()) &&
      region.toLowerCase().includes(searchRegion.toLowerCase()) &&
      priority.toLowerCase().includes(searchPriority.toLowerCase())
    );
  });

  const deleteAudit = async () => {
    if (!auditToDelete?._id) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5001/api/audits/${auditToDelete._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setAudits((prev) => prev.filter((a) => a._id !== auditToDelete._id));
        setAuditToDelete(null);
      } else {
        console.error('Delete failed:', data?.error || 'Unknown error');
        alert('Delete failed: ' + (data?.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Failed to delete audit:', err);
      alert('Network or server error.');
    }
  };

  return (
    <div className="px-7 py-7 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">View Audit</div>
      <div className="text-zinc-700/80 text-xl font-bold py-2">
        Browse, search, and filter all housing audit records in the system.
      </div>

      <div className="py-8">
        <div className="flex flex-col space-y-6 p-6 bg-white rounded-2xl border border-zinc-400">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex items-center w-full md:w-2/5 border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50">
              <img src="/search.png" alt="Search Icon" className="h-4 w-4 object-contain opacity-60 mr-2" />
              <input
                className="w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400 py-1"
                placeholder="Search by ID or name"
                value={searchIdOrName}
                onChange={(e) => setSearchIdOrName(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full md:w-1/5 border border-zinc-300 rounded-lg px-3 py-1 bg-zinc-50 ">
              <img src="/search.png" alt="Search Icon" className="h-4 w-4 object-contain opacity-60 mr-2" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Search by suburb"
                value={searchRegion}
                onChange={(e) => setSearchRegion(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full md:w-2/5 border border-zinc-300 rounded-lg px-3 py-1 bg-zinc-50">
              <img src="/search.png" alt="Search Icon" className="h-4 w-4 object-contain opacity-60 mr-2" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Search by priority"
                value={searchPriority}
                onChange={(e) => setSearchPriority(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-zinc-300 bg-white">
            <div className="min-w-full">
              <div className="flex flex-row space-x-4 border-b py-4 px-6 border-zinc-300 w-full text-zinc-600 font-bold bg-zinc-50">
                <div className="w-1/3">ID</div>
                <div className="w-1/3">Name</div>
                <div className="w-1/3">Suburb</div>
                <div className="w-1/3">Priority</div>
                <div className="w-1/4">Waiting Period</div>
                <div className="w-1/6 flex justify-left">Status</div>
                <div className="w-1/6 flex justify-center items-center">Actions</div>
              </div>
              {filteredAudits.length === 0 ? (
                <div className="py-8 text-center text-zinc-400 font-semibold">No audits found.</div>
              ) : (
                filteredAudits.map((audit, index) => {
                  const id = audit.registration_number || 'N/A';
                  const name = `${audit.applicant?.first_name || ''} ${audit.applicant?.surname || ''}`.trim();
                  const region = audit.address?.suburb || 'N/A';
                  const priority = Object.entries(audit.special_circumstances || {})
                    .filter(([_, value]) => value === true)
                    .map(([key]) => key.replace(/_/g, ' '))
                    .join(', ') || 'None';
                  const period = audit.waiting_period || 'N/A';
                  const status = audit.status || 'Active';

                  return (
                    <Users
                      key={audit._id}
                      id={id}
                      name={name}
                      region={region}
                      priority={priority}
                      period={period}
                      status={status}
                      isLast={index === filteredAudits.length - 1}
                      onView={() => setSelectedAudit(audit)}
                      onDelete={() => setAuditToDelete(audit)}
                    />
                  );
                })
              )}
            </div>
          </div>

          <AuditModal audit={selectedAudit} onClose={() => setSelectedAudit(null)} />

          {auditToDelete && (
            <DeleteConfirmModal
              onConfirm={deleteAudit}
              onCancel={() => setAuditToDelete(null)}
            />
          )}

          {/* Pagination */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 gap-2">
            <div className="text-zinc-600 text-sm font-medium">
              Showing {filteredAudits.length} out of {audits.length} audits
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 transition text-zinc-600 font-semibold">Previous</button>
              <span className="px-4 py-2 rounded-lg border border-zinc-300 bg-zinc-200 text-zinc-800 font-bold">1</span>
              <button className="px-4 py-2 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 transition text-zinc-600 font-semibold">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
