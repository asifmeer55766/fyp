import React from 'react';
import './AboutUs.scss';
import asif from '../../assets/asif.png';
import sadaat from '../../assets/sadaat.jpg';
import farhan from '../../assets/farhan.jpg';
import naila from '../../assets/profile.png';
const About = () => {
    return (
        <div className="about-us">
            <div className="about-hero">
                <h1> <span>About</span> Us</h1>
                <p>Empowering Innovation with AI-Powered System Design</p>
            </div>
            <div className="about-content">
                <section className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to revolutionize the way developers and architects approach system design.
                        Through AI-driven insights and automation, we aim to simplify the complex process of creating robust, scalable,
                        and efficient software systems.
                    </p>
                </section>
                <section className="vision">
                    <h2>Our Vision</h2>
                    <p>
                        We envision a future where technology empowers every innovator with the tools to transform ideas
                        into intelligent system architectures — faster, smarter, and more efficiently.
                    </p>
                </section>
                <section className="team">
                    <h2>Meet the Team</h2>
                    <div className="team-members">
                        <div className="member">
                            <img src={naila} alt="Designer" />
                            <h3>Naila Nawaz </h3>
                            <p>Project Supervisor</p>
                        </div>
                        <div className="member">
                            <img src={asif} alt="Founder" />
                            <h3>Asif Hussain</h3>
                            <p>Lead Developer & Visionary</p>
                        </div>
                        <div className="member">
                            <img src={naila} alt="Engineer" />
                            <h3>Yasir Ali</h3>
                            <p>Backend Engineer</p>
                        </div>
                        <div className="member">
                            <img src={farhan} alt="Designer" />
                            <h3>Farhan Raza</h3>
                            <p>UI/UX Designer and Developer</p>
                        </div>
                        <div className="member">
                            <img src={sadaat} alt="Designer" />
                            <h3>Sadaat Ali Khan</h3>
                            <p>Software Architect</p>
                        </div>
                    </div>
                </section>
                <section className="contact">
                    <h2>Contact Us</h2>
                    <p>If you’d like to learn more about our project or collaborate with us, feel free to reach out!</p>
                    <ul>
                        <li>Email: asifhussainmeer7680@gmail.com</li>
                        <li>Phone: +123 456 7890</li>
                        <li>Location: Riphah International University Faisalabad Campus</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default About;
