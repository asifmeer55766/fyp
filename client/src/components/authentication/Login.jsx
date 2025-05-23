import React from "react";
import { Link } from "react-router-dom";
import './AuthModel.scss'
import authimg from "../../assets/authimg.jpg"
const LoginForm = ({ toggleForm }) => {
    return (
        <>
            <div className="auth">

                <div className="auth-container">
                    <div className="auth-img">
                        <img src={authimg} alt="" />
                    </div>
                    <div className="auth-form">
                        <h2>Welcome Back</h2>
                        <input type="email" placeholder="Email * " />
                        <input type="password" placeholder="Password *" />
                        <button className="submit-btn">Login</button>
                        <p>
                            Do not have an account? <Link to="/register">Sign Up</Link>
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default LoginForm;
