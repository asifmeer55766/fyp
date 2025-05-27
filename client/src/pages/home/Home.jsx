import React from 'react'
import "./Home.scss"
import UserInput from '../../components/userInput/UserInput'
const Home = () => {
    return (
        <>
            <div className="home-container">

                <div className="home">
                    <h1 className='heading1'>Elevate Your Experience With </h1>
                    <h1 className='heading2 animated-text'>Best AI Assist System Design Generator</h1>
                    <p>Your One-Step Solution for Client, Server, Database, API Gateway, Load Balancer, Cache, Authentication & Authorization.</p>
                </div>
                <div className="user-input-section">
                    <UserInput />
                </div>
            </div>
        </>
    )
}

export default Home