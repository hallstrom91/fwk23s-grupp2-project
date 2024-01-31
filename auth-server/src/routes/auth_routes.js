/*
============================================
Init Setup
============================================
*/

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

/*
============================================
DB Path and DB variabel + Node Env
============================================
*/

// create variabel and path to usersDB
const dbPath = path.join(__dirname, "../users.json");

const secretKey = process.env.JWT_SECRET;

// User DB
const users = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// Production Env
const isProduction = process.env.NODE_ENV === "production";

/*
============================================
Login Route, check user and assign JWT.
============================================
*/

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Read registered users from .json file
  const users = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  if (await isValidUser(email, password, users)) {
    const user = getUserByEmail(email, users);

    //create JWT token for user in httpOnly Cookie and SamSite protection
    const token = jwt.sign({ id: user.id, email, role: user.role }, secretKey, {
      expiresIn: "1h",
    });

    // place JWT in httpOnly cookie and limit access to sharing it with SameSite
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
    });

    res.json({ token });
    console.log(`User [Id: ${user.id} & Email: ${user.email}] has logged in`);
  } else {
    //if isValidUser equals false it will give error.
    console.log("Failed login attempt.");
    res.status(401).json({ error: "Incorrect credentials." });
  }
});

/*
============================================
Check & Compare credentials in users.json DB
============================================
*/

// Called in /login function
const isValidUser = async (email, password, users) => {
  for (const user of users) {
    if (user.email === email) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return true;
      }
    }
  }
  return false;
};

/*
============================================
Find user by email (Register route)
============================================
*/
// called in /register function
const getUserByEmail = (email, users) => {
  return users.find((user) => user.email === email);
};

/*
============================================
Bcrypt hashfunction 
============================================
*/
// Hash password called in /register function
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/*
============================================
Register/Add User to user.json DB
============================================
*/

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Read saved users from users.json
  const users = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  // Check to see that email is not registered already.
  if (getUserByEmail(email, users)) {
    console.log("User credentials is already in database.");
    res.status(400).json({ error: "User email already in use." });
    return;
  } else {
    console.log("User is now registered!");
  }

  // Add new user to users.json DB file.
  const addUser = {
    id: users.length + 1,
    email,
    password: await hashPassword(password),
    role: "user",
  };

  users.push(addUser);

  // Write new user to users.json DB.
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2), "utf8");

  res.json({ message: "User is now registered! Congrats!" });
});

module.exports = router;
