import React, { useEffect, useState } from "react";
import SystemTree from "./SystemTree";
import { useDispatch } from "react-redux";
import { markTaskCompleted } from "../../redux/taskStatusSlice";
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

export default function TreeViewer() {
  const [treeData, setTreeData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:5000/api/getHLD")
      .then((res) => res.json())
      .then((data) => {
        const treeStructure = transformToTreeFormat(data);
        setTreeData(treeStructure);
      })
      .catch((err) => console.error("Error loading HLD:", err));
  }, []);

  if (!treeData) return <p>Loading HLD...</p>;
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
      <SystemTree data={treeData} />
    </div>
  );
}
