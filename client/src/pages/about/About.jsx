import React from "react";
import "./AboutUs.scss";
import asif from "../../assets/asif.png";
import imagerobot from "../../assets/img/robot.png";
import sadaat from "../../assets/sadaat.jpg";
import farhan from "../../assets/farhan.jpg";
import naila from "../../assets/profile.png";
import yasir from "../../assets/yasir.jpg";
const About = () => {
  const team = [
    {
      name: "Dr. Erssa Arif",
      title: "Project Superviser",
      image: naila,
    },
    {
      name: "Sir Fawad Saif",
      title: "Co-Superviser",
      image: naila,
    },
    {
      name: "asif hussain",
      title: "Lead Developer",
      image: asif,
    },
    {
      name: "saadat ali khan",
      title: "Software Quality Assurance",
      image: sadaat,
    },
    {
      name: "Yasir Ali ",
      title: "Front-End Developer",
      image: yasir,
    },
    {
      name: "Farhan Raza",
      title: "Graphic Designer, UI/UX",
      image: farhan,
    },
  ];
  return (
    <div className="about-us">
      <div className="about-hero">
        <div class="left-text">
          <h1>
            {" "}
            <span>About</span> Us
          </h1>
          <p>Empowering Innovation with AI-Powered System Design</p>
        </div>
        <div class="right-img">
          <img src={imagerobot} alt="" />
        </div>
      </div>
      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to revolutionize the way developers and architects
            approach system design. Through AI-driven insights and automation,
            we aim to simplify the complex process of creating robust, scalable,
            and efficient software systems.
          </p>
        </section>
        <section className="vision">
          <h2>Our Vision</h2>
          <p>
            We envision a future where technology empowers every innovator with
            the tools to transform ideas into intelligent system architectures
            faster, smarter, and more efficiently.
          </p>
        </section>
        <p className="meat-text">meat the taem</p>
        <section class="team-section">
          {team.map((member, index) => (
            <div class="profile-card">
              <div class="profile-card__image-container">
                <img src={member.image} alt="" />
              </div>
              <div class="profile-card__info">
                <h3 class="profile-card__name">{member.name}</h3>
                <p class="profile-card__title">{member.title}</p>
                <div class="profile-card__social">
                  <a href="#" class="social-icon facebook">
                    f
                  </a>
                  <a href="#" class="social-icon instagram">
                    t
                  </a>
                  <a href="#" class="social-icon linkedin">
                    in
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className="contact">
          <h2>Contact Us</h2>
          <p>
            If you’d like to learn more about our project or collaborate with
            us, feel free to reach out!
          </p>
          <ul>
            <li>Email: asifhussainmeer7680@gmail.com</li>
            <li>Phone: +92 344 9855766</li>
            <li>Location: Riphah International University Faisalabad Campus</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
