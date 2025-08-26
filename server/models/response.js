const mongoose = require("mongoose");
const { baseSchemaFields } = require("../models/baseModel");
const responseSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  functional_requirements: [{ type: String }],
  non_functional_requirements: [{ type: String }],
  ...baseSchemaFields, // ✅ adds userId
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("response", responseSchema);
