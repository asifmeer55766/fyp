import React from "react";
import "./progress.scss";
export default function Progress({ percentage }) {
  return (
    <div className="loader-container">
      <div
        className="loader"
        style={{ "--progress-width": `${percentage}%` }}
      ></div>
    
      <p>{Math.round(percentage)}%</p>
    </div>
  );
}
