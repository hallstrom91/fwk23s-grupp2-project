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

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3002",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/data", dataRoutes);

app.listen(3002, () => {
  console.log("second port ${port}");
});

app.use((req, res, next) => {
  console.log(
    `[DATE & TIME: ${new Date().toLocaleString()}] [USER-IP: ${
      req.ip
    }] [Req Method: ${req.method}] `
  );
  next();
});

// JWT Verification MW
/* const authToken = (requiredRole) => {
  return (req, rest, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).send("Access Denied.");
    console.log("Access Denied, no JWT token!");

    try {
      const verified = jwt.verify(token, "secretKey");

      // Check user role
      if (requiredRole && verified.role !== requiredRole) {
        return res.status(403).send("Forbidden.");
      }
      req.user = verified;
      next();
    } catch (err) {
      res.status(401).send("Invalid Token");
    }
  };
}; */

/* module.exports = authToken; */
