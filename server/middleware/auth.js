// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // 👈 adjust path if needed

// ✅ Authenticate Middleware
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check user in DB (important for deleted/blocked users)
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found or inactive" });
    }

    req.user = {
      _id: user._id,
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ✅ Role-based Authorization Middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRoles };
