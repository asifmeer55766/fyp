const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  functional_requirements: [{ type: String }],
  non_functional_requirements: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("response", responseSchema);
