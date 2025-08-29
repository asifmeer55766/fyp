import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectOutput() {
  const { id } = useParams(); // projectId from URL
  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const token = localStorage.getItem("token");

        // You can fetch all endpoints in parallel if you want
        const [proposalRes, designRes, responseRes, lldRes, erdRes, apiRes] =
          await Promise.all([
            fetch(`http://localhost:5000/api/projects/${id}/proposal`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`http://localhost:5000/api/projects/${id}/system-design`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`http://localhost:5000/api/projects/${id}/response`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`http://localhost:5000/api/projects/${id}/lld`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`http://localhost:5000/api/projects/${id}/erd`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`http://localhost:5000/api/projects/${id}/api-design`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        const [proposal, design, response, lld, erd, apiDesign] =
          await Promise.all([
            proposalRes.json(),
            designRes.json(),
            responseRes.json(),
            lldRes.json(),
            erdRes.json(),
            apiRes.json(),
          ]);

        setProjectData({
          proposal,
          design,
          response,
          lld,
          erd,
          apiDesign,
        });
      } catch (error) {
        console.error("Failed to load project data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  if (loading) return <p>Loading project data...</p>;

  return (
    <div className="project-output" style={{ color: "white" }}>
      <h2>📌 Project Output (ID: {id})</h2>

      <section>
        <h3>Proposal</h3>
        <pre>{JSON.stringify(projectData.proposal, null, 2)}</pre>
      </section>

      <section>
        <h3>System Design</h3>
        <pre>{JSON.stringify(projectData.design, null, 2)}</pre>
      </section>

      <section>
        <h3>Response</h3>
        <pre>{JSON.stringify(projectData.response, null, 2)}</pre>
      </section>

      <section>
        <h3>LLD</h3>
        <pre>{JSON.stringify(projectData.lld, null, 2)}</pre>
      </section>

      <section>
        <h3>ERD</h3>
        <pre>{JSON.stringify(projectData.erd, null, 2)}</pre>
      </section>

      <section>
        <h3>API Design</h3>
        <pre>{JSON.stringify(projectData.apiDesign, null, 2)}</pre>
      </section>
    </div>
  );
}
