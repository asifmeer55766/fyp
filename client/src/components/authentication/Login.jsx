import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./AuthModel.scss";
import authimg from "../../assets/img/robot.png";
import LoaderVerify from "../loaders/LoaderVerify";
import animation from "../../assets/loginanimation.mp4";
import Btn from "../buttons/Btn";
const LoginForm = ({ toggleForm }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.user.role);
          toast.success("Login successful!");

          setFormData({
            email: "",
            password: "",
          });

          window.location.href = "/";
        } else {
          toast.error(data.error);
        }
      } catch (err) {
        toast.error("Login failed! Check your network connectivity ");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <LoaderVerify
          verify={"Authenticating your credentials, please wait..."}
        />
      ) : (
        <div className="auth">
          <div className="auth-container login-container">
            <div className="auth-img login-img">
              <img src={authimg} alt="" />
            </div>
            <div className="auth-form">
              <h2>Welcome Back</h2>
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email * "
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Password *"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="password"
                />

                <Btn
                  icon={<FiLogIn />}
                  text={"Login"}
                  background={"#5c33ff"}
                  color={"white"}
                  type="submit"
                  className="submit-btn"
                />

                <p>
                  Do not have an account? <Link to="/register">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default LoginForm;
