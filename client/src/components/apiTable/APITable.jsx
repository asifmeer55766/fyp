// APITable.jsx
import React, { useState, useEffect } from "react";
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import "./ApiTable.scss";
const APITable = ({ latestApiDesign }) => {
  const [error, setError] = useState(null);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!latestApiDesign) {
    return <div>No API design found.</div>;
  }

  return (
    <div className="table-container">
      <table className="api-table">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Description</th>
            <th>Auth Required</th>
          </tr>
        </thead>
        <tbody>
          {latestApiDesign.apiTable.map((endpoint, index) => (
            <tr key={index}>
              <td className="endpoint">{endpoint.endpoint}</td>
              <td>{endpoint.method}</td>
              <td>{endpoint.description}</td>
              <td>
                {endpoint.authRequired ? (
                  <span className="green">
                    <IoCheckmarkSharp />
                  </span>
                ) : (
                  <span className="red">
                    <IoCloseSharp />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default APITable;
