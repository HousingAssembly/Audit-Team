import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const Users = ({ project, isLast, onEdit, onDelete }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let statusClass = "bg-gray-200 text-gray-800";
  if (project.status === "Ongoing")
    statusClass = "bg-yellow-200 text-yellow-900";
  else if (project.status === "Completed")
    statusClass = "bg-green-200 text-green-900";
  else if (project.status === "Upcoming")
    statusClass = "bg-blue-200 text-blue-900";

  return (
    <div
      className={`flex flex-row space-x-4 py-4 px-6 ${
        isLast ? "" : "border-b border-zinc-300"
      } text-zinc-700 font-bold items-center`}
    >
      <div className="w-1/3 truncate">{project.name}</div>
      <div className="w-1/3 truncate">{project.area}</div>
      <div className="w-1/3 truncate">{project.municipality}</div>
      <div className="w-1/6 truncate">{project.year}</div>
      <div className="w-1/6 truncate flex justify-center items-center">
        <span className={`${statusClass} font-semibold rounded-full px-4 py-1`}>
          {project.status}
        </span>
      </div>
      <div className="w-1/6 flex justify-center items-center gap-2">
        <button
          onClick={() => onEdit(project)}
          className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition font-semibold"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project._id)}
          className="text-palette-red hover:text-red-900 cursor-pointer p-2 rounded-full transition"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default function HousingProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    year: "",
    municipality: "",
    status: "Upcoming",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef();
  const submitButtonRef = useRef();

  const [searchName, setSearchName] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [searchMunicipality, setSearchMunicipality] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/projects`
      );
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  };

  const handleAddProject = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/projects`,
        formData
      );
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  const handleUpdateProject = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${editingId}`,
        formData
      );
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${deleteId}`
      );
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleAskDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEditProject = (project) => {
    setFormData(project);
    setEditingId(project._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      area: "",
      year: "",
      municipality: "",
      status: "Upcoming",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  useEffect(() => {
    const handleEscOrEnter = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
        resetForm();
      } else if (
        e.key === "Enter" &&
        showModal &&
        modalRef.current &&
        modalRef.current.contains(document.activeElement)
      ) {
        submitButtonRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleEscOrEnter);
    return () => window.removeEventListener("keydown", handleEscOrEnter);
  }, [showModal]);

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchName.toLowerCase()) &&
      p.area.toLowerCase().includes(searchArea.toLowerCase()) &&
      p.municipality.toLowerCase().includes(searchMunicipality.toLowerCase())
  );

  return (
    <div className="px-7 py-7 flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <div className="text-4xl text-zinc-700 font-bold py-2">
            Housing Projects
          </div>
          <div className="text-zinc-700/80 text-xl font-bold py-2">
            Add, remove, or edit housing project details.
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-800 text-white font-bold py-2 px-4 rounded-lg mt-2 md:mt-0"
        >
          Add New Project
        </button>
      </div>

      <div className="py-8">
        <div className="flex flex-col space-y-6 p-6 bg-white rounded-2xl border border-zinc-400">
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex items-center w-full md:w-2/5 border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50">
              <img
                src="/search.png"
                alt="Search Icon"
                className="h-4 w-4 object-contain opacity-60 mr-2"
              />
              <input
                className="w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400 py-1"
                placeholder="Search by project name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full md:w-1/5 border border-zinc-300 rounded-lg px-3 py-1 bg-zinc-50">
              <img
                src="/search.png"
                alt="Search Icon"
                className="h-4 w-4 object-contain opacity-60 mr-2"
              />
              <input
                className="w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400"
                placeholder="Search by region"
                value={searchArea}
                onChange={(e) => setSearchArea(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full md:w-2/5 border border-zinc-300 rounded-lg px-3 py-1 bg-zinc-50">
              <img
                src="/search.png"
                alt="Search Icon"
                className="h-4 w-4 object-contain opacity-60 mr-2"
              />
              <input
                className="w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400"
                placeholder="Search by suburb"
                value={searchMunicipality}
                onChange={(e) => setSearchMunicipality(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-300 bg-white">
            <div className="min-w-full">
              <div className="flex flex-row space-x-4 border-b py-4 px-6 border-zinc-300 w-full text-zinc-600 font-bold bg-zinc-50">
                <div className="w-1/3">Project Name</div>
                <div className="w-1/3">Region</div>
                <div className="w-1/3">Suburb</div>
                <div className="w-1/6">Cutoff Year</div>
                <div className="w-1/6 flex justify-center">Status</div>
                <div className="w-1/6 flex justify-center items-center">
                  Actions
                </div>
              </div>
              {filteredProjects.length === 0 ? (
                <div className="py-8 text-center text-zinc-400 font-semibold">
                  No projects found.
                </div>
              ) : (
                filteredProjects.map((p, i) => (
                  <Users
                    key={p._id}
                    project={p}
                    isLast={i === filteredProjects.length - 1}
                    onEdit={handleEditProject}
                    onDelete={() => handleAskDelete(p._id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg
                className="w-10 h-10 text-red-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-800 mb-2 text-center">
              Delete Project?
            </h2>
            <p className="text-zinc-600 mb-6 text-center">
              Are you sure you want to delete this project?
              <br />
              <span className="text-red-700 font-semibold">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-end gap-3 w-full">
              <button
                className="bg-white border border-zinc-400 hover:bg-zinc-100 transition text-zinc-700 px-4 py-2 rounded-lg font-medium"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-800 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-900 transition shadow"
                onClick={handleDeleteProject}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-800">
                {isEditing ? "Edit Project" : "Add New Housing Project"}
              </h2>
              <p className="text-zinc-500 mt-1">
                {isEditing
                  ? "Update the details for this housing project."
                  : "Fill in the details below to add a new housing project."}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                isEditing ? handleUpdateProject() : handleAddProject();
                setShowModal(false);
              }}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-zinc-700 font-medium mb-1"
                >
                  Project Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800 text-zinc-800"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  autoFocus
                />
              </div>
              <div>
                <label
                  htmlFor="area"
                  className="block text-zinc-700 font-medium mb-1"
                >
                  Region
                </label>
                <input
                  id="area"
                  type="text"
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800 text-zinc-800"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="municipality"
                  className="block text-zinc-700 font-medium mb-1"
                >
                  Suburb
                </label>
                <input
                  id="municipality"
                  type="text"
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800 text-zinc-800"
                  value={formData.municipality}
                  onChange={(e) =>
                    setFormData({ ...formData, municipality: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block text-zinc-700 font-medium mb-1"
                >
                  Cutoff Year
                </label>
                <input
                  id="year"
                  type="number"
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800 text-zinc-800"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-zinc-700 font-medium mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-800 text-zinc-800 bg-white appearance-none pr-8 bg-[url('data:image/svg+xml;utf8,<svg fill=\'%236b7280\' height=\'20\' viewBox=\'0 0 20 20\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z\'/></svg>')] bg-no-repeat bg-[right_1rem_center]"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="bg-white border border-zinc-400 hover:bg-zinc-100 transition text-zinc-700 px-4 py-2 rounded-lg font-medium"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  ref={submitButtonRef}
                  type="submit"
                  className="bg-red-800 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-900 transition"
                >
                  {isEditing ? "Save Changes" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
