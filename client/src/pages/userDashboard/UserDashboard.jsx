import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false); // ✅ Added for toggle
  const handleNavClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      <section className="dashboard-container">
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖ Close" : "☰ Menu"}
        </button>
        <div className={`left-dashboard-section ${isOpen ? "open" : ""}`}>
          <nav>
            <ul>
              <h3>Welcome {localStorage.getItem("role")}</h3>
              <NavLink
                to="/user-dashboard/user-profile"
                onClick={handleNavClick}
              >
                <span>
                  <CiRead />
                </span>
                Profile
              </NavLink>
              <NavLink
                to="/user-dashboard/user-project-list"
                onClick={handleNavClick}
              >
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
      </section>
    </>
  );
};

export default UserDashboard;
