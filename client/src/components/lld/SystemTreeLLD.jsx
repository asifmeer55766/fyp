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
          width="50"
          height="50"
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
          y="-15"
          onClick={toggleNode}
          href={majormodule}
          width="35"
          height="35"
        />
      )}

      {/* Node label */}
      <text
        x="20"
        y="5"
        textAnchor="start"
        fontSize="16"
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

  // This effect runs once to get the container's dimensions for centering the tree.
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
  // It deep clones the data to avoid modifying the original prop.
  useEffect(() => {
    if (data) {
      const clonedData = JSON.parse(JSON.stringify(data));
      expandAll(clonedData);
      setTreeData(clonedData);
    }
  }, [data]);

  return (
    <div
      ref={treeContainer}
      style={{
        width: "100%", // A4 width
        height: "297mm", // A4 height
        margin: "0 auto", // Center the container
        padding: "15mm", // Add some margin for printing
        boxSizing: "border-box", // Include padding in the dimensions
        overflow: "hidden", // Hide any overflow to prevent scrolling
        backgroundColor: "#fff", // Set a white background for printing
      }}
    >
      {dimensions.width > 0 && (
        <Tree
          data={treeData}
          orientation="horizontal"
          translate={{ x: 50, y: dimensions.height / 2 }}
          pathFunc="elbow"
          collapsible={true}
          nodeSize={{ x: 240, y: 100 }}
          // Use the custom renderer here to display images/icons
          renderCustomNodeElement={renderCustomNode}
          styles={{
            nodes: {
              node: {
                // The circle properties are no longer used since we are rendering a custom node.
                // We'll keep the text styles for the attributes.
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
