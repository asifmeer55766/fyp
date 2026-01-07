import React, { useEffect, useState } from "react";
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const RenderSystemDesign = ({ dbFlowchartCode }) => {
  const [svgContent, setSvgContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (dbFlowchartCode) {
      const renderMermaidDiagram = async () => {
        try {
          mermaid.initialize({ startOnLoad: false, theme: "default" });
          const { svg } = await mermaid.render(
            "system-design-svg",
            dbFlowchartCode
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
  }, [dbFlowchartCode]);

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
