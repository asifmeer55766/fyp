import React, { useState, useEffect } from "react";
import "./profile.scss";
import { FaChalkboard, FaCodepen, FaCertificate } from "react-icons/fa";
import {
  IoPerson,
  IoPeopleSharp,
  IoRocket,
  IoLaptopOutline,
  IoCube,
} from "react-icons/io5";

export default function UserProfile() {
  let date = new Date();
  const updatedDate = date.toLocaleString();
  const [projects, setProjects] = useState([]);
  const [loggedInUser, setloggedInUser] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [projectsRes, loggedInRes] = await Promise.all([
          fetch("http://localhost:5000/api/projects", { headers }),
          fetch("http://localhost:5000/api/loggedIn-user-details", { headers }),
        ]);

        const [projects, loggedInUser] = await Promise.all([
          projectsRes.json(),

          loggedInRes.json(),
        ]);

        setProjects(projects);
        setloggedInUser(loggedInUser);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    fetchAll();
  }, []);
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // 🔹 Count only projects created this month
  const projectsThisMonth = projects.filter((project) => {
    const createdDate = new Date(project.createdAt);
    return (
      createdDate.getMonth() === currentMonth &&
      createdDate.getFullYear() === currentYear
    );
  }).length;

  return (
    <>
      <h1>Profile </h1>
      <div class="profile-container">
        <div class="starting-row">
          <p>
            Welcome <span> {loggedInUser.username} </span>
          </p>

          <p>
            Email: <span>{loggedInUser.email}</span>{" "}
          </p>

          <p>
            You are logged In as :<span> {loggedInUser.role} </span>
          </p>
        </div>
        <div class="second-row">
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>{updatedDate}</p>
              <span className="icons">
                <IoPeopleSharp />
              </span>
              <span className="desc">Last visit</span>
            </div>
          </div>
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>{projects.length}</p>
              <span className="icons">
                <IoLaptopOutline />
              </span>
              <span className="desc">Total Projects Created</span>
            </div>
          </div>
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>{projectsThisMonth}</p>
              <span className="icons">
                <IoLaptopOutline />
              </span>
              <span className="desc">Total Projects Created in this month</span>
            </div>
          </div>
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>00%</p>
              <span className="icons">
                <IoCube />
              </span>
              <span className="desc">AI Processing Failed Ratio </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
