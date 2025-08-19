// models/projectProposalModel.js

const mongoose = require("mongoose");

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
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stakeholders: {
    type: [String],
    required: true,
  },
  useCases: {
    type: [String],
    required: true,
  },
  techStack: {
    type: [TechStackSchema], // An array of technology objects
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("project_proposal", ProjectProposalSchema);
