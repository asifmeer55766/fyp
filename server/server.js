require("dotenv").config();

const routes = require("./routes/routes");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./database/db");
const projectRoutes = require("./routes/routes");

// const errorHandler = require('./middleware/errorHandler');

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// new api key

// Routes
app.use("/api", routes);
app.use("/api/projects", projectRoutes);

// Health check
app.get("/", (req, res) => {
  res.send({ message: "Server is running!" });
});

// Error handler
// app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✔ Server running on http://localhost:${PORT}`);
});
