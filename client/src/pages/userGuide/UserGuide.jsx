import React from "react";
import "./UserGuide.scss";

function UserGuide() {
  return (
    <div className="user-guide">
      <h1 className="user-guide__title">
        Follow the instruction <span>( Best Prompts => Best Result )</span>{" "}
      </h1>

      <section className="user-guide__section">
        <h2>Step-by-Step Guide</h2>
        <ol>
          <li>
            <strong>Login / Register:</strong> Create an account or log in using
            your credentials, only registered user can use the application.{" "}
          </li>
          <li>
            <strong>Input Requirements:</strong> Go to the input panel and type
            your system requirements in natural language (e.g., “An e-commerce
            app with login, product listing, cart, and payment”). make sure your
            input length at least greater than 250 character for better AI
            response. <br />
            Please provide detailed and complete system requirements. The AI
            analyzes your input to extract both functional and non-functional
            requirements, so the more comprehensive your description, the more
            accurate and helpful the results will be
          </li>
          <li>
            <strong>Process Requirements:</strong> Click the{" "}
            <em>“Generate button”</em> to start processing.
          </li>
          <li>
            <strong>Stay here:</strong> please wait unitil process not finish ,
            do not refresh while processing the application will redirect you
            the final Documentation page{" "}
          </li>
          <li>
            <strong>Review Design:</strong> View auto-generated results
            including:
            <ul>
              <li>ER Diagram / Database Schema</li>
              <li>System Architecture Diagram</li>
              <li>Suggested Tech Stack</li>
              <li>Documentation Summary</li>
            </ul>
          </li>
          <li>
            <strong>Download / Save:</strong> Export your results in PDF or
            image format or save them to your account for later.
          </li>
        </ol>
      </section>

      <section className="user-guide__section">
        <h2>Please Make sure to follow these tips </h2>
        <ul>
          <li>Do not refresh while generating the result .</li>
          <li>
            Use clear and structured sentences when describing requirements.
          </li>
          <li>
            Avoid vague inputs like “a good website” — instead, be specific
            (e.g., “job portal with login, profile, search, and apply
            features”).
          </li>
          <li>
            The AI checks your input against specific rule , if it not met you
            will be ask to refine your input .
          </li>
          <li>
            If the result isn’t accurate, try refining your requirement or
            breaking it into smaller parts.
          </li>
          <li>
            Use a modern browser like Chrome or Edge for best performance.
          </li>
          <li>
            Ensure a stable internet connection for AI processing and generation
            steps.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default UserGuide;
