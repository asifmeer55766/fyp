import React from 'react'
import "./Home.scss"
import { SiGoogledocs } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import UserInput from '../../components/userInput/UserInput'
const Home = () => {
    const navigate = useNavigate();

    const handleOpenGuide = () => {
        navigate('/user-guide');
    };
    return (
        <>
            <div className="home-container">

                <div className="home">
                    <h1 className='heading1'>Take Your Experience to the Next Level With </h1>
                    <h1 className='heading2 animated-text'>Best AI Powered System Design Generator</h1>
                    {/* <p>Your One-Step Solution for Client, Server, Database, API Gateway, Load Balancer, Cache, Authentication & Authorization.</p> */}
                    <div className="help-btn">

                        <span>Need Help? <i onClick={handleOpenGuide}>User Guide</i> </span>
                        {/* <button ><SiGoogledocs /></button> */}
                    </div>
                </div>
                <div className="user-input-section">
                    <UserInput />
                </div>
            </div>
        </>
    )
}

export default Home