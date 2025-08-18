// controllers/hldController.js
const low_level_design = require("../models/lldmodel");
const connectDB = require("../database/db");
const getLLD = async (req, res) => {
  try {
    connectDB();
    const latestDesign = await low_level_design
      .findOne()
      .sort({ createdAt: -1 });
    console.log("latest desing is :", latestDesign);

    if (!latestDesign || !latestDesign.rawData) {
      return res.status(404).json({ error: "LLD data not found" });
    }

    res.json(latestDesign.rawData); // return only the HLD part of rawData
  } catch (error) {
    console.error("Error fetching HLD:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getLLD };
