import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import SoftwareImage from "../../assets/icons/green.png";
import majormodule from "../../assets/icons/red.png";

// Custom node element that uses an image instead of a circle
const renderCustomNode = ({ nodeDatum, toggleNode }) => {
  return (
    <g>
      {/* Conditionally render the image or SVG based on whether it's a leaf node */}
      {nodeDatum.children ? (
        <image
          href={SoftwareImage}
          x="-75"
          y="-25"
          width="40"
          height="40"
          onClick={toggleNode}
          style={{
            transform: "scaleX(-1)", // flip horizontally
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      ) : (
        <image
          x="-15"
          y="-10"
          onClick={toggleNode}
          href={majormodule}
          width="20"
          height="20"
        />
      )}

      {/* Node label */}
      <text
        x="20"
        y="5"
        textAnchor="start"
        fontSize="14"
        fill="#333"
        strokeWidth=".5"
      >
        {nodeDatum.name}
      </text>
    </g>
  );
};

export default function SystemTree({ data }) {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [treeData, setTreeData] = useState(data);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // This effect runs once to get the initial container's dimensions.
  useEffect(() => {
    if (treeContainer.current) {
      const { offsetWidth, offsetHeight } = treeContainer.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  // Recursively expand all nodes to ensure the entire tree is visible initially.
  const expandAll = (node) => {
    if (node.children && node.children.length > 0) {
      node._collapsed = false; // Set the private collapsed state to false
      node.children.forEach(expandAll);
    }
  };

  // This effect expands the tree whenever the data prop changes.
  useEffect(() => {
    if (data) {
      const clonedData = JSON.parse(JSON.stringify(data));
      expandAll(clonedData);
      setTreeData(clonedData);
    }
  }, [data]);

  // Use a second useEffect with a slight delay to allow the tree to render
  // and then calculate its size.
  useEffect(() => {
    if (treeData && treeContainer.current) {
      // Small delay to ensure the SVG has been rendered by react-d3-tree
      const timer = setTimeout(() => {
        const treeSvg = treeContainer.current.querySelector("svg");
        if (treeSvg) {
          const bbox = treeSvg.getBBox();
          // Add some padding to the calculated dimensions
          const calculatedWidth = bbox.width + 100; // 100px padding
          const calculatedHeight = bbox.height + 100; // 100px padding
          setSvgDimensions({
            width: calculatedWidth,
            height: calculatedHeight,
          });
        }
      }, 50); // A small delay is often needed for the DOM to update
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [treeData]);

  return (
    <div
      ref={treeContainer}
      className="tree-container"
      style={{
        width: "100%",
        // Set height dynamically
        height: `${svgDimensions.height}px`,
        margin: "0 auto",
        padding: "15mm",
        boxSizing: "border-box",
        overflow: "visible", // Change to "visible" to allow tree to expand
        backgroundColor: "#fff",
      }}
    >
      {treeData && (
        <Tree
          data={treeData}
          orientation="horizontal"
          translate={{ x: 50, y: svgDimensions.height / 2 || 500 }}
          pathFunc="diagonal"
          collapsible={false} // Disable collapsible since we're expanding all
          nodeSize={{ x: 210, y: 50 }}
          renderCustomNodeElement={renderCustomNode}
          styles={{
            nodes: {
              node: {
                name: {
                  fontSize: "10px",
                  fill: "#333",
                  whiteSpace: "pre-wrap",
                },
                attributes: { fontSize: "8px", fill: "#777" },
              },
              leafNode: {
                name: {
                  fontSize: "10px",
                  fill: "#333",
                  whiteSpace: "pre-wrap",
                },
                attributes: { fontSize: "8px", fill: "#777" },
              },
            },
          }}
        />
      )}
    </div>
  );
}
