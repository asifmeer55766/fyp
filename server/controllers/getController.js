// controllers/getController.js
import connectDB from "../database/db.js";
import Project from "../models/Project.js";
import project_proposal from "../models/projectProposalModel.js";
import systemDesignModel from "../models/systemDesignModel.js";
import ResponseModel from "../models/response.js";
import lldmodel from "../models/lldmodel.js";
import hldResponse from "../models/hldResponse.js";
import erdModel from "../models/erdModel.js";
import sequence_diagram from "../models/sequenceDiagramModel.js";
import apiModel from "../models/apiModel.js";
export const getFullProjectOutput = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const userId = req.user._id;

    // Project base info
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Fetch linked docs
    const proposal = await project_proposal
      .findOne({ projectId, userId })
      .sort({
        createdAt: -1,
      });
    const systemDesign = await systemDesignModel
      .findOne({ projectId, userId })
      .sort({ createdAt: -1 });
    const response = await ResponseModel.findOne({ projectId, userId }).sort({
      createdAt: -1,
    });
    const lld = await lldmodel
      .findOne({ projectId, userId })
      .sort({ createdAt: -1 });
    const hld = await hldResponse
      .findOne({ projectId, userId })
      .sort({ createdAt: -1 });
    const sequenceDiagram = await sequence_diagram
      .findOne({ projectId, userId })
      .sort({ createdAt: -1 });
    const erd = await erdModel
      .findOne({ projectId, userId })
      .sort({ createdAt: -1 });
    const apiDesign = await apiModel.findOne({ projectId, userId }).sort({
      createdAt: -1,
    });

    res.json({
      message: "Project output fetched successfully",
      project,
      proposal,
      systemDesign,
      response,
      lld,
      hld,
      sequenceDiagram,
      erd,
      apiDesign,
    });
  } catch (error) {
    console.error("❌ Error fetching project output:", error.message);
    res.status(500).json({ error: "Failed to fetch project output" });
  }
};

// ✅ Delete project and all linked docs
export const deleteProject = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const userId = req.user._id;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete project + all linked docs
    await Project.deleteOne({ _id: projectId, userId });
    await project_proposal.deleteMany({ projectId, userId });
    await systemDesignModel.deleteMany({ projectId, userId });
    await ResponseModel.deleteMany({ projectId, userId });
    await lldmodel.deleteMany({ projectId, userId });
    await hldResponse.deleteMany({ projectId, userId });
    await sequence_diagram.deleteMany({ projectId, userId });
    await erdModel.deleteMany({ projectId, userId });
    await apiModel.deleteMany({ projectId, userId });

    res.json({
      message: "✅ Project and all related documents deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting project:", error.message);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
