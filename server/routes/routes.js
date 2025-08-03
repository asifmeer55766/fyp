const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");

const { generateRequirements } = require("../controllers/generate");
// import { jsonGenerator } from '../controllers/jsongenerator.controller';
const { getLatestResponse } = require("../controllers/responses");
const { generateDesign } = require("../controllers/generateDesigns");
// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);

// Add Gemini generate route
router.post("/generate", generateRequirements);
router.get("/latest-response", getLatestResponse);
router.post("/generate-design", generateDesign);

const { authenticate, authorizeRoles } = require("../middleware/auth");

router.get("/admin-only", authenticate, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/user-only", authenticate, authorizeRoles("user"), (req, res) => {
  res.json({ message: "Hello User!" });
});

module.exports = router;
