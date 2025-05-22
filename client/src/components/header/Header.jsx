import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import Button1 from '../buttons/button1';
import Button2 from '../buttons/Button2';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    const navigate = useNavigate();
    const NavigateLogin = () => {
        navigate('/login')
    }
    const GetStarted = () => {
        navigate('/')
    }

    return (
        <header>
            <nav className="navbar">
                {/* <img src={logo} alt="company logo" /> */}
                <span><SlSettings className='setting' />SysDesign</span>

                <div className="menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/services'>Services</NavLink>
                    <NavLink to='/contact'>Contact</NavLink>
                    <span className='login auth-btn' onClick={NavigateLogin}><Button1 name="Login" /></span>
                    <span className='auth-btn' onClick={GetStarted} ><Button2 name='Get Started' /></span>
                </ul>
            </nav>

        </header>
    );
};

export default Header;
