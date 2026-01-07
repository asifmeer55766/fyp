import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import SoftwareImage from "../../assets/icons/green.png";
import majormodule from "../../assets/icons/red.png";
const renderCustomNode = ({ nodeDatum, toggleNode }) => {
  return (
    <g>
      {nodeDatum.children ? (
        <image
          href={SoftwareImage}
          x="-75"
          y="-25"
          width="40"
          height="40"
          onClick={toggleNode}
          style={{
            transform: "scaleX(-1)",
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

  useEffect(() => {
    if (treeContainer.current) {
      const { offsetWidth, offsetHeight } = treeContainer.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const expandAll = (node) => {
    if (node.children && node.children.length > 0) {
      node._collapsed = false;
      node.children.forEach(expandAll);
    }
  };

  useEffect(() => {
    if (data) {
      const clonedData = JSON.parse(JSON.stringify(data));
      expandAll(clonedData);
      setTreeData(clonedData);
    }
  }, [data]);

  useEffect(() => {
    if (treeData && treeContainer.current) {
      const timer = setTimeout(() => {
        const treeSvg = treeContainer.current.querySelector("svg");
        if (treeSvg) {
          const bbox = treeSvg.getBBox();

          const calculatedWidth = bbox.width + 100;
          const calculatedHeight = bbox.height + 100;
          setSvgDimensions({
            width: calculatedWidth,
            height: calculatedHeight,
          });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [treeData]);

  return (
    <div
      ref={treeContainer}
      className="tree-container"
      style={{
        width: "100%",

        height: `${svgDimensions.height}px`,
        margin: "0 auto",
        padding: "15mm",
        boxSizing: "border-box",
        overflow: "visible",
        backgroundColor: "#fff",
      }}
    >
      {treeData && (
        <Tree
          data={treeData}
          orientation="horizontal"
          translate={{ x: 80, y: svgDimensions.height / 2 || 500 }}
          pathFunc="diagonal"
          collapsible={false}
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
