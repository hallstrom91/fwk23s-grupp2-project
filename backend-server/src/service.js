/*
============================================
Init Setup
============================================
*/

require("dotenv").config();
const app = require("./server.js");
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Backend server is live and listening on port ${PORT}`);
});

// Request Logger in bash terminal
app.use((req, res, next) => {
  console.log(
    `[DATE & TIME: ${new Date().toLocaleString()}] [USER-IP: ${
      req.ip
    }] [Req Method: ${req.method}] `
  );
  next();
});
