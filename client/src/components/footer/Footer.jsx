import React from 'react';
import './Footer.scss';
import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="logo-title">

                    <h2>SysDesign </h2>

                </div>



                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/features">Features</Link>

                </div>

                <p className="copyright">
                    &copy; {new Date().getFullYear()} SysDesign. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
