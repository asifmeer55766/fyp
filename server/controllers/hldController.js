// controllers/hldController.js
const ResponseModel = require("../models/hldResponse");
const connectDB = require("../database/db");
const getHLD = async (req, res) => {
  try {
    connectDB();
    const latestDesign = await ResponseModel.findOne().sort({ createdAt: -1 });
    console.log("latest desing is :", latestDesign);

    if (!latestDesign || !latestDesign.rawData) {
      return res.status(404).json({ error: "HLD data not found" });
    }

    res.json(latestDesign.rawData); // return only the HLD part of rawData
  } catch (error) {
    console.error("Error fetching HLD:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getHLD };
