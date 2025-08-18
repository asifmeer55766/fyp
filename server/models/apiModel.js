import mongoose from "mongoose";

const apiEndpointSchema = new mongoose.Schema({
  endpoint: { type: String, required: true }, // e.g. "/auth/login"
  method: { type: String, required: true }, // e.g. "POST"
  description: { type: String, required: true },
  requestExample: { type: Object, default: {} }, // store as JSON
  responseExample: { type: Object, default: {} }, // store as JSON
  authRequired: { type: Boolean, default: false },
});

const apiDesignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // e.g. "API Design for College Management System"
  },
  apiTable: [apiEndpointSchema], // array of endpoints
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ApiDesign", apiDesignSchema);
