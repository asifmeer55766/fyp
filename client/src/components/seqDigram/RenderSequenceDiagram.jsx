// components/renderers/RenderSequenceDiagram.jsx

import React, { useEffect, useState } from "react";
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const RenderSequenceDiagram = ({ dbSequenceCode }) => {
  const [svgContent, setSvgContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const cleanedSequenceCode = dbSequenceCode.replace(/^mermaid\s*/, "");

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
  }, [dbSequenceCode]);

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
