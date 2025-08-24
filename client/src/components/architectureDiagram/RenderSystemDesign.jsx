// components/renderers/RenderSystemDesign.jsx

import React, { useEffect, useState } from "react";
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const RenderSystemDesign = () => {
  const [svgContent, setSvgContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dbFlowchartCode, setDbFlowchartCode] = useState("");

  // Step 1: Fetch the Mermaid code from the backend
  useEffect(() => {
    const fetchSystemDesign = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/get-system-design"
        );
        const data = await response.json();

        if (data) {
          // Set the fetched code directly.
          // IMPORTANT: Do NOT strip the 'graph TD' header.
          setDbFlowchartCode(data);
        } else {
          console.error("Fetched data is empty.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch system design data:", error);
        setIsLoading(false);
      }
    };

    fetchSystemDesign();
  }, []); // Runs once on component mount

  // Step 2: Render the Mermaid code into SVG once the code is fetched
  useEffect(() => {
    if (dbFlowchartCode) {
      const renderMermaidDiagram = async () => {
        try {
          mermaid.initialize({ startOnLoad: false, theme: "default" });
          const { svg } = await mermaid.render(
            "system-design-svg",
            dbFlowchartCode // Pass the full, un-stripped code here
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
  }, [dbFlowchartCode]); // Reruns when dbFlowchartCode changes

  // Step 3: Auto-scale the SVG to fit its container
  useEffect(() => {
    if (!isLoading && svgContent) {
      const container = document.querySelector(".system-design-container");
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
    <div className="system-design-container">
      {isLoading ? (
        <div className="loading-message">Loading diagram...</div>
      ) : (
        <div
          id="system-design-container"
          className="mermaid-diagram-container"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </div>
  );
};

export default RenderSystemDesign;
