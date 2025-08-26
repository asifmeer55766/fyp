const mongoose = require("mongoose");
const { baseSchemaFields } = require("./baseModel");
const ResponseSchema = new mongoose.Schema(
  {
    designName: { type: String },
    rawData: { type: mongoose.Schema.Types.Mixed },
    ...baseSchemaFields, // ✅ adds userId
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "design_responses" }
);

module.exports = mongoose.model("ResponseModel", ResponseSchema);
