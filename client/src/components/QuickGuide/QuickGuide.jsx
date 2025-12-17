import React, { useState } from "react"; // 1. Import useState
import "./style.scss";
import img from "../../assets/ai.jpg";
import img1 from "../../assets/ai.avif";
import step1 from "../../assets/img/step1.png";
import step2 from "../../assets/img/step2.png";
import step3 from "../../assets/img/step3.png";
import step4 from "../../assets/img/step4.png";
import step5 from "../../assets/img/step5.png";
import step6 from "../../assets/img/step6.png";
import step7 from "../../assets/img/step7.png";
import step8 from "../../assets/img/step8.png";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

export default function QuickGuide({ onClose }) {
  const [show, setShow] = useState(true);
  // 2. Initialize state for the current step index (starts at 0)
  const [currentStep, setCurrentStep] = useState(0);

  const images = [
    {
      step: 1, // Added step number for clarity
      des: "Click on login button  ",
      img: step1,
    },
    {
      step: 2,
      img: step2,
      des: "Register if do not have an account , else just login to your account ",
    },
    {
      step: 3,
      img: step3,
      des: "Enter your credentials here to create an account",
    },
    {
      step: 4,
      img: step4,
      des: "write a detail description and click on generate button",
    },
    {
      step: 5,
      img: step5,
      des: "Review and check functional and non-functional reqirements and click on next  ",
    },
    {
      step: 6,
      img: step6,
      des: "Just wait to finish processing , and click on save button  ",
    },
    {
      step: 7,
      img: step7,
      des: "Review and check the documentation and click on download button",
    },
    {
      step: 8,
      img: step8,
      des: "see your existing  projects and setting on this page ",
    },
  ];

  const closeGuide = () => {
    setShow(false);
  };
  const totalSteps = images.length;

  // 3. Function to handle moving to the next step
  const handleNext = () => {
    // Only move next if not on the last step
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 4. Function to handle moving to the previous step
  const handlePrevious = () => {
    // Only move previous if not on the first step
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 5. Calculate dots array for navigation indicators
  const dots = [...Array(totalSteps).keys()];

  // 6. Function to jump to a specific step
  const goToStep = (index) => {
    setCurrentStep(index);
  };

  return (
    <>
      {show && (
        <div className="guide-container">
          <section className="guid-sections">
            {images.map((image, index) => (
              // 7. Conditional rendering: Only render the current step's component
              <div
                className="pagination"
                key={index} // Added key for list rendering
                style={{ display: index === currentStep ? "block" : "none" }}
              >
                <h3>
                  Step {image.step} {image.des}
                </h3>
                {currentStep < totalSteps - 1 ? (
                  <span onClick={onClose}>Skip Tutorials</span>
                ) : (
                  <span onClick={onClose}>Close Tutorials</span>
                )}
                <div className="img">
                  <img src={image.img} alt={`Guide step ${image.step} image`} />
                </div>
              </div>
            ))}

            <div className="nex-back-btn">
              <div className="dots">
                {/* Render clickable dots */}
                {dots.map((index) => (
                  <p
                    key={index}
                    onClick={() => goToStep(index)}
                    // Apply a style to the current dot to highlight it
                    style={{
                      color: index === currentStep ? "red" : "white",
                      lineHeight: "0",
                    }}
                  >
                    &bull;
                  </p>
                ))}
              </div>
              <div className="buttons">
                <button onClick={handlePrevious} disabled={currentStep === 0}>
                  <HiChevronDoubleLeft />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStep === totalSteps - 1}
                >
                  <HiChevronDoubleRight />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
