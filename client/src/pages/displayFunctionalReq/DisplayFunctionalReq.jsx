import React, { useEffect, useState, useRef } from "react";
import "./DisplayFunctionalRequirements.scss";
import { IoReload, IoChevronForwardSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { normalizeRequirements } from "../../../utils/normalizeRequirements";

import { GenerateLLD } from "../../components/lld/GenerateLLD";
import { useDispatch } from "react-redux";
import { markTaskCompleted } from "../../redux/taskStatusSlice";
import Status from "../../components/status/Status";
import { toast } from "react-toastify";
import { GenerateERD } from "../../components/erd/GenerateERD";
import GenerateAPI from "../../components/apis/GenerateAPI";
import { GenerateSequenceDiagram } from "../../components/seqDigram/GenerateSequenceDiagram";
import { GenerateProjectProposal } from "../../components/projectProposal/GenerateProjectProposal";

const DisplayFunctionalReq = () => {
  const dispatch = useDispatch();
  const [functionalRequirements, setFunctionalRequirements] = useState([]);
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState(
    []
  );
  const functionalRef = useRef([]);
  const nonFunctionalRef = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    const savedData = localStorage.getItem("originalPrompt") || "";

    // Navigate to ComponentA and pass data via state
    navigate("/", { state: { prompt: savedData } });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/latest-response", {
      method: "GET",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        const { functionalRequirements, nonFunctionalRequirements } =
          normalizeRequirements(data);
        setFunctionalRequirements(functionalRequirements);
        setNonFunctionalRequirements(nonFunctionalRequirements);
        functionalRef.current = functionalRequirements || [];
        nonFunctionalRef.current = nonFunctionalRequirements || [];
      })
      .catch((err) => {
        console.error("Error fetching response:", err);
      });
  }, []);

  const handleGenerateDesign = async () => {
    setLoading(true);
    try {
      const originalPrompt = localStorage.getItem("originalPrompt");
      const response = await fetch(
        "http://localhost:5000/api/generate-design",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            functional: functionalRef.current,
            nonFunctional: nonFunctionalRef.current,
            originalUserPrompt: originalPrompt || "unknown system",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // function to generate Low Level Design
      await GenerateLLD(dispatch);

      // function to generate ERD Diagram
      await GenerateERD(dispatch);

      //function to generate APIs and sequence
      await GenerateAPI(dispatch);

      // function to generate sequence diagram
      await GenerateSequenceDiagram(dispatch);

      // function to generate project proposals
      await GenerateProjectProposal(dispatch);
    } catch (error) {
      console.error("Error generating design:", error);
      dispatch(markTaskCompleted(""));
    } finally {
      navigate("/status");
      dispatch(markTaskCompleted("hld"));
      dispatch(markTaskCompleted("systemArchitecture"));
      toast.success("HLD is completed");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Status />
      ) : (
        <div style={{ padding: "20px" }}>
          <div className="requirements-container">
            <div className="requirements-column">
              <h2>Functional Requirements</h2>
              {Array.isArray(functionalRequirements) &&
              functionalRequirements.length > 0 ? (
                functionalRequirements.map((req, i) => {
                  // Type 1: { id: ..., text: ..., extra: ... }
                  if (req.id && req.text) {
                    return (
                      <div key={`fr-type1-${i}`} className="requirement">
                        <strong>{req.id}</strong>: {req.text}
                        {req.extra && (
                          <div className="requirement-extra">
                            <em>{req.extra}</em>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Type 2: { title: ..., description: ... }
                  else if (req.title && req.description) {
                    return (
                      <div key={`fr-type2-${i}`} className="requirement">
                        <h4>{req.title}</h4>
                        <p>{req.description}</p>
                      </div>
                    );
                  }

                  // Type 3: plain string or unknown object
                  else {
                    return (
                      <div key={`fr-type3-${i}`} className="requirement">
                        {typeof req === "string" ? req : JSON.stringify(req)}
                      </div>
                    );
                  }
                })
              ) : (
                <p>No Functional Requirements found.</p>
              )}
            </div>

            <div className="requirements-column">
              <h2 style={{ marginTop: "30px" }}>Non-Functional Requirements</h2>
              {Array.isArray(nonFunctionalRequirements) &&
              nonFunctionalRequirements.length > 0 ? (
                nonFunctionalRequirements.map((req, i) => {
                  // Type 1: { id: ..., text: ..., extra: ... }
                  if (req.id && req.text) {
                    return (
                      <div key={`fr-type1-${i}`} className="requirement">
                        <strong>{req.id}</strong>: {req.text}
                        {req.extra && (
                          <div className="requirement-extra">
                            <em>{req.extra}</em>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Type 2: { title: ..., description: ... }
                  else if (req.title && req.description) {
                    return (
                      <div key={`fr-type2-${i}`} className="requirement">
                        <h4>{req.title}</h4>
                        <p>{req.description}</p>
                      </div>
                    );
                  }

                  // Type 3: plain string or unknown object
                  else {
                    return (
                      <div key={`fr-type3-${i}`} className="requirement">
                        {typeof req === "string" ? req : JSON.stringify(req)}
                      </div>
                    );
                  }
                })
              ) : (
                <p>No Functional Requirements found.</p>
              )}
            </div>
          </div>

          <div className="buttons-operation-nex">
            <button onClick={handleClick}>
              Missing Requirements Try Again <IoReload />
            </button>

            <button onClick={handleGenerateDesign}>
              Continue Next <IoChevronForwardSharp />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayFunctionalReq;
