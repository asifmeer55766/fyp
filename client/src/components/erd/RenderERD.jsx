import React, { useEffect, useState } from "react";
import "./ERD.css";
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const RenderERD = ({ dbErdCode }) => {
  const [svgContent, setSvgContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const cleanedErdCode = dbErdCode.replace(/^mermaid\s*/, "");

  useEffect(() => {
    if (dbErdCode) {
      const renderMermaidDiagram = async () => {
        try {
          mermaid.initialize({ startOnLoad: false, theme: "default" });
          const { svg } = await mermaid.render("erd-diagram-svg", dbErdCode);
          setSvgContent(svg);
          setIsLoading(false);
        } catch (e) {
          console.error("Mermaid.js rendering failed:", e);
          setIsLoading(false);
        }
      };

      renderMermaidDiagram();
    }
  }, [dbErdCode]);

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
    <div className="erd-container">
      {isLoading ? (
        <div className="loading-message">Loading diagram...</div>
      ) : (
        <div
          id="erd-diagram-container"
          className="mermaid-diagram-container"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </div>
  );
};

export default RenderERD;
