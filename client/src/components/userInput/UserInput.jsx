import React, { useEffect, useState } from "react";
import "./UserInput.scss";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { IoReloadSharp, IoPaperPlane, IoMail, IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Spiner from "../status/Spiner";
import Loading from "../animation/loading/Loading";
import homeImage from "../../assets/img/banner-robot.png";
import { MdOutlineContentCopy } from "react-icons/md";
const UserInput = ({ initialPrompt }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, projectId } = location.state || {};

  const [inputText, setInputText] = useState(initialPrompt || "");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState({
    erd: false,
    sequence: false,
    low: false,
    high: false,
    system: false,
  });

  useEffect(() => {
    if (location.state && location.state.prompt) {
      setInputText(location.state.prompt);
    }
  }, [location]);

  const handleChange = (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to your account first.");
      navigate("/login");
      return;
    }
  };

  const handleTextarea = (e) => {
    setInputText(e.target.value);
    const textarea = e.target;

    textarea.style.height = "auto";

    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") {
      toast.warning("Please write system requirements");
      return;
    }

    // form logic
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let response;
      if (mode === "update" && projectId) {
        response = await fetch(
          `http://localhost:5000/api/projects/${projectId}/requirements`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ prompt: inputText.trim() }),
          }
        );
      } else {
        response = await fetch("http://localhost:5000/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ prompt: inputText.trim() }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Something went wrong.");
        return;
      }

      if (data.projectId) {
        localStorage.setItem("projectId", data.projectId);
      }

      if (data.response) {
        const cleanedText = data.response
          .trim()
          .replace(/^```(json)?/i, "")
          .replace(/```$/, "")
          .trim();

        try {
          JSON.parse(cleanedText);
          toast.success("Requirements generated and saved!");
        } catch {
          toast.warning("Response is not valid JSON format.");
          console.log("Raw response:", cleanedText);
        }
      }

      localStorage.setItem("originalPrompt", inputText);
      navigate("/display-functional-req");
    } catch (err) {
      toast.error("Failed to connect to server.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleOpen = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);
  const promptText = `I want to build an eCommerce website to sell mobile phones. The system should allow users to register, log in, and browse a catalog of phones by brand, price, and specifications. Users should be able to add products to their cart, manage the cart, and place orders with secure checkout. Admins must be able to add, update, or remove products and view all customer orders. The system should send order confirmation emails, support payment gateway integration, and allow users to track order status. It must include user authentication, authorization, product management, order management, and secure transactions. The system should be scalable, mobile responsive, SEO friendly, and provide a smooth user experience with fast performance and proper error handling.`;

  const copyText = (promptText) => {
    navigator.clipboard
      .writeText(promptText)
      .then(() => {
        toast.success("copy to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };
  return (
    <>
      {loading ? (
        <Loading status={"Please wait we are analyzing your input"} />
      ) : (
        <div className="target-category-container">
          <div>
            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h3>
                    An example prompt to generate an E-Commerce application{" "}
                  </h3>
                  <p>{promptText}</p>
                  <button onClick={handleClose} className="close-btn">
                    <IoClose />
                  </button>
                  <button
                    onClick={() => copyText(promptText)}
                    className="copy-text"
                    title="copy to clipboard"
                  >
                    <MdOutlineContentCopy />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div class="container-home-page">
            <div class="left-text">
              <h1 className="heading1 headings">
                Take Your Experience to the Next Level With{" "}
              </h1>
              <h1 className="heading2 animated-text headings-2">
                Best AI Powered System Design Generator
              </h1>
              <p>
                Build a complete system design and architecture of any software
                system.{" "}
                <span onClick={handleOpen}>How to write a good prompt ?</span>
              </p>
            </div>
            <div class="right-img">
              <img src={homeImage} alt="banner image " />
            </div>
          </div>
          <form onSubmit={handleForm}>
            <div className="user-req-input-container">
              <textarea
                name="input-data"
                id="input-data"
                placeholder="Type your system requirements here..."
                value={inputText}
                onChange={handleTextarea}
              ></textarea>
            </div>
            <div className="btn-operation">
              <button
                type="reset"
                onClick={() => setInputText("")}
                title="Reset"
                className="reset"
              >
                <IoReloadSharp className="icon" />
              </button>

              <button type="submit" title="Generate">
                <IoPaperPlane className="icon" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UserInput;
