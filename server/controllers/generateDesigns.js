import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with API key
const genAI = new GoogleGenerativeAI(
  "AIzaSyBKHgoOpRV6 - L8bfLwiwWfE_hHN21b8CGs"
);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Or gemini-1.5-pro-latest

export const generateDesign = async (req, res) => {
  const { functional, nonFunctional, originalUserPrompt } = req.body;

  if (!functional || !nonFunctional || !originalUserPrompt) {
    return res.status(400).json({ error: "All required fields missing" });
  }

  const formatRequirements = (reqs) =>
    reqs.map((item, i) => `${i + 1}. ${Object.values(item)[0]}`).join("\n");

  const functionalText = formatRequirements(functional);
  const nonFunctionalText = formatRequirements(nonFunctional);

  const prompt = `
You are a system architect. A user wants the following system: "${originalUserPrompt}"

Use the following requirements to build a High-Level Design (HLD).

Functional Requirements:
${functionalText}

Non-Functional Requirements:
${nonFunctionalText}

Generate a tree-like JSON structure of the system components like this:
{
  "name": "System Name",
  "children": [
    {
      "name": "Component",
      "children": [{ "name": "Subcomponent" }]
    }
  ]
}
Respond ONLY with JSON. Do not explain.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    res.json({ design: responseText });
    console.log("responses is :", responseText);
  } catch (error) {
    console.error("Error generating HLD:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
