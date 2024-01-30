/*
============================================
Init Setup
============================================
*/

const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const router = express.Router();

router.use(cookieParser());

/*
============================================
Read JWT token from httpOnly Cookie w middleware
============================================
*/

router.options("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.status(200).end();
});

router.get("/", async (req, res) => {
  //Collect token from httpOnly Cookie.

  //Hämta från autheader istället så funkar de garanterat som innan ist för cookie.
  const token = req.cookies.token;

  if (!token) {
    console.log("Token is missing. Access Denied for user.");
    return res.status(401).json({ error: "Access Denied." });
  }

  try {
    const verified = await jwt.verify(token, "secretKey");
    if (verified.role === "admin") {
      res.json({ data: "Secrets for Mr.Admin." });
    } else {
      res.json({ data: "Secrets for Mr.Nobody" });
    }
  } catch (error) {
    console.error("Error with verifying token:", error.message);
    res.status(401).send("Invalid Token.");
  }
});

module.exports = router;

/* router.get("/", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "secretKey");
    if (verified.role === "admin") {
      return res.json({ data: "Secret data for admin!" });
    } else {
      return res.json({ data: "Secret data for user!" });
    }
  } catch {
    res.status(401).send("Invalid Token");
  }
}); */
