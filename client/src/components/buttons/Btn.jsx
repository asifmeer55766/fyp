import React from "react";
import "./btn.scss";
const Btn = ({ text, icon, background, color }) => {
  return (
    <button
      className="btn-icon"
      style={{ backgroundColor: background, color: color }}
    >
      <span className="btn-icon__icon">{icon}</span>
      {text}
    </button>
  );
};
export default Btn;
