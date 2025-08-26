import React from "react";
// GenerateLLD.jsx
import { markTaskCompleted } from "../../redux/taskStatusSlice";
import { toast } from "react-toastify";

export default async function GenerateAPI(dispatch) {
  try {
    const token = localStorage.getItem("token");
    const projectId = localStorage.getItem("projectId");
    const originalPrompt = localStorage.getItem("originalPrompt");
    const response = await fetch("http://localhost:5000/api/generate-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        originalUserPrompt: originalPrompt,
        projectId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    dispatch(markTaskCompleted("apis"));
  } catch (error) {
    console.error("Error generating API:", error);
  }
}
