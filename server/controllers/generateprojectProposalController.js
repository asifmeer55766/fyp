// controllers/projectProposalController.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
const connectDB = require("../database/db");
const ProjectProposal = require("../models/projectProposalModel");

// Initialize with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

/**
 * Express Controller: Generates a project proposal from a user prompt.
 * 1. Sends a detailed prompt to Gemini for a structured JSON response.
 * 2. Parses the JSON and saves it to the database.
 */
exports.generateProjectProposal = async (req, res) => {
  try {
    await connectDB();
    const { originalUserPrompt, projectId } = req.body;

    // A detailed prompt ensures the AI returns the correct JSON structure
    const prompt = `You are a project manager. A user has an idea for a software project: "${originalUserPrompt}".
Generate a detailed project proposal in JSON format. The JSON must strictly follow this structure:

{
  "projectName": "A concise, descriptive name for the project",
  "description": "A detailed description of the project, including its purpose and key features. Use Markdown for formatting.",
  "stakeholders": [
    "List of key stakeholders (e.g., users, product manager, developers)"
  ],
  "useCases": [
    "List of major user stories or use cases for the project"
  ],
  "techStack": [
    {
      "technology": "Technology name (e.g., React, Express.js, MongoDB)",
      "reason": "A brief reason why this technology is suitable for the project"
    }
  ]
}

Rules:
- Generate only a single, valid JSON object.
- Do not include any extra text, markdown, or explanations outside the JSON block.
- Ensure all fields are populated with relevant information.`;

    // 🔹 Ask Gemini for JSON
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Clean up the response to ensure it's valid JSON
    let cleanedText = responseText
      .replace(/^```json/i, "")
      .replace(/```$/, "")
      .trim();

    let jsonData;
    try {
      jsonData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("❌ AI returned invalid JSON:", cleanedText);
      return res.status(400).json({
        error:
          "AI returned invalid JSON. Please try again with a clearer prompt.",
      });
    }

    // 🔹 Validate that the parsed JSON has the required fields
    if (!jsonData.projectName || !jsonData.description || !jsonData.techStack) {
      return res
        .status(400)
        .json({ error: "Invalid data generated. Missing required fields." });
    }

    // 🔹 Save the JSON to the database
    const savedProposal = await ProjectProposal.create({
      projectName: jsonData.projectName,
      description: jsonData.description,
      stakeholders: jsonData.stakeholders,
      useCases: jsonData.useCases,
      techStack: jsonData.techStack,
      jsonData,
      userId: req.user._id,
      projectId,
    });

    res.status(201).json({
      message: "Project proposal generated and saved successfully",
      data: savedProposal,
    });
  } catch (error) {
    console.error("❌ Error generating project proposal:", error.message);
    res.status(500).json({ error: "Failed to generate project proposal" });
  }
};

/**
 * Express Controller: Fetches the latest project proposal from the database.
 */
exports.getLatestProjectProposal = async (req, res) => {
  try {
    await connectDB();
    // Fetch the latest document by sorting by creation date
    const latestProposal = await ProjectProposal.findOne().sort({
      createdAt: -1,
    });

    if (!latestProposal) {
      return res.status(404).json({ message: "No project proposals found." });
    }

    res.json({
      message: "Latest project proposal fetched successfully",
      data: latestProposal,
    });
  } catch (error) {
    console.error("❌ Error fetching project proposal:", error.message);
    res.status(500).json({ error: "Failed to fetch project proposal" });
  }
};
