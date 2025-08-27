import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import logopng from "../../assets/logo system design.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import Button1 from "../buttons/button1";
import Button2 from "../buttons/Button2";
import Btn from "../buttons/Btn";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(storedRole);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    navigate("/");
  };

  const navigate = useNavigate();
  const NavigateLogin = () => {
    navigate("/login");
  };
  const GetStarted = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav className="navbar">
        <div className="logo-div">
          <img src={logopng} alt="company logo" />
        </div>
        {/* <span>Sys Design</span> */}

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`nav-links ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          {isLoggedIn ? (
            <NavLink to="/" id={"home"}>
              Home
            </NavLink>
          ) : (
            ""
          )}

          <NavLink to="/about"> About Us</NavLink>

          <NavLink to="/features">Features</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/system-docs">Documentation</NavLink>
              <NavLink to="/display-functional-req">Functional req</NavLink>
            </>
          ) : (
            ""
          )}
          {isLoggedIn ? (
            <>
              {role === "admin" ? (
                <NavLink to="/admin-dashboard">Dashboard</NavLink>
              ) : (
                <NavLink to="/user-dashboard">Dashboard</NavLink>
              )}
              <span className="auth-btn" onClick={handleLogout}>
                {/* <Button1 name="Logout" /> */}
                <Btn
                  icon={<FiLogOut />}
                  text={"Logout"}
                  background={"#c83c36"}
                  color={"white"}
                  name="logout"
                />
              </span>
            </>
          ) : (
            <>
              <span className="login auth-btn" onClick={NavigateLogin}>
                {/* <Button1 name="Login" /> */}
                <Btn
                  icon={<FiLogIn />}
                  text={"Login"}
                  background={"#5c33ff"}
                  color={"white"}
                  name="login"
                />
              </span>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
