// GenerateLLD.jsx
import { markTaskCompleted } from "../../redux/taskStatusSlice";
import { toast } from "react-toastify";

// Accept dispatch as an argument
export const GenerateERD = async (dispatch) => {
  try {
    console.log("Starting ERD generation...");
    const originalPrompt = localStorage.getItem("originalPrompt");
    const response = await fetch("http://localhost:5000/api/generate-erd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        originalUserPrompt: originalPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`ERD HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Generated ERD:", data);
    dispatch(markTaskCompleted("diagrams"));
    toast.success("LLD is completed");
  } catch (error) {
    console.error("Error generating LLD:", error);
  }
};
