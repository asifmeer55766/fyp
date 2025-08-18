import React, { useEffect, useState } from "react";
import SystemTreeLLD from "./SystemTreeLLD";
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

export default function TreeViewerLLD() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/getLLD")
      .then((res) => res.json())
      .then((data) => {
        const treeStructure = transformToTreeFormat(data);
        setTreeData(treeStructure);
      })
      .catch((err) => console.error("Error loading LLD:", err));
  }, []);

  if (!treeData) return <p>Loading LLD...</p>;
  // console.log("tree data ", treeData);
  // dispatch(markTaskCompleted("hld"));
  return (
    <div
      className="outer-div"
      style={{
        height: "auto",
        width: "100%",
      }}
    >
      <SystemTreeLLD data={treeData} />
    </div>
  );
}
