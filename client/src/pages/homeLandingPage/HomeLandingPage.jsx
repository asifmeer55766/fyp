import React, { useState } from "react";
import "./style.scss";
import rootImage from "../../assets/img/banner-robot.png";
import Btn from "../../components/buttons/Btn";
import { FiLogIn, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function HomeLandingPage() {
  const icons = [
    {
      name: "play",
      path: "M9.5 7.5a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0v-3zM12 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 12 9zm-7.5-.5h-2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zM9 12a.5.5 0 0 0 .5.5v2a.5.5 0 0 0 1 0v-2A.5.5 0 0 0 9 12zm0-7.5V3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM15 9a6 6 0 1 0-12 0 6 6 0 0 0 12 0zM9 4.5a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-1 0V5A.5.5 0 0 1 9 4.5z",
    },
    {
      name: "bag",
      path: "M10 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V5H10V2.5zM11 6h3v1.5a1.5 1.5 0 0 1-3 0V6zM15.5 8.5a.5.5 0 0 0-.5-.5H13a.5.5 0 0 0-.5.5v1.5H7.5V9a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v1.5H3.5A1.5 1.5 0 0 0 2 11.5v3A1.5 1.5 0 0 0 3.5 16h9A1.5 1.5 0 0 0 14 14.5v-3A1.5 1.5 0 0 0 12.5 10H14a.5.5 0 0 0 .5-.5V8.5z",
    },
    {
      name: "calendar",
      path: "M15 4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4zM2 4h12v1H2V4zm12 2v9H2V6h12zM5 8h1v1H5V8zm4 0h1v1H9V8zm0 4h1v1H9v-1z",
    },
    {
      name: "chip",
      path: "M14 6a1 1 0 0 0-1-1h-2v2h2v1h-2v2h2v1h-2v2h2v1h1a1 1 0 0 0 1-1V6zM3 6a1 1 0 0 0 1 1h2v2H4v1h2v2H4v1H3a1 1 0 0 0-1 1V6zM6 3h2v1H6V3zm4 0h2v1h-2V3zM6 14h2v1H6v-1zm4 0h2v1h-2v-1zM5 2h6a1 1 0 0 1 1 1v1h-2V3h-2v1H5V3a1 1 0 0 1 1-1zM11 16h-6a1 1 0 0 1-1-1v-1h2v1h2v-1h2v1a1 1 0 0 1-1 1z",
    },
    {
      name: "earth",
      path: "M15 8a.5.5 0 0 0-.5-.5H14a.5.5 0 0 0 0 1h.5a.5.5 0 0 0 .5-.5zM15 11.5a.5.5 0 0 0-.5-.5H12a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 .5-.5zM15 5.5a.5.5 0 0 0-.5-.5H12a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 .5-.5zM8 2a.5.5 0 0 0-.5.5v2.5a.5.5 0 0 0 1 0V2.5A.5.5 0 0 0 8 2zM5.5 2a.5.5 0 0 0-.5.5v2.5a.5.5 0 0 0 1 0V2.5a.5.5 0 0 0-.5-.5zM11 2a.5.5 0 0 0-.5.5v2.5a.5.5 0 0 0 1 0V2.5a.5.5 0 0 0-.5-.5zM15 8a7 7 0 1 0-14 0 7 7 0 0 0 14 0zM8 3a.5.5 0 0 0-.5.5V6a.5.5 0 0 0 1 0V3.5A.5.5 0 0 0 8 3z",
    },
    {
      name: "share",
      path: "M14 6a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6zM9 13.5a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3zM15 9a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1zm-5.5 4a.5.5 0 0 0-1 0v.5H7.5a.5.5 0 0 0 0 1H8v.5a.5.5 0 0 0 1 0v-1h.5a.5.5 0 0 0 0-1H9zM11.5 6a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1z",
    },
    {
      name: "cup",
      path: "M15 6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6zM2 6h12v8H2V6zM15 9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9zM2 9h12v4H2V9zM15 12a.5.5 0 0 0-.5-.5H2.5a.5.5 0 0 0 0 1h12a.5.5 0 0 0 .5-.5z",
    },
    {
      name: "image",
      path: "M15 6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6zM2 6h12v8H2V6zM6.5 10a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm-2.5 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm5 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z",
    },
  ];

  const iconPositions = [
    { left: "5%", top: "50%" }, // play
    { left: "10%", top: "30%" }, // bag
    { left: "20%", top: "15%" }, // calendar
    { left: "38%", top: "5%" }, // chip
    { left: "58%", top: "5%" }, // earth
    { left: "78%", top: "13%" }, // share
    { left: "92%", top: "30%" }, // cup
    { left: "95%", top: "50%" }, // image
  ];
  return (
    <>
      <div className="container">
        <div className="background-lines"></div>
        <div className="background-gradient"></div>

        <div className="main-content">
          <div className="icon-arc-container">
            <div className="icon-circle"></div>
            <div className="icon-circle icon-circle-outer"></div>

            {icons.map((icon, index) => (
              <div
                key={index}
                className="icon-item"
                style={{
                  top: iconPositions[index].top,
                  left: iconPositions[index].left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <svg viewBox="0 0 16 16">
                  <path d={icon.path} />
                </svg>
              </div>
            ))}

            <div className="robot-image">
              <img src={rootImage} alt="AI Robot" />
            </div>
          </div>
          <h1 className="heading1">
            Take Your Experience to the Next Level With{" "}
          </h1>
          <h1 className="heading2 animated-text">
            Best AI Powered System Design Generator
          </h1>
          <div className="button-group">
            <Link to="/login">
              <Btn
                text="Login"
                icon={<FiLogIn />}
                background="#2777fc"
                color="white"
              />
            </Link>
            <Link to="/register">
              <Btn
                text="Sign up"
                icon={<FiUser />}
                background="#2777fc"
                color="white"
              />
            </Link>
          </div>
        </div>
        <div className="logo-group">
          <marquee behavior="" direction="left" scrollamount="4">
            <p>
              Generate the best System Design Documentation, diagrams with best
              AI Powered System Design Generator{" "}
            </p>
          </marquee>
          <div class="logo-container">
            <span className="logo-item">System Architecture</span>
            <span className="logo-item">High Level Design</span>
            <span className="logo-item">Low Leve Design</span>
            <span className="logo-item">APIs</span>
            <span className="logo-item">Database Design</span>
            <span className="logo-item">Technology Stack</span>
            <span className="logo-item">Data Flow & Sequence Diagram</span>
            <span className="logo-item">Documentation</span>
          </div>
        </div>
      </div>
    </>
  );
}
