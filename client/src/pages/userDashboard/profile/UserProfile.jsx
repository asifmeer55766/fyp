import React from "react";
import "./profile.scss";
import { FaChalkboard, FaCodepen, FaCertificate } from "react-icons/fa";
import {
  IoPerson,
  IoPeopleSharp,
  IoRocket,
  IoLaptopOutline,
  IoCube,
} from "react-icons/io5";

export default function UserProfile() {
  let date = new Date();
  const updatedDate = date.toLocaleString();
  return (
    <>
      <h1>Profile </h1>
      <div class="profile-container">
        <div class="first-row">
          <h3>
            Welcome <span>Asif Hussain</span> you are loggedin as{" "}
            <span> {localStorage.getItem("role")}</span>
          </h3>
        </div>
        <div class="second-row">
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>{updatedDate}</p>
              <span className="icons">
                <IoPeopleSharp />
              </span>
              <span className="desc">Last visit</span>
            </div>
          </div>
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>200</p>
              <span className="icons">
                <IoLaptopOutline />
              </span>
              <span className="desc">Total Projects Created</span>
            </div>
          </div>
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>200</p>
              <span className="icons">
                <IoLaptopOutline />
              </span>
              <span className="desc">Total Projects Created in this month</span>
            </div>
          </div>
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>200</p>
              <span className="icons">
                <IoCube />
              </span>
              <span className="desc">AI Requests Processed (F/P)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
