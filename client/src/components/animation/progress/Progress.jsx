import React from "react";
import "./progress.scss";
export default function Progress({ percentage }) {
  return (
    <div className="loader-container">
      <div
        className="loader"
        style={{ "--progress-width": `${percentage}%` }}
      ></div>
      {/* Display the percentage rounded to a whole number */}
      <p>{Math.round(percentage)}%</p>
    </div>
  );
}
