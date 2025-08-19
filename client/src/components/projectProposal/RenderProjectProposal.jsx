// components/renderers/RenderProjectProposal.jsx

import React, { useEffect, useState } from "react";
import "./ProjectProposal.scss"; // Import the new SCSS file

const RenderProjectProposal = () => {
  const [proposal, setProposal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/get-project-proposal"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProposal(result.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProposal();
  }, []);

  if (isLoading) {
    return <div className="loading-message">Loading project proposal...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!proposal) {
    return <div className="empty-message">No project proposal found.</div>;
  }

  return (
    <div className="proposal-container">
      <div className="proposal-header">
        <h1>{proposal.projectName}</h1>
      </div>

      {/* Description Section */}
      <section className="proposal-section">
        <h2>Project Description</h2>
        <div
          className="description-content"
          dangerouslySetInnerHTML={{ __html: proposal.description }}
        />
      </section>

      {/* Tech Stack Section */}
      <section className="proposal-section">
        <h2>Technology Stack</h2>
        <ul>
          {proposal.techStack.map((tech, index) => (
            <li key={index}>
              <span className="tech-name">{tech.technology}</span>:{" "}
              {tech.reason}
            </li>
          ))}
        </ul>
      </section>

      {/* Stakeholders and Use Cases Section */}
      <section className="proposal-section-split">
        <div className="stakeholders-container">
          <h2>Key Stakeholders</h2>
          <ul>
            {proposal.stakeholders.map((stakeholder, index) => (
              <li key={index}>{stakeholder}</li>
            ))}
          </ul>
        </div>
        <div className="use-cases-container">
          <h2>Project Use Cases</h2>
          <ul>
            {proposal.useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default RenderProjectProposal;
