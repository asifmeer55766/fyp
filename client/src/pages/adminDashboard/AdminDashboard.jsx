import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false); // ✅ Added for toggle
  const handleNavClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      <section className="dashboard-container">
        {/* ✅ Toggle button visible only on small screens */}
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖ Close" : "☰ Menu"}
        </button>

        <div className="dashboard">
          {/* ✅ Added conditional class for open/close */}
          <div className={`left-dashboard-section ${isOpen ? "open" : ""}`}>
            <nav>
              <ul>
                <h3>Welcome {localStorage.getItem("role")}</h3>
                <NavLink to="/admin-dashboard/profile" onClick={handleNavClick}>
                  <span>
                    <CiRead />
                  </span>
                  Profile
                </NavLink>
                <NavLink
                  to="/admin-dashboard/project-list"
                  onClick={handleNavClick}
                >
                  <span>
                    <CiViewTable />
                  </span>
                  Project list
                </NavLink>
                <NavLink
                  to="/admin-dashboard/user-list"
                  onClick={handleNavClick}
                >
                  <span>
                    <CiUser />
                  </span>
                  Registered Users
                </NavLink>
                <NavLink
                  to="/admin-dashboard/settings"
                  onClick={handleNavClick}
                >
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
