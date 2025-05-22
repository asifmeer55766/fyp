import React from "react";
import { Link } from "react-router-dom";
import authimg from "../../assets/authimg.jpg"
const RegisterForm = ({ toggleForm }) => {
    return (
        <>
            <div className="auth">

                <div className="auth-container">
                    <div className="auth-form">
                        <h2>Create an Account</h2>
                        <input type="text" placeholder="Username *" />
                        <input type="email" placeholder="Email Address * " />
                        <input type="password" placeholder="Password *" />
                        <input type="password" placeholder="Confirm Password *" />
                        <button className="submit-btn">Sign Up</button>
                        <p>
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                    <div className="auth-img">
                        <img src={authimg} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
