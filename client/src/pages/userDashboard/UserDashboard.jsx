import React from "react";
import {
  CiDatabase,
  CiSettings,
  CiRead,
  CiViewTable,
  CiUser,
} from "react-icons/ci";
import { NavLink, Outlet } from "react-router-dom";
import "../adminDashboard/dashboard.scss";
const UserDashboard = () => {
  return (
    <>
      <section className="dashboard-container">
        <div className="dashboard">
          <div className="left-dashboard-section">
            <nav>
              <ul>
                <h3>Welcome {localStorage.getItem("role")}</h3>
                <NavLink to="/user-dashboard/user-profile">
                  <span>
                    <CiRead />
                  </span>
                  Profile
                </NavLink>
                <NavLink to="/user-dashboard/user-project-list">
                  <span>
                    <CiViewTable />
                  </span>
                  Project list
                </NavLink>
                {/* <NavLink to="">
                  <span>
                    <CiSettings />
                  </span>
                  Settings
                </NavLink> */}
              </ul>
            </nav>
          </div>
          <div className="right-dashboard-section">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
