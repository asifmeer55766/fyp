// controllers/systemDesignController.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
const connectDB = require("../database/db");
const SystemDesign = require("../models/systemDesignModel");

// Initialize with a new instance of the AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Converts a structured JSON object into Mermaid Flowchart code.
 * This function translates the AI's architecture output into a renderable diagram.
 * @param {object} jsonData The structured JSON data from the AI.
 * @returns {string} The Mermaid flowchart code.
 */
function jsonToMermaidFlowchart(jsonData) {
  // Start with the flowchart type, specifying a top-down direction
  let mermaidCode = "graph TD\n";

  // Add nodes/subgraphs from the 'nodes' array
  if (jsonData.nodes && Array.isArray(jsonData.nodes)) {
    jsonData.nodes.forEach((node) => {
      // Sanitize the label to prevent Mermaid parsing errors from special characters
      const sanitizedLabel = (node.label ?? "").replace(/[\[\]\(\)]/g, "");

      if (node.type === "subgraph") {
        // Handle subgraphs for grouping components
        mermaidCode += `  subgraph "${node.title}"\n`;
        node.members.forEach((member) => {
          const sanitizedMemberLabel = (member.label ?? "").replace(
            /[\[\]\(\)]/g,
            ""
          );
          mermaidCode += `    ${member.id}[${sanitizedMemberLabel}]\n`;
        });
        mermaidCode += `  end\n\n`;
      } else {
        // Handle individual nodes
        mermaidCode += `  ${node.id}[${sanitizedLabel}]\n`;
      }
    });
  }

  // Add connections/edges from the 'edges' array
  if (jsonData.edges && Array.isArray(jsonData.edges)) {
    jsonData.edges.forEach((edge) => {
      // Determine the connector type and label
      const type = edge.type || "-->";
      const label = edge.label ? `|"${edge.label}"|` : "";
      mermaidCode += `  ${edge.from} ${type}${label} ${edge.to}\n`;
    });
  }

  return mermaidCode;
}

/**
 * Express Controller: Generates a system design flowchart from a user prompt.
 * 1. Prompts Gemini for structured JSON based on the user's input.
 * 2. Converts the JSON to Mermaid flowchart code using the helper function.
 * 3. Saves the generated code to the MongoDB database.
 */
exports.generateSystemDesign = async (req, res) => {
  try {
    await connectDB();
    const { originalUserPrompt, projectId } = req.body;

    // --- VALIDATION AND ERROR HANDLING ---
    // 1. Check for empty prompt
    if (!originalUserPrompt || originalUserPrompt.trim() === "") {
      return res.status(400).json({ error: "Prompt cannot be empty." });
    }

    // 2. Check for placeholder API key
    if (genAI.apiKey === "AIzaSyBKHgoOpRV6-L8bfLwiwWfE_hHN21b8CGs") {
      console.error(
        "❌ Invalid API Key: Please replace the placeholder API key."
      );
      return res
        .status(500)
        .json({ error: "Server-side configuration error." });
    }
    // --- END OF VALIDATION ---

    const prompt = `You are a system architect. A user wants to design the architecture for the following system: "${originalUserPrompt}".
Generate a system architecture in JSON format that strictly follows this structure:

{
  "title": "A short, descriptive title",
  "nodes": [
    {
      "id": "nodeId",
      "label": "Node Description",
      "type": "node"
    },
    {
      "title": "Subgraph Title",
      "type": "subgraph",
      "members": [
        { "id": "subgraphMemberId", "label": "Member Description" }
      ]
    }
  ],
  "edges": [
    {
      "from": "sourceId",
      "to": "destinationId",
      "type": "--> | -.-> | --x",
      "label": "A brief description of the data flow"
    }
  ]
}

Rules:
- The "id" properties must be unique, single words, or camelCase.
- The "from" and "to" IDs must correspond to a valid ID in the "nodes" array.
- Do not include Mermaid code, markdown formatting, or natural language outside the JSON.
- Ensure the JSON is a single, valid object.
- Valid "type" options for edges are: "-->", "-.->", "--x". Default to "-->" if unsure.
- The title should be a short string.
- Do not include empty arrays for nodes or edges.
`;

    let jsonData;
    try {
      // 🔹 Ask Gemini for the structured JSON
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      let cleanedText = responseText
        .replace(/^```(json)?/i, "")
        .replace(/```$/, "")
        .trim();

      jsonData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("❌ Invalid JSON from AI:", parseError.message);
      return res.status(400).json({
        error:
          "AI returned invalid JSON. Please try again with a clearer prompt.",
      });
    }

    let mermaidCode;
    try {
      // 🔹 Convert JSON to Mermaid Flowchart code
      mermaidCode = jsonToMermaidFlowchart(jsonData);
    } catch (e) {
      console.error("❌ Error converting JSON to Mermaid:", e.message);
      return res.status(500).json({ error: "Failed to convert to Mermaid" });
    }

    try {
      // 🔹 Save the new flowchart to the database
      const saved = await SystemDesign.create({
        diagramName: jsonData.title || "Untitled System Design",
        mermaidCode: mermaidCode,
        userId: req.user._id, // Assumes user authentication is handled
        projectId,
      });

      // Respond with the raw Mermaid code
      res.json({ raw: mermaidCode });
    } catch (dbError) {
      console.error("❌ Error saving to database:", dbError.message);
      res.status(500).json({ error: "Failed to save to database" });
    }
  } catch (error) {
    console.error("❌ An unexpected error occurred:", error.message);
    res.status(500).json({ error: "Failed to generate system design diagram" });
  }
};

/**
 * Express Controller: Fetches the latest system design flowchart from the database.
 */
exports.getLatestSystemDesign = async (req, res) => {
  try {
    await connectDB();
    const latestDesign = await SystemDesign.findOne().sort({
      createdAt: -1,
    });

    if (!latestDesign) {
      return res.status(404).json({ message: "No system designs found." });
    }

    // Return just the Mermaid code string
    res.json(latestDesign.mermaidCode);
  } catch (error) {
    console.error("❌ Error fetching system design:", error.message);
    res.status(500).json({ error: "Failed to fetch system design diagram" });
  }
};
