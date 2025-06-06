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
    <div className={`flex flex-row space-x-4 py-4 px-6 ${isLast ? '' : 'border-b border-zinc-700/60'} text-zinc-700 font-bold items-center`}>
      <div className="w-1/3 truncate">{id}</div>
      <div className="w-1/3 truncate">{name}</div>
      <div className="w-1/4 truncate">{region}</div>
      <div className="w-1/3 truncate">{priority}</div>
      <div className="w-1/3 truncate">{period}</div>
      <div className="w-1/5"><Status status={status} /></div>
      <div className="w-1/6 flex space-x-6">
        <button onClick={onView} className="text-blue-600 hover:underline">View</button>
        <button onClick={onDelete} className="text-palette-red hover:text-red-800 cursor-pointer">
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
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">View Audit</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">
        Browse, search, and filter all housing audit records in the system.
      </div>

      <div className="py-8">
        <div className="flex flex-col space-y-2 p-6 bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
          <div className="flex flex-row space-x-4">
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-2/5 bg-white items-center px-2">
              <img src="/search.png" alt="Search Icon" className="h-4 w-auto object-contain" />
              <input
                className="py-2 px-2 w-full outline-none"
                placeholder="Search by ID or name"
                value={searchIdOrName}
                onChange={(e) => setSearchIdOrName(e.target.value)}
              />
            </div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-1/5 bg-white items-center px-2">
              <input
                className="py-2 px-2 w-full outline-none"
                placeholder="Cape Town"
                value={searchRegion}
                onChange={(e) => setSearchRegion(e.target.value)}
              />
            </div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 w-2/5 bg-white items-center px-2">
              <input
                className="py-2 px-2 w-full outline-none"
                placeholder="Disabled/Chronic Illness"
                value={searchPriority}
                onChange={(e) => setSearchPriority(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col rounded-lg bg-white border border-solid border-zinc-700/60 mt-4">
            <div className="flex flex-row space-x-4 border-b py-4 px-6 border-zinc-700/60 w-full text-zinc-700/60 font-bold">
              <div className="w-1/3">ID</div>
              <div className="w-1/3">Name</div>
              <div className="w-1/4">Region</div>
              <div className="w-1/3">Priority</div>
              <div className="w-1/3">Waiting Period</div>
              <div className="w-1/5">Status</div>
              <div className="w-1/6">Actions</div>
            </div>
            {filteredAudits.map((audit, index) => {
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
            })}
          </div>

          <AuditModal audit={selectedAudit} onClose={() => setSelectedAudit(null)} />

          {auditToDelete && (
            <DeleteConfirmModal
              onConfirm={deleteAudit}
              onCancel={() => setAuditToDelete(null)}
            />
          )}

          <div className="flex flex-row space-x-4 mt-4">
            <div className="mr-auto text-zinc-700/60 font-bold">
              Showing {filteredAudits.length} out of {audits.length} audits
            </div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-zinc-700/60 bg-white items-center py-2 px-4 font-bold">Previous</div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-black bg-white items-center py-2 px-5 font-bold">1</div>
            <div className="flex flex-row rounded-lg border border-solid border-zinc-700/60 text-zinc-700/60 bg-white items-center py-2 px-4 font-bold">Next</div>
          </div>
        </div>
      </div>
    </div>
  );
}
