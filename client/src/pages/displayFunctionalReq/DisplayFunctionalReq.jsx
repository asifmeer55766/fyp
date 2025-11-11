import React, { useEffect, useState, useRef } from "react";
import "./DisplayFunctionalRequirements.scss";
import { IoReload, IoChevronForwardSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { normalizeRequirements } from "../../../utils/normalizeRequirements";
import Btn from "../../components/buttons/Btn";
import { GenerateLLD } from "../../components/lld/GenerateLLD";
import { useDispatch } from "react-redux";
import { markTaskCompleted } from "../../redux/taskStatusSlice";
import Status from "../../components/status/Status";
import { toast } from "react-toastify";
import { GenerateERD } from "../../components/erd/GenerateERD";
import GenerateAPI from "../../components/apis/GenerateAPI";
import { GenerateSequenceDiagram } from "../../components/seqDigram/GenerateSequenceDiagram";
import { GenerateProjectProposal } from "../../components/projectProposal/GenerateProjectProposal";
import { useParams } from "react-router-dom";
import { FiRotateCw, FiArrowRightCircle } from "react-icons/fi";
import { GenerateSystemDesign } from "../../components/architectureDiagram/GenerateSystemDesign";
import Requirements from "../../components/requirements/Requirements";

const DisplayFunctionalReq = () => {
  // 💡 This hook correctly gets the projectId from the URL, e.g., /project/12345
  const projectId = localStorage.getItem("projectId");
  const token = localStorage.getItem("token");
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
    navigate("/", { state: { prompt: savedData, projectId, mode: "update" } });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/latest-response/${projectId}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${token}`,
      },
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

  const handleGenerateDesign = async (retry = true) => {
    setLoading(true);
    try {
      const originalPrompt = localStorage.getItem("originalPrompt");
      // 💡 Get the token from localStorage
      // 💡 1. Get the token from localStorage
      const token = localStorage.getItem("token"); // 🔹 Get token from localStorage
      const response = await fetch(
        "http://localhost:5000/api/generate-design",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔹 Send token to backend
          },
          body: JSON.stringify({
            functional: functionalRef.current,
            nonFunctional: nonFunctionalRef.current,
            originalUserPrompt: originalPrompt || "unknown system",
            projectId,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error);
      }

      const data = await response.json();

      // ✅ Mark HLD complete immediately after backend success
      dispatch(markTaskCompleted("hld"));
      // dispatch(markTaskCompleted("systemArchitecture"));

      // function to generate Low Level Design
      await GenerateLLD(dispatch);
      // function to generate architecture
      await GenerateSystemDesign(dispatch);
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
      toast.error(error.message);
      if (
        error.message.includes(
          "The model is overloaded, Please try again later"
        ) &&
        retry
      ) {
        toast("Retrying in 15 seconds...");

        setTimeout(() => {
          handleGenerateDesign((retry = false));
        }, 15000);
      }
      dispatch(markTaskCompleted(""));
    } finally {
      navigate("/status");
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
              <Btn
                icon={<FiRotateCw />}
                text={"Retry"}
                background={"#5c33ff"}
                color={"white"}
              />
            </button>

            <button onClick={handleGenerateDesign}>
              <Btn
                icon={<FiArrowRightCircle />}
                text={"Continue Next "}
                background={"#5c33ff"}
                color={"white"}
                onClick={handleGenerateDesign}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayFunctionalReq;
