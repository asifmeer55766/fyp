import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
}
