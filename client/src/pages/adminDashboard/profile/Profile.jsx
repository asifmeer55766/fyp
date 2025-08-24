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
export default function Profile() {
  return (
    <>
      <h1>Profile </h1>
      <div class="profile-container">
        <div class="first-row">
          <div class="column-1 columns">
            <div class="inner-box">
              <p>100</p>
              <span className="icons">
                <FaChalkboard />
              </span>
              <span className="desc">total projects created</span>
            </div>
          </div>
          <div class="column-2 columns">
            <div class="inner-box">
              <p>200</p>
              <span className="icons">
                <FaCertificate />
              </span>
              <span className="desc">successful projects</span>
            </div>
          </div>
          <div class="column-3 columns">
            <div class="inner-box">
              <p>12</p>
              <span className="icons">
                <FaCodepen />
              </span>
              <span className="desc">incomplete projects</span>
            </div>
          </div>
        </div>
        <div class="second-row">
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>200</p>
              <span className="icons">
                <IoPerson />
              </span>
              <span className="desc">Total Registered User</span>
            </div>
          </div>
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>200</p>
              <span className="icons">
                <IoPeopleSharp />
              </span>
              <span className="desc">Active User</span>
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
          <div class="col-box-1 col-box">
            <div class="inner-box">
              <p>200</p>
              <span className="icons">
                <IoRocket />
              </span>
              <span className="desc">Monthly Trafic</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
