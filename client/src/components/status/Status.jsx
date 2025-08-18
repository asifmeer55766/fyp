import React from "react";
import { useNavigate } from "react-router-dom";
import "./status.scss";
import { useSelector } from "react-redux";
import { MdOutlineSaveAlt } from "react-icons/md";
import success from "../../assets/success.png";
import Progress from "../animation/progress/Progress";
import Spiner from "./Spiner";
export default function Status() {
  const navigate = useNavigate();
  const navigateDocs = () => {
    navigate("/system-docs");
  };

  const tasks = useSelector((state) => state.tasks);
  console.log("value of tasks is :", tasks.hld);
  return (
    <>
      <div className="status-container">
        <div className="status-section">
          <div className="status-box">
            <div className={`success-icon ${tasks.hld ? "completed" : ""}`}>
              <img src={success} alt="success" />
              <span>HLD</span>
            </div>
            <div className={`success-icon ${tasks.lld ? "completed" : ""}`}>
              <img src={success} alt="success" />
              <span>LLD</span>
            </div>
            <div
              className={`success-icon ${tasks.diagrams ? "completed" : ""}`}
            >
              <img src={success} alt="success" />
              <span>Diagrams</span>
            </div>
            <div
              className={`success-icon ${
                tasks.systemArchitecture ? "completed" : ""
              }`}
            >
              <img src={success} alt="success" />
              <span>System Architecture</span>
            </div>
            <div className={`success-icon ${tasks.apis ? "completed" : ""}`}>
              <img src={success} alt="success" />
              <span>API & Seq Diagram</span>
            </div>
            <div
              className={`success-icon ${
                tasks.documentation ? "completed" : ""
              }`}
            >
              <img src={success} alt="success" />
              <span>Documentation</span>
            </div>
          </div>
          <div className="progress">
            <Progress />
          </div>
          <div className="action-progress">
            <Spiner status="Please wait your we 'r working on it " />
          </div>
          <div className="button-box">
            <button onClick={navigateDocs}>
              Save and Preview <MdOutlineSaveAlt className="icons" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
