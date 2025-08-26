// lldmodel.js
const mongoose = require("mongoose");
const { baseSchemaFields } = require("./baseModel");

const lowlevelSchema = new mongoose.Schema({
  designName: { type: String, required: true },
  rawData: { type: Object, required: true },
  ...baseSchemaFields, // ✅ adds userId
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("low_level_design", lowlevelSchema);
