// routes/routes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const { authenticate, authorizeRoles } = require("../middleware/auth");
const { generateRequirements } = require("../controllers/generate");
const { getLatestResponse } = require("../controllers/responses");
const { generateDesign } = require("../controllers/generateDesigns");
const { getHLD } = require("../controllers/hldController");
const { getLLD } = require("../controllers/getLLD");
const { getERD } = require("../controllers/getERD");
const { generateLowLevel } = require("../controllers/lldController");
const { generateERD } = require("../controllers/generateERD");
const { generateApi } = require("../controllers/generateApi");
const { getLatestApiDesign } = require("../controllers/getApi");
const {
  generateSequenceDiagram,
  getLatestSequenceDiagram,
} = require("../controllers/generateSequenceDiagram");
const {
  generateProjectProposal,
  getLatestProjectProposal,
} = require("../controllers/generateprojectProposalController");
const {
  generateSystemDesign,
  getLatestSystemDesign,
} = require("../controllers/systemDesignController");
const { generatePdf } = require("../controllers/pdfController");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes 🔒
// 💡 Apply the 'authenticate' middleware to all protected routes
router.post("/generate", authenticate, generateRequirements);
router.post("/generate-design", authenticate, generateDesign);
router.post("/generate-lld", authenticate, generateLowLevel);
router.post("/generate-api", authenticate, generateApi);
router.post("/generate-erd", authenticate, generateERD);
router.post("/generate-system-design", authenticate, generateSystemDesign);
router.post(
  "/generate-project-proposal",
  authenticate,
  generateProjectProposal
);
router.post(
  "/generate-sequence-diagram",
  authenticate,
  generateSequenceDiagram
);
// get routes
router.get("/latest-response", getLatestResponse);
router.get("/getHLD", getHLD);
router.get("/getLLD", getLLD);
router.get("/getERD", getERD);
router.get("/get-apidesign", getLatestApiDesign);
router.get("/get-sequencediagram", getLatestSequenceDiagram);
router.get("/get-system-design", getLatestSystemDesign);
router.get("/get-project-proposal", getLatestProjectProposal);
router.get("/generate-pdf", generatePdf);

// Role-based examples
router.get("/admin-only", authenticate, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/user-only", authenticate, authorizeRoles("user"), (req, res) => {
  res.json({ message: "Hello User!" });
});

module.exports = router;
