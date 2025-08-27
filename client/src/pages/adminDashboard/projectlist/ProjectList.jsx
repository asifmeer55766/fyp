import React, { useState, useEffect } from "react";
import { IoRocket } from "react-icons/io5";
import "./ProjectsList.scss";

export default function ProjectsList() {
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

  const openProject = (id) => {
    window.location.href = `/projects/${id}`;
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">📂 All Projects</h2>
      {projects.length === 0 ? (
        <p className="no-projects">🚫 No projects found.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project._id}
              className="project-card"
              onClick={() => openProject(project._id)}
            >
              <div className="project-icon">
                <IoRocket size={40} color="#4cafef" />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                {/* <p>{project.description?.slice(0, 50)}...</p> */}
                <span className={`status ${project.status}`}>View</span>
                <span className="status pending">Delete</span>
                <small>
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </small>
                <small>
                  Time: {new Date(project.createdAt).toLocaleTimeString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
