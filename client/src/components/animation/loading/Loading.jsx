import React from "react";
import "./Loading.scss";
function Loading({ status }) {
  return (
    <>
      <div class="loading-container">
        <div className="loader"></div>
        <p>{status}</p>
        <p>Once complete you will be redirect</p>
      </div>
    </>
  );
}

export default Loading;
