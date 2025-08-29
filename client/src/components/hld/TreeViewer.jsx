import React, { useEffect, useState } from "react";
import SystemTree from "./SystemTree";
import { useDispatch } from "react-redux";
// Recursive function to transform the nested data
function transformToTreeFormat(node) {
  const transformed = {
    name: node.name,
  };

  if (Array.isArray(node.children) && node.children.length > 0) {
    transformed.children = node.children.map(transformToTreeFormat);
  }

  return transformed;
}

export default function TreeViewer({ treeData }) {
  // const [treeData, setTreeData] = useState(null);
  const dispatch = useDispatch();
  const treeStructure = transformToTreeFormat(treeData);
  if (!treeData) return <p>Loading HLD...</p>;
  return (
    <div
      className="outer-div"
      style={{
        height: "auto",
        width: "100%",
      }}
    >
      <SystemTree data={treeStructure} />
    </div>
  );
}
