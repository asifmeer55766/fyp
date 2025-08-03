import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import logopng from "../../assets/logopng.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import Button1 from "../buttons/button1";
import Button2 from "../buttons/Button2";

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
        {/* <div className='logo-div'>
                    <img src={logopng} alt="company logo" />
                </div> */}
        <span>Sys Design</span>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`nav-links ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          <NavLink to="/" id={"home"}>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/system-docs">Documentation</NavLink>
          {isLoggedIn ? (
            <>
              {role === "admin" ? (
                <NavLink to="/admin-dashboard">Dashboard</NavLink>
              ) : (
                <NavLink to="/user-dashboard">Dashboard</NavLink>
              )}
              <span className="auth-btn" onClick={handleLogout}>
                <Button1 name="Logout" />
              </span>
            </>
          ) : (
            <>
              <span className="login auth-btn" onClick={NavigateLogin}>
                <Button1 name="Login" />
              </span>
              <span className="auth-btn" onClick={GetStarted}>
                <Button2 name="Get Started" />
              </span>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
