import React from "react";
import "./btn.scss";
// This is the main component that renders the button.
// It accepts the 'icon' and 'children' as props.
// You can pass any valid React element or component as the icon.
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
