import { useEffect, useState, useRef, Suspense } from "react";
import "./output.scss";
import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import RenderProjectProposal from "../../components/projectProposal/RenderProjectProposal";
import APITable from "../../components/apiTable/APITable";
import TreeViewerLLD from "../../components/lld/TreeViewerLLD";
import RenderERD from "../../components/erd/RenderERD";
import Requirements from "../../components/requirements/Requirements";
import RenderSystemDesign from "../../components/architectureDiagram/RenderSystemDesign";
import TreeViewer from "../../components/hld/TreeViewer";
import RenderSequenceDiagram from "../../components/seqDigram/RenderSequenceDiagram";
import Loading from "../../components/animation/loading/Loading";
import LoaderVerify from "../../components/loaders/LoaderVerify";
export default function FinalOutputDocs() {
  const { id } = useParams();
  const contentRef = useRef();
  const [loadings, setLoadings] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);

  // Fetch all project output
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOutput = async () => {
      setLoader(true); // start full page loader
      try {
        const res = await fetch(
          `http://localhost:5000/api/projects/${id}/full-output`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch project output");
        const result = await res.json();
        setData(result);
        console.log("result ", result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoader(false); // stop loader
      }
    };
    fetchOutput();
  }, [id]);

  // PDF download
  const handleDownloadPDF = async () => {
    setLoadings(true);
    try {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Project.pdf");
    } catch (error) {
      console.error("PDF generation failed", error);
    }
    setLoadings(false);
  };
  // console.log("lld output ", data.lld);
  if (loader)
    return (
      <div>
        <LoaderVerify verify="Loading documentation please wait" />
      </div>
    );
  if (!data) return <p>Loading project output...</p>;

  return (
    <>
      <button
        style={{
          position: "fixed",
          right: "20px",
          top: "150px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onClick={handleDownloadPDF}
        disabled={loadings}
      >
        {loadings ? (
          <>
            <span
              className="spinner"
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid #fff",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 1s linear infinite",
              }}
            ></span>
            Generating PDF...
          </>
        ) : (
          "Download Project PDF"
        )}
        <span>
          <FaDownload />
        </span>
      </button>

      <div className="documentation-container" ref={contentRef}>
        <Suspense fallback="loading Project proposal">
          {data.proposal && <RenderProjectProposal proposal={data.proposal} />}
        </Suspense>

        {/* ======================================Section Functional and Non Functional req============================================= */}
        <section className="functional-and-nonfunctional-req">
          <Suspense fallback="loading requirements">
            {data.response && (
              <Requirements
                functionalRequirements={data.response.functional_requirements}
                nonFunctionalRequirements={
                  data.response.non_functional_requirements
                }
              />
            )}
          </Suspense>
        </section>
        {/* ======================================Section High Level Design============================================= */}
        <section className="high-level-design">
          <h2>3) High Level Design (HLD)</h2>
          <p>
            The HLD is a blueprint of the entire system. It provides an
            architectural overview without going into implementation details. It
            defines the major components, modules, and their interactions, and
            focuses on the "what" of the system
          </p>
          <Suspense fallback="wait Loading HLD.....">
            {data.hld && <TreeViewer treeData={data.hld.rawData} />}
          </Suspense>
        </section>
        {/* ======================================Section Low Level Design============================================= */}
        <section className="low-level-design">
          <h2>3) Low Level Design (LLD)</h2>
          <p>
            The LLD is a detailed plan for each individual component defined in
            the HLD. It focuses on the "how" of the system, specifying the
            internal logic and implementation details
          </p>
          <Suspense fallback="wait Loading LLD.....">
            {data.lld && <TreeViewerLLD treeData={data.lld.rawData} />}
          </Suspense>
        </section>

        {/* ======================================Section System Architecture ============================================= */}

        <section className="system-architecture">
          <h2>4) System Architecture </h2>
          <p>
            System architecture is a high-level, comprehensive blueprint that
            describes the overall structure of a software system. It defines the
            major components, their functions, how they interact with each
            other, and the principles and guidelines that govern the system's
            design and evolution. It's the foundational framework that guides
            the development of the entire project.
          </p>
          <Suspense fallback="wait Loading system architecture.....">
            {data.systemDesign && (
              <RenderSystemDesign
                dbFlowchartCode={data.systemDesign.mermaidCode}
              />
            )}
          </Suspense>
        </section>

        {/* ======================================Section ERD (Database Design)============================================= */}
        <section className="database-design">
          <h2>5) Database Design </h2>
          <p>
            Database design is the process of structuring and organizing data
            into logical tables, columns, and relationships to ensure efficient
            storage, easy retrieval, and consistency. A well-designed database
            makes data management simpler, reduces redundancy, and improves
            application performance.
          </p>

          <Suspense fallback="wait Loading Database design .....">
            {data.erd && <RenderERD dbErdCode={data.erd.mermaidCode} />}
          </Suspense>
        </section>

        {/* ======================================Section API============================================= */}
        <section className="api-design">
          <h2>6) API Design </h2>
          <p>
            An API, or Application Programming Interface, is a set of rules and
            protocols that allows different software applications to communicate
            and interact with each other. It's like a menu in a restaurant: you
            (the client) look at the menu (the API documentation) to see what
            dishes (functions or data) are available, what ingredients they need
            (required parameters), and what you'll receive in return (the
            response).
          </p>
          <Suspense fallback="Loading Apis ">
            {data.apiDesign && <APITable latestApiDesign={data.apiDesign} />}
          </Suspense>

          <div className="api-div">
            <p>
              <h3>Key Concepts to Display </h3>
              When defining APIs on the frontend, it's helpful to explain these
              core concepts:
            </p>
            <p>
              <strong> Endpoint:</strong> This is the specific URL or address
              that an application can call to access a resource. For example,
              /users might be an endpoint to get user data.
            </p>
            <p>
              {" "}
              <strong>Method (HTTP Verb):</strong> This specifies the type of
              action you want to perform. The most common methods are:{" "}
            </p>
            <p>
              {" "}
              <strong>GET:</strong> Retrieves data from a server (e.g., getting
              a list of products).
            </p>
            <p>
              <strong>POST:</strong> Sends data to a server to create a new
              resource (e.g., creating a new user account).{" "}
            </p>
            <p>
              {" "}
              <strong> PUT/PATCH: </strong> Updates an existing resource (e.g.,
              changing a user's profile information).
            </p>
            <p>
              <strong>DELETE:</strong>
              Removes a resource from the server (e.g., deleting a post).{" "}
            </p>
            <p>
              {" "}
              <strong>Request:</strong>
              This is the data and instructions sent to the API. It often
              includes parameters, headers, and a body (for POST and PUT
              requests).{" "}
            </p>
            <p>
              {" "}
              <strong> Response:</strong>
              This is the data and status code that the API sends back after
              processing a request. It could be a success message, the requested
              data, or an error.{" "}
            </p>
            <p>
              {" "}
              <strong> Authentication:</strong> APIs often require a way to
              verify the user's identity. This is commonly done using a token
              (like a key) that is included with each request to prove the user
              has permission to access the data.
            </p>
          </div>
        </section>
        <section className="sequence-diagram">
          <h2>(7) Sequence Diagram</h2>
          <p>
            A sequence diagram is a type of chart that shows how processes or
            objects interact with each other over time. It's a key tool in
            software development and system design because it visually
            represents the order in which messages or function calls are sent
            between different parts of a system.
          </p>
          <Suspense fallback="loading sequence diagram...">
            {data.sequenceDiagram && (
              <RenderSequenceDiagram
                dbSequenceCode={data.sequenceDiagram.mermaidCode}
              />
            )}
          </Suspense>
        </section>

        <section className="proposal-section techStack">
          <h2>Technology Stack</h2>
          <ul>
            <Suspense>
              {data.proposal.techStack.map((tech, index) => (
                <li key={index}>
                  <strong> ({index + 1})</strong>
                  <span className="tech-name">
                    <i>
                      <strong>{tech.technology}</strong>
                    </i>
                  </span>
                  : {tech.reason}
                </li>
              ))}
            </Suspense>
          </ul>
        </section>
      </div>
    </>
  );
}
