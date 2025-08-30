import React, { useState, useEffect } from "react";
import "./Home.scss";
import { SiGoogledocs } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import UserInput from "../../components/userInput/UserInput";
import HomeLandingPage from "../homeLandingPage/HomeLandingPage";
const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <>
      <div className="home-container">
        {isLoggedIn ? (
          <div className="user-input-section">
            <UserInput />
          </div>
        ) : (
          <div class="home-landing-page-container">
            <HomeLandingPage />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
