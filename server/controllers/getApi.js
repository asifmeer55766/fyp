const connectDB = require("../database/db");
const ApiDesign = require("../models/apiModel").default; // Make sure to use .default as we discussed

// ... (other exports like generateApi)

exports.getLatestApiDesign = async (req, res) => {
  try {
    await connectDB();

    // Find the latest document by sorting in descending order of creation date
    const latestApiDesign = await ApiDesign.findOne().sort({ createdAt: -1 });

    if (!latestApiDesign) {
      return res.status(404).json({ message: "No API designs found." });
    }

    return res.json({
      message: "Latest API design fetched successfully",
      data: latestApiDesign,
    });
  } catch (error) {
    console.error("❌ Error fetching latest API design:", error.message);
    res.status(500).json({ error: "Failed to fetch latest API design" });
  }
};
