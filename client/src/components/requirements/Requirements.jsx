import React from "react";

export default function Requirements({
  functionalRequirements,
  nonFunctionalRequirements,
}) {
  return (
    <>
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
    </>
  );
}
