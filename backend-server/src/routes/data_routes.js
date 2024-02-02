/*
============================================
Init Setup
============================================
*/

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const path = require("path");

/*
============================================
Read and verify JWT and user role
============================================
*/

//JWT Secret for verification.
const secretKey = process.env.JWT_SECRET;


router.get("/", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, secretKey);
    if (verified.role === "admin") {
      return res.json('Secret data for admin!');
    } else {
      return res.json('Secret data for user!');
    }
  } catch {
    res.status(401).send("Invalid Token");
  }
});

module.exports = router;
