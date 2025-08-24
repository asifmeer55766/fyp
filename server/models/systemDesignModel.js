// models/systemDesignModel.js

const mongoose = require("mongoose");
const { baseSchemaFields } = require("./baseModel"); // Assumes you have a base schema for common fields

/**
 * Mongoose Schema for storing system design diagrams in the database.
 * This model is specifically for architectural flowcharts.
 */
const SystemDesignSchema = new mongoose.Schema({
  diagramName: {
    type: String,
    required: true,
  },
  mermaidCode: {
    type: String,
    required: true,
  },
  ...baseSchemaFields, // Include common fields like userId, etc.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("system_design", SystemDesignSchema);
