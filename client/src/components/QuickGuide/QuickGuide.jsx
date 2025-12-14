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
      des: "First write a detailed description of your project and then click on generate button",
    },
    {
      step: 4,
      img: step4,
      des: "Check functional and non-functional requirement , if not satisfy, click on retry else continue next",
    },
    {
      step: 5,
      img: step5,
      des: "Wait unitil processing not complete, and then click on save project ",
    },
    {
      step: 6,
      img: step6,
      des: "Review the project by scrolling below and click on downlaod button ",
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
                  step {image.step} {image.des}
                </h3>
                {/* Note: The 'skip' functionality would typically navigate away or to the end */}
                <span onClick={onClose}>Skip Tutorials</span>
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
                      cursor: "pointer",
                      margin: "0 2px",
                      fontSize: "24px",
                      color: index === currentStep ? "#2777fc" : "lightgray",
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
