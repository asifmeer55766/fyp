import React, { useEffect, useState } from "react";
import "./UserInput.scss";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { IoReloadSharp, IoPaperPlane, IoMail, IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Spiner from "../status/Spiner";
import Loading from "../animation/loading/Loading";
const UserInput = ({ initialPrompt }) => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState(initialPrompt || "");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState({
    erd: false,
    sequence: false,
    low: false,
    high: false,
    system: false,
  });
  const location = useLocation();
  // const [text, setText] = useState("");

  useEffect(() => {
    if (location.state && location.state.prompt) {
      setInputText(location.state.prompt);
    }
  }, [location]);

  // it handles the input field changes
  const handleChange = (e) => {
    const { name, checked: isChecked } = e.target;
    const role = localStorage.getItem("role");
    if (role !== "admin" && role !== "user") {
      toast.error("Please login to your account first.");
      navigate("/login");
      return; // Exit early to prevent further changes
    }

    if (name === "system") {
      // If complete system design is checked, turn off all others
      setChecked({
        erd: false,
        sequence: false,
        low: false,
        high: false,
        system: isChecked,
      });
    } else {
      // Toggle the selected checkbox, and turn off system design
      setChecked((prev) => ({
        ...prev,
        [name]: isChecked,
        system: false,
      }));
    }
  };

  // the form logic here
  const handleForm = async (e) => {
    e.preventDefault();

    const anyChecked = Object.values(checked).some((value) => value === true);

    if (!anyChecked) {
      toast.warning("Please select the design option before submitting ");
      return;
    } else if (inputText.trim() === "") {
      toast.warning("Please write system requirements");
      return;
    }

    // form logic
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // 🔹 Get token from localStorage
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔹 Send token to backend
        },
        body: JSON.stringify({ prompt: inputText.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Something went wrong.");
        console.error("Error response from server:", data.error);
        return;
      }

      if (data.response) {
        const cleanedText = data.response
          .trim()
          .replace(/^```(json)?/i, "")
          .replace(/```$/, "")
          .trim();

        try {
          const parsedJSON = JSON.parse(cleanedText);
          toast.success("Requirements generated and saved!");
          console.log("Parsed JSON:", parsedJSON);
          // You can store it in state if needed
        } catch {
          toast.warning("Response is not valid JSON format.");
          console.log("Raw response:", cleanedText);
        }
      }
    } catch (err) {
      toast.error("Failed to connect to server.");
      navigate("/");
    } finally {
      setLoading(false);
      localStorage.setItem("originalPrompt", inputText);
      navigate("/display-functional-req");
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleOpen = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);
  const promptText = `I want to build an eCommerce website to sell mobile phones. The system should allow users to register, log in, and browse a catalog of phones by brand, price, and specifications. Users should be able to add products to their cart, manage the cart, and place orders with secure checkout. Admins must be able to add, update, or remove products and view all customer orders. The system should send order confirmation emails, support payment gateway integration, and allow users to track order status. It must include user authentication, authorization, product management, order management, and secure transactions. The system should be scalable, mobile responsive, SEO friendly, and provide a smooth user experience with fast performance and proper error handling.`;

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
                  <h3>Example Prompt </h3>
                  <p>{promptText}</p>
                  <button onClick={handleClose} className="close-btn">
                    <IoClose />
                  </button>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleForm}>
            <div className="category-boxes">
              <span>Select Target </span>

              <div className="category-box">
                <label htmlFor="erd">ERD Diagram</label>
                <input
                  type="checkbox"
                  name="erd"
                  id="erd"
                  checked={checked.erd}
                  onChange={handleChange}
                  disabled={checked.system}
                />
              </div>

              <div className="category-box">
                <label htmlFor="sequence">Sequence Diagram</label>
                <input
                  type="checkbox"
                  name="sequence"
                  id="sequence"
                  checked={checked.sequence}
                  onChange={handleChange}
                  disabled={checked.system}
                />
              </div>

              <div className="category-box">
                <label htmlFor="low">Low Level Design</label>
                <input
                  type="checkbox"
                  name="low"
                  id="low"
                  checked={checked.low}
                  onChange={handleChange}
                  disabled={checked.system}
                />
              </div>

              <div className="category-box">
                <label htmlFor="high">High Level Design</label>
                <input
                  type="checkbox"
                  name="high"
                  id="high"
                  checked={checked.high}
                  onChange={handleChange}
                  disabled={checked.system}
                />
              </div>

              <div className="category-box">
                <label htmlFor="system">Complete System Design</label>
                <input
                  type="checkbox"
                  name="system"
                  id="system"
                  checked={checked.system}
                  onChange={handleChange}
                  disabled={
                    checked.erd ||
                    checked.sequence ||
                    checked.low ||
                    checked.high
                  }
                />
              </div>
            </div>

            <div className="user-req-input-container">
              <textarea
                name="input-data"
                id="input-data"
                placeholder="write your system requirements in detail here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
              <div className="btn-operation">
                <button
                  type="reset"
                  onClick={() => setInputText("")}
                  title="Reset"
                >
                  <IoReloadSharp />
                </button>
                <button title="Prompt example" onClick={handleOpen}>
                  <IoMail />
                </button>
                <button type="submit" title="Generate">
                  <IoPaperPlane />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UserInput;
