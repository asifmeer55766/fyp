// FinalOutputDocs.jsx
import "./output.scss";
import { Suspense } from "react";
import { normalizeRequirements } from "../../../utils/normalizeRequirements";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import TreeViewer from "../../components/hld/TreeViewer";
import TreeViewerLLD from "../../components/lld/TreeViewerLLD";
import RenderERD from "../../components/erd/RenderERD";
import APITable from "../../components/apiTable/APITable";
import RenderSequenceDiagram from "../../components/seqDigram/RenderSequenceDiagram";
// import RenderProjectProposal from "../../components/projectProposal/RenderProjectProposal";
import { formatDescription } from "../../../utils/formatDescription";
import { useParams } from "react-router-dom";
import RenderSystemDesign from "../../components/architectureDiagram/RenderSystemDesign";

export default function FinalOutputDocs() {
  const contentRef = useRef();
  const [loading, setLoading] = useState(false);
  const { id: projectId } = useParams();
  const handleDownloadPDF = async () => {
    setLoading(true); // start loading
    try {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Project.pdf");
    } catch (error) {
      console.error("PDF generation failed", error);
    }
    setLoading(false); // stop loading
  };

  const [functionalRequirements, setFunctionalRequirements] = useState([]);
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState(
    []
  );
  const [proposal, setProposal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/latest-response`, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        const { functionalRequirements, nonFunctionalRequirements } =
          normalizeRequirements(data);

        //         // ✅ SET THE STATE HERE
        setFunctionalRequirements(functionalRequirements || []);
        setNonFunctionalRequirements(nonFunctionalRequirements || []);
      })
      .catch((err) => {
        console.error("Error fetching response:", err);
      });
  }, []);
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

  // Combined useEffect to fetch all data for the specific project
  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     if (!projectId) {
  //       setError("No Project ID found in URL.");
  //       setIsLoading(false);
  //       return;
  //     }

  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       // 1. Fetch Project Requirements
  //       const requirementsResponse = await fetch(
  //         `http://localhost:5000/api/system-docs/${projectId}/latest-response`,
  //         {
  //           method: "GET",
  //           headers: { "Cache-Control": "no-cache" },
  //         }
  //       );
  //       if (!requirementsResponse.ok)
  //         throw new Error("Failed to fetch requirements.");
  //       const requirementsData = await requirementsResponse.json();
  //       const { functionalRequirements, nonFunctionalRequirements } =
  //         normalizeRequirements(requirementsData);
  //       setFunctionalRequirements(functionalRequirements || []);
  //       setNonFunctionalRequirements(nonFunctionalRequirements || []);

  //       // 2. Fetch Project Proposal
  //       const proposalResponse = await fetch(
  //         `http://localhost:5000/api/project/${projectId}/get-project-proposal`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       if (!proposalResponse.ok)
  //         throw new Error("Failed to fetch project proposal.");
  //       const proposalResult = await proposalResponse.json();
  //       setProposal(proposalResult.data);
  //     } catch (e) {
  //       setError(e.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchAllData();
  // }, [projectId]); // Depend on projectId

  if (isLoading) {
    return <div className="loading-message">Loading documentation...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Also handle the case where the data is not found
  if (!proposal) {
    return <div className="empty-message">No project proposal found.</div>;
  }

  // Only call the formatting function and render when `proposal` exists.
  const formattedDescription = formatDescription(proposal.description);

  return (
    <>
      <button
        style={{
          position: "fixed",
          right: "20px",
          top: "150px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onClick={handleDownloadPDF}
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner"
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid #fff",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 1s linear infinite",
              }}
            ></span>
            Generating PDF...
          </>
        ) : (
          "Download Project PDF"
        )}
        <span>
          <FaDownload />
        </span>
      </button>

      <div className="documentation-container" ref={contentRef}>
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

          {/* Stakeholders and Use Cases Section */}
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

        <section className="functional-and-nonfunctional-req">
          <h2>2) Functional and Non-Functional Requirements</h2>

          {/* Functional Requirements Table */}
          <h3>Functional Requirements</h3>
          <table className="requirements-table">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Requirement</th>
                <th>Extra Info (if available)</th>
              </tr>
            </thead>
            <tbody>
              {functionalRequirements.length === 0 ? (
                <tr>
                  <td colSpan="3">No Functional Requirements found.</td>
                </tr>
              ) : (
                functionalRequirements.map((req, i) => {
                  if (req.id && req.text) {
                    return (
                      <tr key={`fr-${i}`}>
                        <td>{req.id}</td>
                        <td>{req.text}</td>
                        <td>{req.extra || "-"}</td>
                      </tr>
                    );
                  } else if (req.title && req.description) {
                    return (
                      <tr key={`fr2-${i}`}>
                        <td>{i + 1}</td>
                        <td>{req.title}</td>
                        <td>{req.description}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={`fr3-${i}`}>
                        <td>{i + 1}</td>
                        <td colSpan="2">
                          {typeof req === "string" ? req : JSON.stringify(req)}
                        </td>
                      </tr>
                    );
                  }
                })
              )}
            </tbody>
          </table>

          {/* Non-Functional Requirements Table */}
          <h3 style={{ marginTop: "30px" }}>Non-Functional Requirements</h3>
          <table className="requirements-table">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Requirement</th>
                <th>Extra Info (if available)</th>
              </tr>
            </thead>
            <tbody>
              {nonFunctionalRequirements.length === 0 ? (
                <tr>
                  <td colSpan="3">No Non-Functional Requirements found.</td>
                </tr>
              ) : (
                nonFunctionalRequirements.map((req, i) => {
                  if (req.id && req.text) {
                    return (
                      <tr key={`nfr-${i}`}>
                        <td>{req.id}</td>
                        <td>{req.text}</td>
                        <td>{req.extra || "-"}</td>
                      </tr>
                    );
                  } else if (req.title && req.description) {
                    return (
                      <tr key={`nfr2-${i}`}>
                        <td>{i + 1}</td>
                        <td>{req.title}</td>
                        <td>{req.description}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={`nfr3-${i}`}>
                        <td>{i + 1}</td>
                        <td colSpan="2">
                          {typeof req === "string" ? req : JSON.stringify(req)}
                        </td>
                      </tr>
                    );
                  }
                })
              )}
            </tbody>
          </table>
        </section>

        <section className="high-level-design">
          <h2>3) High Level Design (HLD)</h2>
          <p>
            The HLD is a blueprint of the entire system. It provides an
            architectural overview without going into implementation details. It
            defines the major components, modules, and their interactions, and
            focuses on the "what" of the system
          </p>
          <Suspense fallback="wait Loading HLD.....">
            <TreeViewer />
          </Suspense>
        </section>

        <section className="low-level-design">
          <h2>3) Low Level Design (LLD)</h2>
          <p>
            The LLD is a detailed plan for each individual component defined in
            the HLD. It focuses on the "how" of the system, specifying the
            internal logic and implementation details
          </p>
          <Suspense fallback="wait Loading LLD.....">
            <TreeViewerLLD />
          </Suspense>
        </section>

        <section className="system-architecture">
          <h2>4) System Architecture </h2>
          <p>
            System architecture is a high-level, comprehensive blueprint that
            describes the overall structure of a software system. It defines the
            major components, their functions, how they interact with each
            other, and the principles and guidelines that govern the system's
            design and evolution. It's the foundational framework that guides
            the development of the entire project.
          </p>
          <Suspense fallback="wait Loading system architecture.....">
            <RenderSystemDesign />
          </Suspense>
        </section>

        <section className="database-design">
          <h2>5) Database Design </h2>
          <p>
            Database design is the process of structuring and organizing data
            into logical tables, columns, and relationships to ensure efficient
            storage, easy retrieval, and consistency. A well-designed database
            makes data management simpler, reduces redundancy, and improves
            application performance.
          </p>

          <Suspense fallback="wait Loading Database design .....">
            <RenderERD />
          </Suspense>
        </section>
        <section className="api-design">
          <h2>6) API Design </h2>
          <p>
            An API, or Application Programming Interface, is a set of rules and
            protocols that allows different software applications to communicate
            and interact with each other. It's like a menu in a restaurant: you
            (the client) look at the menu (the API documentation) to see what
            dishes (functions or data) are available, what ingredients they need
            (required parameters), and what you'll receive in return (the
            response).
          </p>
          <Suspense fallback="wait Loading API design .....">
            <APITable />
          </Suspense>

          <div className="api-div">
            <p>
              <h3>Key Concepts to Display </h3>
              When defining APIs on the frontend, it's helpful to explain these
              core concepts:
            </p>
            <p>
              <strong> Endpoint:</strong> This is the specific URL or address
              that an application can call to access a resource. For example,
              /users might be an endpoint to get user data.
            </p>
            <p>
              {" "}
              <strong>Method (HTTP Verb):</strong> This specifies the type of
              action you want to perform. The most common methods are:{" "}
            </p>
            <p>
              {" "}
              <strong>GET:</strong> Retrieves data from a server (e.g., getting
              a list of products).
            </p>
            <p>
              <strong>POST:</strong> Sends data to a server to create a new
              resource (e.g., creating a new user account).{" "}
            </p>
            <p>
              {" "}
              <strong> PUT/PATCH: </strong> Updates an existing resource (e.g.,
              changing a user's profile information).
            </p>
            <p>
              <strong>DELETE:</strong>
              Removes a resource from the server (e.g., deleting a post).{" "}
            </p>
            <p>
              {" "}
              <strong>Request:</strong>
              This is the data and instructions sent to the API. It often
              includes parameters, headers, and a body (for POST and PUT
              requests).{" "}
            </p>
            <p>
              {" "}
              <strong> Response:</strong>
              This is the data and status code that the API sends back after
              processing a request. It could be a success message, the requested
              data, or an error.{" "}
            </p>
            <p>
              {" "}
              <strong> Authentication:</strong> APIs often require a way to
              verify the user's identity. This is commonly done using a token
              (like a key) that is included with each request to prove the user
              has permission to access the data.
            </p>
          </div>
        </section>
        <section className="sequence-diagram">
          <h2>(7) Sequence Diagram</h2>
          <p>
            A sequence diagram is a type of chart that shows how processes or
            objects interact with each other over time. It's a key tool in
            software development and system design because it visually
            represents the order in which messages or function calls are sent
            between different parts of a system.
          </p>
          <Suspense fallback="loading sequence diagram...">
            <RenderSequenceDiagram />
          </Suspense>
        </section>

        {/* <section>
        <RenderProjectProposal />
      </section> */}

        {/* Tech Stack Section */}
        <section className="techStack">
          <h2>(8) Technology Stack</h2>
          <ul>
            {proposal.techStack.map((tech, index) => (
              <li key={index}>
                <strong> ({index + 1})</strong>
                <span className="tech-name">
                  <i>
                    <strong>{tech.technology}</strong>
                  </i>{" "}
                </span>
                : {tech.reason}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
