import React, { useState } from "react";
import { Link } from "react-router-dom";
import authimg from "../../assets/lock.png"
import { toast } from 'react-toastify';

const RegisterForm = ({ toggleForm }) => {


    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleForm = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            toast.error("Please fill all fields");
        }
        else if (formData.password !== formData.confirmPassword) {
            toast.error("Password not match 😬");
            return;
        }
        else if (formData.password.length < 8) {
            toast.error("Password must be greater than 8 characters");
            return;
        }
        else {
            try {
                const res = await fetch("http://localhost:5000/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password
                    })
                });

                const data = await res.json();

                if (res.ok) {
                    toast.success(data.message || "Registration successful");
                    setFormData({
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    });
                } else {
                    toast.error(data.error || "Registration failed");
                }

            } catch (err) {
                toast.error("Something went wrong");
                console.error("Fetch error:", err);
            }
        }
    };


    return (
        <>
            <div className="auth">

                <div className="auth-container">
                    <div className="auth-form">
                        <h2>Create an Account</h2>
                        <form action="" onSubmit={handleForm}>
                            <input type="text" placeholder="Username *" name="username" onChange={handleChange} value={formData.username} />
                            <input type="email" placeholder="Email Address * " name="email" onChange={handleChange} value={formData.email} />
                            <input type="password" placeholder="Password *" name="password" onChange={handleChange} value={formData.password} />
                            <input type="password" placeholder="Confirm Password *" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
                            <button className="submit-btn" type="submit">Sign Up</button>
                            <p>
                                Already have an account? <Link to="/login">Sign In</Link>
                            </p>
                        </form>
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
