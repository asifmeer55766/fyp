import { markTaskCompleted } from "../../redux/taskStatusSlice";
import { toast } from "react-toastify";

/**
 
 * @param {Function} dispatch The Redux dispatch function.
 */
export const GenerateSystemDesign = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const projectId = localStorage.getItem("projectId");
    const originalPrompt = localStorage.getItem("originalPrompt");

    if (!originalPrompt) {
      console.error("No original prompt found in localStorage.");
      toast.error("Please provide a prompt first.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/generate-system-design",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originalUserPrompt: originalPrompt,
          projectId,
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
    dispatch(markTaskCompleted("systemArchitecture"));
  } catch (error) {
    console.error("Error generating system design:", error);
    toast.error(`Error generating diagram: ${error.message}`);
  }
};
