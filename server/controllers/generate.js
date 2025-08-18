const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs").promises;
const connectDB = require("../database/db");
const ResponseModel = require("../models/response");
// Initialize with API key
const genAI = new GoogleGenerativeAI(
  "AIzaSyBKHgoOpRV6 - L8bfLwiwWfE_hHN21b8CGs"
);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Or gemini-1.5-pro-latest

exports.generateRequirements = async (req, res) => {
  try {
    await connectDB();
    const { prompt } = req.body;

    const prefix = `First of all anaylize the prompt entered by user if it is irrelvent or not describing and defining any software requirement or dicussing about software , website, web application, mobile application or any type of software ,
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

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const finalPrompt = `User Prompt : ${prompt}. ${prefix}`;
    const result = await model.generateContent(finalPrompt);
    const responseText = result.response.text().trim();

    // localStorage.setItem("prompts", prompt);

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

    // ✅ Extract flat requirement arrays
    const fr = jsonData.functional_requirements?.[0]?.requirements || [];
    const nfr = jsonData.non_functional_requirements?.[0]?.requirements || [];
    if (fr === "[]" && nfr === "[]") {
      return res.status(400).json({
        error:
          "Your input appears unrelated to system design. Kindly provide a valid prompt describing software requirements to continue...",
      });
    }
    // ✅ Save to MongoDB in cleaner format
    const saved = await ResponseModel.create({
      prompt,
      functional_requirements: fr,
      non_functional_requirements: nfr,
    });
    return res.json({ message: "Saved", data: saved });
  } catch (error) {
    console.error("❌ Error generating content:", error.message);
    res.status(500).json({ error: "Failed to generate content" });
  }
};
