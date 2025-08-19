// components/renderers/RenderSequenceDiagram.jsx

import React, { useEffect, useState } from "react";
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const RenderSequenceDiagram = () => {
  const [svgContent, setSvgContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dbSequenceCode, setDbSequenceCode] = useState("");

  // Step 1: Fetch Mermaid code from backend on component mount
  useEffect(() => {
    const fetchSequenceDiagram = async () => {
      try {
        // Use the new GET endpoint
        const response = await fetch(
          "http://localhost:5000/api/get-sequencediagram"
        );
        const data = await response.json();

        if (data) {
          // Remove leading "mermaid" keyword if present and set the state
          const cleanedSequenceCode = data.replace(/^mermaid\s*/, "");
          setDbSequenceCode(cleanedSequenceCode);
        } else {
          console.error("Fetched data is empty.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch sequence diagram data:", error);
        setIsLoading(false);
      }
    };

    fetchSequenceDiagram();
  }, []); // Empty dependency array means this runs once

  // Step 2: Render Mermaid code into SVG once the code is fetched
  useEffect(() => {
    if (dbSequenceCode) {
      const renderMermaidDiagram = async () => {
        try {
          mermaid.initialize({ startOnLoad: false, theme: "default" });
          const { svg } = await mermaid.render(
            "sequence-diagram-svg",
            dbSequenceCode
          );
          setSvgContent(svg);
          setIsLoading(false);
        } catch (e) {
          console.error("Mermaid.js rendering failed:", e);
          setIsLoading(false);
        }
      };

      renderMermaidDiagram();
    }
  }, [dbSequenceCode]); // Reruns when dbSequenceCode changes

  // Step 3: Auto-scale the SVG to fit its container
  useEffect(() => {
    if (!isLoading && svgContent) {
      const container = document.querySelector(".mermaid-diagram-container");
      const svg = container?.querySelector("svg");
      if (svg) {
        const containerWidth = container.clientWidth;
        const svgWidth = svg.getBBox().width;
        const scale = containerWidth / svgWidth;

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "auto");
        svg.style.transform = `scale(${Math.min(scale, 1)})`;
        svg.style.transformOrigin = "center top";
      }
    }
  }, [isLoading, svgContent]);

  return (
    <div className="sequence-diagram-container">
      {isLoading ? (
        <div className="loading-message">Loading diagram...</div>
      ) : (
        <div
          id="sequence-diagram-container"
          className="mermaid-diagram-container"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </div>
  );
};

export default RenderSequenceDiagram;
