const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    designName: { type: String },
    rawData: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "design_responses" }
);

module.exports = mongoose.model("ResponseModel", ResponseSchema);
