import React, { useState, useEffect } from "react";
import { IoLaptopOutline, IoCube, IoRocket } from "react-icons/io5";
import "./ProjectsList.scss";
import { useNavigate } from "react-router-dom";
export default function UserProjectsList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      }
    };

    fetchProjects();
  }, []);

  const navigate = useNavigate();

  const openProject = (id) => {
    navigate(`/projects/${id}`);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete project");

      // Remove from UI
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting project");
    }
  };
  return (
    <div className="projects-container">
      <h2 className="projects-title">📂 All Projects</h2>
      {projects.length === 0 ? (
        <p className="no-projects">🚫 No projects Created.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-icon">
                <IoRocket size={40} color="#4cafef" />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                {/* <p>{project.description?.slice(0, 50)}...</p> */}
                <span
                  className={`status ${project.status}`}
                  onClick={() => openProject(project._id)}
                >
                  View Project
                </span>
                <span
                  className={`status pending`}
                  onClick={() => handleDelete(project._id)}
                >
                  Delete Project
                </span>
                <small>
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
