// models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true }, // e.g. from the user prompt
    description: { type: String }, // optional
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("Project", ProjectSchema);
