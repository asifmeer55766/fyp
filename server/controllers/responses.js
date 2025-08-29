import ResponseModel from "../models/response.js";
import connectDB from "../database/db.js";

export const getResponse = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const userId = req.user._id;

    console.log("project id from url ", projectId);
    console.log("user id from url ", userId);

    const latest = await ResponseModel.findOne({
      projectId,
      userId,
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ error: "No response found in database." });
    }

    res.json(latest);
  } catch (error) {
    console.error("❌ Error fetching latest response:", error);
    res
      .status(500)
      .json({ error: "Failed to load latest response from database." });
  }
};
