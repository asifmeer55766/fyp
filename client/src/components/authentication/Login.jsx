import React, { useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import './AuthModel.scss'
import authimg from "../../assets/lock.png"
const LoginForm = ({ toggleForm }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields");
        }
        else {

            try {
                const res = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (res.ok) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.user.role);
                    toast.success("Login successful!");

                    // if (data.user.role === "admin") {
                    //     navigate("/admin-dashboard");
                    // } else {
                    //     navigate("/user-dashboard");
                    // }
                    setFormData({
                        email: "",
                        password: ""
                    })
                    // window.location.reload();
                    window.location.href = "/dashboard";
                } else {
                    toast.error(data.error);
                }
            } catch (err) {
                toast.error("Login failed");
            }


        }
    }

    return (
        <>
            <div className="auth">

                <div className="auth-container">
                    <div className="auth-img">
                        <img src={authimg} alt="" />
                    </div>
                    <div className="auth-form">
                        <h2>Welcome Back</h2>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email * " name="email" value={formData.email} onChange={handleChange} />
                            <input type="password" placeholder="Password *" name="password" value={formData.password} onChange={handleChange} />
                            <button className="submit-btn" type="submit">Login</button>
                            <p>
                                Do not have an account? <Link to="/register">Sign Up</Link>
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default LoginForm;
