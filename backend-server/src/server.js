/*
============================================
Init Setup
============================================
*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const app = express();

const dataRoutes = require("./routes/data_routes");

/*
============================================
Middleware for site and user protection.
============================================
*/
// Use helmet basic functions
app.use(helmet());

app.use(cors());
app.use(bodyParser.json());

//Rate Limiter for DDoS attack etc
const rateLimit = rateLimiter({
  timeLimit: 10 * 60 * 1000, // 10min
  maxRequests: 50,
});

app.use(rateLimit);

//Use JWT auth API route in data_routes.js
app.use("/data", dataRoutes);

// Export app t
module.exports = app;
