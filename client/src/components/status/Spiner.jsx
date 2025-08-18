import React from "react";
import "./spiner.scss";
export default function Spiner({ status }) {
  return (
    <>
      <div className="spiner"></div>
      <p>{status}</p>
    </>
  );
}
