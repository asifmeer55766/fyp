// components/DownloadPdfButton.jsx
import React, { useState } from "react";
import "./button.scss";
const DownloadPdfButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    // Set loading state to true and clear any previous errors
    setIsDownloading(true);
    setError(null);

    try {
      // 1. Call the server-side endpoint using a GET request
      // IMPORTANT: The URL must match the route you've set up in your Express server.
      const response = await fetch("http://localhost:5000/api/generate-pdf", {
        method: "GET",
      });

      // Check if the server responded with an error
      if (!response.ok) {
        throw new Error(`Server responded with a status of ${response.status}`);
      }

      // 2. Get the response as a binary blob (file data)
      const blob = await response.blob();

      // 3. Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // 4. Create a temporary anchor (<a>) element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "system_design_report.pdf"; // Set the desired filename
      document.body.appendChild(a);
      a.click(); // Programmatically click the link to start the download

      // 5. Clean up by revoking the temporary URL and removing the element
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error during PDF download:", err);
      setError("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="download-button-container">
      <button
        onClick={handleDownload}
        className={`download-button ${isDownloading ? "is-downloading" : ""}`}
        disabled={isDownloading}
      >
        {isDownloading ? "Generating PDF..." : "Download PDF Report"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DownloadPdfButton;
