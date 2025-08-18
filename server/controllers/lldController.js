import { GoogleGenerativeAI } from "@google/generative-ai";

import connectDB from "../database/db.js";
import lldmodel from "../models/lldmodel.js";
// Initialize with API key
const genAI = new GoogleGenerativeAI(
  "AIzaSyBKHgoOpRV6 - L8bfLwiwWfE_hHN21b8CGs"
);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Or gemini-1.5-pro-latest

export const generateLowLevel = async (req, res) => {
  await connectDB(); // Ensure DB is connected
  //   const { functional, nonFunctional, originalUserPrompt } = req.body;

  //   if (!functional || !nonFunctional || !originalUserPrompt) {
  //     return res.status(400).json({ error: "All required fields missing" });
  //   }

  //   const formatRequirements = (reqs) =>
  //     reqs.map((item, i) => `${i + 1}. ${Object.values(item)[0]}`).join("\n");

  //   const functionalText = formatRequirements(functional);
  //   const nonFunctionalText = formatRequirements(nonFunctional);
  const { originalUserPrompt } = req.body;

  const prompt = `
You are a system architect. A user wants the following system: "${originalUserPrompt}"

Use the following requirements to build a Low Level Design in deatails (LLD).

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
    console.log("responses from low level design ", responseText);

    let cleanedText = responseText
      .replace(/^```(json)?/i, "")
      .replace(/```$/, "")
      .trim();
    if (cleanedText.toLowerCase() === "false") {
      console.log(
        '❌ Received "false" response from AI. Aborting file creation.'
      );
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

    // 2. Save to MongoDB

    const saved = await lldmodel.create({
      designName: jsonData.name || "Untitled System",
      rawData: jsonData,
    });

    res.json({ design: saved });
  } catch (error) {
    console.error("Error generating LLD:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
