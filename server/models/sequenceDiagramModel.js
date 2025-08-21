// models/sequenceDiagramModel.js

const mongoose = require("mongoose");
const { baseSchemaFields } = require("./baseModel");

const SequenceDiagramSchema = new mongoose.Schema({
  diagramName: {
    type: String,
    required: true,
  },
  mermaidCode: {
    type: String,
    required: true,
  },
  ...baseSchemaFields,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("sequence_diagram", SequenceDiagramSchema);
