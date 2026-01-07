import React, { useEffect, useState } from "react";
import SystemTreeLLD from "./SystemTreeLLD";
import { useDispatch } from "react-redux";

function transformToTreeFormat(node) {
  if (!node) {
    return null;
  }
  const transformed = {
    name: node.name,
  };

  if (Array.isArray(node.children) && node.children.length > 0) {
    transformed.children = node.children.map(transformToTreeFormat);
  }

  return transformed;
}

export default function TreeViewerLLD({ treeData }) {
  if (!treeData) {
    console.log("treeData is not available, skipping transformation.");
    return null;
  }

  const treeStructure = transformToTreeFormat(treeData);
  console.log("tree structure", treeStructure);

  if (!treeStructure) {
    console.log("Transformation returned null, nothing to render.");
    return null;
  }

  if (!treeStructure) return <p>Loading LLD...</p>;

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
