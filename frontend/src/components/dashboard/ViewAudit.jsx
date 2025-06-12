import React, { useEffect, useState } from 'react';
import Status from '../ui/status';
import { Trash2 } from 'lucide-react';
import AuditModal from '../ui/AuditModal';

const DeleteConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg text-zinc-700 space-y-4">
      <div className="text-xl font-bold">Confirm Deletion</div>
      <div>Are you sure you want to delete this audit? This action cannot be undone.</div>
      <div className="flex justify-end space-x-4">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-palette-red text-white rounded-lg hover:bg-red-800">Delete</button>
      </div>
    </div>
  </div>
);

const Users = ({ id, name, region, priority, period, status, isLast, onView, onDelete }) => {
  return (
    <div className={`flex flex-row space-x-4 py-6 px-6 ${isLast ? '' : 'border-b border-zinc-300'} text-zinc-700 font-bold items-center`}>
      <div className="w-1/3 truncate">{id}</div>
      <div className="w-1/3 truncate">{name}</div>
      <div className="w-1/4 truncate">{region}</div>
      <div className="w-1/3 truncate">{priority}</div>
      <div className="w-1/3 truncate">{period}</div>
      <div className="w-1/5 "><Status status={status} /></div>
      <div className="w-1/6 flex space-x-6">
        <button onClick={onView} className="text-blue-600 hover:underline">View</button>
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
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Browse, search, and filter all housing audit records in the system.
      </div>

      <div className="py-8">
        <div className="flex flex-col space-y-6 p-6 bg-white rounded-2xl border border-zinc-400">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex items-center w-full md:w-2/5 border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50">
              <img src="/search.png" alt="Search Icon" className="h-4 w-4 object-contain opacity-60 mr-2" />
              <input
                className="w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400"
                placeholder="Search by ID or name"
                value={searchIdOrName}
                onChange={(e) => setSearchIdOrName(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full md:w-1/5 border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50">
              <input
                className="w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400"
                placeholder="Region (e.g. Cape Town)"
                value={searchRegion}
                onChange={(e) => setSearchRegion(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full md:w-2/5 border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50">
              <input
                className="w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400"
                placeholder="Priority (e.g. Disabled/Chronic Illness)"
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
                <div className="w-1/4">Region</div>
                <div className="w-1/3">Priority</div>
                <div className="w-1/3">Waiting Period</div>
                <div className="w-1/5">Status</div>
                <div className="w-1/6">Actions</div>
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
