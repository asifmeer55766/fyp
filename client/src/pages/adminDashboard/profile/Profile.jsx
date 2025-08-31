import React, { useEffect, useState } from "react";
import "./profile.scss";
import { FaChalkboard, FaCodepen, FaCertificate } from "react-icons/fa";
import {
  IoPerson,
  IoPeopleSharp,
  IoRocket,
  IoLaptopOutline,
  IoCube,
  IoMail,
  IoFingerPrint,
} from "react-icons/io5";
export default function Profile() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState([]);
  const [loggedInUser, setloggedInUser] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [projectsRes, userRes, loggedInRes] = await Promise.all([
          fetch("http://localhost:5000/api/projects", { headers }),
          fetch("http://localhost:5000/api/user-details", { headers }),
          fetch("http://localhost:5000/api/loggedIn-user-details", { headers }),
        ]);

        const [projects, user, loggedInUser] = await Promise.all([
          projectsRes.json(),
          userRes.json(),
          loggedInRes.json(),
        ]);

        setProjects(projects);
        setUser(user);
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

  const monthlyTrafic = Math.floor((projectsThisMonth / 30) * 100);

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
        <div class="first-row">
          <div class="column-1 columns">
            <div class="inner-box">
              <p>{projects.length}</p>
              <span className="icons">
                <FaChalkboard />
              </span>
              <span className="desc">total projects created</span>
            </div>
          </div>
          <div class="column-2 columns">
            <div class="inner-box">
              <p>{projects.length}</p>
              <span className="icons">
                <FaCertificate />
              </span>
              <span className="desc">successful projects</span>
            </div>
          </div>
          <div class="column-3 columns">
            <div class="inner-box">
              <p>00</p>
              <span className="icons">
                <FaCodepen />
              </span>
              <span className="desc">incomplete projects</span>
            </div>
          </div>
        </div>
        <div class="second-row">
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>{user.length}</p>
              <span className="icons">
                <IoPerson />
              </span>
              <span className="desc">Total Registered User</span>
            </div>
          </div>
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>1</p>
              <span className="icons">
                <IoPeopleSharp />
              </span>
              <span className="desc">Active User</span>
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
              <span className="desc">AI Processing Failed Ratio</span>
            </div>
          </div>
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>
                {monthlyTrafic}% out of {user.length} Registered User
              </p>
              <span className="icons">
                <IoRocket />
              </span>
              <span className="desc">Monthly Trafic</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
