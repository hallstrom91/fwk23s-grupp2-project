/*
============================================
Init Setup
============================================
*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

const dataRoutes = require("./routes/data_routes");

/*
============================================
Middleware and JWT verify
============================================
*/

app.use(cors());
app.use(bodyParser.json());

app.use("/data", dataRoutes);

app.use((req, res, next) => {
  console.log(
    `[DATE & TIME: ${new Date().toLocaleString()}] [USER-IP: ${
      req.ip
    }] [Req Method: ${req.method}] `
  );
  next();
});

module.exports = app;
