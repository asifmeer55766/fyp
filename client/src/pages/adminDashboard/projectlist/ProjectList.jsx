import React, { useState } from "react";
import { IoLaptopOutline, IoCube, IoRocket } from "react-icons/io5";
import "./ProjectsList.scss";

export default function ProjectsList() {
  // Dummy data (replace with DB/API later)
  const [projects] = useState([
    {
      _id: "1",
      title: "Hospital Management System",
      description: "A system to manage doctors, patients, and appointments.",
      status: "completed",
      createdAt: "2025-07-01",
    },
    {
      _id: "2",
      title: "E-Commerce Platform",
      description: "Online shopping site with cart, payments, and user roles.",
      status: "completed",
      createdAt: "2025-07-10",
    },
    {
      _id: "3",
      title: "AI Chatbot",
      description:
        "Chatbot with natural language understanding for customer support.",
      status: "completed",
      createdAt: "2025-07-15",
    },
  ]);

  const openProject = (id) => {
    alert(`Open project with ID: ${id}`);
    // Later: window.location.href = `/project/${id}`;
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">📂 All Projects</h2>
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
              <p>{project.description?.slice(0, 50)}...</p>
              <span className={`status ${project.status}`}>View </span>
              <span className={`status pending`}>Delete</span>
              <small>
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
