// APITable.jsx
import React, { useState, useEffect } from "react";
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import "./ApiTable.scss";
const APITable = () => {
  // Change state variable name to reflect it's a single object
  const [latestApiDesign, setLatestApiDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestApiDesign = async () => {
      // Renamed function for clarity
      try {
        // Ensure this matches your backend's GET endpoint for the latest design
        const response = await fetch("http://localhost:5000/api/get-apidesign");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // Set the state with the single object
        setLatestApiDesign(result.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestApiDesign();
  }, []);

  if (isLoading) {
    return <div>Loading API design...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if a single latestApiDesign object exists
  if (!latestApiDesign) {
    return <div>No API design found.</div>;
  }

  return (
    <div className="container">
      {/* Directly use the latestApiDesign object */}

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
          {/* Map over the apiTable array inside the single latestApiDesign object */}
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
