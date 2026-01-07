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
  const projecId = localStorage.getItem("projectId");
  const navigateDocs = () => {
    navigate(`/projects/${projecId}`, { replace: true });
    replace: true;
  };

  const tasks = useSelector((state) => state.tasks);

  const totalTasks = Object.keys(tasks).length;

  const completedTasks = Object.values(tasks).filter(
    (isCompleted) => isCompleted
  ).length;

  const progressPercentage = (completedTasks / totalTasks) * 100;

  let progressMessage = "Please wait, we're working on it...";
  if (!tasks.hld) {
    progressMessage = "Working on Heigh Level Design...";
  } else if (!tasks.lld) {
    progressMessage = "Working on Low Level Design...";
  } else if (!tasks.diagrams) {
    progressMessage = "Generating Diagrams...";
  } else if (!tasks.systemArchitecture) {
    progressMessage = "Building System Architecture...";
  } else if (!tasks.apis) {
    progressMessage = "Preparing API & Sequence Diagrams...";
  } else if (!tasks.documentation) {
    progressMessage = "Writing Documentation...";
  } else {
    progressMessage = "All tasks completed! Your documentation is ready.";
  }

  const allTasksCompleted = progressPercentage === 100;
  return (
    <>
      <div className="status-container">
        <div className="status-section">
          <div className="status-box">
            <div className={`success-icon ${tasks.hld ? "completed" : ""}`}>
              <img src={success} alt="success" />
              <span>High level design</span>
            </div>
            <div className={`success-icon ${tasks.lld ? "completed" : ""}`}>
              <img src={success} alt="success" />
              <span>Low leve design</span>
            </div>

            <div
              className={`success-icon ${
                tasks.systemArchitecture ? "completed" : ""
              }`}
            >
              <img src={success} alt="success" />
              <span>System Architecture</span>
            </div>
            <div
              className={`success-icon ${tasks.diagrams ? "completed" : ""}`}
            >
              <img src={success} alt="success" />
              <span>DB Diagrams</span>
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
            <Progress percentage={progressPercentage} />
          </div>

          <div className="action-progress">
            {allTasksCompleted ? (
              ""
            ) : (
              <>
                <h2 style={{ margin: "10px auto" }}>
                  Please do not leave or refresh this page
                </h2>
                <Spiner status={progressMessage} />
              </>
            )}
          </div>
          <div className="button-box">
            <button
              onClick={navigateDocs}
              className={!allTasksCompleted ? "disabled-btn" : ""}
              disabled={!allTasksCompleted}
            >
              Save Project and Preview
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
