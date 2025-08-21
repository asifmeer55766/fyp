// models/baseSchema.js
import mongoose from "mongoose";

export const baseSchemaFields = {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
};

export const baseSchemaOptions = {
  timestamps: true, // ✅ adds createdAt & updatedAt automatically
};
