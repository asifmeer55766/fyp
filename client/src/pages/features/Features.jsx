import React from 'react'
import './Features.scss'
import f1 from "../../assets/f1.svg";
import f2 from "../../assets/f2.svg";
import f3 from "../../assets/f3.svg";
import f4 from "../../assets/f4.svg";
import f5 from "../../assets/f5.svg";
// import f6 from "../../assets/f6.svg";
const Features = () => {
    return (
        <>
            <div className="features-container">
                <h1>our <span>features</span></h1>
                <p>Explore powerful tools to plan, design, and document your software systems professionally.</p>



                <div className="features">
                    <div className="feature-items">
                        <img src={f1} alt="" />
                        <h2>ERD Digrame</h2>
                        <p>Visualizes entities and relationships in a database structure for clarity.</p>
                    </div>
                    <div className="feature-items">
                        <img src={f2} alt="" />
                        <h2>DFD Digrame</h2>
                        <p>Shows how data flows through the system using inputs, processes, and outputs.</p>
                    </div>
                    <div className="feature-items">
                        <img src={f3} alt="" />
                        <h2>System Architecture</h2>
                        <p>Defines how software and hardware components interact within the system.</p>
                    </div>
                    <div className="feature-items">
                        <img src={f4} alt="" />
                        <h2>High Level Design</h2>
                        <p>Outlines system modules, major components, and overall software structure.</p>
                    </div>
                    <div className="feature-items">
                        <img src={f5} alt="" />
                        <h2>Low Level Desgin</h2>
                        <p>Describes internal logic, functions, and workflows of each module in detail.</p>
                    </div>
                    <div className="feature-items">
                        <img src={f2} alt="" />
                        <h2>High Quality Docs</h2>
                        <p>Delivers detailed, well-structured documentation for seamless team workflow.</p>
                    </div>

                </div>

            </div>


        </>
    )
}

export default Features