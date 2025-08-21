import React from "react";
// GenerateLLD.jsx
import { markTaskCompleted } from "../../redux/taskStatusSlice";
import { toast } from "react-toastify";

export default async function GenerateAPI(dispatch) {
  try {
    const token = localStorage.getItem("token");

    const originalPrompt = localStorage.getItem("originalPrompt");
    const response = await fetch("http://localhost:5000/api/generate-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        originalUserPrompt: originalPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`API HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    dispatch(markTaskCompleted("apis"));
    toast.success("API is completed");
  } catch (error) {
    console.error("Error generating API:", error);
  }
}
