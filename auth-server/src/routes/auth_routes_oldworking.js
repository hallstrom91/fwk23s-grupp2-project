const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

const router = express.Router();


const isProduction = process.env.NODE_ENV === 'production';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (await isValidUser(email, password)) {
    const token = jwt.sign({ email, role: getUserRole(email) }, 'secretKey', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: isProduction, sameSite: 'strict' });

    
    res.json({ message: 'Login successful' }); // retunerar i en sträng
  } else {
    res.status(401).json({ error: 'Invalid login' }); 
  }
});

const isValidUser = async (email, password) => {
  const hashedPassword = await hashPassword('password'); 
  return email === 'user@example.com' && await bcrypt.compare(password, hashedPassword);
};

const getUserRole = (email) => {
  return email === 'admin@example.com' ? 'admin' : 'user';
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

module.exports = router;
