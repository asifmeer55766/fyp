import React from "react";
import "./ProjectProposal.scss";
import { formatDescription } from "../../../utils/formatDescription";
const RenderProjectProposal = ({ proposal }) => {
  console.log("project proposal is :", proposal);
  if (!proposal) {
    return <div className="empty-message">No project proposal found.</div>;
  }

  const formattedDescription = formatDescription(proposal.description);

  return (
    <>
      <section className="project-overview">
        <h2>(1) Project overview</h2>
        <section className="proposal-section">
          <h2>
            Project Name: <span>{proposal.projectName}</span>
          </h2>
          <h2>Project Description</h2>
          <div
            className="description-content"
            dangerouslySetInnerHTML={{ __html: formattedDescription }}
          />
        </section>

        <section className="proposal-section-split">
          <div className="stakeholders-container">
            <h2>Stakeholders</h2>
            <ul>
              {proposal.stakeholders.map((stakeholder, index) => (
                <li key={index}>
                  <strong>{index + 1} ➡ </strong>
                  {stakeholder}
                </li>
              ))}
            </ul>
          </div>
          <div className="use-cases-container">
            <h2>Project Use Cases</h2>
            <ul>
              {proposal.useCases.map((useCase, index) => (
                <li key={index}>
                  <strong>{index + 1} ➡</strong> {useCase}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </>
  );
};

export default RenderProjectProposal;
