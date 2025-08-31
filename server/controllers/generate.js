const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs").promises;
const connectDB = require("../database/db");
const ResponseModel = require("../models/response");

const Project = require("../models/Project");
// Initialize with API key
const genAI = new GoogleGenerativeAI(
  "AIzaSyBKHgoOpRV6 - L8bfLwiwWfE_hHN21b8CGs"
);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Or gemini-1.5-pro-latest

// 🔹 Common prefix prompt
const prefix = `First of all analyze the prompt entered by user if it is irrelvent or not describing and defining any software requirement or dicussing about software , website, web application, mobile application or any type of software ,
        just return false because you are design to generate only the functional and non functional requirements of software system just and not for any other even a single word , if it is about software system then 
        just write its functional and non functional requirements only in the form of json like this:
 {
  "functional_requirements": [
      {
         "requirements": []
      },
      {
         "requirements": []
      },
  ],
   "non_functional_requirements": [
    {
      "requirements": []
    },
    {
      "requirements": []
    },
  ]
}`;

// ===================================================
// Create NEW project with requirements
// ===================================================
exports.generateRequirements = async (req, res) => {
  try {
    await connectDB();
    const { prompt } = req.body;
    const userId = req.user._id;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const finalPrompt = `User Prompt : ${prompt}. ${prefix}`;
    const result = await model.generateContent(finalPrompt);
    let cleanedText = result.response
      .text()
      .trim()
      .replace(/^```(json)?/i, "")
      .replace(/```$/, "")
      .trim();

    if (cleanedText.replace(/["']/g, "").trim().toLowerCase() === "false") {
      return res.status(400).json({
        error:
          "Your input appears unrelated to system design. Kindly provide a valid prompt describing software requirements to continue...",
      });
    }

    let jsonData;
    try {
      jsonData = JSON.parse(cleanedText);
    } catch {
      jsonData = { raw: cleanedText };
    }

    const fr = jsonData.functional_requirements?.[0]?.requirements || [];
    const nfr = jsonData.non_functional_requirements?.[0]?.requirements || [];

    // ✅ Create a new project
    const project = await Project.create({
      userId,
      title: prompt.length > 60 ? `${prompt.slice(0, 60)}...` : prompt,
      description: "Auto-generated from requirements step",
    });

    // ✅ Save response
    const saved = await ResponseModel.create({
      prompt,
      functional_requirements: fr,
      non_functional_requirements: nfr,
      userId,
      projectId: project._id,
    });

    return res.json({
      message: "Saved",
      data: saved,
      projectId: project._id,
    });
  } catch (error) {
    console.error("❌ Error generating content:", error.message);
    res.status(500).json({ error: "Failed to generate content" });
  }
};

// ===================================================
// Update EXISTING project requirements
// ===================================================
exports.updateRequirements = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params; // projectId from URL
    const { prompt } = req.body;
    const userId = req.user._id;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const finalPrompt = `User Prompt : ${prompt}. ${prefix}`;
    const result = await model.generateContent(finalPrompt);
    let cleanedText = result.response
      .text()
      .trim()
      .replace(/^```(json)?/i, "")
      .replace(/```$/, "")
      .trim();

    if (cleanedText.toLowerCase() === "false") {
      return res.status(400).json({ error: "Invalid input" });
    }

    let jsonData;
    try {
      jsonData = JSON.parse(cleanedText);
    } catch {
      jsonData = { raw: cleanedText };
    }

    const fr = jsonData.functional_requirements?.[0]?.requirements || [];
    const nfr = jsonData.non_functional_requirements?.[0]?.requirements || [];

    // ✅ Update only the requirements for the existing project
    const updated = await ResponseModel.findOneAndUpdate(
      { projectId: id, userId },
      { prompt, functional_requirements: fr, non_functional_requirements: nfr },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json({
      message: "Requirements updated",
      data: updated,
      projectId: id,
    });
  } catch (error) {
    console.error("❌ Error updating requirements:", error.message);
    res.status(500).json({ error: "Failed to update requirements" });
  }
};
