// FinalOutputDocs.jsx
import React from "react";
import "./output.scss";
import { Suspense } from "react";
import { normalizeRequirements } from "../../../utils/normalizeRequirements";
import { useEffect, useState } from "react";

import TreeViewer from "../../components/hld/TreeViewer";
import TreeViewerLLD from "../../components/lld/TreeViewerLLD";
import RenderERD from "../../components/erd/RenderERD";
import APITable from "../../components/apiTable/APITable";

export default function FinalOutputDocs() {
  const [functionalRequirements, setFunctionalRequirements] = useState([]);
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState(
    []
  );
  useEffect(() => {
    fetch("http://localhost:5000/api/latest-response", {
      method: "GET",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        const { functionalRequirements, nonFunctionalRequirements } =
          normalizeRequirements(data);

        // ✅ SET THE STATE HERE
        setFunctionalRequirements(functionalRequirements || []);
        setNonFunctionalRequirements(nonFunctionalRequirements || []);
      })
      .catch((err) => {
        console.error("Error fetching response:", err);
      });
  }, []);
  return (
    <div className="documentation-container">
      <section className="project-overview">
        <h1>System Design Docs</h1>
        <h2>1) Project overview</h2>
        <h3>Project Name: E-commerce Platform</h3>
        <h3>Project Description</h3>
        <p></p>
        <h3>Stakeholders</h3>
        <p></p>
        <h3>Project Use-Case</h3>
        <p></p>
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
          major components, their functions, how they interact with each other,
          and the principles and guidelines that govern the system's design and
          evolution. It's the foundational framework that guides the development
          of the entire project.
        </p>
        <Suspense fallback="wait Loading system architecture.....">
          <TreeViewer />
        </Suspense>
      </section>

      <section className="database-design">
        <h2>5) Database Design </h2>
        <p>
          Database design is the process of structuring and organizing data into
          logical tables, columns, and relationships to ensure efficient
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
        <div className="api-div">
          <p>
            <h3>Key Concepts to Display </h3>
            When defining APIs on the frontend, it's helpful to explain these
            core concepts:
          </p>
          <p>
            <strong> Endpoint:</strong> This is the specific URL or address that
            an application can call to access a resource. For example, /users
            might be an endpoint to get user data.
          </p>
          <p>
            {" "}
            <strong>Method (HTTP Verb):</strong> This specifies the type of
            action you want to perform. The most common methods are:{" "}
          </p>
          <p>
            {" "}
            <strong>GET:</strong> Retrieves data from a server (e.g., getting a
            list of products).
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
            This is the data and instructions sent to the API. It often includes
            parameters, headers, and a body (for POST and PUT requests).{" "}
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
            <strong> Authentication:</strong> APIs often require a way to verify
            the user's identity. This is commonly done using a token (like a
            key) that is included with each request to prove the user has
            permission to access the data.
          </p>
        </div>

        <Suspense fallback="wait Loading API design .....">
          <APITable />
        </Suspense>
      </section>
    </div>
  );
}
