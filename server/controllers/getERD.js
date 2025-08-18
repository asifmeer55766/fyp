// controllers/hldController.js
const erd_design = require("../models/erdModel");
const connectDB = require("../database/db");
const getERD = async (req, res) => {
  try {
    connectDB();
    const latestDesign = await erd_design.findOne().sort({ createdAt: -1 });
    console.log("ERD latest desingn is :", latestDesign);

    if (!latestDesign || !latestDesign.mermaidCode) {
      return res.status(404).json({ error: "ERD data not found" });
    }

    res.json(latestDesign.mermaidCode); // return only the HLD part of rawData
  } catch (error) {
    console.error("Error fetching ERD:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getERD };
