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

app.use(cors());
app.use(bodyParser.json());

// Use helmet to protect from ??
app.use(helmet()); // Continue code..

//Rate Limiter for DDoS attack etc
const rateLimit = rateLimiter({
  timeLimit: 10 * 60 * 1000, // 10min
  maxRequests: 50,
});

app.use(rateLimit);

// Feature-Policy, limits use of microphone, kamera, geolocation from user. (helmet)
app.use((req, res, next) => {
  res.setHeader(
    "Feature-Policy",
    "geolocation 'self'; microphone 'none'; camera 'none'"
  );
  next();
});

// Prevents Clickjacking. (helmet)
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

//MIME Sniffing, prevents harmful code from being executed.
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Cross-site Scripting Protection.
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'"
  );
  next();
});

//Use JWT auth API route in data_routes.js
app.use("/data", dataRoutes);

// Export app t
module.exports = app;
