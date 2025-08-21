// lldmodel.js
const mongoose = require("mongoose");
const { baseSchemaFields } = require("./baseModel");
const ERDSchema = new mongoose.Schema({
  designName: { type: String, required: true },
  // rawData: { type: Object, required: true },   // AI JSON output (entities + relations)
  mermaidCode: { type: String, required: true }, // Only store what frontend needs
  ...baseSchemaFields, // ✅ adds userId
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("erd_design", ERDSchema);
