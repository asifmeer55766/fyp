const connectDB = require("../database/db");
const ResponseModel = require("../models/response");

const getLatestResponse = async (req, res) => {
  try {
    await connectDB();

    // ⬇️ Fetch the LAST inserted document
    const latest = await ResponseModel.findOne().sort({ _id: -1 }).lean();

    if (!latest) {
      return res.status(404).json({ error: "No response found in database." });
    }

    res.json(latest);
  } catch (error) {
    console.error("❌ Error fetching latest response from DB:", error);
    res
      .status(500)
      .json({ error: "Failed to load latest response from database." });
  }
};

module.exports = { getLatestResponse };
