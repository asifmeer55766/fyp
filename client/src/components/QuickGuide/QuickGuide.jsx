import React, { useState } from "react"; // 1. Import useState
import "./style.scss";
import img from "../../assets/ai.jpg";
import img1 from "../../assets/ai.avif";
import step1 from "../../assets/img/step1.jpeg";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

export default function QuickGuide({ onClose }) {
  const [show, setShow] = useState(true);
  // 2. Initialize state for the current step index (starts at 0)
  const [currentStep, setCurrentStep] = useState(0);

  const images = [
    {
      step: 1, // Added step number for clarity
      img: step1,
    },
    {
      step: 2,
      img: img1,
    },
    {
      step: 3,
      img: img,
    },
    {
      step: 4,
      img: img,
    },
    {
      step: 5,
      img: img,
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
                <h3>step {image.step}</h3>
                {/* Note: The 'skip' functionality would typically navigate away or to the end */}
                <span onClick={onClose}>skip</span>
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
