const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");

const { generateRequirements } = require("../controllers/generate");
// import { jsonGenerator } from '../controllers/jsongenerator.controller';
const { getLatestResponse } = require("../controllers/responses");
const { generateDesign } = require("../controllers/generateDesigns");
const { getHLD } = require("../controllers/hldController");
const { getLLD } = require("../controllers/getLLD");
const { getERD } = require("../controllers/getERD");
const { generateLowLevel } = require("../controllers/lldController");
const { generateERD } = require("../controllers/generateERD");
const { generateApi } = require("../controllers/generateApi");
const { getLatestApiDesign } = require("../controllers/getApi");
// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);

// Add Gemini generate route
router.post("/generate", generateRequirements);
router.get("/latest-response", getLatestResponse);
router.post("/generate-design", generateDesign);
router.get("/getHLD", getHLD);
router.get("/getLLD", getLLD);
router.get("/getERD", getERD);
router.post("/generate-lld", generateLowLevel);
router.post("/generate-erd", generateERD);
router.post("/generate-api", generateApi);
router.get("/get-apidesign", getLatestApiDesign);

const { authenticate, authorizeRoles } = require("../middleware/auth");

router.get("/admin-only", authenticate, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/user-only", authenticate, authorizeRoles("user"), (req, res) => {
  res.json({ message: "Hello User!" });
});

module.exports = router;
