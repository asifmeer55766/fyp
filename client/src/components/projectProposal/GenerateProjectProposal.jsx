// components/generators/GenerateProjectProposal.jsx

import { markTaskCompleted } from "../../redux/taskStatusSlice";
import { toast } from "react-toastify";

/**
 * Generates a project proposal by calling the backend API.
 * This function handles the POST request to trigger the generation process.
 * @param {Function} dispatch The Redux dispatch function.
 */
export const GenerateProjectProposal = async (dispatch) => {
  try {
    console.log("Starting project proposal generation...");
    const originalPrompt = localStorage.getItem("originalPrompt");

    if (!originalPrompt) {
      toast.error("Please provide a prompt first.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/generate-project-proposal",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalUserPrompt: originalPrompt,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    dispatch(markTaskCompleted("documentation"));
    toast.success("Project Proposal is completed!");
  } catch (error) {
    console.error("Error generating project proposal:", error);
    toast.error(`Error generating proposal: ${error.message}`);
  }
};
