import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Users = ({ project, isLast, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-row space-x-4 py-4 px-6 ${isLast ? '' : 'border-b border-zinc-700/60'} text-zinc-700 font-bold items-center`}>
      <div className="w-1/6 truncate">{project.name}</div>
      <div className="w-1/6 truncate">{project.area}</div>
      <div className="w-1/6 truncate">{project.year}</div>
      <div className="w-1/6 truncate">{project.municipality}</div>
      <div className="w-1/6 truncate">{project.status}</div>
      <div className="w-1/6 relative flex justify-center items-center" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-zinc-300 flex items-center justify-center text-black font-bold"
        >
          ⋮
        </button>
        {open && (
          <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-50 w-32">
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => { setOpen(false); onEdit(project); }}>
              Edit
            </button>
            <button className="block w-full px-4 py-2 text-left text-red-700 hover:bg-gray-100" onClick={() => { setOpen(false); onDelete(project._id); }}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function HousingProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ name: '', area: '', year: '', municipality: '', status: 'Upcoming' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef();
  const submitButtonRef = useRef();

  const [searchName, setSearchName] = useState('');
  const [searchArea, setSearchArea] = useState('');
  const [searchMunicipality, setSearchMunicipality] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  const handleAddProject = async () => {
    try {
      await axios.post('/api/projects', formData);
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error('Failed to add project:', err);
    }
  };

  const handleUpdateProject = async () => {
    try {
      await axios.put(`/api/projects/${editingId}`, formData);
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error('Failed to update project:', err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleEditProject = (project) => {
    setFormData(project);
    setEditingId(project._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', area: '', year: '', municipality: '', status: 'Upcoming' });
    setIsEditing(false);
    setEditingId(null);
  };

  useEffect(() => {
    const handleEscOrEnter = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false);
        resetForm();
      } else if (e.key === 'Enter' && showModal && modalRef.current && modalRef.current.contains(document.activeElement)) {
        submitButtonRef.current?.click();
      }
    };
    window.addEventListener('keydown', handleEscOrEnter);
    return () => window.removeEventListener('keydown', handleEscOrEnter);
  }, [showModal]);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchName.toLowerCase()) &&
    p.area.toLowerCase().includes(searchArea.toLowerCase()) &&
    p.municipality.toLowerCase().includes(searchMunicipality.toLowerCase())
  );

  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-4xl text-zinc-700 font-bold">Housing Projects</div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-800 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add New Project
        </button>
      </div>
      <div className="text-zinc-700/80 text-lg font-semibold mt-1 mb-4">Add, remove, or edit housing project details.</div>

      <div className="py-6">
        <div className="flex flex-col space-y-2 p-6 bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <div className="flex flex-row space-x-4">
            <input className="py-2 px-2 w-2/5 border rounded outline-none" placeholder="Search by project name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            <input className="py-2 px-2 w-1/5 border rounded outline-none" placeholder="Area" value={searchArea} onChange={(e) => setSearchArea(e.target.value)} />
            <input className="py-2 px-2 w-2/5 border rounded outline-none" placeholder="Municipality" value={searchMunicipality} onChange={(e) => setSearchMunicipality(e.target.value)} />
          </div>

          <div className="flex flex-col rounded-lg bg-white border border-zinc-700/60 mt-4">
            <div className="flex flex-row space-x-4 border-b py-4 px-6 border-zinc-700/60 text-zinc-700/60 font-bold">
              <div className="w-1/6">Project Name</div>
              <div className="w-1/6">Area</div>
              <div className="w-1/6">Cutoff Year</div>
              <div className="w-1/6">Municipality</div>
              <div className="w-1/6">Status</div>
              <div className="w-1/6">Actions</div>
            </div>
            {filteredProjects.map((p, i) => (
              <Users key={p._id} project={p} isLast={i === filteredProjects.length - 1} onEdit={handleEditProject} onDelete={handleDeleteProject} />
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center"
          onClick={(e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
              setShowModal(false);
              resetForm();
            }
          }}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-lg w-[600px] p-6"
          >
            <div className="text-2xl font-bold text-zinc-700 mb-2">
              {isEditing ? "Edit Project" : "Add New Housing Project"}
            </div>
            <div className="text-zinc-600 font-medium mb-4">
              {isEditing
                ? "Modify the fields and save changes."
                : "Enter the details for the new housing project."}
            </div>

            {["name", "area", "year", "municipality"].map((field) => (
              <div key={field} className="flex flex-col mb-3">
                <label className="text-zinc-700 font-semibold capitalize">{field}</label>
                <input
                  className="border border-zinc-400 px-3 py-2 rounded mt-1"
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              </div>
            ))}

            <div className="flex flex-col mb-4">
              <label className="text-zinc-700 font-semibold">Status</label>
              <select
                className="border border-zinc-400 px-3 py-2 rounded mt-1"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button className="bg-gray-200 text-zinc-800 px-4 py-2 rounded" onClick={() => { resetForm(); setShowModal(false); }}>
                Cancel
              </button>
              <button
                ref={submitButtonRef}
                className="bg-red-800 text-white px-4 py-2 rounded font-bold"
                onClick={() => {
                  isEditing ? handleUpdateProject() : handleAddProject();
                  setShowModal(false);
                }}
              >
                {isEditing ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
