// models/projectProposalModel.js

const mongoose = require("mongoose");
const { baseSchemaFields } = require("./baseModel");

// Schema for a single technology and its reason
const TechStackSchema = new mongoose.Schema({
  technology: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

// Main schema for the project proposal document
const ProjectProposalSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  stakeholders: [String],
  useCases: [String],
  techStack: [
    {
      technology: String,
      reason: String,
    },
  ],
  // keep whole Gemini response for backup
  jsonData: { type: Object, required: true },
  ...baseSchemaFields,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("project_proposal", ProjectProposalSchema);
