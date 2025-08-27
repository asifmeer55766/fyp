import connectDB from "../database/db.js";
// const Project = require("../models/Project");
import Project from "../models/Project.js";
import User from "../models/user.model.js";
import ProjectProposal from "../models/projectProposalModel.js";
import SystemDesign from "../models/systemDesignModel.js";
import ResponseModel from "../models/response.js";
import low_level_design from "../models/lldmodel.js";
import erd_design from "../models/erdModel.js";
import ApiDesign from "../models/apiModel.js";
// ✅ Get all projects by logged-in user

// Middleware to check for authentication and project ID
const authAndProjectCheck = (req, res, next) => {
  // Check if user is authenticated (e.g., via a previous middleware)
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Unauthorized: User not logged in." });
  }

  // Check if projectId is provided in the URL params
  if (!req.params.projectId) {
    return res
      .status(400)
      .json({ error: "Bad Request: Project ID is required." });
  }

  next();
};

export const getProjects = async (req, res) => {
  try {
    await connectDB();
    const userId = req.user._id;
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const getUser = async (req, res) => {
  try {
    await connectDB();
    const users = await User.find(); // get all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getLoggedInUserDetails = async (req, res) => {
  try {
    await connectDB();
    const user = await User.findById(req.user._id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

export const getLatestProjectProposal = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const userId = req.user._id;

    const latestProposal = await ProjectProposal.findOne({
      userId: userId,
      projectId: projectId,
    }).sort({
      createdAt: -1,
    });

    if (!latestProposal) {
      return res
        .status(404)
        .json({ message: "No project proposals found for this project." });
    }

    res.json({
      message: "Latest project proposal fetched successfully",
      data: latestProposal,
    });
  } catch (error) {
    console.error("❌ Error fetching project proposal:", error.message);
    res.status(500).json({ error: "Failed to fetch project proposal" });
  }
};

export const getLatestSystemDesign = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const userId = req.user._id;

    const latestDesign = await SystemDesign.findOne({
      userId: userId,
      projectId: projectId,
    }).sort({
      createdAt: -1,
    });

    if (!latestDesign) {
      return res
        .status(404)
        .json({ message: "No system designs found for this project." });
    }

    res.json(latestDesign.mermaidCode);
  } catch (error) {
    console.error("❌ Error fetching system design:", error.message);
    res.status(500).json({ error: "Failed to fetch system design diagram" });
  }
};

export const getLatestResponse = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const userId = req.user._id;

    const latest = await ResponseModel.findOne({
      userId: userId,
      projectId: projectId,
    })
      .sort({ _id: -1 })
      .lean();

    if (!latest) {
      return res
        .status(404)
        .json({ error: "No response found in database for this project." });
    }

    res.json(latest);
  } catch (error) {
    console.error("❌ Error fetching latest response from DB:", error);
    res
      .status(500)
      .json({ error: "Failed to load latest response from database." });
  }
};

export const getLLD = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const userId = req.user._id;

    const latestDesign = await low_level_design
      .findOne({
        userId: userId,
        projectId: projectId,
      })
      .sort({ createdAt: -1 });

    if (!latestDesign || !latestDesign.rawData) {
      return res
        .status(404)
        .json({ error: "LLD data not found for this project." });
    }

    res.json(latestDesign.rawData);
  } catch (error) {
    console.error("Error fetching HLD:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getERD = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const userId = req.user._id;

    const latestDesign = await erd_design
      .findOne({
        userId: userId,
        projectId: projectId,
      })
      .sort({ createdAt: -1 });

    if (!latestDesign || !latestDesign.mermaidCode) {
      return res
        .status(404)
        .json({ error: "ERD data not found for this project." });
    }

    res.json(latestDesign.mermaidCode);
  } catch (error) {
    console.error("Error fetching ERD:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getLatestApiDesign = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const userId = req.user._id;

    const latestApiDesign = await ApiDesign.findOne({
      userId: userId,
      projectId: projectId,
    }).sort({ createdAt: -1 });

    if (!latestApiDesign) {
      return res
        .status(404)
        .json({ message: "No API designs found for this project." });
    }

    return res.json({
      message: "Latest API design fetched successfully",
      data: latestApiDesign,
    });
  } catch (error) {
    console.error("❌ Error fetching latest API design:", error.message);
    res.status(500).json({ error: "Failed to fetch latest API design" });
  }
};
