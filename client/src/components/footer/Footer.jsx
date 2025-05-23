import React from 'react';
import './Footer.scss';
import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h2>SysDesign </h2>
                <p>AI-Assisted System Design & Architecture Generator</p>



                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/features">Features</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <p className="copyright">
                    &copy; {new Date().getFullYear()} SysDesign. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
