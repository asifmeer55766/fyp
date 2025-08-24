import React from "react";
import {
  CiDatabase,
  CiSettings,
  CiRead,
  CiViewTable,
  CiUser,
} from "react-icons/ci";
import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.scss";
const AdminDashboard = () => {
  return (
    <>
      <section className="dashboard-container">
        <div className="dashboard">
          <div className="left-dashboard-section">
            <nav>
              <ul>
                <h3>Welcome {localStorage.getItem("role")}</h3>
                <NavLink to="/admin-dashboard/profile">
                  <span>
                    <CiRead />
                  </span>
                  Profile
                </NavLink>
                <NavLink to="/admin-dashboard/project-list">
                  <span>
                    <CiViewTable />
                  </span>
                  Project list
                </NavLink>
                <NavLink to="/admin-dashboard/user-list">
                  <span>
                    <CiUser />
                  </span>
                  Registered Users
                </NavLink>
                <NavLink to="/admin-dashboard/settings">
                  <span>
                    <CiSettings />
                  </span>
                  Settings
                </NavLink>
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

export default AdminDashboard;
