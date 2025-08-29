import connectDB from "../database/db.js";
// const Project = require("../models/Project");
import Project from "../models/Project.js";
import User from "../models/user.model.js";

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
