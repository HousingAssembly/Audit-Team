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
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{project.name}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{project.area}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{project.year}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{project.municipality}</div>
      <div className="w-1/6 whitespace-nowrap overflow-hidden truncate">{project.status}</div>
      <div className="w-1/6 relative flex justify-center items-center" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-zinc-300 flex items-center justify-center text-black font-bold mr-auto"
        >
          ⋮
        </button>
        {open && (
          <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-50 w-32">
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                onEdit(project);
              }}
            >
              Edit
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-red-700 hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                onDelete(project._id);
              }}
            >
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
  const [formData, setFormData] = useState({ name: '', area: '', year: '', municipality: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // States for search inputs
  const [searchName, setSearchName] = useState('');
  const [searchArea, setSearchArea] = useState('');
  const [searchMunicipality, setSearchMunicipality] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    try {
      await axios.post('/api/projects', formData);
      setFormData({ name: '', area: '', year: '', municipality: '', status: '' });
      fetchProjects();
    } catch (err) {
      console.error('Failed to add project:', err);
    }
  };

  const handleUpdateProject = async () => {
    try {
      await axios.put(`/api/projects/${editingId}`, formData);
      setFormData({ name: '', area: '', year: '', municipality: '', status: '' });
      setEditingId(null);
      setIsEditing(false);
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
    setFormData({
      name: project.name,
      area: project.area,
      year: project.year,
      municipality: project.municipality,
      status: project.status,
    });
    setEditingId(project._id);
    setIsEditing(true);
  };

  // ✅ Filter projects based on search fields
  const filteredProjects = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(searchName.toLowerCase()) &&
      project.area.toLowerCase().includes(searchArea.toLowerCase()) &&
      project.municipality.toLowerCase().includes(searchMunicipality.toLowerCase())
    );
  });

  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="text-4xl text-zinc-700 font-bold py-2">Housing Projects</div>
      <div className="text-zinc-700/80 text-2xl font-bold py-2">Add, remove, or edit housing project details.</div>

      <div className="py-8">
        <div className="flex flex-col space-y-2 p-6 bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
          {/* Search input section */}
          <div className="flex flex-row space-x-4">
            <input
              className="py-2 px-2 w-2/5 border rounded outline-none"
              placeholder="Search by project name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              className="py-2 px-2 w-1/5 border rounded outline-none"
              placeholder="Area"
              value={searchArea}
              onChange={(e) => setSearchArea(e.target.value)}
            />
            <input
              className="py-2 px-2 w-2/5 border rounded outline-none"
              placeholder="Municipality"
              value={searchMunicipality}
              onChange={(e) => setSearchMunicipality(e.target.value)}
            />
          </div>

          {/* Table header */}
          <div className="flex flex-col rounded-lg bg-white border border-solid border-zinc-700/60">
            <div className="flex flex-row space-x-4 border-b py-4 px-6 border-zinc-700/60 w-full text-zinc-700/60 font-bold">
              <div className="w-1/6">Project Name</div>
              <div className="w-1/6">Area</div>
              <div className="w-1/6">Cutoff Year</div>
              <div className="w-1/6">Municipality</div>
              <div className="w-1/6">Status</div>
              <div className="w-1/6">Actions</div>
            </div>

            {/* Project rows */}
            {filteredProjects.map((p, idx) => (
              <Users
                key={p._id}
                project={p}
                isLast={idx === filteredProjects.length - 1}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>

          {/* Pagination + count */}
          <div className="flex flex-row space-x-4">
            <div className="mr-auto text-zinc-700/60 font-bold">Showing {filteredProjects.length} housing projects</div>
            <div className="flex flex-row border px-4 py-2 rounded text-zinc-700/60">Previous</div>
            <div className="flex flex-row border px-5 py-2 rounded text-black">1</div>
            <div className="flex flex-row border px-4 py-2 rounded text-zinc-700/60">Next</div>
          </div>
        </div>
      </div>

      {/* Project input form */}
      <div className="flex justify-center mt-8">
        <div className="flex flex-col items-center space-y-4 w-1/2">
          <div className="flex flex-col py-4 bg-white rounded-lg border w-full items-end">
            <div className="mr-auto px-8 py-4 text-zinc-700 font-bold text-4xl">{isEditing ? 'Edit Project' : 'Add New Housing Project'}</div>
            <div className="mr-auto px-8 text-zinc-700/75 font-bold text-xl">
              {isEditing ? 'Modify the fields and save changes.' : 'Enter the details for the new housing project.'}
            </div>

            {/* Dynamic input fields */}
            {["name", "area", "year", "municipality", "status"].map((field) => (
              <div key={field} className="flex flex-row p-4 w-full items-center">
                <div className="text-zinc-700 font-bold px-4 text-lg w-1/3">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </div>
                <input
                  className="text-zinc-700/75 border border-zinc-700/50 outline-none rounded-md px-2 py-1 w-2/3"
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>

          {/* Form buttons */}
          <div className="flex justify-between w-full">
            <button
              className="bg-white border border-zinc-700/50 px-8 py-3 text-zinc-700 font-bold rounded-lg"
              onClick={() => {
                setFormData({ name: '', area: '', year: '', municipality: '', status: '' });
                setIsEditing(false);
                setEditingId(null);
              }}
            >
              Clear
            </button>
            <button
              className="px-5 py-3 text-white font-bold rounded-lg bg-red-800"
              onClick={isEditing ? handleUpdateProject : handleAddProject}
            >
              {isEditing ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
