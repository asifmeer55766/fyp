const { GoogleGenerativeAI } = require("@google/generative-ai");
const connectDB = require("../database/db");
const ApiDesign = require("../models/apiModel").default;
// Initialize with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

exports.generateApi = async (req, res) => {
  try {
    await connectDB();
    const { originalUserPrompt, projectId } = req.body;

    if (!originalUserPrompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const prefix = `
    You are a system architect. A user wants the following system: "${originalUserPrompt}".
    Generate the API design in the following JSON format only:

    {
      "title": "API Design for [System Name]",
      "apiTable": [
        {
          "endpoint": "/auth/login",
          "method": "POST",
          "description": "User login and token generation",
          "requestExample": { "email": "test@example.com", "password": "123456" },
          "responseExample": { "token": "jwt_token_here", "role": "user" },
          "authRequired": false
        }
      ],
  }

    Instructions:
    - Replace [System Name] with actual project/system name.
    - Generate all relevant endpoints.
    - Fill requestExample/responseExample with realistic JSON.
    - Always return valid JSON, no Markdown or extra text.
    `;

    // Generate from Gemini
    const result = await model.generateContent(prefix);
    const responseText = result.response.text().trim();

    // Clean if Gemini wraps in ```json
    let cleanedText = responseText
      .replace(/^```(json)?/i, "")
      .replace(/```$/, "")
      .trim();

    let jsonData;
    try {
      jsonData = JSON.parse(cleanedText);
    } catch {
      return res
        .status(500)
        .json({ error: "Invalid JSON returned by AI", raw: cleanedText });
    }

    // ✅ Save to MongoDB
    const saved = await ApiDesign.create({
      title: jsonData.title,
      apiTable: jsonData.apiTable,
      userId: req.user._id,
      projectId,
    });

    return res.json({ message: "Saved successfully", data: saved });
  } catch (error) {
    console.error("❌ Error generating API:", error.message);
    res.status(500).json({ error: "Failed to generate API" });
  }
};
