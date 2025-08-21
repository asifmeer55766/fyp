// GenerateLLD.jsx
import { markTaskCompleted } from "../../redux/taskStatusSlice";
import { toast } from "react-toastify";

// Accept dispatch as an argument
export const GenerateLLD = async (dispatch) => {
  try {
    const originalPrompt = localStorage.getItem("originalPrompt");
    const token = localStorage.getItem("token"); // 🔹 Get token from localStorage
    const response = await fetch("http://localhost:5000/api/generate-lld", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔹 Send token to backend
      },
      body: JSON.stringify({
        originalUserPrompt: originalPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`LLD HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Generated LLD:", data);
    dispatch(markTaskCompleted("lld"));
    toast.success("LLD is completed");
  } catch (error) {
    console.error("Error generating LLD:", error);
  }
};
