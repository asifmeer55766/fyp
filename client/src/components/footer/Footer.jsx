import React, { useState } from "react";
import "./Footer.scss";
import appstore from "../../assets/play.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Footer() {
  const [data, SetData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Thank You Newsletter Subscribed");
    SetData("");
  };
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="newsletter">
        <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
        <div className="newsletter-input">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={data}
              onChange={(e) => SetData(e.target.value)}
            />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>

      <hr />

      {/* Footer Links */}
      <div className="footer-links">
        <div className="footer-column">
          <h5>CUSTOMER CARE</h5>
          <ul>
            <li>
              <Link href="#">CONTACT US</Link>
            </li>
            <li>
              <Link href="tel:8002278437">CALL NOW: 800 227 8437</Link>
            </li>
            <li>
              <Link href="#">FAQ</Link>
            </li>
            <li>
              <Link href="#">TRACK YOUR ORDER</Link>
            </li>
            <li>
              <Link href="#">BOOK AN APPOINTMENT</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>OUR COMPANY</h5>
          <ul>
            <li>
              <Link to={"/"}>HOME ↗</Link>
            </li>
            <li>
              <Link to={"/about"}>ABOUT ↗</Link>
            </li>
            <li>
              <Link to={"/contact"}>CONTACT US</Link>
            </li>
            <li>
              <Link to={"/features"}>APPS FEATURES</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>LEGAL AREA</h5>
          <ul>
            <li>
              <Link href="#">TERMS OF USE</Link>
            </li>
            <li>
              <Link href="#">PRIVACY POLICY</Link>
            </li>
            <li>
              <Link href="#">CONDITIONS OF SALE</Link>
            </li>
            <li>
              <Link href="#">CREDITS</Link>
            </li>
            <li>
              <Link href="#">ACCESSIBILITY STATEMENT</Link>
            </li>
            <li>
              <Link href="#">CALIFORNIA PRIVACY RIGHTS</Link>
            </li>
            <li>
              <Link href="#">DO NOT SELL OR SHARE MY PERSONAL INFORMATION</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>COMING SOON ON </h5>
          <div className="social-icons">
            <Link to={"/"}>
              <img src={appstore} alt="appstore icons" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          DEVELOPED BY:
          <Link to={"https://asifh.netlify.app"}>SYS-DESIGN-GROUP-OF-DEV</Link>
        </p>
        <p>COPYRIGHT © 2025 SYS-DESIGN</p>
      </div>
    </footer>
  );
}
