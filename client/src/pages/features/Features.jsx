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
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, temporibus!</p>


                <div className="features">
                    <div className="feature-items">
                        <img src={f1} alt="" />
                        <h2>ERD Digrame</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, temporibus</p>
                    </div>
                    <div className="feature-items">
                        <img src={f2} alt="" />
                        <h2>DFD Digrame</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, temporibus</p>
                    </div>
                    <div className="feature-items">
                        <img src={f3} alt="" />
                        <h2>System Architecture</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, temporibus</p>
                    </div>
                    <div className="feature-items">
                        <img src={f4} alt="" />
                        <h2>High Level Design </h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, temporibus</p>
                    </div>
                    <div className="feature-items">
                        <img src={f5} alt="" />
                        <h2>Low Level Desgin</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, temporibus</p>
                    </div>
                    <div className="feature-items">
                        <img src={f2} alt="" />
                        <h2>High Quality Docs</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, temporibus</p>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Features