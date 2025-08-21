// controllers/sequenceDiagramController.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
const connectDB = require("../database/db");
const SequenceDiagram = require("../models/sequenceDiagramModel");

// Initialize with a new instance of the AI model
const genAI = new GoogleGenerativeAI("AIzaSyBKHgoOpRV6-L8bfLwiwWfE_hHN21b8CGs");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Converts structured JSON into Mermaid Sequence Diagram code.
 * This is the core logic for translating the AI's output.
 */
function jsonToMermaidSequence(jsonData) {
  let mermaidCode = "sequenceDiagram\n";
  const participants = new Set();

  // Collect all participants first to declare them at the top
  if (jsonData.messages && Array.isArray(jsonData.messages)) {
    jsonData.messages.forEach((msg) => {
      participants.add(msg.from);
      participants.add(msg.to);
    });
  }

  // Declare all unique participants
  participants.forEach((p) => {
    mermaidCode += `    participant ${p}\n`;
  });

  // Add a newline for better readability
  mermaidCode += "\n";

  // Add the messages in sequence
  if (jsonData.messages && Array.isArray(jsonData.messages)) {
    jsonData.messages.forEach((msg) => {
      const type = msg.type || "->>";
      const message = msg.message || "";
      const note = msg.note || "";

      // Add the message line
      mermaidCode += `    ${msg.from}${type}${msg.to}: ${message}\n`;

      // Add a note if it exists
      if (note) {
        mermaidCode += `    Note over ${msg.from},${msg.to}: ${note}\n`;
      }
    });
  }

  return mermaidCode;
}

/**
 * Express Controller: Generates a sequence diagram from a user prompt.
 * 1. Prompts Gemini for structured JSON.
 * 2. Converts JSON to Mermaid code.
 * 3. Saves the code to the MongoDB database.
 */
exports.generateSequenceDiagram = async (req, res) => {
  try {
    await connectDB();
    const { originalUserPrompt } = req.body;

    const prompt = `You are a system architect. A user wants to model the data flow for the following system: "${originalUserPrompt}".
Generate a sequence diagram in JSON format that strictly follows this structure:

{
  "title": "A short, descriptive title",
  "messages": [
    {
      "from": "ParticipantA",
      "to": "ParticipantB",
      "type": "->> | -->> | -x | --x",
      "message": "A brief description of the action",
      "note": "An optional note over the message"
    }
  ]
}

Rules:
- The "from" and "to" properties must be single words or camelCase.
- Do not include Mermaid code, markdown formatting, or natural language outside the JSON.
- Ensure the JSON is a single, valid object.
- Valid "type" options are: "->>", "-->>", "-x", "--x". Default to "->>" if unsure.
- The note field is optional.
- The title should be a short string.
- Do not include an empty array for messages.
`;

    // 🔹 Ask Gemini for JSON
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    let cleanedText = responseText
      .replace(/^```(json)?/i, "")
      .replace(/```$/, "")
      .trim();

    let jsonData;
    try {
      jsonData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("❌ Invalid JSON from AI:", cleanedText);
      return res.status(400).json({
        error:
          "AI returned invalid JSON. Please try again with a clearer prompt.",
      });
    }

    // 🔹 Convert JSON to Mermaid
    let mermaidCode;
    try {
      mermaidCode = jsonToMermaidSequence(jsonData);
    } catch (e) {
      console.error("❌ Error converting JSON to Mermaid:", e.message);
      return res.status(500).json({ error: "Failed to convert to Mermaid" });
    }

    // 🔹 Save to DB
    const saved = await SequenceDiagram.create({
      diagramName: jsonData.title || "Untitled Sequence Diagram",
      mermaidCode: mermaidCode,
      userId: req.user._id,
    });

    res.json({ raw: mermaidCode });
  } catch (error) {
    console.error("❌ Error generating sequence diagram:", error.message);
    res.status(500).json({ error: "Failed to generate sequence diagram" });
  }
};

/**
 * Express Controller: Fetches the latest sequence diagram from the database.
 */
exports.getLatestSequenceDiagram = async (req, res) => {
  try {
    await connectDB();
    const latestDiagram = await SequenceDiagram.findOne().sort({
      createdAt: -1,
    });

    if (!latestDiagram) {
      return res.status(404).json({ message: "No sequence diagrams found." });
    }

    res.json(latestDiagram.mermaidCode); // Return just the string
  } catch (error) {
    console.error("❌ Error fetching sequence diagram:", error.message);
    res.status(500).json({ error: "Failed to fetch sequence diagram" });
  }
};
