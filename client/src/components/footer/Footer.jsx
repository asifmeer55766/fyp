import React, { useState } from "react";
import "./Footer.scss";
import appstore from "../../assets/play.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiBell } from "react-icons/fi";
import Btn from "../buttons/Btn";
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
    <>
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
              <button>
                <Btn
                  icon={<FiBell />}
                  text={"Subscribe"}
                  background={"black"}
                  color={"red"}
                  type="submit"
                />
              </button>
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
                <Link to="tel:+923449855766">CALL NOW: +92 344 9855 766</Link>
              </li>
              <li>
                <Link to="/user-guide">FAQ</Link>
              </li>
              <li>
                <Link href="#">sysdesign@gmail.com</Link>
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
                <Link href="#">CONDITIONS OF USEAGE</Link>
              </li>
              <li>
                <Link href="#">UPGRDE TO PRO</Link>
              </li>
              <li>
                <Link href="#">ACCESSIBILITY STATEMENT</Link>
              </li>
              <li>
                <Link href="#">USER DATA PRIVACY</Link>
              </li>
              <li>
                <Link href="#">COPYRIGHT LAW STATEMENT</Link>
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
      </footer>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          DEVELOPED BY:
          <Link to={"https://asifh.netlify.app"}>SYS-DESIGN-GROUP-OF-DEV</Link>
        </p>
        <p>COPYRIGHT © 2025 SYS-DESIGN</p>
      </div>
    </>
  );
}
