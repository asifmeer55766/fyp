// lldmodel.js
const mongoose = require("mongoose");

const lowlevelSchema = new mongoose.Schema({
  designName: { type: String, required: true },
  rawData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("low_level_design", lowlevelSchema);
